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

//   console.log('Path', trimmedPath);
//   console.log('query', queryStringObject);
//   console.log('headers', headers);
//   console.log('path', path);

  let data = {
    headers,
    trimmedPath,
    queryStringObject,
    method,
    path
  };

  const chooseHandler = typeof(server.routes[trimmedPath]) !== 'undefined' ? server.routes[trimmedPath]: server.routes.notfound;

  chooseHandler(data, (statusCode, payload) => {
    // Check for status code if not defined return 200
    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

    // use the payload called back or default to empty
    payload = typeof(payload) == 'object' ? payload : {};
    let payloadString = JSON.stringify(payload);
    
    // Return the response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
  });
});

server.init = () => {
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server listening of PORT ${config.httpPort}`);
  });
};

server.routes = {
  'ping': handlers.ping,
  'notfound': handlers.notfound
}

module.exports = server;