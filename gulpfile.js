/**
npm install --save-dev gulp gulp-uglify browserify babelify vinyl-buffer del vinyl-source-stream gulp-minify-css gulp-concat
**/

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
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
    html: [
      './src/html/*.html'
    ],
    img: [
      './src/img/**/*'
    ],
    js: [
      './src/js/**/*.js'
    ],
    background: [
      './src/js/background.js'
    ],
    contentScript: [
      './src/js/contentScript.js'
    ],
    intro: [
      './src/js/intro.js'
    ],
    components: [
      './src/js/components/**/*.js'
    ],
    modules: [
      './src/js/modules/**/*.js'
    ],
    manifest: [
      './src/manifest.json'
    ]
  },
  dest: {
    dist: './dist',
    css: './dist/css',
    html: './dist/html',
    img: './dist/img',
    js: './dist/js',
    background: './dist/js/background.js',
    contentScript: './dist/js/contentScript.js',
    intro: './dist/js/intro.js'
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
******* HTML ********
********************/

gulp.task('clean:html', function(done) {
  del(['./dist/html/*.html'], done);
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src(paths.src.html)
  .pipe(gulp.dest(paths.dest.html));
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
******** JS *********
********************/

gulp.task('clean:js', function(done) {
  del(['./dist/js/**/*.js'], done);
});

gulp.task('clean:js:background', function(done) {
  del([paths.dest.background], done);
});

gulp.task('clean:js:contentScript', function(done) {
  del([paths.dest.contentScript], done);
});

gulp.task('clean:js:intro', function(done) {
  del(paths.dest.intro, done);
});

gulp.task('js', ['clean:js']);

gulp.task('js:background', ['clean:js:background'], function() {
  return browserify({
    entries: paths.src.background,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    optional: ["es7.objectRestSpread"]
  }))
  .bundle()
  .pipe(source('background.js'))
  // .pipe(buffer())
  // .pipe(uglify())
  .pipe(gulp.dest(paths.dest.js));
});

gulp.task('js:contentScript', ['clean:js:contentScript'], function() {
  return browserify({
    entries: paths.src.contentScript,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    optional: ["es7.objectRestSpread"]
  }))
  .bundle()
  .pipe(source('contentScript.js'))
  // .pipe(buffer())
  // .pipe(uglify())
  .pipe(gulp.dest(paths.dest.js));
});

gulp.task('js:intro', ['clean:js:intro'], function() {
  return browserify({
    entries: paths.src.intro,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    optional: ["es7.objectRestSpread"]
  }))
  .bundle()
  .pipe(source('intro.js'))
  // .pipe(buffer())
  // .pipe(uglify())
  .pipe(gulp.dest(paths.dest.js));
});

gulp.task('js:components', ['js:contentScript'], function() {});

gulp.task('js:modules', ['js:background', 'js:contentScript', 'js:intro'], function() {});


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
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch(paths.src.background, ['js:background']);
    gulp.watch(paths.src.contentScript, ['js:contentScript']);
    gulp.watch(paths.src.intro, ['js:intro']);
    gulp.watch(paths.src.components, ['js:components']);
    gulp.watch(paths.src.modules, ['js:modules']);
    gulp.watch(paths.src.manifest, ['manifest']);
});


/********************
******* BUILD *******
********************/

gulp.task('build', ['js:background', 'js:contentScript', 'js:intro', 'img', 'html', 'css', 'manifest']);

gulp.task('default', ['build']);
