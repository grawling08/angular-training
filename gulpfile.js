var gulp = require('gulp');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var minifyCSS = require('gulp-minify-css');
var minifyJS = require('gulp-uglify');
var concat = require('gulp-concat');
var runSeq = require('run-sequence');

var paths = {
    styles: './styles/*.*',
    templates: './modules/*.*',
    templates2: './modules/**/*.*',
    scripts: './scripts/*.*',
    index: 'index.html'
};

gulp.task('clean', function(){
    return gulp.src('dist').pipe(clean({
        force: true
    }))
});

gulp.task('minify', function(){
    return gulp.src(paths.index)
        .pipe(usemin({
            css1: [minifyCSS({
                keepSpecialComments: 0
            }), 'concat'],
            js1: [minifyJS(),'concat'],
            js2: [minifyJS(),'concat']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copymodules', function(){
    return gulp.src(paths.templates)
        .pipe(gulp.dest('dist/modules'));
});

gulp.task('serve', function(){
    browserSync.init({
        notify: false,
        port: 9000,
        server : "./",
        ui: {
            port: 12345
        }
    });

    gulp.watch([paths.index,paths.styles,paths.scripts,paths.templates,paths.templates2])
        .on('change',browserSync.reload);
});

gulp.task('servedist', function(){
    browserSync.init({
        notify: false,
        port: 9001,
        server: './dist',
        ui: {
            port: 12346
        }
    });
});

gulp.task('build', function(){
    return runSeq('clean', 'minify', 'copymodules')
})