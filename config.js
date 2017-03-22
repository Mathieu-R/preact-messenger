const path = require('path');
const production = process.env.NODE_ENV === "production";

module.exports = {
    title: 'preact - messenger', // <title> of index.html
    port: {
        front: 3000, // port for devServer
        back: 8080 // port for backend api (proxytable)
    },
    contentBase: path.resolve(__dirname, 'front'),
    entry: {
        front: ['react-hot-loader/patch', 'webpack/hot/poll?1000', path.resolve(__dirname, 'front/static/js/components/app.js')], // entrypoint for front js file
        back: ['webpack/hot/poll?1000', path.resolve(__dirname, 'back/server.js')] // entrypoint for server js file
    },
    vendor: ['preact'],
    devtool: production ? 'source-map' : 'eval-source-map',
    componentsPath: path.resolve(__dirname, 'front/static/js/components'), // path for components (aliases)
    staticPath: path.resolve(__dirname, 'front/static'), // path for static files (aliases)
    template: './front/index.hbs' // path of template
}
