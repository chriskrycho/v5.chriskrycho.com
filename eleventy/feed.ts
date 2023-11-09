import striptags from 'striptags';
import { DateTime } from 'luxon';
import { Result } from 'true-myth';

import { Dict, EleventyClass, Item } from '../types/eleventy';
import JsonFeed, { FeedItem } from '../types/json-feed';
import absoluteUrl from './absolute-url';
import { canParseDate } from './date-time';
import isoDate from './iso-date';
import siteTitle from './site-title';
import { toRootCollection } from './collection';
import markdown from './markdown';
import localeDate from './locale-date';

type BuildInfo = typeof import('../site/_data/build');
type SiteConfig = typeof import('../site/_data/config');

/** Defensive function in case handed bad data */
const optionalString = (value: unknown): string | undefined =>
   typeof value === 'string' ? value : undefined;

type Author = { author: string } | { authors: string[] };

interface Review {
   review?: {
      rating:
         | 'Required'
         | 'Recommended'
         | 'Recommended With Qualifications'
         | 'Not Recommended';
      summary: string;
   };
}

interface BookMeta {
   title: string;
   year?: number | string;
   cover?: string;
   link?: string;
}

// Must be a `type` alias because interfaces cannot extend unions.
type Book = BookMeta & Author & Review;

/** Extending the base Eleventy item with my own data */
declare module '../types/eleventy' {
   interface Data {
      title?: string;
      subtitle?: string;
      summary?: string;
      tags?: string[];
      date?: string | Date;
      updated?: string | Date;
      qualifiers?: {
         audience?: string;
         epistemic?: string;
      };
      updates?: Array<{ at: string; changes?: string }>;
      image?: string;
      link?: string;
      splash?: string;
      book?: Book;
      standalonePage?: boolean;
      featured?: boolean;
      draft?: boolean;
      /**
       * Allow overriding the normal feed ID to enable keeping feed entries stable even if
       * the slug changes.
       */
      feedId?: string;
      /** Markdown-enabled thanks to people who contributed to the thing. */
      thanks?: string;
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
   | 'function';

function is<T extends TypeOf>(type: T, item: unknown): item is T {
   return typeof item === type;
}

function isBook(maybeBook: unknown): maybeBook is Book {
   if (typeof maybeBook !== 'object' || !maybeBook) {
      return false;
   }

   const maybe = maybeBook as Dict<unknown>;

   return (
      typeof maybe.title === 'string' &&
      (typeof maybe.author === 'string' || Array.isArray(maybe.authors)) &&
      (is('number', maybe.year) || is('string', maybe.year)) &&
      is('object', maybe.review) &&
      is('string', maybe.cover) &&
      is('string', maybe.link)
   );
}

const joinAuthors = (authors: string[]): Result<string, string> => {
   switch (authors.length) {
      case 0:
         return Result.err('specified `authors` but passed no values!');
      case 1:
         return Result.ok(authors[0]);
      case 2:
         return Result.ok(`${authors[0]} and ${authors[1]}`);
      default:
         return Result.ok(
            `${authors.slice(0, authors.length - 1).join(', ')}, and ${
               authors[authors.length - 1]
            }`,
         );
   }
};

const authorString = (book: Book): Result<string, string> =>
   'authors' in book ? joinAuthors(book.authors) : Result.ok(book.author);

function describe(book: Book): string {
   const linked = (content: string): string =>
      book.link ? `<a href='${book.link}' rel='nofollow'>${content}</a>` : content;

   const year = book.year ? ` (${book.year})` : '';

   const title = linked(`<cite>${book.title}</cite>`);
   const author = authorString(book).match({
      Ok: (a) => a,
      Err: (r) => {
         throw new Error(`Error describing ${book.title}: ${r}`);
      },
   });

   const bookInfo = `<p>${title}, ${author}${year}</p>`;
   const review = book.review
      ? `<p><b>${book.review.rating}:</b> ${book.review.summary}</p>`
      : '';

   return `${bookInfo}\n${review}`;
}

function entryTitleFor(item: Item): string {
   return item.data?.title ?? localeDate(item.date, 'yyyy.MM.dd.HHmm');
}

function contentHtmlFor(
   item: Item,
   config: SiteConfig,
   includeReplyViaEmail: boolean,
): string {
   const subtitle =
      typeof item.data?.subtitle === 'string'
         ? `<p><i>${markdown.renderInline(item.data.subtitle)}</i></p>`
         : '';

   const audience =
      typeof item.data?.qualifiers?.audience === 'string'
         ? `<p><b>Assumed audience:</b> ${markdown.renderInline(
              item.data.qualifiers.audience,
           )}</p>`
         : '';

   const epistemicStatus =
      typeof item.data?.qualifiers?.epistemic === 'string'
         ? `<p><b>Epistemic status:</b> ${markdown.renderInline(
              item.data.qualifiers.epistemic,
           )}</p>`
         : '';

   const updates = item.data?.updates
      ? `<p><b>Updates:</br></p><ul>
            ${item.data.updates
               .map(({ at, changes }) => {
                  let date = localeDate(at, 'yyyy/MM/dd HH:mm');
                  return changes
                     ? `<li><b>${date}:</b> ${markdown.renderInline(changes)}</li>`
                     : `<li><b>${date}</b></li>`;
               })
               .join('\n')}
        </ul>`
      : '';

   const book = item.data?.book;
   const bookInfo = isBook(book) ? describe(book) : '';

   const thanks = item.data?.thanks
      ? `<hr/><p><strong>Thanks:</strong> ${markdown.renderInline(item.data.thanks)}</p>`
      : '';

   const reply = includeReplyViaEmail
      ? ((): string => {
           const replySubject = encodeURIComponent(entryTitleFor(item));
           const replyUrl = `mailto:${config.author.email}?subject=${replySubject}`;
           return `<hr/><p><a href="${replyUrl}">Reply via email!</a></p>`;
        })()
      : '';

   return (
      subtitle +
      audience +
      epistemicStatus +
      bookInfo +
      updates +
      item.templateContent +
      thanks +
      reply
   );
}

function titleFor({
   item,
   photoItemTitles,
}: {
   item: Item;
   photoItemTitles: 'on' | 'off';
}): string | undefined {
   const sectionMarker = toRootCollection(item.inputPath);
   const { title } = item.data ?? {};

   const isPhoto =
      item.data?.collections['photos']?.some(
         ({ inputPath }) => item.inputPath === inputPath,
      ) ?? false;
   const photoTitleAllowed = !(isPhoto && photoItemTitles === 'off');
   const showTitle = sectionMarker && title && photoTitleAllowed;
   return showTitle ? `[${sectionMarker}] ${striptags(title)}` : undefined;
}

function summaryFor(item: Item): string {
   return item.data?.summary ?? item.data?.subtitle ?? striptags(item.templateContent);
}

/**
   Map 11ty `Item`s into JSON Feed `FeedItem`s.
 */
const toFeedItemGivenConfig =
   ({
      config,
      includeReplyViaEmail,
      photoItemTitles,
   }: {
      config: SiteConfig;
      includeReplyViaEmail: boolean;
      photoItemTitles: 'on' | 'off';
   }) =>
   (item: Item): FeedItem | null =>
      canParseDate(item.date) && item.data?.standalonePage !== true
         ? {
              id: absoluteUrl(item.data?.feedId ?? item.url, config.url),
              author: {
                 name: config.author.name,
                 url: config.url,
              },
              title: titleFor({ item, photoItemTitles }),
              url: absoluteUrl(item.url, config.url),
              date_published: isoDate(item.data?.date ?? item.date),
              content_html: contentHtmlFor(item, config, includeReplyViaEmail),
              summary: summaryFor(item),
              date_modified:
                 // can't use canParseDate b/c TS doesn't track that `updated` is usable in
                 // that scenario b/c it still thinks `data?.` is optional. :sigh:
                 typeof item.data?.updated === 'string' ||
                 item.data?.updated instanceof Date
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
         : null;

type JSONFeedConfig = {
   items: Item[];
   config: SiteConfig;
   permalink: string;
   title: string;
   includeReplyViaEmail: boolean;
   photoItemTitles: 'on' | 'off';
};

/**
   Generate a JSON Feed compliant object for a given set of items.

   @param items The collection of items from 11ty
 */
const jsonFeed = ({
   items,
   config,
   permalink,
   title,
   includeReplyViaEmail,
   photoItemTitles,
}: JSONFeedConfig): JsonFeed => ({
   version: 'https://jsonfeed.org/version/1',
   title: siteTitle(title, config),
   home_page_url: config.url,
   feed_url: absoluteUrl(permalink, config.url),
   description: config.description,
   items: items
      .map(toFeedItemGivenConfig({ config, includeReplyViaEmail, photoItemTitles }))
      .filter(<T>(item: T | null): item is T => item !== null)
      .sort(
         ({ date_published: a }, { date_published: b }) =>
            // we want newest first
            DateTime.fromISO(b as string).toMillis() -
            DateTime.fromISO(a as string).toMillis(),
      )
      .slice(0, 25),
});

interface EleventyData {
   collections: {
      all: Item[];
      [key: string]: Item[] | undefined;
   };
   config: SiteConfig;
   page: Item;
   pages: BuildInfo[];
   permalink?: string;
}

type ClassData = ReturnType<NonNullable<EleventyClass['data']>>;

export class JSONFeed implements EleventyClass {
   declare collection?: string;
   declare title?: string;
   declare permalink?: string;

   photoItemTitles: 'on' | 'off' = 'on';

   includeReplyViaEmail = true;

   data(): ClassData {
      return {
         standalonePage: true,
         excludeFromEleventyCollections: true,
         permalink: (/* _: EleventyData */): string => {
            return (
               this.permalink ??
               (this.collection ? `/${this.collection}/feed.json` : '/feed.json')
            );
         },
      };
   }

   render({ collections, config, page }: EleventyData): string {
      const collection = this.collection ?? 'live';
      const title = this.title ?? config.title.normal;
      return JSON.stringify(
         jsonFeed({
            items: collections[collection] ?? [],
            config,
            permalink: page.url,
            title,
            includeReplyViaEmail: this.includeReplyViaEmail,
            photoItemTitles: this.photoItemTitles,
         }),
      );
   }
}

export default JSONFeed;
