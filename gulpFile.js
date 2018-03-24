'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var include = require("gulp-include");

var themeRoot = './themes/jwmagic/';
var webAssets = "./web-assets/";
var paths = {
  vendorIncludes: 'vendor-includes.json',
  js: {
    src: 'js/',
    dist: themeRoot + 'js/'
  },
  styles: {
    src: webAssets + 'scss/',
    dist: themeRoot + 'css-compiled/',
    bootstrap: 'jw-bootstrap.scss',
    entry: 'main.scss'
  }
};


var vendorIncludes = require(webAssets + paths.vendorIncludes);

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('bootstrap', function () {
  console.log(paths.styles.src + paths.styles.bootstrap);
  gulp.src(paths.styles.src + paths.styles.bootstrap)
    .pipe(sass({includePaths: ['node_modules/bootstrap/scss/']}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dist));
});


gulp.task('build-sass', function () {

  console.log(paths.styles.src + paths.styles.entry);
  gulp.src(paths.styles.src + paths.styles.entry)
    .pipe(sourcemaps.init()).pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dist));
});

gulp.task("js", function() {
  console.log("-- gulp is running task 'scripts'");
 
  gulp.src(webAssets + paths.js.src + 'project-samples.js')
    .pipe(include({

      includePaths: [
        __dirname + "/node_modules"       
      ]
    }))
      .on('error', console.log)
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task("vendorIncludes", function() {
  console.log(vendorIncludes);
  gulp.src(vendorIncludes.css, {cwd: 'node_modules'})
    .pipe(gulp.dest(paths.styles.dist));
});
 

gulp.task('watch', function(done) {
  gulp.watch(paths.styles.src + '**/*.scss', ['build-sass', 'js']);
  gulp.watch(webAssets + paths.js.src + '**/*.js', ['js'])
});


gulp.task('build', function() {
  runSequence('vendorIncludes', 'build-sass', 'bootstrap', 'js');
});

gulp.task('build-prod', ['set-prod-node-env'], function() {
  // maybe here manipulate config object  
  console.log(process.env);
});
gulp.task('default', function() {
  runSequence('build-sass', 'js', 'watch');
});