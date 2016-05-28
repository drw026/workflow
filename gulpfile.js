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

        app: {
            scss_src: 'app/scss/**/*.scss',
            css_dest: 'app/css',
            js_src: 'app/js/**/*.js',
            js_dest: 'app/js'
        },

        dist: {
            // dist paths
        }

    },

    browserSupport: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
}

// default gulp task
gulp.task('default', ['browserSync', 'styles', 'scripts'], function() {

    gulp.watch(config.paths.app.scss_src, ['styles']);

    gulp.watch(config.paths.app.js_src, ['scripts']);

});

// script task
gulp.task('scripts', function() {

    return gulp.src([config.paths.app.js_src, '!app/js/scripts.min.js'])

        .pipe(plug.sourcemaps.init())

        .pipe(plug.cached('scripts'))

        .pipe(plug.uglify())

        .pipe(plug.remember('scripts'))

        .pipe(plug.concat('scripts.min.js'))

        .pipe(plug.sourcemaps.write('../maps'))

        .pipe(gulp.dest(config.paths.app.js_dest))

        .pipe(bSync.stream());

});

// sfyles task
gulp.task('styles', function() {

    return gulp.src(config.paths.app.scss_src)

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

        .pipe(gulp.dest(config.paths.app.css_dest))

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