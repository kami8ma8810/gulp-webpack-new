const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const {
	ProvidePlugin
} = require('webpack');

module.exports = {
	//開発（ソースマップ有効）
	// mode: 'development',
	//本番公開
	mode: 'production',
	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名 resolveは絶対パス
		path: path.resolve(__dirname, 'dist'),
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
	entry: './src/js/index.js',

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
			template: './src/index.html',
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
		new ProvidePlugin({
			'jQuery': 'jquery',
			$: 'jquery'
			// ローカルにある場合は絶対パスpath.~で指定
		})
	],
	optimization: {
		minimizer: [
			new terserPlugin()
		],
		// 共通パーツを分離
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			cacheGroups: {
				defaultVendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: false,
			},
		}
	},

	// ローカルサーバー
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
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