var gulp = require('gulp');
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    ignore = require('gulp-ignore'),
    zip = require('gulp-zip'),
    browserSync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    reload = browserSync.reload;

var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3'
];

gulp.task('styles', function() {
  return gulp
    .src('src/sass/main.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    //.pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'iOS 6'], cascade: false}))
    .pipe(gulp.dest('styleguide/styles'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie9'}))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('styleguide/styles'))
    .pipe(notify({ message: 'SASS processing and minifying complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/javascript/*.js')
    .pipe(gulp.dest('styleguide/scripts'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(gulp.dest('styleguide/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('styleguide/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('sync', function() {
    //watch files
    var files = [
    'styleguide/styles/**.css',
    'styleguide/scripts/**.js',
    'styleguide/images/*.{png,jpg,gif}',
    'styleguide/index.html'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "localhost/styleguide/styleguide/",
    port: 8080,
    notify: true,
    injectChanges: true
    });
});

gulp.task('fileinclude', function() {
  gulp.src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('styleguide/'))
    .pipe(notify({ message: 'Html building task complete' }));

});

gulp.task('watch', ['sync'], function () {
  gulp.watch('src/sass/**.scss', ['styles']);
  gulp.watch('src/javascript/*.js', ['scripts']);
  gulp.watch('src/images/*.*', ['images']);
  gulp.watch('**/.DS_Store', ['remove']);
  gulp.watch('src/*.html', ['fileinclude']);
  //gulp.watch('styleguide/index.html');
});


gulp.task('clean', function() {
  del(['styleguide/styles', 'styleguide/scripts', 'styleguide/images'])
  notify({ message: 'Clean task complete' });
});

gulp.task('remove', function() {
  del('**/.DS_Store')
  notify({ message: 'Clean task complete' });
});

gulp.task('build', function() {

  gulp.src(['**/**','!node_modules/**','!src/**','!**/.sass-cache','!**/.DS_Store'])
  	.pipe(zip('styleguide.zip'))
  	.pipe(gulp.dest('./'))
  	.pipe(notify({ message: 'Zip task complete', onLast: true }));

});

gulp.task('default',['watch']);
