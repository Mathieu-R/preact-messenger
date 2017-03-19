const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpProcess = require('gulp-process');
const gutil = require('gulp-util');
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
        .pipe(gulp.dest('./dist/'));
});

// Compile JS
gulp.task('js', _ => {
    return gulp.src('./front/static/js/**/*.js')
        .pipe(babel({
            presets: ['stage-3'],
            plugins: ['transform-es2015-modules-commonjs', ['transform-react-jsx', {'pragma': 'h'}]]
        }))
        .pipe(gulp.dest('./dist/'));
});

// Clean build directory
gulp.task('clean', function(done) {
  return del(['dist'], done);
});

gulp.task('build', gulpSequence(['sass', 'js']));

gulp.task('watch', _ => {
    gulp.watch('./front/static/sass/*.scss', gulpSequence('sass'));
    gulp.watch('./front/static/js/**/*.js', gulpSequence('js'));
});


// Default task
gulp.task('default', gulpSequence('clean', ['build', 'watch']));
