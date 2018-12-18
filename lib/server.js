/**
 * Main Server File
 * Created On Dec 18 2018
 * By Rapahel Osaze Eyerin
 */

const http = require('http');
const config = require('./config');
// Declare and initialize server
const server = {};

// httpServer
server.httpServer = http.createServer((req, res) => {
  res.end('Hello world'+'\n'+'world 3')
});

server.init = () => {
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server listening of PORT 5000`);
  });
};

module.exports = server;