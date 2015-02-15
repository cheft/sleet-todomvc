var coffee, concat, gulp, riot, sleet, uglify;

gulp = require('gulp');

uglify = require('gulp-uglify');

concat = require('gulp-concat');

coffee = require('gulp-coffee');

riot = require('gulp-riot');

sleet = require('gulp-sleet');

gulp.task('serve');

gulp.task('dev');

gulp.task('watch');

gulp.task('build', function() {
  gulp.src('index.sleet').pipe(sleet()).pipe(gulp.dest('./dist'));
  gulp.src('app/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./dist/app'));
  return gulp.src('app/*.sleet').pipe(sleet({
    ext: 'tag'
  })).pipe(riot({
    type: 'none'
  })).pipe(uglify()).pipe(gulp.dest('./dist/app'));
});
