/* ============================================================================
Build Task

/src -> source code
/build  -> where the bundled, concatenated, minified code will be piped to

Browserify
Client side packages are installed with npm & listed in package.json
The packages required by the browser are listed in main.js
bowserify creates bundled 


Ref.
https://blog.engineyard.com/2015/client-side-javascript-project-gulp-and-browserify
https://github.com/fluxusfrequency/car-finder
https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
https://www.npmjs.com/package/jshint-stylish
https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
============================================================================ */
'use strict';

var beep       = require('beepbeep');
var browserify = require('browserify');
//var browserify = require('gulp-browserify');//Repo. not worked on anymore
var concat     = require('gulp-concat');
var del        = require('del');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var karma      = require('karma').server;
var minifyCSS  = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var plumber    = require('gulp-plumber'); //pipe error will not break gulp
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var transform = require('vinyl-transform');
var uglify     = require('gulp-uglify');
var gutil      = require('gulp-util');


/* ============================================================================
Set base directories
source & destination (build) files
============================================================================ */
var BASES = {
    SRC: 'public/src/',
    BUILD: 'public/build/',
    ROOT: './',
    PUBLIC: 'public/'
};

/* ============================================================================
Define paths
============================================================================ */
var PATHS = {
    JS: ['js/**/*.js'],
    HTML: ['index-build.html'],
    CSS: [
        'css/**/*.css'
    ],
    LIBjs: [
        'lib/bootstrap/dist/js/bootstrap.min.js'
    ],
    LIBcss: [
        'lib/bootstrap/dist/css/bootstrap.min.css'
    ],
    LIBmap:[ 
        'lib/bootstrap/dist/css/bootstrap.css.map'
    ]
};  

/* ============================================================================ 
Error Handling Function
On error will beep 3 times & Log the error
============================================================================ */
var onError = function (err) {
    beep([0, 0, 0]);
    gutil.log(gutil.colors.green(err));
};


/* ============================================================================ 
 * clean task
 * Delete the dist directory 
============================================================================ */
gulp.task('clean', function() {
    del(BASES.BUILD);
});


/* ============================================================================
Linter
============================================================================ */
gulp.task('lint-client', function() {
    return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-test', function() {
    return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/* ============================================================================ 
 * html task
 * Copies HTML to /build
============================================================================ */
gulp.task('html', function() {
  gulp.src(PATHS.HTML, {cwd: BASES.PUBLIC}) //CWD - current working directory
  .pipe(gulp.dest(BASES.BUILD));
});


/* ============================================================================
 * css task
 * get the css files
 * concatenate them 
 * minify
 * save to dist/css/app.min.css
============================================================================ */
gulp.task('css', function() {
    gulp.src(PATHS.CSS, {cwd: BASES.SRC})
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(BASES.BUILD + 'css'));
});


/* ============================================================================
 * lib-css task
 * just using for bootstrap (library with css & js)
 * get the css files
 * concatenate them 
 * minify
 * save to dist/css/app.min.css
============================================================================ */
gulp.task('lib-css', function() {
    gulp.src(PATHS.LIBcss, {cwd: 'public'})
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat('lib.css'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(BASES.BUILD + 'css'));
});


/* ============================================================================
 * client-js Task
 * client side JS files
 * Does Annotation
 * Task for front end JS files
 * NOTE!! don't want back end Node files loaded on front end
============================================================================ */
gulp.task('client-js', function() {
    gulp.src(PATHS.JS, {cwd: BASES.SRC})
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(BASES.BUILD + 'js'));
    //.pipe(livereload()); //refresh browser
});



/* ============================================================================
 * lib-js task - just for bootstrap (did not use browserify due to css file)
 * get the lib scripts (they are minified already)
 * concatenate them
 * save to /build
============================================================================ */
//gulp.task('lib-scripts', ['clean'], function() {
gulp.task('lib-js', function() {
    gulp.src(PATHS.LIBjs, {cwd: 'public'})
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat("lib.min.js"))
    .pipe(gulp.dest(BASES.BUILD + 'js'));
});


//lib-maps task - save to /build
gulp.task('lib-map', function() {
    gulp.src(PATHS.LIBmap, {cwd: 'public'})
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(gulp.dest(BASES.BUILD + 'css'));
});


/* ============================================================================
Browserify - Works with gulp-browserify ** NOW SUPERSEEDED **
includes npm modules listed in main.js
============================================================================ */
/*
gulp.task('browserify', function() {
    gulp.src([BASES.SRC + 'main.js'])
    .pipe(browserify({
        insertGlobals: true,
        debug: !gulp.env.production
    }))
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest(BASES.BUILD + 'js'));
});
*/

/* ============================================================================
Browserify - code taken for recipy on browserify site
includes npm modules listed in main.js
============================================================================ */
gulp.task('browserify', function () {
    // transform regular node stream to gulp (buffered vinyl) stream 
    var browserified = transform(function(filename) {
        var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src([BASES.SRC + 'main.js'])
      .pipe(browserified)
      .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(concat('bundled.js'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(BASES.BUILD + 'js'));
});


/* ==========================================================
GULP TASKS - Unit Testing with Karma
========================================================== */
//Run test once and exit
gulp.task('unit:test', function (done) {
    karma.start({
        configFile: __dirname + '/public/test/config/karma.conf.js',
        singleRun: true
    }, done);
});


//Watch for file changes and re-run tests on each change
gulp.task('unit:tdd', function (done) {
    karma.start({
        configFile: __dirname + '/public/test/config/karma.conf.js'
    }, done);
});


/* ============================================================================
default task
============================================================================ */
gulp.task('default',
    ['lint-client', 'browserify', 'lib-js', 'lib-css', 'lib-map', 'css', 'html', 'client-js']
);

