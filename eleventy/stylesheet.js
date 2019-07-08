const sass = require('sass')

module.exports = class Stylesheet {
   data() {
      return {
         permalink: this.outputPath,
      }
   }

   render() {
      return sass.renderSync({
         file: this.inputPath,
         outputStyle: 'compressed',
      }).css
   }
}
