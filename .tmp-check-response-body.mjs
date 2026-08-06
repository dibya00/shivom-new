async function main() {
  console.log('--- Checking Direct RSC Request (naive server fallback to HTML) ---');
  const urlDirect = 'http://localhost:3000/projects/?_rsc=vZvxruxGvzQK4GT1';
  const resDirect = await fetch(urlDirect);
  const textDirect = await resDirect.text();
  console.log('Status:', resDirect.status);
  console.log('Content-Type:', resDirect.headers.get('content-type'));
  console.log('Is HTML:', textDirect.trim().startsWith('<!DOCTYPE html>'));

  console.log('\n--- Checking Intercepted RSC Request (rewritten to physical index.txt) ---');
  const urlRewritten = 'http://localhost:3000/projects/index.txt?_rsc=vZvxruxGvzQK4GT1';
  const resRewritten = await fetch(urlRewritten);
  const textRewritten = await resRewritten.text();
  console.log('Status:', resRewritten.status);
  console.log('Content-Type:', resRewritten.headers.get('content-type'));
  console.log('Snippet (first 300 chars):');
  console.log(textRewritten.slice(0, 300));
  console.log('Is valid RSC payload:', !textRewritten.trim().startsWith('<!DOCTYPE html>') && textRewritten.length > 100);
}

main().catch(console.error);
