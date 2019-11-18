import path from 'path'

import { Config, Item, UserConfig } from '../types/eleventy'
import absoluteUrl from './absolute-url'
import archiveByYear from './archive-by-year'
import copyright from './copyright'
import currentPage from './current-page'
import toDateTime, { canParseDate } from './date-time'
import isoDate from './iso-date'
import localeDate from './locale-date'
import markdown from './markdown'
import spacewell from './plugin-spacewell'
import typeset from './plugin-typeset'
import siteTitle from './site-title'
import { history, edit } from './page-links'

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
      collections
         .getAllSorted()
         .reverse()
         .filter(collection => collection.inputPath.includes(path)),
   )
}

function config(config: Config): UserConfig {
   config.addPlugin(
      typeset({
         only: '.content-block',
         disable: ['smallCaps', 'hyphenate', 'ligatures', 'smallCaps'],
      }),
   )

   config.addPlugin(spacewell({ emDashes: true, enDashes: true }))

   config.addFilter('md', markdown.render.bind(markdown))
   config.addFilter('inlineMd', markdown.renderInline.bind(markdown))

   config.addFilter('toCollection', toCollection)
   config.addFilter('stringify', obj => JSON.stringify(obj))
   config.addFilter('archiveByYears', archiveByYear)
   config.addFilter('absoluteUrl', absoluteUrl)
   config.addFilter('isoDate', isoDate)
   config.addFilter('toDateTime', toDateTime)
   config.addFilter('siteTitle', siteTitle)
   config.addFilter('withValidDate', (items: Item[]) =>
      items.filter(item => canParseDate(item.data.date)),
   )
   config.addFilter('current', currentPage)
   config.addFilter('editLink', edit)
   config.addFilter('historyLink', history)

   config.addShortcode('localeDate', localeDate)
   config.addShortcode('copyright', copyright)

   config.addPassthroughCopy('site/_redirects')
   config.addPassthroughCopy('site/assets')
   config.addPassthroughCopy('site/robots.txt')

   addCollectionFromDir(config, 'journal')
   addCollectionFromDir(config, 'essays')
   addCollectionFromDir(config, 'library')
   addCollectionFromDir(config, 'photography')

   config.setLibrary('md', markdown)

   config.setDataDeepMerge(true)

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

// Needs to be this way so that the import resolves as expected in `.eleventy.js`.
module.exports = config
