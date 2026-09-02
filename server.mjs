import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = decodeURIComponent(new URL('.', import.meta.url).pathname);
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const types = { '.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.jpg':'image/jpeg','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8' };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url || '/', `http://${host}`).pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  let file = join(root, safePath);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  createReadStream(file).pipe(response);
}).listen(port, host, () => console.log(`Health Ring website: http://${host}:${port}`));
