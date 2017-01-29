import bc from 'babel-core/register';
import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import strip from 'gulp-strip-comments';

const babel_opt = {presets:['es2015','react']};

let build_list = [];
let watch_list = [];
let add_task_queue = (name,src)=>{
  build_list.push(name);
  watch_list.push([src,name]);
}

const bundle_list = [
  'static/js/jquery.min.js',
  'static/js/bootstrap.min.js',
  // 'static/js/ReactRouter.min.js',
  'static/js/preact.min.js',
  'static/js/system.js',
  'src/lib/Queue.js'
  // 'static/js/preact-compat.min.js'
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

let src_compile = (name,src_es6,dist_js)=>{
  add_task_queue(name,src_es6,dist_js);
  gulp.task(name, ()=> {
    gulp.src(src_es6)
      .pipe(babel(babel_opt))
      .pipe(strip())
      .pipe(gulp.dest(dist_js));
  });
};

// gulp.task('components', ()=> {
//   gulp.src('src/components/*.jsx')
//     .pipe(babel(babel_opt))
//     .pipe(strip())
//     .pipe(gulp.dest('dist/components'));
// });

// gulp.task('appjs', ()=> {
//   gulp.src(appjs_list)
//     .pipe(babel(babel_opt))
//     .pipe(strip())
//     .pipe(gulp.dest('static/js'));
// });

src_compile('components','src/components/*.jsx','dist/components');
src_compile('appjs',appjs_list,'static/js');

gulp.task('test', ()=> {
  gulp.src('src/test/*.es6')
    .pipe(babel(babel_opt))
    .pipe(gulp.dest('dist/test'))
    .pipe(mocha());
});

gulp.task('default', ['bundle','components','test']);
