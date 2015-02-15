gulp = require 'gulp'
uglify = require 'gulp-uglify'
# watch = require 'gulp-watch'
concat = require 'gulp-concat'
# rename = require 'gulp-rename'
# livereload = require 'gulp-livereload'
coffee = require 'gulp-coffee'
riot = require 'gulp-riot'
sleet = require 'gulp-sleet'

gulp.task 'serve'

gulp.task 'dev'

gulp.task 'watch'

gulp.task 'build', ->
    gulp.src('index.sleet')
        .pipe(sleet())
        .pipe(gulp.dest('./dist'))

    gulp.src('app/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('./dist/app'))

    gulp.src('app/*.sleet')
        .pipe(sleet({ext: 'tag'}))
        .pipe(riot({type: 'none'}))
        # .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app'))
        # .pipe(rename('all.min.js'))
        # .pipe(uglify())
        # .pipe(gulp.dest('./dist'));
