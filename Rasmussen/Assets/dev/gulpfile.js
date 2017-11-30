// Required plugins. Please alphabetize
var
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    connectPhp = require('gulp-connect-php'),
    cssmin = require('gulp-cssmin'),
    del = require('del'),
    gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    imagemin = require('gulp-imagemin'),
    insert = require('gulp-insert'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    urlReplace = require('gulp-url-replace'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var config = {
    project: {
        input: {
            dir: './',
            src: 'assets/',
            handlebarsPages: './src/pages/*.hbs',
            handlebarsPartialsPath: './src/partials',
            handlebars: './src/**/*.hbs',
            images: 'images/**/*.{png,jpg,jpeg,gif}',
            markup: [
                '*.html',
                '**/*.html',
                'includes/**/*.html'
            ],
            svg: 'images/svg/*.svg'
        },
        output: {
            dir: './',
            images: 'images',
        }
    },
    dist: {
        input: {
            dir: './',
            all: [
                // FONTS
                'prime/fonts/**/*',

                // IMAGES
                'images/**/*.{png,jpg,jpeg,gif}',
                'prime/images/**/*.{png,jpg,jpeg,gif}',
                'prime/images/svg-*.svg',

                // HTML
                //'*.html',

                // SCRIPTS
                'prime/scripts/*.js',

                // STYLES
                'prime/css/*.css',

                // IGNORE
                '!.DS_Store',
                '!bower.json',
                '!gulpfile.js',
                '!package.json',
                '!bower_components/**/',
                '!node_modules/**/',
                '!prime/bower_components/**/',
                '!prime/node_modules/**/',
                '!prime/styleguide/**/',
                '!prime/src/**/'
            ],
            html: [
                '*.html'
            ],
            minifyCSS: [
                'prime/css/styles.css'
            ],
            minifyJS: [
                'prime/scripts/display.js',
                'scripts/formFunctions.js'
            ],
            scripts: 'prime/scripts/',
            styles: 'prime/css/',
        },
        output: {
            dir: '../dist',
            html: [
                '../dist/*.html'
            ]

        }
    }
};

// BEGIN TASKS
// borrowed from: https://cloudfour.com/thinks/the-hidden-power-of-handlebars-partials/
gulp.task('html', () => {
    return gulp.src(config.project.input.handlebarsPages)
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: [config.project.input.handlebarsPartialsPath]
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(config.project.output.dir))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('cleanDIST', function () {
    return del([
        'dist/prime/css/*.css',
        'dist/prime/scripts/*.js',
    ]);
});

gulp.task('minifyCSS', function () {
    return gulp.src(config.dist.input.minifyCSS)
        .pipe(cssmin({
            keepBreaks: false,
            showLog: false
        }))
//        .pipe(urlReplace({
//            '../fonts/': '../../fonts/',
//        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(config.dist.input.styles));
});

gulp.task('minifyJS', ['cleanDIST'], function () {
    return gulp.src(config.dist.input.minifyJS)
        .pipe(concat('display.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist.input.scripts));
});

gulp.task('copyFiles', ['cleanDIST', 'minifyCSS', 'minifyJS'], function () {
    gulp.src(config.dist.input.all, {
            base: '.'
        })
        .pipe(gulp.dest(config.dist.output.dir));
});

gulp.task('updateToMin', ['copyFiles'], function () {
    gulp.src(config.dist.input.html)
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(gulp.dest(config.dist.output.dir));
});

// images
gulp.task('images', function (done) {
    return gulp.src(config.project.input.images)
        .pipe(imagemin())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.project.output.images))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('connect', function () {
    connect.server({
        root: 'assets',
        livereload: true
    });
});

gulp.task('connectSync', ['connect'], function () {
    connectPhp.server({}, function () {
        browserSync({
            proxy: 'localhost:8000',
            open: {
                browser: 'Google Chrome'
            },
            notify: {
                styles: [
                    'background-color: #666;',
                    'color: #ccc;',
                    'font-size: 14px;',
                    'right: 0;',
                    'padding: 7px;',
                    'position: fixed;',
                    'top: 0;',
                    'z-index: 9999;',
                ]
            }
        });
    });
    gulp.watch(config.project.input.handlebars).on('change', function () {
        browserSync.reload();
    });
    gulp.watch(config.project.input.images).on('change', function () {
        browserSync.reload();
    });
});

// run 'default' task before running watch
gulp.task('watch', function () {
    gulp.watch(config.project.input.handlebars, ['html']);
    gulp.watch(config.project.input.images, ['images']);
});

// Default task
gulp.task('dynamic', ['html', 'images', 'connectSync', 'watch']);
gulp.task('default', ['dynamic']);
gulp.task('minify', ['minifyCSS', 'minifyJS']);
gulp.task('dist', ['cleanDIST', 'minify', 'copyFiles', 'updateToMin']);
