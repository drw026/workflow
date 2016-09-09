/**
 *
 * Gulpfile setup workflow
 *
 * @author Andrew Reasoa
 */

'use strict';

// node file system
var fs = require('fs');

// get config from JSON file
var config = JSON.parse(fs.readFileSync('./gulp-config.json'));

// gulp plugin
var gulp = require('gulp');

// browser sync plugin
var bSync = require('browser-sync');

// plugin to delete files and folders
var del = require('del');

// plugin to load all gulp plugins found in package.json
var plug = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// set default production environment
var isProd = false;

// store version
var version;

/**
 * Show what file has changed in console
 *
 * @param  {Object} evt event object
 */
function changeEvent(evt) {

    // use util plugin to show an output in the console
    plug.util.log('File', plug.util.colors.cyan(evt.path.replace(new RegExp('/.*/'), '')), 'was', plug.util.colors.magenta(evt.type));

};

/**
 * function wich returns a path to destination based on task type
 *
 * @function fileDestination
 * @param  {String} type task type
 * @return {Object} path the to destination
 */
function fileDestination(type) {

    // variable to store the location
    var location;

    // check if production environment is active
    // if active set production environment locations
    // else use development environment locations
    if (isProd) {

        switch (type) {

            case 'scripts':
                location = config.paths.scripts.dist;
                break;

            case 'styles':
                location = config.paths.sass.dist;
                break;

            default:
                break;

        }

    } else {

        // development environment locations
        switch (type) {

            case 'scripts':
                location = config.paths.scripts.dest;
                break;

            case 'styles':
                location = config.paths.sass.css;
                break;

            default:
                break;

        }

    }

    // return the location
    return location;

}

/**
 * default gulp task
 *
 * @function defaultTask
 */
gulp.task('default', ['browserSync', 'styles', 'scripts'], function defaultTask() {

    // watch for style changes
    gulp.watch(config.paths.sass.src + '/**/*.scss', ['styles']).on('change', function logStylesChanges(evt) {
        changeEvent(evt);
    });

    // watch for script changes
    gulp.watch(config.paths.scripts.src + '/**/*.js', ['scripts']).on('change', function logScriptsChanges(evt) {
        changeEvent(evt);
    });

});

/**
 * script task
 *
 * @function scriptsTask
 */
gulp.task('scripts', function scriptsTask() {

    return gulp.src(config.paths.scripts.src + '/**/*.js')

        // if production environment is not active init sourcemap
        .pipe(isProd ? plug.util.noop() : plug.sourcemaps.init())

        // cache files n memory that have passed through
        .pipe(plug.cached('scripts'))

        // if production environment is active uglifly scripts
        .pipe(isProd ? plug.uglify() : plug.util.noop())

        // get all files that have been passed through
        .pipe(plug.remember('scripts'))

        // concatonate them all in 1 file
        .pipe(isProd ? plug.concat('scripts.min.' + version +'.js') : plug.concat('scripts.min.js'))

        // if production environment is not active write souremap
        .pipe(isProd ? plug.util.noop() : plug.sourcemaps.write('../maps'))

        // put the file in the correct folder
        .pipe(gulp.dest(fileDestination('scripts')))

        // inject scripts in browser
        .pipe(bSync.stream());

});

/**
 * styles task
 *
 * @function stylesTask
 */
gulp.task('styles', function stylesTask() {

    return gulp.src(config.paths.sass.src + '/init.scss')

        // if production environment is not active init sourcemap
        .pipe(isProd ? plug.util.noop() : plug.sourcemaps.init())

        // get all sass files and proces them
        .pipe(plug.sass({errLogToConsole: true, includePaths: [config.sass.src]}))

        // auto prefix css based on browser compatibility
        .pipe(plug.autoprefixer({
            browsers: config.browserSupport,
            cascade: true
        }))

        // concatonate them all in 1 file
        .pipe(isProd ? plug.concat('styles.min.'+ version +'.css') : plug.concat('styles.css'))

        // minify css
        .pipe(isProd ? plug.cssmin() : plug.util.noop())

        // if production environment is not active write sourcemap
        .pipe(isProd ? plug.util.noop() : plug.sourcemaps.write('../maps'))

        // put the file in the correct folder
        .pipe(gulp.dest(fileDestination('styles')))

        // reload browser
        .pipe(bSync.reload({stream: true}));

});

/**
 * images task
 *
 * @function imagesTask
 */
gulp.task('images', function() {

    return gulp.src(config.paths.images.src + '/**/*.{jpg,png}')

    // optimise images
    .pipe(plug.imagemin(config.imageSettings))

    // move optimized images in dist folder
    .pipe(gulp.dest(config.paths.images.dist));

});

/**
 * inject file path in HTML
 *
 * @function injectFilePath
 */
gulp.task('inject', function injectFilePath() {

    // get the index file
    return gulp.src('app/index.html')

        // get the paths of the dist files and
        // inject the paths into the index.html
        .pipe(plug.inject(gulp.src(
            [
                config.paths.sass.dist + '/*.css',
                config.paths.scripts.dist + '/*.js'
            ]
            ),
                {
                    ignorePath: 'dist',
                    addRootSlash: false
                }
            )
        )

        // move the final index.html to the dist folder
        .pipe(gulp.dest('dist'));

});

/**
 * Removes the dist folder
 *
 * @function cleanDist
 * @param callback
 */
gulp.task('clean', function cleanDist() {

    // delete all folders, sub folders and files
    del('dist/**/*');

});

/**
 * Activate BrowserSync
 *
 * @function activateBrowserSync
 */
gulp.task('browserSync', function activateBrowserSync() {

    bSync({
        proxy: config.browserSync.proxy,
        files: config.browserSync.files,
        options: {
            reloadDelay: 250
        },
        notify: false
    });

});

/**
 * build files for deployment
 *
 * @function deploymentTask
 */
gulp.task('deploy', function deploymentTask(callback) {

    // set production environment
    isProd = true;

    // generate version based on timestamp
    version = new Date().getTime();

    // run clean first, then the rest in parallel and end with the inject
    plug.sequence('clean', ['styles', 'scripts', 'images'], 'inject', callback)

});