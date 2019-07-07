const applyTypeset = require('typeset')

module.exports = options => (eleventyConfig, pluginNamespace) => {
   eleventyConfig.namespace(pluginNamespace, () => {
      eleventyConfig.addTransform('typeset', applyTypeset(options))
   })
}
