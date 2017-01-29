import bc from 'babel-core/register';
import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import strip from 'gulp-strip-comments';

const babel_opt = {presets:['es2015','react']};

const bundle_list = [
  'static/js/jquery.min.js',
  'static/js/bootstrap.min.js',
  // 'static/js/ReactRouter.min.js',
  'static/js/preact.min.js',
  'static/js/preact-compat.min.js',
  'static/js/system.js',
  'src/lib/Queue.js'
];
const appjs_list = [
  'src/pulsor/pulsor.es6',
  'src/pulsor/pulsor.preact.es6',
  'src/client/app.es6'
];

gulp.task('bundle', ()=>{
  gulp.src(bundle_list)
    .pipe(strip())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('static/js'));
});

gulp.task('components', ()=> {
  gulp.src('src/components/*.jsx')
    .pipe(babel(babel_opt))
    .pipe(strip())
    .pipe(gulp.dest('dist/components'));
});

gulp.task('appjs', ()=> {
  gulp.src(appjs_list)
    .pipe(babel(babel_opt))
    .pipe(strip())
    .pipe(gulp.dest('static/js'));
});

gulp.task('test', ()=> {
  gulp.src('src/test/*.es6')
    .pipe(babel(babel_opt))
    .pipe(gulp.dest('dist/test'))
    .pipe(mocha());
});

gulp.task('default', ['bundle','components','test']);
