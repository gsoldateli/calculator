var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var config = {
	dist: 'dist/',
	imgIn: 'images/**/*.{jpg,jpeg,png,gif}',
	jsIn: 'script.js',
	cssIn: './styles.css',
	cssOut: 'dist/css/',
	cssOutName: 'style.min.css',
	jsOut: 'dist/js/',
	jsOutName: 'script.min.js',
	imgOut: 'dist/images/'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['css'], function() {
  browserSync({
    server: './',
    open:false
  });

  gulp.watch(['index.html', config.jsIn], ['reload']);
  gulp.watch(config.jsIn, ['js']);
  gulp.watch(config.cssIn, ['css']);
});

gulp.task('css', function() {
  return gulp.src(config.cssIn)
  	.pipe(sourcemaps.init())
  	.pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(concat(config.cssOutName))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssOut));
});

gulp.task('js', function() {
  return gulp.src(config.jsIn)
  	.pipe(sourcemaps.init())
    .pipe(concat(config.jsOutName))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.jsOut));
});

gulp.task('img', function() {
  return gulp.src(config.imgIn)
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgOut));
});

gulp.task('build',['css','js','img']);