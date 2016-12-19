const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const ghpages = require('gulp-gh-pages');

const gulpLoadPlugings = require('gulp-load-plugins');
const $ = gulpLoadPlugings();


const del = require('del');
const pump = require('pump');

const browserSync = require('browser-sync').create();

const port = process.env.SERVER_PORT || 3000;



const paths = {
	source: {
		all: 'src/**/*',
		templates: ['src/*.html'],
		styles: ['src/styles/**/*.scss'],
		scripts: ['src/js/**/*.js'],
		images: ['src/img/*.+(png|jpg|gif|svg)'],
		cname: ['*CNAME']
	},	
	target: {
		all: 'dist/**/*',
		templates: 'dist',
		styles: 'dist/styles',
		scripts: 'dist/js',
		images: 'dist/img/'
	}
}

// Html
gulp.task('html', () => {
	console.log('Running the html task');
	return gulp.src(paths.source.templates)
		.pipe(gulp.dest(paths.target.templates))
		.pipe(browserSync.reload({stream:true}))
})


// Js
const uglifyOptions = {
	comments: true,
	compress: false
}

gulp.task('js', (cb) => {
	console.log('Running the js task');
	pump([
		gulp.src(paths.source.scripts),
		$.sourcemaps.init(),
		$.babel(),
		$.uglify(uglifyOptions),
		$.sourcemaps.write('./map'),
		gulp.dest(paths.target.scripts),
		browserSync.reload({stream:true})
	], cb)
})


// Img
gulp.task('img', () => {
	console.log('Running the img task');
	return gulp.src(paths.source.images)
		.pipe($.cache($.imagemin()))
		.pipe(gulp.dest(paths.target.images))
		.pipe(browserSync.reload({stream:true}))
})


// Sass
const sassOptions =  {
	outputStyle: 'expanded'
}

gulp.task('sass', () => {
	console.log('Running the sass task');
	return gulp.src(paths.source.styles)
		.pipe($.sourcemaps.init())
		.pipe($.sass(sassOptions).on('error', $.sass.logError))
		.pipe($.sourcemaps.write('./map'))
		.pipe(gulp.dest('src/styles/css'))
		.pipe(browserSync.reload({stream:true}))
})


// Build:Sass
gulp.task('sass:build', ['sass'], () => {
	console.log('Running the sass:build task');
	return gulp.src('src/styles/**/*.css')
	.pipe(gulp.dest(paths.target.styles))
})


// CNAME
gulp.task('cname', (cb) => {
	console.log('Running the cname task');
	return gulp.src(paths.source.cname)
		.pipe(gulp.dest(paths.target.templates))
})


// Clean:Dist
gulp.task('clean:dist', () => {
	console.log('Running the clean:dist task');
	del(paths.target.all)
})

// Clean:Cache
gulp.task('cache:clear', (cb) => {
	console.log('Running the cache:clear task');
	return cache.clearAll(cb);
})



// Watch
gulp.task('watch', ['sass', 'js', 'img'], () => {
	console.log('Running the watch task');
		browserSync.init({
			server: 'src'
		})
		gulp.watch(paths.source.styles, ['sass']).on('change', (e) => {
			console.log(`File ${e.path} was ${e.type}, running task...`)
		})
		gulp.watch(paths.source.templates).on('change', (e) => {
			console.log(`File ${e.path} was ${e.type}, running task...`)
		})
		gulp.watch(paths.source.scripts, ['js']).on('change', (e) => {
			console.log(`File ${e.path} was ${e.type}, running task...`)
		})
		gulp.watch(paths.source.images, ['img']).on('change', (e) => {
			console.log(`File ${e.path} was ${e.type}, running task...`)
		})
})


// Build 
gulp.task('build', ['html', 'sass', 'sass:build', 'js', 'img', 'cname'], () => {
	console.log('Running the build task')
})

// Deploy
gulp.task('deploy', ['build'], () => {
	return gulp.src(paths.target.all)
		.pipe(ghpages())
})

// Default
gulp.task('default', ['watch'], () => {
	console.log('Running the default task');
})
