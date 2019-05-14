const path = require('path')

const config = require('./webpack.config')

const devConfig = Object.assign({}, config, {
	devTool: 'eval',
	mode: 'development',
	output: Object.assign({}, config.output, {
		path: path.resolve('./prod/public')
	})
})

module.exports = devConfig
