/**
 * Workflow
 */

// declare vars
var gulp, sass, sourcemaps, prefix, concat, config;

// init plugins
gulp = require('gulp');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');
prefix = require('gulp-autoprefixer');
concat = require('gulp-concat');

// config
config = {

    paths: {

        app: {
            scss_src: 'app/scss/**/*.scss',
            css_dest: 'app/css'
        },

        dist: {
            // dist paths
        }

    }

    browserSupport: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
}

// default gulp task
gulp.task('default' function() {

    // watch tasks

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

        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade:  true
        }))

});