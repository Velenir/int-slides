import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import del from 'del';
import browserSync, {reload, stream} from 'browser-sync';

import postcss from 'gulp-postcss';
import postcssNested from 'postcss-nested';
import postcssVars from 'postcss-simple-vars';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssReporter from 'postcss-reporter';

import pug from 'gulp-pug';

const src = {
	styles: 'src/styles/*.css',
	views: 'src/pug/*.pug',
	mainView: 'src/pug/index.pug',
	scripts: 'src/js/*.js',
	images: 'src/images/*'
};

const dest = {
	base: 'dist',
	styles: 'dist/css',
	scripts: 'dist/js',
	images: 'dist/images'
};

export const clean = () => del([ dest.base ]);

const postcssPlugins = [
	stylelint({
		configFile: '.stylelintrc',
		ignoreFiles: 'node_modules/**/*.css'
	}),
	postcssVars,
	postcssNested,
	autoprefixer,
	cssnano,
	postcssReporter
];

export const styles = () => {
	return gulp.src(src.styles)
	.pipe(sourcemaps.init())
	.pipe(postcss(postcssPlugins))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(dest.styles))
	.pipe(stream({once: true}));
};

const preScript = () => {
	return gulp.src(src.scripts, { sourcemaps: true })
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(concat('bundle.js'));
};

const postScript = () => {
	const first = sourcemaps.write('../maps');
	first.pipe(gulp.dest(dest.scripts))
	.pipe(stream({once: true}));
	
	return first;
};

export const scripts = () => {
	return preScript().pipe(postScript());
};

export const scriptsPub = () => {
	return preScript()
	.pipe(uglify(
		{compress: {drop_console: true}}
	)).pipe(postScript());
};

export const views = () => {
	const locals = {title: 'Slides'};
	return gulp.src(src.mainView)
	.pipe(pug({locals}))
	.pipe(gulp.dest(dest.base))
	.pipe(stream({once: true}));
};

export const images = () => {
	return gulp.src(src.images)
	.pipe(gulp.dest(dest.images));
};

export const sync = () => {
	browserSync({
		server: {baseDir: dest.base}
	});
	
	watch();
};

export const watch = () => {
	gulp.watch(src.scripts, scripts);
	gulp.watch(src.styles, styles);
	gulp.watch(src.views, views);
	gulp.watch(src.images, reload);
};

const always = gulp.parallel(styles, views, images);
export const build = gulp.series(clean, gulp.parallel(scriptsPub, always));
export const serve = gulp.series(clean, gulp.parallel(scripts, always), sync);

export default serve;