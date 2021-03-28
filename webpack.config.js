const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const {
	ProvidePlugin
} = require('webpack');

module.exports = {
	//開発（ソースマップ有効）
	mode: 'development',
	//本番公開
	// mode: 'production',
	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名 resolveは絶対パス
		path: path.resolve(__dirname, '_static', 'dist'),
		// 出力ファイル名
		filename: '[name].[chunkhash].js'
		// filename: '[name].[chunkhash].js' // for production
	},
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [__filename]
		}
	},
	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './_static/src/js/index.js',

	module: {
		rules: [
			// babel
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				}],
			},
			// ESLint
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'eslint-loader',
					options: {
						fix: true
					}
				}],

			},
		],
	},
	plugins: [
		//scriptをbody内に動的に導入
		new htmlWebpackPlugin({
			template: './_static/src/index.html',
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new webpack.ProvidePlugin({
			'jQuery': 'jquery',
			$: 'jquery'
		})
	],
	optimization: {
		minimizer: [
			new terserPlugin()
		]
	},

	// ローカルサーバー
	devServer: {
		contentBase: path.resolve(__dirname, '_static', 'dist'),
		index: 'index.html',
		//openは自動で立ち上げる
		open: true,
		// node_modulesの変更は無視
		watchOptions: {
			ignored: /node_modules/,
		},
		//コンパイラエラーまたは警告がある場合にブラウザに全画面オーバーレイを表示
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	performance: {
		maxEntrypointSize: 500000,
		maxAssetSize: 500000,
	},
};