const gulp = require('gulp');
const exec = require('gulp-exec');
const jsdoc2md = require('gulp-jsdoc-to-markdown');
const rename = require('gulp-rename');

// 打包JS
gulp.task('webpack', function() {
    return gulp.src('./')
        .pipe(exec('NODE_ENV=production node ./build/build.js'))
        .pipe(exec.reporter());
});

// 生成文档
gulp.task('docs', function() {
    return gulp.src('./src/**.js')
        .pipe(jsdoc2md())
        .on('error', function(err) {
            throw err;
        })
        .pipe(rename(function(path) {
            path.extname = '.md'
        }))
        .pipe(gulp.dest('./docs/'));
});

// 监听
gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['webpack', 'docs']);
});