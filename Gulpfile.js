const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');
const runSequence = require('run-sequence');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('babel');

gulp.task('clean:tmp', () => del('./.tmp/**/*'));
gulp.task('clean:build', () => del('./build/**/*'));

gulp.task('minify-html', () => {
    return gulp.src('./app/**/*.html')
        .pipe($.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true
        }))
        .pipe(gulp.dest('./build/views'));
});

gulp.task('compile-less', () => {
    gulp.src([
            './public/styles/main.less',
            './public/styles/font-awesome-legacy.less'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.postcss([
            autoprefixer({
                browsers: ['last 2 versions', 'ie 8']
            }),
            cssnano()
        ]))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./.tmp/styles'))
        .pipe($.livereload());
});

//gulp.task('minify-styles', () => {
//    return gulp.src('./.tmp/styles/*.css')
//        .pipe($.postcss([
//            cssnano()
//        ]))
//        .pipe(gulp.dest('./.tmp/styles'));
//});

gulp.task('watch-styles', () => {
    const styles = [
        './public/styles/*.less',
        './app/**/*.less'
    ];
    $.livereload.listen();
    gulp.watch(styles, ['compile-less']);
});

gulp.task('copy-fonts', () => {
    return gulp.src('./bower_components/font-awesome/fonts/*')
        .pipe($.copy('./build/public/fonts', {
            prefix: 3
        }));
});

gulp.task('copy-static-files', () => {
    return gulp.src('./public/*.*')
        .pipe($.copy('./build/public', {
            prefix: 1
        }));
});

gulp.task('copy-images', () => {
    return gulp.src('./public/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [require('imagemin-pngquant')()]
        }))
        .pipe(gulp.dest('./build/public/img'));
});

gulp.task('usemin', () => {
    const jsOptions = (vendors) => {
        return [
            $.sourcemaps.init({
                loadMaps: true
            }),
            'concat',
            vendors ? null : $.babel,
            $.uglify,
            $.rev,
            $.sourcemaps.write('./')
        ].filter((el) => el);
    };

    return gulp.src('./app/_layouts/*.html')
        .pipe($.usemin({
            js: jsOptions(),
            jsvendor: jsOptions(true),
            html: [$.htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            })],
            css: [$.rev]
        }))
        .pipe(gulp.dest('./build/public'))
        .on('end', () => {
            // copy source-maps
            gulp.src('./.tmp/styles/*.map')
                .pipe($.copy('./build/public/styles', {
                    prefix: 2
                }));
            // copy font-awesome for legacy browsers
            gulp.src('./.tmp/styles/font-awesome-legacy.css')
                .pipe($.copy('./build/public/styles', {
                    prefix: 2
                }));
        });
});


gulp.task('copy-layouts', () => {
    return gulp.src('./build/public/*.html')
        .pipe($.copy('./build/views/_layouts', {
            prefix: 2
        }))
        .on('end', () => {
            return del('./build/public/*.html')
        });
});


/********************************************************/
/********************************************************/
/********************************************************/

gulp.task('watch', () => {
    $.livereload.listen();

    const nodemon = require('nodemon');

    nodemon({
        execMap: {
            js: 'node --harmony'
        },
        env: {
            NODE_ENV: 'dev',
            DEBUG: 'app'
        },
        watch: [
            'app/**/*.js',
            'config/**/*.js'
        ]
    });

    process.once('exit', () => {
        $.livereload.server.close();
    });

    runSequence(
        'clean:tmp',
        'compile-less',
        'watch-styles'
    );
});

gulp.task('default', () => {
    runSequence(
        ['clean:tmp', 'clean:build'],
        'compile-less',
        ['minify-html', 'copy-fonts', 'copy-images', 'copy-static-files'],
        'usemin',
        'copy-layouts'
    );
});
