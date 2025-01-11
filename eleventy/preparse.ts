import { Data } from 'eleventy';

import Maybe from 'true-myth/maybe';

import markdown from './markdown';
import niceList from './nice-list';
import { hasAuthor, hasAuthors } from './data';

const ASSUMED_AUDIENCE =
   "<b><a href='https://v4.chriskrycho.com/2018/assumed-audiences.html'>Assumed audience</a>:</b>";

const CONTEXT = '<b>A bit of context:</b>:';

const EPISTEMIC_STATUS =
   "<b><a href='https://v5.chriskrycho.com/journal/epistemic-status/'>Epistemic status</a>:</b>";

const DISCUSSES = '<b>Heads up:</b> this post directly discusses';

/** Pre-parse the various YAML header data into HTML. */
export function preparseYaml(data: Data): Data {
   if (data.title) data.title = markdown.renderInline(data.title);
   if (data.subtitle) data.subtitle = markdown.renderInline(data.subtitle);

   if (data.qualifiers) {
      if (data.qualifiers.audience)
         data.qualifiers.audience = markdown.render(
            `${ASSUMED_AUDIENCE} ${data.qualifiers.audience}`,
         );

      if (data.qualifiers.disclosure)
         data.qualifiers.disclosure = markdown.render(
            `<b>Full disclosure:</b> ${data.qualifiers.disclosure}`,
         );

      if (data.qualifiers.context)
         data.qualifiers.context = markdown.render(
            `${CONTEXT} ${data.qualifiers.context}`,
         );

      if (data.qualifiers.discusses) {
         let discusses = Array.isArray(data.qualifiers.discusses)
            ? niceList(data.qualifiers.discusses)
            : Maybe.just(data.qualifiers.discusses);

         data.qualifiers.discusses = discusses
            .map((s) => `${DISCUSSES} ${markdown.renderInline(s)}.`)
            .unwrapOr(undefined);
      }

      if (data.qualifiers.epistemic) {
         data.qualifiers.epistemic = markdown.render(
            `${EPISTEMIC_STATUS} ${data.qualifiers.epistemic}`,
         );
      }
   }

   if (data.updates) {
      for (let update of data.updates) update.changes = markdown.render(update.changes);
   }

   if (data.book) {
      if (data.book.review?.summary)
         data.book.review.summary = markdown.render(data.book.review.summary);

      if (hasAuthor(data.book)) {
         data.book.author = markdown.renderInline(data.book.author);
      }

      if (hasAuthors(data.book)) {
         data.book.authors = data.book.authors.map((author) =>
            markdown.renderInline(author),
         );
      }
   }

   if (data.thanks) data.thanks = markdown.render(data.thanks);

   return data;
}
