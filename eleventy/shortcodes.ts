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

interface Quote {
   source: {
      author?: string;
      title: string;
      link?: string;
   };
   location?: string;
}

type Reference = Quote | BibleRef;

export const quote = (content: string, ref: Reference): string => {
   let citation = isBibleRef(ref) ? bibleRef(ref) : basicCitation(ref);

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

   function basicCitation(quote: Quote): string {
      let author = quote.source.author ? `${quote.source.author}, ` : '';
      let location = quote.location ? `, ${quote.location}` : '';
      let source = quote.source.link
         ? `<a href="${quote.source.link}">${quote.source.title}</a>`
         : quote.source.title;
      return `${author}<cite>${source}</cite>${location}`;
   }
};

function isBibleRef(ref: Reference): ref is BibleRef {
   return 'book' in ref.source;
}
