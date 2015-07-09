/** 
npm install --save-dev gulp browserify babelify del vinyl-source-stream gulp-minify-css gulp-concat
**/

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

/********************
******* PATHS *******
********************/

var paths = {
  src: {
    css: [
      './src/css/libs/*.css', 
      './src/css/**/*.css'
    ],
    js: [
      './src/js/**/*.js'
    ],
    img: [
      './src/img/**/*'
    ],
    popup: [
      './src/js/popup.js'
    ],
    contentScript: [
      './src/js/contentScript.js'
    ],
    html: [
      './src/*.html'
    ],
    manifest: [
      './src/manifest.json'
    ]
  },
  dest: {
    dist: './dist',
    css: './dist/css',
    js: './dist/js',
    img: './dist/img'
  }
};


/********************
******** CSS ********
********************/

gulp.task('clean:css', function(done) {
  del(['./dist/css/**/*.css'], done);
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.src.css)
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.dest.css));
});


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
  .pipe(gulp.dest(paths.dest.js));
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
  .pipe(gulp.dest(paths.dest.js));
});

gulp.task('js', ['js:popup','js:contentScript']);


/********************
******* HTML ********
********************/

gulp.task('clean:html', function(done) {
  del(['./dist/*.html'], done);
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src(paths.src.html)
  .pipe(gulp.dest(paths.dest.dist));
});


/********************
****** IMAGES *******
********************/

gulp.task('clean:img', function(done) {
  del(['./dist/img/**/*'], done);
});

gulp.task('img', ['clean:img'], function() {
  return gulp.src(paths.src.img)
  .pipe(gulp.dest(paths.dest.img));
});


/********************
***** MANIFEST ******
********************/

gulp.task('clean:manifest', function(done) {
  del(['./dist/manifest.json'], done);
});

gulp.task('manifest', ['clean:manifest'], function() {
  return gulp.src(paths.src.manifest)
  .pipe(gulp.dest(paths.dest.dist));
});


/********************
******* SERVE *******
********************/

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.src.css, ['css']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.manifest, ['manifest']);
});


/********************
******* BUILD *******
********************/

gulp.task('build', ['html', 'js', 'css', 'img', 'manifest']);

gulp.task('default', ['build']);
