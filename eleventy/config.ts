import path from 'path'

import markdown from './markdown'
import typeset from './plugin-typeset'
import spacewell from './plugin-spacewell'
import localeDate from './locale-date'
import { Config, UserConfig } from '../types/eleventy'
import itemsByMonth from './items-by-month'

/**
   @param {string} slug
   @return {string | undefined}
*/
function toCollection(slug: string): string | undefined {
   return path
      .dirname(slug.trim())
      .split(path.sep)
      .pop()
}

/**
   Use a path to create a collection from all items contained within it.

   @param config The eleventy config
   @param path   The path to filter as a collection
   @param name   An optional override name. If not supplied, the name will be a
                 slugified version of the path, e.g. `foo/bar` -> `foo-bar`
 */
function addCollectionFromDir(config: Config, path: string, name: string = path): void {
   config.addCollection(name, collections =>
      itemsByMonth(
         collections
            .getAllSorted()
            .filter(collection => collection.inputPath.includes(path)),
      ),
   )
}

function config(config: Config): UserConfig {
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
   config.addFilter('byMonth', itemsByMonth)

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

// Needs to be this way so that the import resolves as expected in `.eleventy.js`.
module.exports = config
