// @ts-check

const typesetPlugin = require('./eleventy/plugin-typeset')

/**
   Use a path to create a collection from all items contained within it.

   @param {string} path The path to filter as a collection
   @return {(collections: import("./types/eleventy").Collections) => import("./types/eleventy").Collection[]}
 */
function collectionFromPath(path) {
   return collections =>
      collections
         .getAll()
         .filter(collection => collection.inputPath.includes(path))
}

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

   config.addPassthroughCopy('site/_redirects')
   config.addPassthroughCopy('site/assets')

   config.addCollection('posts', collectionFromPath('content/writing/posts'))
   config.addCollection('essays', collectionFromPath('content/writing/essays'))
   config.addCollection('notes', collectionFromPath('content/writing/notes'))

   return {
      dir: {
         input: 'site',
         output: 'public',
         includes: '_includes',
         layouts: '_layouts',
      },
      templateFormats: ['html', 'njk', '11ty.js', 'md'],
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
   }
}

module.exports = config
