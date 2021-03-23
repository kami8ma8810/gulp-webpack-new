const gulp = require('gulp');

// html
const htmlMin = require('gulp-htmlmin');

//Sass
const sass = require('gulp-dart-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create(); //create推奨
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssDeclSort = require('css-declaration-sorter');
const gcmq = require('gulp-group-css-media-queries');

// gulpアクティブフォルダ
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
				errorHandler: notify.onError('Error: <%= error.message %>'),
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

// Sassコンパイル
const sassCompile = () => {
	return gulp.src(srcPath.styles, {
			sourcemaps: true
		})
		.pipe(
			//エラーが出ても処理を止めない
			plumber({
				errorHandler: notify.onError('Error:<%= error.message %>')
			}))
		.pipe(sass({
			//指定できるキー expanded compressed
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(
			postCss([
				//対象ブラウザはpackage.jsonに記述
				autoprefixer({
					cascade: false,
					grid: 'autoplace', // IE11のgrid対応('-ms-')
				}),
				//CSSのソート
				cssDeclSort({
					order: 'smacss',
				}),
			])
		)
		.pipe(gcmq()) //メディアクエリをまとめる
		.pipe(gulp.dest(distPath.styles, {
			sourcemaps: './'
		}))
		.pipe(browserSync.stream())
		.pipe(notify({
			message: 'Sass Compile Completed!',
			onLast: true
		}))
}

// ローカルサーバー起動
const browserSyncFunc = (done) => {
	browserSync.init({
		notify: false, //接続通知非表示
		server: {
			baseDir: distBase,
			index: 'index.html'
		}
	});
	done();
}

// ブラウザリロード
const browserSyncReload = (done) => {
	browserSync.reload();
	done();
}

// ファイル監視・リロード
const watchFiles = () => {
	gulp.watch(srcPath.styles, gulp.series(sassCompile))
	gulp.watch(srcPath.html, gulp.series(htmlFormat, browserSyncReload))
}

// npx gulp コマンド処理
exports.default = gulp.series(
	gulp.parallel(htmlFormat, sassCompile),
	gulp.parallel(watchFiles, browserSyncFunc)
);