/* eslint @typescript-eslint/camelcase: off */

import { Maybe } from 'true-myth'
import { Dict, EleventyClass, Item } from '../types/eleventy'
import Feed, { FeedItem } from '../types/json-feed'
import absoluteUrl from './absolute-url'
import { canParseDate } from './date-time'
import isoDate from './iso-date'
import siteTitle from './site-title'
import toCollection from './to-collection'

const { Just, just, nothing } = Maybe

type BuildInfo = typeof import('../site/_data/build')
type SiteConfig = typeof import('../site/_data/config')

// Needless, but delightful, type shenaniganry.
type NonString<T> = T extends string ? never : T

function optionalString(value: string): string
function optionalString<T>(value: NonString<T>): undefined
function optionalString(value: unknown): string | undefined {
   return typeof value === 'string' ? value : undefined
}

interface Book {
   title: string
   author: string
   year?: number | string
   review: string
   rating: string
   cover?: string
}

function isBook(maybeBook: unknown): maybeBook is Book {
   if (!maybeBook || typeof maybeBook !== 'object') {
      return false
   }

   let maybe = maybeBook as Dict<unknown>

   return (
      typeof maybe.title === 'string' &&
      typeof maybe.author === 'string' &&
      typeof maybe.review === 'string' &&
      typeof maybe.rating === 'string' &&
      (maybe.year
         ? typeof maybe.year === 'number' || typeof maybe.year === 'string'
         : true) &&
      (maybe.cover ? typeof maybe.cover === 'string' : true)
   )
}

function describe(book: Book): string {
   let year = book.year ? ` (${book.year})` : ''
   return `
      <p><cite>${book.title}</cite>, ${book.author}${year}</p>
      <p><b>${book.rating}:</b> ${book.review}</p>
   `
}

const contentHtmlFor = (item: Item): string => {
   const audience =
      typeof item.data?.audience === 'string'
         ? `<p><b>Assumed audience:</b> ${item.data.audience}</p>`
         : ''

   const book = item.data?.book
   const bookInfo = isBook(book) ? describe(book) : ''

   return audience + bookInfo + item.templateContent
}

const itemTitle = (item: Item): string | undefined => {
   const sectionMarker = toCollection(item.inputPath)
   const { title } = item.data ?? {}
   return sectionMarker && title ? `[${sectionMarker}] ${title}` : undefined
}

/**
   Map 11ty `Item`s into JSON Feed `FeedItem`s.
 */
const toFeedItemGivenConfig = (config: SiteConfig) => (item: Item): Maybe<FeedItem> =>
   canParseDate(item.date)
      ? just<FeedItem>({
           id: absoluteUrl(item.url, config.url),
           author: {
              name: config.author.name,
              url: config.url,
           },
           title: itemTitle(item),
           url: absoluteUrl(item.url, config.url),
           date_published: isoDate(item.date),
           content_html: contentHtmlFor(item),
           summary: optionalString(item.data?.summary ?? item.data?.subtitle),
           date_modified:
              typeof item.data?.updated === 'string' || item.data?.updated instanceof Date
                 ? isoDate(item.data.updated)
                 : undefined,
           image: optionalString(
              item.data?.image ?? (item.data?.book as undefined | Dict<string>)?.cover,
           ),
           external_url: optionalString(item.data?.link),
           tags: Array.isArray(item.data?.tags) ? item.data?.tags : [],
           banner_image: optionalString(item.data?.splash),
        })
      : nothing()

/**
   Generate a JSON Feed compliant object for a given set of items.

   @param items The collection of items from 11ty
 */
const jsonFeed = (
   items: Item[],
   config: SiteConfig,
   permalink: string,
   title: string,
): Feed => ({
   version: 'https://jsonfeed.org/version/1',
   title: siteTitle(title, config),
   home_page_url: config.url,
   feed_url: absoluteUrl(permalink, config.url),
   description: config.description,
   items: items
      .map(toFeedItemGivenConfig(config))
      .filter(Maybe.isJust)
      .map(Just.unwrap),
})

interface EleventyData {
   collections: {
      all: Item[]
      [key: string]: Item[] | undefined
   }
   config: SiteConfig
   page: Item
   pages: BuildInfo[]
   permalink?: string
}

export class JSONFeed implements EleventyClass {
   declare collection?: string
   declare title?: string

   data(): ReturnType<NonNullable<EleventyClass['data']>> {
      return {
         eleventyExcludeFromCollections: true,
         permalink: (/* _: EleventyData */): string =>
            this.collection ? `/${this.collection}/feed.json` : '/feed.json',
      }
   }

   render({ collections, config, page }: EleventyData): string {
      const collection = this.collection ?? 'all'
      const title = this.title ?? config.title.normal
      return JSON.stringify(
         jsonFeed((collections[collection] ?? []).reverse(), config, page.url, title),
      )
   }
}

export default JSONFeed
