const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');
const babel = require('gulp-babel');
const gulpProcess = require('gulp-process');
const gutil = require('gulp-util');
const nunjucks = require('gulp-nunjucks');
const del = require('del');

const production = process.env.NODE_ENV == 'production';

// Compile sass
gulp.task('sass', _ => {
    return gulp.src('./front/static/sass/*.scss') // look for every .scss files
        .pipe(sass()) // compile into style.css
        .pipe(gulp.dest('./dist/')); // write it into dist folder
});

// Compile css
gulp.task('css', _ => {
    return gulp.src('./front/static/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        //.pipe(gzip())
        .pipe(gulp.dest('./dist/'));
});

// Compile JS
gulp.task('js', _ => {
    return gulp.src('./front/static/js/**/*.js')
        .pipe(babel({
            presets: ['stage-3'],
            plugins: ['transform-runtime', 'transform-es2015-modules-commonjs', ['transform-react-jsx', {'pragma': 'h'}]]
        }))
        //.pipe(gzip())
        .pipe(gulp.dest('./dist/'));
});

// Clean build directory
gulp.task('clean', function(done) {
  return del(['dist'], done);
});

gulp.task('build', gulp.parallel('css', 'js'));

gulp.task('watch', _ => {
    gulp.watch('./front/static/css/*.css', gulp.parallel('css'));
    gulp.watch('./front/static/js/**/*.js', gulp.parallel('js'));
})


// Default task
gulp.task('default', gulp.series('clean', gulp.parallel('build', 'watch')));
