'use strict';

// modules
var assemble = require('fabricator-assemble'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    combineMq = require('gulp-combine-mq'),
    concat = require('gulp-concat'),
    criticalCss = require('gulp-critical-css'),
    cssmin = require('gulp-cssmin'),
    csso = require('gulp-csso'),
    del = require('del'),
    file = require('gulp-file'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    inject = require('gulp-inject'),
    notify = require('gulp-notify'),
    path = require('path'),
    pixrem = require('gulp-pixrem'),
    pxtorem = require('gulp-pxtorem'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    svgmin = require('gulp-svgmin'),
    svgsprite = require('gulp-svg-sprite'),
    svgstore = require('gulp-svgstore'),
    urlReplace = require('gulp-url-replace'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify');

// configuration
var config = {
    dev: gutil.env.dev,
    src: {
        cleanUpFiles: [
            'css/*.min.css',
            'css/maps/*.map',
            'scripts/*.min.js',
            'styleguide/**/*.{css,gif,html,jpeg,jpg,js,png}'
        ],
        scripts: {
            fabricator: [
                'src/fabricator/scripts/f.js'
            ],
            jquery: [
                'bower_components/jquery/dist/jquery.js'
            ],
            project: [
                // consolidating jquery with concatenated scripts
                // FRAMEWORKS
                'bower_components/jquery/dist/jquery.js',
                'scripts/concat/vendors/modernizr-css.js',
                
                // BEHAVIOR
                'node_modules/lazysizes/lazysizes.min.js',
                'scripts/concat/sticky-nav-on-scroll.js',
                'scripts/concat/smooth-scroll.js',
                'bower_components/matchHeight/dist/jquery.matchHeight.js',
                
                // MENUS
                'node_modules/jquery.mmenu/dist/jquery.mmenu.all.js',
                
                // RICH MEDIA
                'scripts/concat/vendors/littlefoot-vanilla.build.js',
                'scripts/concat/littlefoot-footnotes.js',
                'bower_components/picturefill/dist/picturefill.js',
                'bower_components/flip/dist/jquery.flip.min.js',
                'node_modules/flickity/dist/flickity.pkgd.min.js',
                'node_modules/slick-carousel/slick/slick.min.js',
                'scripts/concat/jquery.royalslider.min.js',
                'scripts/concat/tooltips.js',
                //'scripts/concat/accortabs.js',
                //'scripts/concat/donut-graph.js',
                
                // FORM
                'bower_components/jquery-infield-label/lib/jquery.infieldlabel.js',
                'scripts/concat/awesome-form-labels.js',
                'bower_components/rangetouch/dist/rangetouch.js',
                'scripts/concat/form-input-range.js',
                'scripts/concat/jquery.validate.js',
                
                // FUNCTIONS
                'scripts/concat/functions.js',
                'scripts/concat/bachelors-tuition-calculator.js',
                'scripts/concat/additional-methods.js'
            ]
        },
        styles: {
            fabricator: 'src/fabricator/styles/**/*.scss',
            project: 'src/sass/**/*.scss'
        },
        images: 'images/**/*.{png,jpg,jpeg,gif}',
        svg: 'images/svg/**/*.svg',
        svgGlobal: 'images/svg/global/*.svg',
        svgRSB: 'images/svg/rsb/*.svg',
        svgRSD: 'images/svg/rsd/*.svg',
        svgRSE: 'images/svg/rse/*.svg',
        svgRSHS: 'images/svg/rshs/*.svg',
        svgRSJS: 'images/svg/rsjs/*.svg',
        svgRSN: 'images/svg/rsn/*.svg',
        svgRST: 'images/svg/rst/*.svg',
        svgsource: 'images/svg-sprite.svg',
        viewssprite: 'src/materials/1atoms/images/svg-sprite.html',
        icons: 'src/materials/1atoms/images/',
        styleguide: 'src/views/*.html'
    },
    dist: {
        scripts: {
            fabricator: 'styleguide/fabricator/scripts',
            fabricatorScripts: 'styleguide/fabricator/scripts/*.js',
            jquery: 'scripts/',
            project: 'scripts/',
            projectScripts: 'scripts/*.js'
        },
        styles: {
            fabricator: 'styleguide/fabricator/css',
            fabricatorFiles: 'styleguide/fabricator/css/*.css',
            project: 'css',
            projectFiles: 'css/*.css'
        },
        images: 'images',
        svg: 'images',
        styleguide: 'styleguide',
        root: './'
    }
};

// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

var sassOptions = {
    errLogToConsole: true,
    includePaths: [
        'bower_components/susy/sass',
        'bower_components/breakpoint-sass/stylesheets'
    ],
    // removes comments
    outputStyle: 'compressed',
    // shows line numbers in source sass file
    sourceComments: true
};

var sourceMapOptions = {
    loadMaps: true
};

var combineMqOptions = {
    beautify: true
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9']
};

var pxtoremOptions = {
    propWhiteList: [
        'font',
        'font-size',
        'height',
        'max-height',
        'min-height',
        'line-height',
        'letter-spacing',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'width',
        'max-width',
        'min-width'
    ],
    replace: false,
    rootValue: 16,
    unitPrecision: 2
};

var svgOptions = {
    "mode": {
        "view": true
    }
};

// clean files before compiling
gulp.task('clean', function () {
    return del(config.src.cleanUpFiles);
});

// styles: fabricator
gulp.task('styles:fabricator', function () {
    gulp.src(config.src.styles.fabricator)
        .pipe(sassGlob())
        //.pipe(sourcemaps.init(sourceMapOptions))
        .pipe(sass(sassOptions)
            .on('error', sass.logError))
        .pipe(combineMq(combineMqOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(pxtorem(pxtoremOptions))
        .pipe(rename('f.css'))
        //.pipe(sourcemaps.write('/maps'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.styles.fabricator))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task STYLES:FABRICATOR completed');
        });
});

//gulp.task('styles:fabricator:min', ['styles:fabricator'], function () {
//    gulp.src(config.dist.styles.fabricatorFiles)
//        .pipe(cssmin({
//            keepBreaks: false,
//            showLog: false,
//        }))
//        .pipe(rename('f.min.css'))
//        .pipe(plumber({
//            errorHandler: notify.onError('Error: <%= error.message %>')
//        }))
//        .pipe(gulp.dest(config.dist.styles.fabricator))
//        .pipe(reload({
//            stream: true
//        }))
//        .on('finish', function () {
//            gutil.log('Task STYLES:FABRICATOR:MIN completed');
//        });
//});

// styles: project
gulp.task('styles:project', function () {
    gulp.src(config.src.styles.project)
        .pipe(sassGlob())
        //.pipe(sourcemaps.init(sourceMapOptions))
        .pipe(sass(sassOptions)
            .on('error', sass.logError))
        .pipe(combineMq(combineMqOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(pxtorem(pxtoremOptions))
        //.pipe(sourcemaps.write('/maps'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.styles.project))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task STYLES:PROJECT completed');
        });
});

//gulp.task('styles:project:min', ['styles:project'], function () {
//    gulp.src(config.dist.styles.projectFiles)
//        .pipe(cssmin({
//            keepBreaks: false,
//            showLog: false,
//        }))
//        //        .pipe(urlReplace({
//        //            '../fonts/': '../../fonts/',
//        //        }))
//        .pipe(rename('styles.min.css'))
//        .pipe(plumber({
//            errorHandler: notify.onError('Error: <%= error.message %>')
//        }))
//        .pipe(gulp.dest(config.dist.styles.project))
//        .pipe(reload({
//            stream: true
//        }))
//        .on('finish', function () {
//            gutil.log('Task STYLES:PROJECT:MIN completed');
//        });
//});

gulp.task('styles', ['styles:fabricator', 'styles:project']);
//gulp.task('styles:min', ['styles:fabricator:min', 'styles:project:min']);

// scripts: fabricator
gulp.task('scripts:fabricator', function () {
    return gulp.src(config.src.scripts.fabricator)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.scripts.fabricator))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task SCRIPTS:FABRICATOR completed');
        });
});

