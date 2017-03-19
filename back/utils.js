const fs = require('fs');

/* Promisify readFile */
export.readFile = file => {
    return fs.readFile(file, (err, data) => {
        new Promise(resolve, reject) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        }
    })
}
