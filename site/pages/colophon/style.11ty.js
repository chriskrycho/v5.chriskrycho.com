const path = require('path')
const Stylesheet = require('../../../eleventy/stylesheet')

module.exports = class Style extends Stylesheet {
   data() {
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
