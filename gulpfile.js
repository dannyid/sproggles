/** 
npm install --save-dev gulp browserify babelify del vinyl-source-stream gulp-stylus gulp-autoprefixer gulp-minify-css gulp-concat gulp-uncss browser-sync
**/

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var source = require('vinyl-source-stream');
//var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
//var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/********************
******* PATHS *******
********************/

var paths = {
  src: {
    css: ['./src/css/libs/*.css', 'src/css/**/*.css'],
    js: ['./src/js/**/*.js'],
    img: ['./src/img/**/*'],
    popup: ['./src/js/popup.js'],
    contentScript: ['./src/js/contentScript.js'],
    html: ['./src/*.html'],
    manifest: ['./src/manifest.json']

  },
  dest: {
    dist: './dist',
    css: './dist/css',
    js: './dist/js',
    img: './dist/img'
  }
};

/********************
****** /PATHS *******
********************/

/********************
******** CSS ********
********************/

gulp.task('clean:css', function(done) {
  del(['./dist/css/**/*.css'], done);
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.src.css)
    //.pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    //.pipe(uncss({
    //  html: ['./dist/index.html'] // why this not work?
    //}))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});

/********************
******** /CSS *******
********************/

/********************
******** JS *********
********************/

gulp.task('clean:js', function(done) {
  del(['./dist/js/**/*.js'], done);
});

gulp.task('js:popup', ['clean:js'], function() {
  return browserify({
    entries: paths.src.popup,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('popup.js'))
  .pipe(gulp.dest(paths.dest.js))
  .on('end', reload);
});

gulp.task('js:contentScript', ['clean:js'], function() {
  return browserify({
    entries: paths.src.contentScript,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('contentScript.js'))
  .pipe(gulp.dest(paths.dest.js))
  .on('end', reload);
});

gulp.task('js', ['js:popup','js:contentScript'])

/********************
******** /JS ********
********************/

/********************
******* HTML ********
********************/

gulp.task('clean:html', function(done) {
  del(['./dist/*.html'], done);
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src(paths.src.html)
  .pipe(gulp.dest(paths.dest.dist))
  .on('end', reload);
});

/********************
******* /HTML *******
********************/

/********************
****** IMAGES *******
********************/

gulp.task('clean:img', function(done) {
  del(['./dist/img/**/*'], done);
});

gulp.task('img', ['clean:img'], function() {
  return gulp.src(paths.src.img)
  .pipe(gulp.dest(paths.dest.img))
  .on('end', reload);
});

/********************
***** /IMAGES *******
********************/

/********************
***** MANIFEST ******
********************/

gulp.task('clean:manifest', function(done) {
  del(['./dist/manifest.json'], done);
});

gulp.task('manifest', ['clean:manifest'], function() {
  return gulp.src(paths.src.manifest)
  .pipe(gulp.dest(paths.dest.dist))
  .on('end', reload);
});

/********************
***** /MANIFEST *****
********************/

/********************
******* SERVE *******
********************/

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(paths.src.css, ['css']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.manifest, ['manifest']);
});

/********************
****** /SERVE *******
********************/

/********************
******* BUILD *******
********************/

gulp.task('build', ['html', 'js', 'css', 'img', 'manifest']);

/********************
****** /BUILD *******
********************/

gulp.task('default', ['build']);
