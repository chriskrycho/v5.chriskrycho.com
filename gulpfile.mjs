import gulp from 'gulp';
import gulpDartSass from 'gulp-dart-sass';
import del from 'del';

// side-effectful import
import 'sass';

const { src, dest, parallel, series, watch: gulpWatch } = gulp;
const { sync, logError } = gulpDartSass;

const build = (file) => () =>
   src(file)
      .pipe(
         sync({
            outputStyle: 'compressed',
            sourceMap: true,
         }).on('error', logError),
      )
      .pipe(dest('./site/_styles'));

export function style() {
   return build('./site/_includes/styles/style.scss')();
}

export function print() {
   return build('./site/_includes/styles/print.scss')();
}

export function fonts() {
   return build('./site/_includes/styles/fonts.scss')();
}

export function clean() {
   return del([
      './site/_includes/styles/style.css',
      './site/_includes/styles/fonts.css',
      './site/_includes/styles/print.css',
   ]);
}

export const all = parallel(style, fonts, print);

export function watch() {
   gulpWatch('./site/_includes/styles/**/*.scss', all);
}

export default series(clean, all);
