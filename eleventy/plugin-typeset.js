const typeset = require('typeset')

/** @param {import('typeset').Options} [options] */
function plugin(options) {
   /**
      @param {import('../types/eleventy').Config} eleventyConfig
      @param {string} [pluginNamespace]
    */
   function transform(eleventyConfig, pluginNamespace) {
      /** @type {Parameters<import('../types/eleventy').Config['addTransform']>[1]} */
      const t = (content, outputPath) =>
         (outputPath.endsWith('.html') ? typeset(content, options) : content)

      return pluginNamespace
         ? eleventyConfig.namespace(pluginNamespace, () => {
              eleventyConfig.addTransform('typeset', t)
           })
         : eleventyConfig.addTransform('typeset', t)
   }

   return transform
}

module.exports = plugin
