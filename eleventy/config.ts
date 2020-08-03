import { Config, Item, UserConfig, Collection } from '../types/eleventy'
import absoluteUrl from './absolute-url'
import archiveByYear, { byDate, Order } from './archive-by-year'
import copyright from './copyright'
import currentPage from './current-page'
import toDateTime, { canParseDate } from './date-time'
import isoDate from './iso-date'
import localeDate from './locale-date'
import markdown from './markdown'
import * as PageLinks from './page-links'
import spacewell from './plugin-spacewell'
import typeset from './plugin-typeset'
import siteTitle from './site-title'
import excludingCollection from './excluding-collection'
import excludingStandalonePages from './excluding-standalone-pages'
import toCollection from './to-collection'

import './feed' // for extension of types -- TODO: move those types elsewhere!

/**
   Use a path to create a collection from all items contained within it.

   @param config The eleventy config
   @param path   The path to filter as a collection
   @param name   An optional override name. If not supplied, the name will be a
                 slugified version of the path, e.g. `foo/bar` -> `foo-bar`
 */
function addCollectionFromDir(config: Config, path: string, name: string = path): void {
   config.addCollection(name, collections =>
      collections.getAll().filter(collection => collection.inputPath.includes(path)),
   )
}

const isNotVoid = <A>(a: A | null | undefined): a is A => a != null

const firstInCollectionNamed = (collectionName: string) => (item: Item): boolean =>
   item.data?.collections[collectionName]?.includes(item) ?? false

function latest(collection: Collection): Item[] {
   const all = excludingStandalonePages(collection.getAll()).sort(byDate(Order.NewFirst))

   return [
      all.find(firstInCollectionNamed('essays')),
      all.find(firstInCollectionNamed('journal')),
      all.find(firstInCollectionNamed('notes')),
      all.find(firstInCollectionNamed('library')),
      all.find(firstInCollectionNamed('appearances')),
   ]
      .filter(isNotVoid)
      .sort(byDate(Order.NewFirst))
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
      items.filter(item => canParseDate(item.date)),
   )
   config.addFilter('current', currentPage)
   config.addFilter('editLink', PageLinks.edit)
   config.addFilter('historyLink', PageLinks.history)
   config.addFilter('sourceLink', PageLinks.source)
   config.addFilter('excludingCollection', excludingCollection)
   config.addFilter('excludingStandalonePages', excludingStandalonePages)
   config.addFilter('concat', (a: Item[] | undefined, b: Item[] | undefined) => {
      return (a ?? []).concat(b ?? [])
   })

   config.addShortcode('localeDate', localeDate)
   config.addShortcode('copyright', copyright)

   config.addPassthroughCopy('site/_redirects')
   config.addPassthroughCopy('site/admin')
   config.addPassthroughCopy('site/assets')
   config.addPassthroughCopy('site/robots.txt')
   config.addPassthroughCopy('site/styles')

   config.addCollection('pages', collection =>
      collection.getAll().filter(item => item.data?.standalonePage),
   )
   addCollectionFromDir(config, 'journal')
   addCollectionFromDir(config, 'essays')
   addCollectionFromDir(config, 'library')
   addCollectionFromDir(config, 'notes')
   addCollectionFromDir(config, 'appearances')

   config.addCollection('latest', latest)

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
