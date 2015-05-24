var gulp = require('gulp');
var babel = require('gulp-babel');

var path = require('path');

var paths = {
  es6: ['server/**/*.js', '!server/node_modules/**'],
  es5: 'es5_server',
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, 'es6'),
};
gulp.task('babel', function () {
  return gulp.src(paths.es6)
    .pipe(babel({
      optional: ['es7.asyncFunctions']
    }))
    .pipe(gulp.dest(paths.es5));
});
gulp.task('watch', function () {
  gulp.watch(paths.es6, ['babel']);
});
gulp.task('default', ['watch']);
