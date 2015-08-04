var gulp        = require('gulp'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    rename      = require("gulp-rename"),

    sass        = require('gulp-sass'),
    minifyCSS   = require('gulp-minify-css'),

    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps');



var COMPILED_CSS_FILE_NAME = 'base.min.css';
var PATHS = {
    BUILD: {
        PATH:       './static/build/',
        FONTS:      './static/build/fonts/',
        IMAGES:     './static/build/images/',
        ICONS:      './static/build/icons/',
        STYLES:     './static/build/styles/',
        SCRIPTS:    './static/build/scripts/',
        LIBRARIES:  './static/build/libraries/'
    },
    SOURCE: {
        PATH:       './static/source/',
        FONTS:      './static/source/fonts/',
        IMAGES:     './static/source/images/',
        ICONS:      './static/source/icons/',
        STYLES:     './static/source/styles/',
        SCRIPTS:    './static/source/scripts/',
        LIBRARIES:  './static/source/libraries/'
    }
};



/** Task Clean: Clean all from build folder **/
gulp.task('Clean', function(cb) {
    del([PATHS.BUILD.PATH + '*'], cb);
});






/** Task Copy:Fonts: Copy fonts to build folder **/
gulp.task('Copy:Fonts', function() {
    gulp.src(PATHS.SOURCE.FONTS + '/**/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest(PATHS.BUILD.FONTS));
});

/** Task Copy:Images: Copy images to build folder **/
gulp.task('Copy:Images', function() {
    gulp.src(PATHS.SOURCE.IMAGES + '/**/*.{png,jpg,jpeg,gif}')
        .pipe(gulp.dest(PATHS.BUILD.IMAGES));
});

/** Task Copy:Libraries: Copy Libs to build folder **/
gulp.task('Copy:Libraries', function() {
    gulp.src(PATHS.SOURCE.LIBRARIES + '/**/*.{js,ts}')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(PATHS.BUILD.LIBRARIES));
});

/** Task Copy: Run all 'Copy:*' tasks **/
gulp.task('Copy', ['Copy:Fonts', 'Copy:Images', 'Copy:Libraries']);







/** Task Sass:Landing: Compile 'source/styles/landing/base.scss' **/
gulp.task('Sass:Landing', function () {
    return gulp.src(PATHS.SOURCE.STYLES + '/landing/base.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename(COMPILED_CSS_FILE_NAME))
        .pipe(gulp.dest(PATHS.BUILD.STYLES + '/landing/'));
});



/** Task Sass: Run all 'Sass:*' tasks **/
gulp.task('Sass', ['Sass:Landing']);






gulp.task('watch', function () {
    gulp.watch(PATHS.SOURCE.STYLES + '/common/**/*.scss',   ['Sass']);
    gulp.watch(PATHS.SOURCE.STYLES + '/landing/**/*.scss',   ['Sass:Landing']);


});





/** default task (use 'gulp' to build project) **/
gulp.task('default', function(callback) {
    runSequence('Clean', ['Copy', 'Sass'], callback);
});