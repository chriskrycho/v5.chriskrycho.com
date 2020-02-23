/* eslint @typescript-eslint/camelcase: off */

import { Dict, EleventyClass, Item } from '../types/eleventy'
import Feed, { FeedItem } from '../types/json-feed'
import absoluteUrl from './absolute-url'
import { canParseDate } from './date-time'
import isoDate from './iso-date'
import siteTitle from './site-title'
import toCollection from './to-collection'
import markdown from './markdown'

type BuildInfo = typeof import('../site/_data/build')
type SiteConfig = typeof import('../site/_data/config')

/** Defensive function in case handed bad data */
const optionalString = (value: unknown): string | undefined =>
   typeof value === 'string' ? value : undefined

interface Book {
   title: string
   author: string
   year?: number | string
   review?: {
      rating:
         | 'Required'
         | 'Recommended'
         | 'Recommended With Qualifications'
         | 'Not Recommended'
      summary: string
   }
   cover?: string
   link?: string
}

/** Extending the base Eleventy item with my own data */
declare module '../types/eleventy' {
   interface Data {
      title?: string
      subtitle?: string
      summary?: string
      tags?: string[]
      updated?: string | Date
      qualifiers?: {
         audience?: string
         epistemic?: string
      }
      image?: string
      link?: string
      splash?: string
      book?: Book
      standalonePage?: boolean
   }
}

type TypeOf =
   | 'undefined'
   | 'object'
   | 'boolean'
   | 'number'
   | 'bigint'
   | 'string'
   | 'symbol'
   | 'function'

function hasType<T extends TypeOf>(type: T, item: unknown): item is T {
   return typeof item === type
}

function isBook(maybeBook: unknown): maybeBook is Book {
   if (typeof maybeBook !== 'object' || !maybeBook) {
      return false
   }

   const maybe = maybeBook as Dict<unknown>

   return (
      typeof maybe.title === 'string' &&
      typeof maybe.author === 'string' &&
      (hasType('number', maybe.year) || hasType('string', maybe.year)) &&
      hasType('object', maybe.review) &&
      hasType('string', maybe.cover) &&
      hasType('string', maybe.link)
   )
}

function describe(book: Book): string {
   const linked = (content: string): string =>
      book.link ? `<a href='${book.link}' rel='nofollow'>${content}</a>` : content

   const year = book.year ? ` (${book.year})` : ''

   const title = linked(`<cite>${book.title}</cite>`)
   const bookInfo = `<p>${title}, ${book.author}${year}</p>`
   const review = book.review
      ? `<p><b>${book.review.rating}:</b> ${book.review.summary}</p>`
      : ''

   return `${bookInfo}\n${review}`
}

const contentHtmlFor = (item: Item): string => {
   const subtitle =
      typeof item.data?.subtitle === 'string'
         ? `<p><i>${markdown.renderInline(item.data.subtitle)}</i></p>`
         : ''

   const audience =
      typeof item.data?.qualifiers?.audience === 'string'
         ? `<p><b>Assumed audience:</b> ${item.data.qualifiers.audience}</p>`
         : ''

   const epistemicStatus =
      typeof item.data?.qualifiers?.epistemic === 'string'
         ? `<p><b>Epistemic status:</b> ${item.data.qualifiers.epistemic}</p>`
         : ''

   const book = item.data?.book
   const bookInfo = isBook(book) ? describe(book) : ''

   return subtitle + audience + epistemicStatus + bookInfo + item.templateContent
}

const itemTitle = (item: Item): string | undefined => {
   const sectionMarker = toCollection(item.inputPath)
   const { title } = item.data ?? {}
   return sectionMarker && title ? `[${sectionMarker}] ${title}` : undefined
}

/**
   Map 11ty `Item`s into JSON Feed `FeedItem`s.
 */
const toFeedItemGivenConfig = (config: SiteConfig) => (item: Item): FeedItem | null =>
   canParseDate(item.date) && item.data?.standalonePage !== true
      ? {
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
           image: optionalString(item.data?.image ?? item.data?.book?.cover),
           external_url: optionalString(item.data?.link ?? item.data?.book?.link),
           tags: Array.isArray(item.data?.tags) ? item.data?.tags : [],
           banner_image:
              optionalString(item.data?.splash) ??
              optionalString(item.data?.book?.cover) ??
              optionalString(item.data?.image),
        }
      : null

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
      .filter(<T>(item: T | null): item is T => !!item)
      .reverse(),
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

type ClassData = ReturnType<NonNullable<EleventyClass['data']>>

export class JSONFeed implements EleventyClass {
   declare collection?: string
   declare title?: string

   data(): ClassData {
      return {
         standalonePage: true,
         permalink: (/* _: EleventyData */): string =>
            this.collection ? `/${this.collection}/feed.json` : '/feed.json',
      }
   }

   render({ collections, config, page }: EleventyData): string {
      const collection = this.collection ?? 'all'
      const title = this.title ?? config.title.normal
      return JSON.stringify(
         jsonFeed(collections[collection] ?? [], config, page.url, title),
      )
   }
}

export default JSONFeed
