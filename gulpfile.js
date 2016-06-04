/**
 *
 * Gulpfile setup workflow
 *
 * @author Andrew Reasoa
 */

'use strict';

// declare vars
var del, gulp, plug, bSync, config;

// init plugins
gulp = require('gulp');
plug = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
bSync = require('browser-sync');
del = require('del');

// config
config = {

    paths: {

        sass: {
            src: 'app/scss/**/*.scss',
            init: 'app/scss/init.scss',
            css: 'app/css'
        },

        scripts: {
            src: 'app/js/**/*.js',
            dest: 'app/js'
        },

        images: {
            src: 'app/images',
            build: 'dist/images'
        }

    },

    browserSupport: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],

    imageSettings: {
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    },

}

/**
 * Show what file has changed in console
 *
 * @param  {Object} evt event object
 */
function changeEvent(evt) {

    plug.util.log('File', plug.util.colors.cyan(evt.path.replace(new RegExp('/.*/'), '')), 'was', plug.util.colors.magenta(evt.type));

};

/**
 * default gulp task
 *
 * @function defaultTask
 */
gulp.task('default', ['styles', 'scripts'], function defaultTask() {

    gulp.watch(config.paths.sass.src, ['styles']).on('change', function logStylesChanges(evt) {
        changeEvent(evt);
    });
    gulp.watch(config.paths.scripts.src, ['scripts']).on('change', function logScriptsChanges(evt) {
        changeEvent(evt);
    });

});

/**
 * script task
 *
 * @function scriptsTask
 */
gulp.task('scripts', function scriptsTask() {

    return gulp.src([config.paths.scripts.src, '!app/js/scripts.min.js'])

        .pipe(plug.sourcemaps.init())

        .pipe(plug.cached('scripts'))

        .pipe(plug.uglify())

        .pipe(plug.remember('scripts'))

        .pipe(plug.concat('scripts.min.js'))

        .pipe(plug.sourcemaps.write('../maps'))

        .pipe(gulp.dest(config.paths.scripts.dest))

        .pipe(bSync.stream());

});

/**
 * styles task
 *
 * @function stylesTask
 */
gulp.task('styles', function stylesTask() {

    return gulp.src(config.paths.sass.init)

        .pipe(plug.sourcemaps.init())

        .pipe(plug.sass({
            errLogToConsole: true,
            includePaths: [
                'app/scss/'
            ]
        }))

        .pipe(plug.autoprefixer({
            browsers: config.browserSupport,
            cascade: true
        }))

        .pipe(plug.concat('styles.css'))

        .pipe(plug.sourcemaps.write('../maps'))

        .pipe(gulp.dest(config.paths.sass.css))

        .pipe(bSync.reload({stream: true}));

});

/**
 * images task
 *
 * @function imagesTask
 */
gulp.task('images', function() {

    return gulp.src(config.paths.images.src + '/**/*.{jpg,png}')

    .pipe(plug.imagemin(config.imageSettings))

    .pipe(gulp.dest(config.paths.images.build));

});

/**
 * Removes the dist folder
 *
 * @function cleanDist
 * @param callback
 */
gulp.task('clean', function cleanDist(callback) {

    del('dist', callback);

});

/**
 * Activate BrowserSync
 *
 * @function activateBrowserSync
 */
gulp.task('browserSync', function activateBrowserSync() {

    bSync({
        server: {
            baseDir: "app/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });

});