import typeset, { Options } from 'typeset'
import { Config } from 'eleventy'

type Plugin = (eleventyConfig: Config, pluginNamespace?: string) => string | void
type Content = Parameters<Config['addTransform']>[0]

export default function plugin(options: Options): Plugin {
   const transform: Plugin = (eleventyConfig, pluginNamespace) => {
      const t = (content: Content, outputPath: string): string =>
         outputPath.endsWith('.html') ? typeset(content, options) : content

      return pluginNamespace
         ? eleventyConfig.namespace(pluginNamespace, () => {
              eleventyConfig.addTransform('typeset', t)
           })
         : eleventyConfig.addTransform('typeset', t)
   }

   return transform
}
