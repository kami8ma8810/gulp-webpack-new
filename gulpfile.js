const gulp = require('gulp');

//scss
const sass = require('gulp-dart-sass');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");

// 入出力するフォルダを指定
const srcBase = './_static/src';
const distBase = './_static/dist';


const srcPath = {
	'scss': srcBase + '/scss/**/*.scss',
	'html': srcBase + '/**/*.html'
};

const distPath = {
	'css': distBase + '/css/',
	'html': distBase + '/'
};

/**
 * sass
 *
 */
const cssSass = () => {
	return gulp.src(srcPath.scss, {
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
		.pipe(gulp.dest(distPath.css, {
			sourcemaps: './'
		})) //コンパイル先
		.pipe(browserSync.stream())
		.pipe(notify({
			message: 'Sassをコンパイルしました！',
			onLast: true
		}))
}


/**
 * html
 */
const html = () => {
	return gulp.src(srcPath.html)
		.pipe(gulp.dest(distPath.html))
}

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
	browserSync.init(browserSyncOption);
}

const browserSyncOption = {
	server: "./_static/dist/"
}

/**
 * リロード
 */
const browserSyncReload = (done) => {
	browserSync.reload();
	done();
}

/**
 *
 * ファイル監視 ファイルの変更を検知したら、browserSyncReloadでreloadメソッドを呼び出す
 * series 順番に実行
 * watch('監視するファイル',処理)
 */
const watchFiles = () => {
	gulp.watch(srcPath.scss, gulp.series(cssSass))
	gulp.watch(srcPath.html, gulp.series(html, browserSyncReload))
}

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
exports.default = gulp.series(
	gulp.parallel(html, cssSass),
	gulp.parallel(watchFiles, browserSyncFunc)
);