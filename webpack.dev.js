const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';

module.exports = () => webpackMerge(commonConf({
	outputFile
}), {
	mode: 'development',
	devtool: 'source-map',
	plugins: [
		//scriptをbody内に動的に導入
		new htmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body'
		})
	]
});