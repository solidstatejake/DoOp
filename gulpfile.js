const gulp = require('gulp');
const sass = require('gulp-sass');
      sass.compiler = require('node-sass');
const nodemon = require('gulp-nodemon');
const cssPath = 'app/static/css/';
const sassPath = 'app/static/sass/*';



function css() {
  return gulp.src(sassPath)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(cssPath))
}

function watch() {
  gulp.watch(sassPath, css)
}

function serve() {
 return nodemon({
    script: './app/app.js',
    ext: 'js html'
  }).on('start', watch)
  .on('restart', watch)
}

exports.serve = serve;







//
//
// function compileSass() {
//   return gulp.src(sassPath)
//   .pipe(sass().on('error', sass.logError))
//   .pipe(gulp.dest(cssPath))
//   .pipe(reload({stream: true}))
// }
//
// function watchSass() {
//   gulp.watch(sassPath, ['sass'])
// }
//
// function serve(done) {
//   nodemon({
//     script: 'server.js',
//     tasks: ['sass:watch'],
//     ext: 'js html',
//     env: { 'NODE_ENV': 'development' },
//     done: done
//   })
// }
//
//
// function run(serve, compileSass, watchSass) {
//   compileSass();
//   watchSass();
//   serve();
//   browserSync({ server: './app/app.js' });
// }
//
// //
// // const serve = async() => {
// //   return await nodemon({
// //     script: './app/app.js'
// //   }).on('start', watch)
// //   .on('change', watch)
// // };
//
// exports.run = run;
// //
// // gulp.task('serve', () => {
// //   const server = browserSync.create();
// //   server.init({
// //     baseDir: 'app/'
// //   });
// //   return server.watch('app/**', (event, file) => {
// //     server.reload();
// //   })
// // });
// //
// // gulp.task('sass', () => {
// //   return gulp.src(sassPath)
// //   .pipe(sass())
// //   .pipe(gulp.dest(cssPath))
// //   .pipe(browserSync.reload({
// //     stream: true
// //   }));
// // });
// //
// //
// // gulp.task('watch', () => {
// //   gulp.watch(`${sassPath}`, gulp.series('sass'))
// // });
//
// // exports.build = gulp.series(sass);