//gulp.task('scripts:fabricator:min', ['scripts:fabricator'], function () {
//    return gulp.src(config.dist.scripts.fabricatorScripts)
//        .pipe(uglify())
//        .pipe(rename('f.min.js'))
//        .pipe(plumber({
//            errorHandler: notify.onError('Error: <%= error.message %>')
//        }))
//        .pipe(gulp.dest(config.dist.scripts.fabricator))
//        .pipe(reload({
//            stream: true
//        }))
//        .on('finish', function () {
//            gutil.log('Task SCRIPTS:FABRICATOR:MIN completed');
//        });
//});

gulp.task('scripts:jquery', function () {
    return gulp.src(config.src.scripts.jquery)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.scripts.jquery))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task SCRIPTS:JQUERY completed');
        });
});

// scripts: project
gulp.task('scripts:project', function () {
    return gulp.src(config.src.scripts.project)
        .pipe(concat('display.js'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.scripts.project))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task SCRIPTS:PROJECT completed');
        });
});

//gulp.task('scripts:project:min', ['scripts:project'], function () {
//return gulp.src(config.dist.scripts.projectScripts)
//    .pipe(uglify())
//    .pipe(rename('display.min.js'))
//    .pipe(plumber({
//        errorHandler: notify.onError('Error: <%= error.message %>')
//    }))
//    .pipe(reload({
//        stream: true
//    }))
//    .pipe(gulp.dest(config.dist.scripts.project))
//    .on('finish', function () {
//        gutil.log('Task SCRIPTS:PROJECT:MIN completed');
//    });
//});

