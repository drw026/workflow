/**
 * Workflow
 */

// declare vars
var gulp, plug, bSync, config;

// init plugins
gulp = require('gulp');
plug = require("gulp-load-plugins")(
    {
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }
);
bSync = require('browser-sync');

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
        }

    },

    browserSupport: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
}

/**
 * Show what file has changed in console
 * @param  {Object} evt event object
 */
var changeEvent = function(evt) {

    plug.util.log('File', plug.util.colors.cyan(evt.path.replace(new RegExp('/.*/'), '')), 'was', plug.util.colors.magenta(evt.type));

};

// default gulp task
gulp.task('default', ['styles', 'scripts'], function() {

    gulp.watch(config.paths.sass.src, ['styles']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(config.paths.scripts.src, ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });

});

// script task
gulp.task('scripts', function() {

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

// sfyles task
gulp.task('styles', function() {

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

gulp.task('browserSync', function() {

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