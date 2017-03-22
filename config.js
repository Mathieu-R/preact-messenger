const path = require('path');
const production = process.env.NODE_ENV === "production";

module.exports = {
    port: {
        front: 3000,
        back: 8080
    },
    contentBase: path.resolve(__dirname, 'front'),
    entry: {
        front: path.resolve(__dirname, 'front/static/js/components/app.js'),
        back: path.resolve(__dirname, 'back/server.js')
    },
    vendor: ['preact'],
    devtool: production ? 'source-map' : 'eval-source-map',
    componentsPath: path.resolve(__dirname, 'front/static/js/components'),
    staticPath: path.resolve(__dirname, 'front/static')
}
