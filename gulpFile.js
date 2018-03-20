'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');


var themeRoot = './themes/jwmagic/';
var paths = {
  styles: {
    src: 'scss/',
    dist: 'css-compiled/',
    entry: 'main.scss'
  }
};

gulp.task('build-sass', function () {
  gulp.src(themeRoot + paths.styles.src + '*.scss')
    .pipe(sassGlob())
    .pipe(sass({includePaths: ['node_modules/bootstrap/scss/']}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(themeRoot + paths.styles.dist))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(themeRoot + paths.styles.dist))
});

gulp.task('watch', function(done) {
  gulp.watch(themeRoot + paths.styles.src + '**/*.scss', ['build-sass']);
});


gulp.task('build', function() {
  runSequence('build-sass');
});

gulp.task('default', function() {
  runSequence('build-sass', 'watch');
});