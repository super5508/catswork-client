const path = require('path')

const config = require('./webpack.config')

const devConfig = Object.assign({}, config, {
	devtool: 'eval',
	mode: 'development',
	output: Object.assign({}, config.output, {
		path: path.resolve('./build/public')
	})
})

module.exports = devConfig
