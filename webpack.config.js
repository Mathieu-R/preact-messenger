const config = require('./config.js');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: config.entry,
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: config.devtool,
  module: {
    rules: [{
      test: /\.hbs$/, 
      loader: "handlebars-loader"
    },{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader", options: {
            sourceMaps: true
          }
        },{
          loader: "sass-loader", options: {
            sourceMaps: true
          }
        }],
        // style-loader in developpment
        fallback: 'style-loader'
      })  
    },{ 
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        exclude: /node_modules/ 
      }]
    },{ 
      test: /\.jsx$/, 
      use: [{
        loader: 'babel-loader',
        exclude: /node_modules/ 
      }]
    }]
  },
  plugins: [
    extractSass
  ]
};