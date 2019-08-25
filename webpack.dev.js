const path = require('path')
const merge = require('webpack-merge')
const webpack = require("webpack");
const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
	plugins: [
			new webpack.DefinePlugin({
					'process.env': {
							'NODE_ENV': JSON.stringify('development')
					}
			})
	]
})

