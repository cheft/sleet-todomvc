var coffee, config, gulp, riot, server, sleet, uglify;

gulp = require('gulp');

uglify = require('gulp-uglify');

server = require('gulp-server-livereload');

coffee = require('gulp-coffee');

riot = require('gulp-riot');

sleet = require('gulp-sleet');

config = {
  index: 'index.sleet',
  coffee: 'app/*.coffee',
  sleet: 'app/*.sleet',
  indexDist: 'dist',
  appDist: 'dist/app',
  lib: ['bower_components/todomvc-common/base.css', 'bower_components/todomvc-app-css/index.css', 'bower_components/riotjs/riot.js'],
  libDist: 'dist/lib'
};

gulp.task('lib', function() {
  return gulp.src(config.lib).pipe(gulp.dest(config.libDist));
});

gulp.task('build', ['lib'], function() {
  gulp.src(config.index).pipe(sleet()).pipe(gulp.dest(config.indexDist));
  gulp.src(config.coffee).pipe(coffee({
    bare: true
  })).pipe(gulp.dest(config.appDist));
  return gulp.src(config.sleet).pipe(sleet({
    ext: 'tag'
  })).pipe(riot({
    type: 'none'
  })).pipe(uglify()).pipe(gulp.dest(config.appDist));
});

gulp.task('serve', function() {
  var ser;
  ser = server({
    livereload: true,
    directoryListing: {
      path: 'dist'
    },
    open: true,
    defaultFile: 'index.html'
  });
  return gulp.src(config.indexDist).pipe(ser);
});

gulp.task('watch', ['serve'], function() {
  return gulp.watch([config.index, config.coffee, config.sleet], ['build']);
});

gulp.task('default', ['watch']);
