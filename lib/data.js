/**
 * Data File for saving data to file db
 * Created By Raphael Osaze Eyerin
 * On 18 Dec 2018
 */

const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

let lib = {};

// Base directory to data folder
lib.baseDir = path.join(__dirname, '/../data/');

lib.create = (dir, file, content, callback) => {
  // Open file
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, descriptor) => {
    if(!err & descriptor) {
      // Stringify contents to json format
      let stringifyContent = JSON.stringify(content);
      // write to file
      fs.writeFile(descriptor, stringifyContent, (err) => {
        if(!err) {
          // close open file
          fs.close(descriptor, (err) => {
            if(!err) {
              callback(false)
            } else {
              callback('Error closing file')
            }
          });
        } else {
          callback('Error Could not write to file may be file already exists')
        }
      });
    } else {
      callback('Error opening file');
    }
  });
};

// Function for reading files and returning them as javascript objects
lib.read = (dir, file, callback) => {
  let fileName = file+'.json';
  fs.readFile(`${lib.baseDir}${dir}/${fileName}`, 'utf8', (err, data) => {
    if(!err & data) {
      callback(false, helpers.parseJsonToObject(data))
    } else {
      callback('Error reading file');
    }
  });
}

// Function for updating files
lib.update = (dir, file, newContent, callback) => {
  fs.open(`${lib.baseDir$}${dir}/${file}.json`, 'r+', (err, descriptor) => {
    if(!err & descriptor) {
      fs.truncate(descriptor, (err) => {
        if(!err) {
          let jsonData = JSON.stringify(newContent);
          fs.writeFile(descriptor, jsonData, (err) => {
            if(!err) {
              fs.close(descriptor, (err) => {
                if(!err) {
                  callback(false);  
                } else {
                  callback('Error closing file');  
                }
              })
            } else {
              callback('Error writing to file');
            }
          });
        } else {
          console.log('Error truncating file');
          callback('Error truncating file'); 
        }  
      })
    } else {
      console.log('Error opening file');
      callback('Error opening file')
    }
  });
}

// Function for deleting files
lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir}${dir}/${file}`, (err) => {
    if(!err) {
      callback(false)
    } else {
      callback('Error occured while unlinking file');
    }
  });
}

module.exports = lib;