/* ============================================================================
Karma configuration

Ref.
https://github.com/angular/angular-seed/blob/master/karma.conf.js
https://github.com/karma-runner/karma-phantomjs-launcher
https://github.com/firebase/angularfire-seed/blob/master/test/lib/jasmineMatchers.js
http://jasmine.github.io/2.2/introduction.html
============================================================================ */

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath : '../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'lib/angular/angular.js',
        'lib/angular-mocks/angular-mocks.js',
        'lib/angularfire/dist/angularfire.js',
        'lib/mockfirebase/browser/mockfirebase.js',
        'src/js/**/*.js',
        'test/unit/app.spec.js',
        'test/unit/services/firebaseURI.spec.js',
        'test/unit/controllers/controllers3spies.spec.js',
        'test/unit/lib/mock.firebase.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox'],
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
