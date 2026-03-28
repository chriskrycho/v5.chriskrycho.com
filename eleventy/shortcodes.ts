import markdown from './markdown';
import { stripIndents } from 'common-tags';

export const note = (content: string, { type = 'Note' } = {}): string =>
   `<section class='note' aria-label='${type}' aria-role='note'>${markdown.render(
      content,
   )}</section>`;

export const callout = (content: string): string =>
   `<section class='callout' aria-role='note'>${markdown.render(content)}</section>`;

interface BibleRef {
   source: {
      book: string;
      translation: string;
      passage: string;
   };
}

interface BasicCitation {
   source: {
      author?: string;
      title: string;
      link?: string;
   };
   location?: string;
}

interface Ibid {
   source: 'ibid';
   location: string;
}

type Reference = BasicCitation | BibleRef | Ibid;

export const quote = (content: string, ref: Reference): string => {
   let citation: string;
   if (isBibleRef(ref)) {
      citation = bibleRef(ref);
   } else if (isBasicCitation(ref)) {
      citation = basicCitation(ref);
   } else {
      citation = `<em>ibid.</em>, ${ref.location}`;
   }

   // Because it's really important here *not* to include indentation so
   // this can run *before* Markdown parsing runs on the rest of it.
   return stripIndents`<figure class='quotation'>
      <blockquote>
         ${markdown.render(content)}
      </blockquote>
      <figcaption>—${citation}</figcaption>
   </figure>
   `;

   function bibleRef({ source: bible }: BibleRef): string {
      return `${bible.book} ${bible.passage} (${bible.translation})`;
   }

   function basicCitation(quote: BasicCitation): string {
      let author = quote.source.author ? `${quote.source.author}, ` : '';
      let location = quote.location ? `, ${quote.location}` : '';
      let source = quote.source.link
         ? `<a href="${quote.source.link}">${quote.source.title}</a>`
         : quote.source.title;
      return `${author}<cite>${source}</cite>${location}`;
   }
};

function isBibleRef(ref: Reference): ref is BibleRef {
   return typeof ref.source === 'object' && 'book' in ref.source;
}

function isBasicCitation(ref: Reference): ref is BasicCitation {
   return typeof ref.source === 'object' && 'title' in ref.source;
}
