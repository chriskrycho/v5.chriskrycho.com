/* eslint @typescript-eslint/camelcase: off */

import { Maybe } from 'true-myth'
import { EleventyClass, Item } from '../types/eleventy'
import Feed, { FeedItem } from '../types/json-feed'
import absoluteUrl from './absolute-url'
import { canParseDate } from './date-time'
import isoDate from './iso-date'
import siteTitle from './site-title'

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

const contentHtmlFor = (item: Item): string =>
   typeof item.data.audience === 'string'
      ? `<p><b>Assumed audience:</b> ${item.data.audience}</p>${item.templateContent}`
      : item.templateContent

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
           title: item.data.title as string | undefined,
           url: absoluteUrl(item.url, config.url),
           date_published: isoDate(item.date),
           content_html: contentHtmlFor(item),
           summary: optionalString(item.data.summary ?? item.data.subtitle),
           date_modified:
              typeof item.data.updated === 'string' || item.data.updated instanceof Date
                 ? isoDate(item.data.updated)
                 : undefined,
           image: optionalString(item.data.image),
           external_url: optionalString(item.data.link),
           tags: Array.isArray(item.data.tags) ? item.data.tags : [],
           banner_image: optionalString(item.data.splash),
        })
      : nothing()

/**
   Generate a JSON Feed compliant object for a given set of items.

   @param items The collection of items from 11ty
 */
const jsonFeed = (items: Item[], config: SiteConfig, permalink: string): Feed => ({
   version: 'https://jsonfeed.org/version/1',
   title: siteTitle(config.title.normal, config),
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
   data(): ReturnType<NonNullable<EleventyClass['data']>> {
      return {
         eleventyExcludeFromCollections: true,
         permalink: (/* _: EleventyData */): string => '/feed.json',
      }
   }

   render({ collections, config, page }: EleventyData): string {
      return JSON.stringify(jsonFeed(collections.all.reverse(), config, page.url))
   }
}

export default JSONFeed
