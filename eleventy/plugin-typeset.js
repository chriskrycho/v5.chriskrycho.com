const applyTypeset = require('typeset')

module.exports = /** @param {{}} options */ options =>
   /**
      @param {import('../types/eleventy').Config} eleventyConfig
      @param {string} [pluginNamespace]
    */
   (eleventyConfig, pluginNamespace) => {
      eleventyConfig.namespace(pluginNamespace, () => {
         eleventyConfig.addTransform('typeset', applyTypeset(options))
      })
   }
