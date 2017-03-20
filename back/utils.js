const fs = require('fs');

/* Promisify readFile */
const readFile = file => {
  return fs.readFile(file, (err, data) => {
    new Promise((resolve, reject) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

module.exports = readFile;
