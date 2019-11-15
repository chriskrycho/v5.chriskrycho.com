// @ts-check

const path = require('path')

const markdown = require('./eleventy/markdown')
const typeset = require('./eleventy/plugin-typeset')
const spacewell = require('./eleventy/plugin-spacewell')
const localeDate = require('./eleventy/locale-date')

/**
@param {string} slug
@return {string | undefined}
*/
function toCollection(slug) {
   return path
      .dirname(slug.trim())
      .split(path.sep)
      .pop()
}

/**
   Use a path to create a collection from all items contained within it.

   @param {import("./types/eleventy").Config} config The eleventy config
   @param {string} path The path to filter as a collection
   @param {string} [name] An optional override name. If not supplied, the name will be a
                          slugified version of the path, e.g. `foo/bar` -> `foo-bar`
 */
function addCollectionFromDir(config, path, name = path) {
   config.addCollection(name, collections =>
      collections
         .getAllSorted()
         .reverse()
         .filter(collection => collection.inputPath.includes(path)),
   )
}

/**
   @param {import("./types/eleventy").Config} config
   @returns {import("./types/eleventy").UserConfig}
 */
function config(config) {
   config.addPlugin(
      typeset({
         only: 'article',
         disable: ['smallCaps', 'hyphenate', 'ligatures', 'smallCaps'],
      }),
   )

   config.addPlugin(spacewell({ emDashes: true, enDashes: true }))

   config.addFilter('md', markdown.render.bind(markdown))
   config.addFilter('inlineMd', markdown.renderInline.bind(markdown))

   config.addFilter('toCollection', toCollection)
   config.addFilter('stringify', obj => JSON.stringify(obj))

   config.addShortcode('localeDate', localeDate)

   config.addPassthroughCopy('site/_redirects')
   config.addPassthroughCopy('site/assets')
   config.addPassthroughCopy('site/robots.txt')

   addCollectionFromDir(config, 'journal')
   addCollectionFromDir(config, 'essays')
   addCollectionFromDir(config, 'library')
   addCollectionFromDir(config, 'photography')

   config.setLibrary('md', markdown)

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
      markdownTemplateEngine: false,
   }
}

module.exports = config
