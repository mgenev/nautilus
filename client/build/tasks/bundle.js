var gulp = require('gulp');
var paths = require('../paths');
var jspm = require('jspm/api');

gulp.task('bundle', function (done) {
  jspm.bundle(
    [
      '*',
      'aurelia-skeleton-navigation/*',
      'aurelia-bootstrapper',
      'aurelia-http-client',
      'aurelia-dependency-injection',
      'aurelia-router'
    ].join(' + '),
    'app-bundle.js',
    {inject:true, minify: true}
  ).then(function () {
    gulp.src('./app-bundle.js')
      .pipe(gulp.dest(paths.output));
    done();
  });
});
