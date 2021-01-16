import spacewell, { Options } from '../lib/spacewell';
import { Config } from 'eleventy';
import cheerio from 'cheerio';

type Plugin = (eleventyConfig: Config, pluginNamespace?: string) => string | void;
type Content = Parameters<Config['addTransform']>[0];

const PAGE_CONTENT_SELECTOR = '.content';

export default function plugin(options: Options): Plugin {
   const wellSpaced = spacewell(options);

   const transform: Plugin = (eleventyConfig, pluginNamespace) => {
      const t = (content: Content, outputPath: string): string => {
         if (!outputPath.endsWith('.html')) {
            return content;
         }

         const dom = cheerio.load(content);
         const pageContent = dom.html(PAGE_CONTENT_SELECTOR);

         if (pageContent) {
            dom(PAGE_CONTENT_SELECTOR).replaceWith(wellSpaced(pageContent));
            return dom.html();
         }

         return content;
      };

      return pluginNamespace
         ? eleventyConfig.namespace(pluginNamespace, () => {
              eleventyConfig.addTransform('spacewell', t);
           })
         : eleventyConfig.addTransform('spacewell', t);
   };

   return transform;
}
