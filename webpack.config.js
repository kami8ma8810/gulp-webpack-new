const path = require('path');

module.exports = {
	mode: 'production', //'development' or 'production'
	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './_static/src/js/index.js',

	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名 resolveは絶対パス
		path: path.resolve(__dirname, '_static', 'dist'),
		// 出力ファイル名
		filename: 'bundle.js'
	}
};