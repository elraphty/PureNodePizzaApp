/**
 * Main Server File
 * Created On Dec 18 2018
 * By Rapahel Osaze Eyerin
 */

const http = require('http');
const config = require('./config');
const handlers = require('./handlers');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Declare and initialize server
const server = {};

// httpServer
server.httpServer = http.createServer((req, res) => {
  // headers from the incoming request
  let headers = req.headers;
  // incoming request method
  let method = req.method.toLocaleLowerCase();
  // Parse url
  let parseUrl = url.parse(req.url, true);
  // path request by the visitor
  let path = parseUrl.pathname;
  // Trim the path and remove slashes
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // Get the query string as an object
  let queryStringObject = parseUrl.query;

  const chooseHandler = typeof(server.routes[trimmedPath]) !== 'undefined' ? server.routes[trimmedPath]: server.routes.notfound;

  chooseHandler('hello', (status, payload) => {
    let payloadString = JSON.stringify(payload);
    res.end(payloadString);
  });
});

server.init = () => {
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server listening of PORT 5000`);
  });
};

server.routes = {
  'ping': handlers.ping,
  'notfound': handlers.notfound
}

module.exports = server;