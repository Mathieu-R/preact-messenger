module.exports = {
    entry: './front/js/components/app.js',
    devtool: process.env.NODE_ENV === "production" ? 'eval-source-map' : 'source-map'
}