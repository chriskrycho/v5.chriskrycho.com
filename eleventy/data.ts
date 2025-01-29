import { type Dict } from './type-utils.ts';

interface ItemData {
   title?: string;
   subtitle?: string;
   summary?: string;
   tags?: string[];
   date?: string | Date;
   started?: string | Date;
   updated?: string | Date;
   updates?: Array<Update>;
   qualifiers?: Qualifiers;
   image?: Image;
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
   discuss?: {
      hn: string;
      lobsters: string;
   };
   sendEmail?: boolean;
   feedOnly?: boolean;
}

/** Extending the base Eleventy item with my own data */
declare module '../types/eleventy.ts' {
   interface Data extends ItemData {}
}

type Image = string | { cdn: string } | { url: string };

export function resolvedImage(image: Image | undefined): string | undefined {
   if (!image) return undefined;

   if (typeof image == 'string') return image;

   if (typeof image == 'object' && image != null) {
      return 'cdn' in image
         ? `https://cdn.chriskrycho.com/images/${image.cdn}`
         : image.url;
   }

   return undefined;
}

export function imageValue(
   data: Pick<ItemData, 'image' | 'book'> | undefined,
): string | undefined {
   return resolvedImage(data?.image ?? data?.book?.cover);
}

export type SingleAuthor = { author: string };
export type MultipleAuthors = { authors: string[] };
export type Author = SingleAuthor | MultipleAuthors;

export function hasAuthor(book: Book): book is Book & SingleAuthor {
   return 'author' in book;
}

export function hasAuthors(book: Book): book is Book & MultipleAuthors {
   return 'authors' in book;
}

export interface Review {
   review?: {
      rating:
         | 'Required'
         | 'Recommended'
         | 'Recommended With Qualifications'
         | 'Not Recommended';
      summary: string;
   };
}

export interface BookMeta {
   title: string;
   year?: number | string;
   cover?: Image;
   link?: string;
}

// Must be a `type` alias because interfaces cannot extend unions.
export type Book = BookMeta & Author & Review;

export function isBook(maybeBook: unknown): maybeBook is Book {
   if (typeof maybeBook !== 'object' || !maybeBook) {
      return false;
   }

   const maybe = maybeBook as Dict<unknown>;

   return (
      typeof maybe.title === 'string' &&
      (typeof maybe.author === 'string' || Array.isArray(maybe.authors)) &&
      (typeof maybe.year == 'number' || typeof maybe.year === 'string') &&
      typeof maybe.review === 'object' &&
      typeof maybe.cover === 'string' &&
      typeof maybe.link === 'string'
   );
}

export interface Update {
   at: string | Date;
   changes: string;
}

export interface Qualifiers {
   audience?: string;
   context?: string;
   epistemic?: string;
   discusses?: string | string[];
   disclosure?: string;
   retraction?:
      | string
      | {
           url: string;
           title: string;
        };
}
