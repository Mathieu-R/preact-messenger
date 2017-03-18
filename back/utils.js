const fs = require('fs');

/* Promisify readFile */
function readFile(file) {
    fs.readFile(file, (err, data) => {
        new Promise(resolve, reject) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        }
    })
}
