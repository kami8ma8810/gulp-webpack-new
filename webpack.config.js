const path = require('path');

module.exports = {
	//開発（ソースマップ有効）
	// mode: 'development',
	//本番公開
	mode: 'production',
	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名 resolveは絶対パス
		path: path.resolve(__dirname, '_static', 'dist'),
		// 出力ファイル名
		filename: 'bundle.js'
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

	// ローカルサーバー
	devServer: {
		contentBase: path.resolve(__dirname, '_static', 'dist'),
		index: 'index.html',
		//openは自動で立ち上げる
		open: true,
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