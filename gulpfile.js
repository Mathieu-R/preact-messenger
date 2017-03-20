const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpProcess = require('gulp-process');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const ghandlebars = require('gulp-handlebars');
const del = require('del');

const production = process.env.NODE_ENV == 'production';

// Compile handlebars template
gulp.task('templates', _ => {
  gulp.src('./front/*.hbs')
    .pipe(ghandlebars())
    .pipe(gulp.dest('./dist/templates/'));
});

// Compile sass
gulp.task('sass', _ => {
  return gulp.src('./front/static/sass/*.scss') // look for every .scss files
    .pipe(sourcemaps.init())
    .pipe(sass()) // compile into style.css
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css')); // write it into dist folder
});

// Compile JS
gulp.task('js', _ => {
  return gulp.src('./front/static/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['stage-3'],
          plugins: ['transform-es2015-modules-commonjs', ['transform-react-jsx', {'pragma': 'h'}]]
      }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/scripts'));
});

// Compile Node
gulp.task('node', _ => {
  return gulp.src('./back/*.js')
  .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['stage-3'],
        plugins: ['transform-es2015-modules-commonjs', ['transform-react-jsx', {'pragma': 'h'}]]
    }))
  //.pipe(concat('server.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/server'));
});

// Clean build directory
gulp.task('clean', function(done) {
  return del(['dist'], done);
});

gulp.task('build', gulpSequence(['templates', 'sass', 'js', 'node']));

gulp.task('watch', _ => {
  gulp.watch('./front/*.hbs', gulpSequence('templates'));
  gulp.watch('./front/static/sass/*.scss', gulpSequence('sass'));
  gulp.watch('./front/static/js/**/*.js', gulpSequence('js'));
  gulp.watch('./back/*.js', gulpSequence('node'));
});


// Default task
gulp.task('default', gulpSequence('clean', ['build', 'watch']));
