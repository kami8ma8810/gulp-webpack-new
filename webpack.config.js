const path = require('path');

module.exports = {
	//開発（ソースマップ有効）
	// mode: 'development',
	//本番公開
	mode: 'production',

	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './_static/src/js/index.js',

	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						// プリセット指定でES2020をES5に変換
						'@babel/preset-env',
					],
				},
			}, ],
		}, ],
	},
	// ES5（IE11など）向けの指定
	target: ['web', 'es5'],

	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名 resolveは絶対パス
		path: path.resolve(__dirname, '_static', 'dist'),
		// 出力ファイル名
		filename: 'bundle.js'
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

};