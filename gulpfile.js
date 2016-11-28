var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    image = require('gulp-image'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon');

var config = {
    bootstrap: './node_modules/bootstrap-sass',
    jquery: './node_modules/jquery',
    build: './build'
};

gulp.task('test', ['font', 'sass', 'js', 'browser-sync'], function () {
    gulp.watch('public/**/*.sass', ['sass']);
    gulp.watch('public/**/*.png',  ['image']);
    gulp.watch('public/**/*.html', ['bs-reload']);
    gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
});

gulp.task('build', ['font', 'sass', 'image', 'js', 'browser-sync'], function () {
    gulp.watch('public/**/*.sass', ['sass']);
    gulp.watch('public/**/*.png',  ['image']);
    gulp.watch('public/**/*.html', ['bs-reload']);
    gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
});

gulp.task('default', ['browser-sync'], function () {
});

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('browser-sync', ['nodemon'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync({

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({

        // nodemon our expressjs server
        script: 'web.js',

        // watch core server file(s) that require server restart on change
        watch: ['web.js', 'routes/*.js', 'public/javascripts/**/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('font', function() {
    return gulp.src("public/fonts/**/*")
        .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('image', function() {
    return gulp.src("public/images/*")
        .pipe(image())
        .pipe(gulp.dest('public/build/img'));
});

gulp.task('sass', ['font'], function() {
    return gulp.src("public/sass/style.sass")
        .pipe(sass({
            //outputStyle: 'compressed',
            includePaths: [ config.bootstrap + '/assets/stylesheets' ]
        }))
        .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(csscomb())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("public/build/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("public/javascripts/app.js")
        .pipe(browserify())
        .pipe(gulp.dest('public/build/js'))
});
