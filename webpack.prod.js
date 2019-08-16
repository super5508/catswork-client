const path = require('path')

const config = require('./webpack.config')

const prodConfig = Object.assign({}, config, {
	mode: 'production',
	output: Object.assign({}, config.output, {
		path: path.resolve('./public')
	})
})

module.exports = prodConfig
