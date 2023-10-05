import markdown from './markdown';
import { stripIndents } from 'common-tags';

export const note = (content: string, { type = 'Note' } = {}): string =>
   `<section class='note' aria-label='${type}' aria-role='note'>${markdown.render(
      content,
   )}</section>`;

export const callout = (content: string): string =>
   `<section class='callout' aria-role='note'>${markdown.render(content)}</section>`;

interface Quote {
   source: {
      author: string;
      title: string;
   };
   location?: string;
}

export const quote = (content: string, quote: Quote): string => {
   let location = quote.location ? `, ${quote.location}` : '';
   let rendered = markdown.render(content);
   let { author, title } = quote.source;

   // Because it's really important here *not* to include indentation so
   // this can run *before* Markdown parsing runs on the rest of it.
   return stripIndents`<figure class='quotation'>
      <blockquote>
         ${rendered}
      </blockquote>
      <figcaption>
         —${author}, <cite>${title}</cite>${location}
      </figcaption>
   </figure>
   `;
};
