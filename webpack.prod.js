const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name].[chunkhash]';

module.exports = () => webpackMerge(commonConf({
	outputFile
}), {
	mode: 'production',
	plugins: [
		//scriptをbody内に動的に導入
		new htmlWebpackPlugin({
			template: './_static/src/index.html',
			inject: 'body'
		})
	]
});