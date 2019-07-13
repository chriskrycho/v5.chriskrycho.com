const { spacewell } = require('../lib/spacewell')

/**
   @param {import('../lib/spacewell').Options} options
 */
function plugin(options) {
   const run = spacewell(options)

   /**
      @param {import('../types/eleventy').Config} eleventyConfig
      @param {string} [pluginNamespace]
    */
   function transform(eleventyConfig, pluginNamespace) {
      /** @type {Parameters<import('../types/eleventy').Config['addTransform']>[1]} */
      const t = (content, outputPath) =>
         (outputPath.endsWith('.html') ? run(content) : content)

      return pluginNamespace
         ? eleventyConfig.namespace(pluginNamespace, () => {
              eleventyConfig.addTransform('spacewell', t)
           })
         : eleventyConfig.addTransform('spacewell', t)
   }

   return transform
}

module.exports = plugin
