/**
 * Request Handling File 
 */

const handlers = {};

handlers.notfound = (data, callback) => {
  callback(404, {error:  'Page Not Found'});
};

handlers.ping = (data, callback) => {
  callback(200, {success:  'Ping Hello!'});
};

// receieve request on users route here and pass to _users 
handlers.users = (data, callback) => {
  let acceptedMethods = ['put', 'post', 'get', 'delete'];
  if(acceptedMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(404);
  }
};

// Users 
handlers._users = {};

handlers._users.post = (data, callback) => {

}

handlers._users.get = (data, callback) => {

}

handlers._users.put = (data, callback) => {

}

handlers._users.delete = (data, callback) => {
  
}

module.exports = handlers;
