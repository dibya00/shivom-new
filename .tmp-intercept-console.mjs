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
  
  // Inject script to run on page creation
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__logs = [];
      window.__errors = [];
      
      const captureLog = (type, args) => {
        const msg = args.map(arg => {
          if (arg instanceof Error) return arg.stack;
          if (typeof arg === 'object') {
            try { return JSON.stringify(arg); } catch (e) { return String(arg); }
          }
          return String(arg);
        }).join(' ');
        window.__logs.push({ type, msg, time: Date.now() });
      };

      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;

      console.log = (...args) => {
        captureLog('log', args);
        originalLog.apply(console, args);
      };
      console.warn = (...args) => {
        captureLog('warn', args);
        originalWarn.apply(console, args);
      };
      console.error = (...args) => {
        captureLog('error', args);
        originalError.apply(console, args);
      };

      window.addEventListener('error', (e) => {
        window.__errors.push({
          type: 'error',
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          stack: e.error ? e.error.stack : null
        });
      });

      window.addEventListener('unhandledrejection', (e) => {
        window.__errors.push({
          type: 'unhandledrejection',
          reason: String(e.reason)
        });
      });
    `
  });

  console.log('Navigating to http://localhost:3000/ ...');
  await send('Page.navigate', { url: 'http://localhost:3000/' });

  // Wait for loading to finish
  await new Promise((resolve) => setTimeout(resolve, 4000));

  console.log('--- Clicking Projects Link ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const link = Array.from(document.querySelectorAll('header nav a')).find(el => el.innerText.includes('Projects'));
      if (link) {
        link.click();
        return 'Clicked';
      }
      return 'Not found';
    })()`,
    returnByValue: true
  });

  // Wait a moment after click
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Retrieve logs and errors
  const logsResult = await send('Runtime.evaluate', {
    expression: `({ logs: window.__logs, errors: window.__errors, currentHref: location.href })`,
    returnByValue: true
  });

  const { logs, errors, currentHref } = logsResult.result?.result?.value || {};

  console.log('\n--- BROWSER ERRORS/EXCEPTIONS ---');
  console.log(JSON.stringify(errors, null, 2));

  console.log('\n--- BROWSER LOGS ---');
  console.log(JSON.stringify(logs, null, 2));

  console.log('\nFinal location:', currentHref);

  ws.close();
}

main().catch(console.error);