gulp.task('scripts', ['scripts:fabricator', 'scripts:project']);
//gulp.task('scripts:min', ['scripts:fabricator:min', 'scripts:project:min']);


// images
gulp.task('images', function (done) {
    return gulp.src(config.src.images)
        .pipe(imagemin())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.images))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task IMAGES completed');
        });
});

// SVG sprites
gulp.task('svgGlobal', function () {
    var svgs = gulp
        .src(config.src.svgGlobal)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--global.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgGLOBAL completed');
        });
});

gulp.task('svgRSB', function () {
    var svgs = gulp
        .src(config.src.svgRSB)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rsb.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSB completed');
        });
});

gulp.task('svgRSD', function () {
    var svgs = gulp
        .src(config.src.svgRSD)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rsd.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSD completed');
        });
});

gulp.task('svgRSE', function () {
    var svgs = gulp
        .src(config.src.svgRSE)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rse.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSE completed');
        });
});

gulp.task('svgRSHS', function () {
    var svgs = gulp
        .src(config.src.svgRSHS)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rshs.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSHS completed');
        });
});

gulp.task('svgRSJS', function () {
    var svgs = gulp
        .src(config.src.svgRSJS)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rsjs.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSJS completed');
        });
});

gulp.task('svgRSN', function () {
    var svgs = gulp
        .src(config.src.svgRSN)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rsn.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRSN completed');
        });
});

