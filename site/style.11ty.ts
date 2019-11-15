import path from 'path'
import Stylesheet from '../eleventy/stylesheet'

module.exports = class Style extends Stylesheet {
   outputPath: string
   inputPath: string

   constructor() {
      super()

      this.outputPath = '/style.css'
      this.inputPath = path.join(__dirname, '_includes', 'styles', 'style.scss')
   }
}
