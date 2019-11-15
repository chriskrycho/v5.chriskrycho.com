import sass from 'sass'
import { Dict } from '../types/eleventy'

export default abstract class Stylesheet {
   abstract outputPath: string
   abstract inputPath: string

   data(): Dict<string> {
      return {
         permalink: this.outputPath,
      }
   }

   render(): Buffer {
      return sass.renderSync({
         file: this.inputPath,
         outputStyle: 'compressed',
      }).css
   }
}
