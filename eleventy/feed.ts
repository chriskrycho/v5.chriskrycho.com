import striptags from 'striptags';
import { DateTime } from 'luxon';
import { Maybe, Result } from 'true-myth';

import { EleventyClass, Item } from '../types/eleventy';
import JsonFeed, { FeedItem } from '../types/json-feed';
import absoluteUrl from './absolute-url';
import { canParseDate } from './date-time';
import isoDate from './iso-date';
import siteTitle from './site-title';
import { toRootCollection } from './collection';
import markdown from './markdown';
import localeDate from './locale-date';
import { type Book, hasAuthors, imageValue, isBook, type Qualifiers } from './data';

type BuildInfo = typeof import('../site/_data/build');
type SiteConfig = typeof import('../site/_data/config');

/** Defensive function in case handed bad data */
const optionalString = (value: unknown): string | undefined =>
   typeof value === 'string' ? value : undefined;

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
   hasAuthors(book) ? joinAuthors(book.authors) : Result.ok(book.author);

function describe(book: Book): string {
   const linked = (content: string): string =>
      book.link ? `<a href='${book.link}' rel='nofollow'>${content}</a>` : content;

   const year = book.year ? ` (${book.year})` : '';

   const title = linked(`<cite>${book.title}</cite>`);
   const author = authorString(book).unwrapOrElse((reason) => {
      throw new Error(`Error describing ${book.title}: ${reason}`);
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

function htmlForQualifiers(qualifiers?: Qualifiers) {
   if (!qualifiers) return '';

   let audience = qualifiers.audience ?? '';
   let disclosure = qualifiers.disclosure ?? '';
   let context = qualifiers.context ?? '';
   let epistemicStatus = qualifiers.epistemic ?? '';

   // This is guaranteed to be a string here if it exists. Eleventy’s approach
   // does not let me “parse, don’t validate”. Need to finish lx. «sigh» So fail
   // fast if that is *not* true!
   if (Array.isArray(qualifiers.discusses))
      throw new Error('Invalid `qualifiers.discusses`');

   let contentNotice = qualifiers.discusses ?? '';

   // The same goes for retractions!
   if (typeof qualifiers.retraction === 'object')
      throw new Error('Invalid `qualifiers.retractions`');

   let retraction = qualifiers.retraction ?? '';

   return (
      retraction +
      audience +
      disclosure +
      context +
      epistemicStatus +
      contentNotice +
      '<hr/>'
   );
}

function contentHtmlFor(
   item: Item,
   config: SiteConfig,
   includeReplyViaEmail: boolean,
): string {
   const feedOnly =
      item.data?.feedOnly === true
         ? '<p><em>Psst: this is a feed-only item which will <em>never</em> appear on the regular site!</em></p>'
         : '';

   const subtitle =
      typeof item.data?.subtitle === 'string'
         ? `<p><i>${markdown.renderInline(item.data.subtitle)}</i></p>`
         : '';

   const qualifiers = htmlForQualifiers(item.data?.qualifiers);

   const updates =
      item.data?.updates && item.data.updates.length > 0
         ? `<p><i>Meaningful changes since publication:</i></p><ul>
            ${item.data.updates
               .map(({ at, changes }) => {
                  let date = localeDate(at, 'MMMM d, yyyy');
                  return `<li><i>${date}:</i> ${markdown.renderInline(changes)}</li>`;
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
           const replySubject = encodeURIComponent('Re: ' + entryTitleFor(item));
           const replyUrl = `mailto:${config.author.email}?subject=${replySubject}`;
           const email = `<a href="${replyUrl}">Shoot me an email</a>`;

           const [discussion, punct] = Maybe.of(item.data?.discuss).match({
              Just: ({ hn, lobsters }) => [
                 `, or leave a comment on <a href="${hn}">Hacker News</a> or <a href="${lobsters}">lobste.rs</a>`,
                 '.',
              ],
              Nothing: () => ['', '!'],
           });

           return `<hr/><p>Thoughts, comments, or questions? ${email}${discussion}${punct}</p>`;
        })()
      : '';

   return (
      feedOnly +
      subtitle +
      qualifiers +
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
              image: imageValue(item.data),
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

export default class JSONFeed implements EleventyClass {
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
