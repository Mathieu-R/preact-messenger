const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');
const production = process.env.NODE_ENV === "production";
const StartServerPlugin = require('start-server-webpack-plugin')
const ExternalsPlugin = require('webpack2-externals-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const plugins = [
  extractSass,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js',
    minChunks: 2,
  })
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
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() // print more readable module names in console on HMR
  );
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
  plugins: plugins,
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
      ...plugins,
      new ExternalsPlugin({
        type: 'commonjs',
        include: __dirname + '/node_modules'
      }),
      new StartServerPlugin('server.bundle.js') // only in developpment
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
    },{
      test: /\.(ico|png|jpg|jpeg|gif|svg|woff2?|eot|ttf)$/,
      loader: "file-loader",
      query: {
        limit: 10000,
        name: '[name]-[hash:7].[ext]'
      }
    },{
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        limit: 10000,
      }
    }]
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
