const { join } = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const setup = require('./setup');
const path = require('path')

const dist = join(__dirname, '../dist');
const exclude = /(node_modules|bower_components)/;

module.exports = env => {
	const isProd = env && env.production;

	return {
		entry: {
			app: './front/static/js/app.js',
			vendor: [
				// pull these to a `vendor.js` file
				'preact'
			]
		},
		output: {
			path: dist,
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
      extensions: ['.html', '.hbs', '.js', '.jsx', '.css', '.scss', '.vue', '.json', '.jpg', '.png', '.svg'],
			alias: {
				// you may need `preact-compat` instead!
				'react': 'preact/aliases',
	 			'react-dom': 'preact/aliases',
         'src': path.resolve(__dirname, '../front/static')
			}
		},
		module: {
			rules: [{
				test: /\.js?$/,
				exclude: exclude,
				loader: 'babel-loader'
			}, {
				test: /\.(sass|scss)$/,
				loader: isProd ? ExtractText.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!postcss-loader!sass-loader'
				}) : 'style-loader!css-loader!postcss-loader!sass-loader'
			},{
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff2?|eot|ttf)$/,
        loader: "file-loader",
        query: {
          limit: 10000,
          name: '[name]-[hash:7].[ext]'
      }
    }]
		},
		plugins: setup(isProd),
		devtool: isProd ? 'eval' : 'eval-source-map',
		devServer: {
      proxy: {
        '*' : 'http://localhost:8080'
      },
			contentBase: dist,
			port: process.env.PORT || 3000,
			historyApiFallback: true,
			compress: isProd,
			inline: !isProd,
			hot: !isProd
		}
	};
};
