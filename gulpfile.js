const gulp = require('gulp');

gulp.task('push', function () {
    const git = require('gulp-git');

    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});

gulp.task('clean', function () {
    const clean_css = require('gulp-clean-css');

    return gulp.src('./assets/css/main.css')
        .pipe(clean_css({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('critical', ['clean'], function () {
    const critical = require('critical');

    critical.generate({
        base: '_site/',
        src: 'index.html',
        css: ['assets/css/main.css'],
        dest: '../_includes/critical.css',
        minify: true,
        include: ['/cc_/'],
        ignore: ['@font-face']
    })
});

gulp.task('uncss', function () {
    const postcss = require('gulp-postcss');
    const post_uncss = require('postcss-uncss');

    function callback(file) {
        return {
            plugins: [
                require('postcss-uncss'),
            ],
            options: {
                html: ['/index.html']
            }
        }
    }

    return gulp.src('/assets/css/main.css')
        .pipe(postcss(callback))
        .pipe(gulp.dest('/assets/css/main.css'))
});

gulp.task('jpgs', function (cb) {
    const imageop = require('gulp-image-optimization');
    const imageminJpegtran = require('imagemin-jpegtran');

    gulp.src('./assets/img-in/*.jpg')
        .pipe(imageop({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            use: [imageminJpegtran()]
        }))
        .pipe(gulp.dest('./assets/img')).on('end', cb).on('error', cb);
});

gulp.task('html', function () {
    const htmlmin = require('gulp-htmlmin');

    return gulp.src('./_site/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./_site'));
});

gulp.task('css', ['uncss', 'clean', 'critical', 'html']);