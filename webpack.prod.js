const path = require('path')
const merge = require('webpack-merge')
const webpack = require("webpack");
const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
	plugins: [
			new webpack.DefinePlugin({
					'process.env': {
							'NODE_ENV': JSON.stringify('production')
					}
			})
	],
	output: Object.assign({}, baseConfig.output, {
				path: path.resolve('./public')
			})
});




// const prodConfig = Object.assign({}, config, {
// 	mode: 'production',
// 	output: Object.assign({}, config.output, {
// 		path: path.resolve('./public')
// 	})
// })
