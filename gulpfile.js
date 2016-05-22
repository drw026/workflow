/**
 * Workflow
 */

// declare vars
var gulp, sass, sourcemaps, prefix, concat, browserSync, plumber, config;

// init plugins
gulp = require('gulp');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');
prefix = require('gulp-autoprefixer');
concat = require('gulp-concat');
browserSync = require('browser-sync');
plumber = require('gulp-plumber');

// config
config = {

    paths: {

        app: {
            scss_src: 'app/scss/**/*.scss',
            css_dest: 'app/css'
            js_src:
        },

        dist: {
            // dist paths
        }

    },

    browserSupport: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
}

// default gulp task
gulp.task('default', ['browserSync', 'sass'], function() {

    gulp.watch(config.paths.app.scss_src, ['sass']);

});

gulp.task('sass', function() {

    return gulp.src(config.paths.app.scss_src)

        .pipe(sourcemaps.init())

        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                'app/scss/'
            ]
        }))

        .pipe(prefix({
            browsers: config.browserSupport,
            cascade:  true
        }))

        .pipe(concat('styles.css'))

        .pipe(sourcemaps.write('../maps'))

        .pipe(gulp.dest(config.paths.app.css_dest))

        .pipe(browserSync.reload({stream: true}));

});

gulp.task('browserSync', function() {

    browserSync({
        server: {
            baseDir: "app/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });

});