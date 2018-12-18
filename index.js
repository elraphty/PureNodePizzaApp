const http = require('http');

let server = http.createServer((req, res) => {
  res.end('Hello world'+'\n'+'world 3')
});

server.listen(5000, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server listening of PORT 5000`);
});