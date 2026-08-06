async function main() {
  const tabs = await fetch('http://127.0.0.1:9222/json/list').then((r) => r.json());
  const page = tabs.find((tab) => tab.type === 'page');

  if (!page) {
    throw new Error('No Chrome page target found');
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    } else if (message.method === 'Runtime.consoleAPICalled') {
      console.log('[Browser Console]', message.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
    } else if (message.method === 'Runtime.exceptionThrown') {
      console.error('[Browser Exception]', message.params.exceptionDetails);
    }
  };

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const message = { id: ++id, method, params };
      pending.set(message.id, resolve);
      ws.send(JSON.stringify(message));
    });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.bringToFront');

  // Inject preventDefault tracer
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      const originalPreventDefault = Event.prototype.preventDefault;
      Event.prototype.preventDefault = function() {
        if (this.type === 'click') {
          const err = new Error();
          console.log('--- preventDefault called on click event! ---');
          console.log('Target:', this.target.outerHTML || this.target);
          console.log('Stack Trace:', err.stack);
        }
        return originalPreventDefault.apply(this, arguments);
      };
      console.log('preventDefault tracer injected successfully.');
    `
  });

  console.log('Navigating to http://localhost:3000/ ...');
  await send('Page.navigate', { url: 'http://localhost:3000/' });

  // Wait for loading to finish
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log('--- Simulating click on Projects Link ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const link = Array.from(document.querySelectorAll('header nav a')).find(el => el.innerText.includes('Projects'));
      if (link) {
        console.log('Found Projects link, clicking...');
        link.click();
        return 'Clicked';
      }
      return 'Not found';
    })()`,
    returnByValue: true
  });

  // Wait a moment after click
  await new Promise((resolve) => setTimeout(resolve, 2000));

  ws.close();
}

main().catch(console.error);
