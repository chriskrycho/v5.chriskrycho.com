// @ts-check

import typesetPlugin from 'eleventy-plugin-typeset'

/**
 *
 * @param {import("./types/eleventy").Config} config
 * @returns {import("./types/eleventy").UserConfig}
 */
function config(config) {
   config.addPlugin(
      typesetPlugin({
         only: '.article',
         disable: ['smallCaps', 'hyphenate'],
      }),
   )

   return {
      dir: {
         input: 'site',
         output: 'public',
         includes: 'templates',
      },
      jsDataFileSuffix: '.11ty.js',
      templateFormats: ['html', 'njk'],
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
   }
}

export default config
