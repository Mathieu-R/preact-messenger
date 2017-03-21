const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');
const production = process.env.NODE_ENV === "production";
const ExternalsPlugin = require('webpack2-externals-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const plugins = [
  extractSass
];

if (production) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluates: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const front = {
  entry: {
    app: config.entry.front,
    vendor: config.vendor
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    proxy: {
      "*": `http://localhost:${config.port.back}`
    },
    contentBase: config.contentBase,
    historyApiFallback: true,
    port: config.port.front, 
    compress: production,
    inline: !production,
    hot: !production,
    stats: {
      assets: true,
      children: false,
      chunks: true,
      hash: true,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
};

const back = {
    entry: [config.entry.back],
    output: {
      path: path.resolve('dist'),
      filename: '[name].bundle.js'
    },
    target: 'node',
    plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: __dirname + '/node_modules'
    }),
  ]
};

const common = {
  devtool: config.devtool,
  resolve: {
    extensions: ['.html', '.hbs', '.js', '.jsx', '.css', '.scss', '.vue', '.json', '.jpg', '.png', '.svg'],
    alias: {
      components: config.componentsPath,
      src: config.staticPath
    }
  },
  module: {
    rules: [{
      test: /\.hbs$/, 
      loader: "handlebars-loader"
    },{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        // style-loader in developpment
        fallback: 'style-loader',
        use: [{
          loader: "css-loader", 
          options: {
            sourceMap: true
          }
        },{
          loader: "sass-loader", 
          options: {
            sourceMap: true
          }
        }]
      })  
    },{ 
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: plugins,
  performance: {
    maxAssetSize: 300,
    maxEntrypointSize: 300,
    hints: 'warning'
  },
  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },
};

module.exports = [
  Object.assign({} , common, front),
  Object.assign({} , common, back)
];