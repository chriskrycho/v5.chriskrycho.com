import path from 'path'
import Stylesheet from '../eleventy/stylesheet'

export default class Style extends Stylesheet {
   outputPath: string
   inputPath: string

   constructor() {
      super()

      this.outputPath = '/fonts.css'
      this.inputPath = path.join(__dirname, '_includes', 'styles', 'fonts.scss')
   }
}
