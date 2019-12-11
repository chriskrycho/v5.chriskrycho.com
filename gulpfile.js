const { src, dest, parallel, series, watch } = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

const build = file => () =>
   src(file)
      .pipe(
         sass({
            outputStyle: 'compressed',
            sourceMap: true,
         }).on('error', sass.logError),
      )
      .pipe(dest('./site/_includes/styles'))

function style() {
   return build('./site/_includes/styles/style.scss')()
}

function fonts() {
   return build('./site/_includes/styles/fonts.scss')()
}

function clean() {
   return del(['./site/_includes/styles/style.css', './site/_includes/styles/fonts.css'])
}

const all = parallel(style, fonts)

function watchStyles() {
   watch('./site/_includes/styles/**/*.scss', all)
}
// const watchStyles = () => watch('./site/_includes/styles/**/*.scss', all)

exports.clean = clean
exports.style = style
exports.fonts = fonts
exports.watch = watchStyles
exports.all = all
exports.default = series(clean, all)
