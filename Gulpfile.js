var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('usemin', function () {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            js: [uglify()],
            css: [minifyCss()]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clear:dist', function (done) {
    del('./dist')
        .then(() => done());
});

gulp.task('copy:static', function() {
    gulp.src('./src/{background,img}/*.*')
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/vendor/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', function (done) {
    runSequence('clear:dist', ['usemin', 'copy:static'], done);
});