/**
 * Request Handling File 
 */

const _data = require('./data');
const _helpers = require('./helpers');

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
  
  let userEmail = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  let userName = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
  let userAddress = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  let userPass = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Create User 
  if(userName && userEmail && userAddress && userPass) {
    _data.read('users', userEmail, (err) => {
      if(err) {
        let hashedPassword = _helpers.hashPassword(userPass);
        if(hashedPassword) {

          let userObject = {
            userName,
            userEmail,
            userAddress,
            userPass: hashedPassword
          };

          _data.create('users', userEmail, userObject, (err) => {
            if(err) {
              console.log('Error', err);
              callback(403, {'Error': 'Could not create user'})
            } else {
              callback(200);
            }
          });
        } else {
          callback(405, {'Error': 'Password could not be hashed'});
        }
      } else {
        callback(405, {'Error': 'User already exists'});
      }
    });
  } else {
    callback(405, {'Error': 'Please supply a valid data'});
  }
}

handlers._users.get = (data, callback) => {

}

handlers._users.put = (data, callback) => {

}

handlers._users.delete = (data, callback) => {
  
}

module.exports = handlers;
