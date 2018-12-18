/**
 * File For All Config
 * reated On Dec 18 2018
 * By Rapahel Osaze Eyerin
 */

const environments = {};

environments.staging = {
  httpPort: 5000
};

environments.production = {
  httpsPort: 5001
};

// Determine which environment was passed via command line
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environment above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;