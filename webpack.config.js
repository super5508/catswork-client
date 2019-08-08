const path = require('path')
const webpack = require('webpack')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const config = {
	context: path.resolve('./src'),
	entry: { app: '.' },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				use: [
					{ loader: MiniCSSExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: { modules: true }
					},
					'less-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: MiniCSSExtractPlugin.loader },
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 8192 }
					}
				]
			}
		]
	},
	output: {
		filename: '[name].js',	// [name] resolves to name of bundle (e.g., app)
		publicPath: '/public/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new MiniCSSExtractPlugin({ filename: '[name].css' })
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	target: 'web'
}

module.exports = config
