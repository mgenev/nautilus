var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var resolve = require("resolve-dep");
var deepExtend = require("deep-extend");
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');

var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('less', function(){
  return compileFile(paths.style, paths.output, {compress: true});
});

/**
 * Compile a less file
 */
function compileFile(input, output, options){
  return gulp.src(input)
    .pipe(sourcemaps.init())
    .pipe(less(deepExtend({
        filename: input,
        paths: [
          '.',
          path.dirname(path.dirname(resolve.npm('bootstrap-less')[0]))
        ]
        // plugins: [cleancss,autoprefix]
      }, options)))

    // .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(minify({restructuring: false, keepBreaks: !options.compress}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(output));
}
