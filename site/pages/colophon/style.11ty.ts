import path from 'path'
import Stylesheet from '../../../eleventy/stylesheet'
import { Dict } from '../../../types/eleventy'

export default class Style extends Stylesheet {
   outputPath: string
   inputPath: string

   data(): Dict<string> {
      return {
         ...super.data(),
         layout: '_custom-css',
      }
   }

   constructor() {
      super()

      this.outputPath = '/colophon.css'
      this.inputPath = path.join(__dirname, 'style.scss')
   }
}
