const gulp = require('gulp');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const del = require('del');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['templates', 'css', 'vendor', 'scripts']);

gulp.task('watch', function () {
    gulp.watch('./app_client/scripts/**/*html', ['templates']);
    gulp.watch(['./app_client/style/**/*.css', './app_client/style/**/*.scss'], ['css']);
    gulp.watch('./app_client/scripts/**/*.js', ['scripts']);
    gulp.watch('./app_client/vendor/vendor.js', ['vendor']);
});

gulp.task('templates', function () {
    del(['./Content/template/**/*.html']);
    gulp.src('./app_client/scripts/**/*html')
        .pipe(gulp.dest('./Content/template'));
});

gulp.task('css', function () {
    del(['./Content/style/style.css']);
    gulp.src(['./app_client/style/*.css', './app_client/style/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./Content/style'));
});

gulp.task('scripts', function () {
    gulp.src('./app_client/scripts/app.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('./Content/scripts'));
});

gulp.task('vendor', function () {
    gulp.src('./app_client/vendor/vendor.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('./Content/scripts'));
});