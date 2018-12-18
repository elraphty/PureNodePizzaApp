/**
 * Helpers file
 */
const crypto = require('crypto');
const config = require('./config');

let helpers = {};

helpers.parseJsonToObject = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch(e) {
    return {};
  }
};

helpers.generateToken = (strLength) => {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength) {
    randomString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let token = '';
    for(i = 0; i < strLength; i++) {
      let randString = randomString.charAt(Math.floor(Math.random() * randomString.length));
      token += randString;
    }
    return token;
  }
}

helpers.hashPassword = (pass) => {
  let hash = crypto.createHmac('sha2576', config.secretKey)
    .update(pass).digest('hex');

  return hash;
}

module.exports = helpers;