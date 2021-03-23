const gulp = require('gulp');

// html
const htmlMin = require('gulp-htmlmin');

//scss
const sass = require('gulp-dart-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

// アクティブフォルダ
const srcBase = './_static/src';
const distBase = './_static/dist';
// 入力パス
const srcPath = {
	'html': srcBase + '/**/*.html',
	'styles': srcBase + '/scss/**/*.scss'
};
// 出力パス
const distPath = {
	'html': distBase + '/',
	'styles': distBase + '/css/'
};

// htmlフォーマット
const htmlFormat = () => {
	return gulp.src(srcPath.html)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(
			htmlMin({
				removeComments: true, //コメントを削除
				collapseWhitespace: true, //余白を詰める
				preserveLineBreaks: true, //タグ間の改行を詰める
			})
		)
		.pipe(gulp.dest(distPath.html))
}

// scssコンパイル
const scssCompile = () => {
	return gulp.src(srcPath.styles, {
			sourcemaps: true
		})
		.pipe(
			//エラーが出ても処理を止めない
			plumber({
				errorHandler: notify.onError('Error:<%= error.message %>')
			}))
		.pipe(sass({
			outputStyle: 'expanded'
		})) //指定できるキー expanded compressed
		.pipe(gulp.dest(distPath.styles, {
			sourcemaps: './'
		})) //コンパイル先
		.pipe(browserSync.stream())
		.pipe(notify({
			message: 'Sassをコンパイルしました！',
			onLast: true
		}))
}

// ローカルサーバー起動
const browserSyncFunc = () => {
	browserSync.init({
		notify: false, //接続通知非表示
		server: './_static/dist/'
	});
}

// ブラウザリロード
const browserSyncReload = (done) => {
	browserSync.reload();
	done();
}

// ファイル監視・リロード
const watchFiles = () => {
	gulp.watch(srcPath.styles, gulp.series(scssCompile))
	gulp.watch(srcPath.html, gulp.series(htmlFormat, browserSyncReload))
}

// npx gulp コマンド処理
exports.default = gulp.series(
	gulp.parallel(htmlFormat, scssCompile),
	gulp.parallel(watchFiles, browserSyncFunc)
);