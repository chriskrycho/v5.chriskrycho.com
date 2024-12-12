import { type Dict } from './type-utils';

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
declare module '../types/eleventy' {
   interface Data extends ItemData {}
}

type Image = string | { cdn: string } | { url: string };

export function imageValue(
   data: Pick<ItemData, 'image' | 'book'> | undefined,
): string | undefined {
   if (!data) return undefined;

   if (typeof data.image == 'string') return data.image;

   if (typeof data.image == 'object' && data.image != null) {
      return 'cdn' in data.image
         ? `https://cdn.chriskrycho.com/images/${data.image.cdn}`
         : data.image.url;
   }

   if (typeof data.book == 'object' && data.book != null) return data.book.cover;

   return undefined;
}

export type Author = { author: string } | { authors: string[] };

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
   cover?: string;
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
}
