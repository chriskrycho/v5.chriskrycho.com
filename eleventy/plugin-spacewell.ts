import spacewell, { Options } from '../lib/spacewell'
import { Config } from 'eleventy'

type Plugin = (eleventyConfig: Config, pluginNamespace?: string) => string | void
type Content = Parameters<Config['addTransform']>[0]

export default function plugin(options: Options): Plugin {
   const run = spacewell(options)

   const transform: Plugin = (eleventyConfig, pluginNamespace) => {
      const t = (content: Content, outputPath: string): string =>
         outputPath.endsWith('.html') ? run(content) : content

      return pluginNamespace
         ? eleventyConfig.namespace(pluginNamespace, () => {
              eleventyConfig.addTransform('spacewell', t)
           })
         : eleventyConfig.addTransform('spacewell', t)
   }

   return transform
}