gulp.task('svgRST', function () {
    var svgs = gulp
        .src(config.src.svgRST)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('svg-sprite--rst.svg'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.dist.svg));

    var fileContents = function (filePath, file) {
        return file.contents.toString();
    };

    return gulp
        .src(config.src.viewssprite)
        .pipe(inject(svgs, {
            transform: fileContents,
            removeTags: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulp.dest(config.src.icons))
        .pipe(reload({
            stream: true
        }))
        .on('finish', function () {
            gutil.log('Task svgRST completed');
        });
});


// assemble
gulp.task('assemble', function (done) {
    assemble({
        logErrors: config.dev,
        dest: config.dist.styleguide
    });
    done();
});


// server
gulp.task('serve', function () {

    browserSync({
        server: {
            baseDir: config.dist.root
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
                'z-index: 9999;'
            ]
        },
        logPrefix: 'FABRICATOR'
    });

    /**
     * Because webpackCompiler.watch() isn't being used
     * manually remove the changed file path from the cache
     */
    function webpackCache(e) {
        var keys = Object.keys(webpackConfig.cache);
        var key, matchedKey;
        for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            key = keys[keyIndex];
            if (key.indexOf(e.path) !== -1) {
                matchedKey = key;
                break;
            }
        }
        if (matchedKey) {
            delete webpackConfig.cache[matchedKey];
        }
    }

    gulp.task('assemble:watch', ['assemble'], reload);
    gulp.watch('src/**/*.{css,eot,html,js,json,md,php,scss,svg,tff,txt,woff,woff2,yml}', ['assemble:watch']).on('change', webpackCache);

    //gulp.task('styles:fabricator:watch', ['styles:fabricator'], reload);
    gulp.watch(config.src.styles.fabricator, ['styles:fabricator'])
        .on('change', webpackCache);

    //gulp.task('styles:fabricator:min:watch', ['styles:fabricator:min'], reload);
    //    gulp.watch(config.dist.styles.fabricatorFiles, ['styles:fabricator:min'])
    //        .on('change', webpackCache);

    //gulp.task('styles:project:watch', ['styles:project'], reload);
    gulp.watch(config.src.styles.project, ['styles:project'])
        .on('change', webpackCache);

    //gulp.task('styles:project:min:watch', ['styles:project:min'], reload);
    //    gulp.watch(config.dist.styles.projectFiles, ['styles:project:min'])
    //        .on('change', webpackCache);

    //gulp.task('scripts:fabricator:watch', ['scripts:fabricator'], reload);
    gulp.watch(config.src.scripts.fabricator, ['scripts:fabricator'])
        .on('change', webpackCache);

    //gulp.task('scripts:fabricator:min:watch', ['scripts:fabricator:min'], reload);
    //    gulp.watch(config.dist.scripts.fabricatorFiles, ['scripts:fabricator:min'])
    //        .on('change', webpackCache);

    //gulp.task('scripts:project:watch', ['scripts:project'], reload);
    gulp.watch(config.src.scripts.project, ['scripts:project'])
        .on('change', webpackCache);

    //gulp.task('scripts:project:min:watch', ['scripts:project:min'], reload);
    //    gulp.watch(config.dist.scripts.projectFiles, ['scripts:project:min'])
    //        .on('change', webpackCache);

    //gulp.task('images:watch', ['images'], reload);
    //    gulp.watch(config.src.images, ['images'])
    //        .on('change', webpackCache);

    //gulp.task('svgGlobal:watch', ['svgGlobal'], reload);
    gulp.watch(config.src.svgGlobal, ['svgGlobal'])
        .on('change', webpackCache);

    //gulp.task('svgRSB:watch', ['svgRSB'], reload);
    gulp.watch(config.src.svgRSB, ['svgRSB'])
        .on('change', webpackCache);

    //gulp.task('svgRSD:watch', ['svgRSD'], reload);
    gulp.watch(config.src.svgRSD, ['svgRSD'])
        .on('change', webpackCache);

    //gulp.task('svgRSE:watch', ['svgRSE'], reload);
    gulp.watch(config.src.svgRSE, ['svgRSE'])
        .on('change', webpackCache);

    //gulp.task('svgRSHS:watch', ['svgRSHS'], reload);
    gulp.watch(config.src.svgRSHS, ['svgRSHS'])
        .on('change', webpackCache);

    //gulp.task('svgRSJS:watch', ['svgRSJS'], reload);
    gulp.watch(config.src.svgRSJS, ['svgRSJS'])
        .on('change', webpackCache);

    //gulp.task('svgRSN:watch', ['svgRSN'], reload);
    gulp.watch(config.src.svgRSN, ['svgRSN'])
        .on('change', webpackCache);

    //gulp.task('svgRST:watch', ['svgRST'], reload);
    gulp.watch(config.src.svgRST, ['svgRST'])
        .on('change', webpackCache);

});


// default build task
gulp.task('default', function () {

    // define build tasks
    var tasks = [
        'styles',
        'scripts',
        //'styles:min',
        //'scripts:min',
        'images',
        'svgGlobal',
        'svgRSB',
        'svgRSD',
        'svgRSE',
        'svgRSHS',
        'svgRSJS',
        'svgRSN',
        'svgRST',
        'assemble'
    ];

    // run build
    runSequence(tasks, function () {
        if (config.dev) {
            gulp.start('serve');
        }
    });
});