import type { Data } from '../types/eleventy.d.ts';

import Maybe from 'true-myth/maybe';

import niceList from './nice-list.ts';
import { hasAuthor, hasAuthors } from './data.ts';

const ASSUMED_AUDIENCE =
   "<b><a href='https://v4.chriskrycho.com/2018/assumed-audiences.html'>Assumed audience</a>:</b>";

const CONTEXT = '<b>A bit of context:</b>';

const EPISTEMIC_STATUS =
   "<b><a href='https://v5.chriskrycho.com/journal/epistemic-status/'>Epistemic status</a>:</b>";

const DISCUSSES = '<b>Heads up:</b> this post directly discusses';

export interface RenderMd {
   render: (src: string) => string;
   renderInline: (src: string) => string;
}

/** Pre-parse the various YAML header data into HTML. */
export function preparseYaml(data: Data, md: RenderMd): Data {
   if (data.title) data.title = md.renderInline(data.title);
   if (data.subtitle) data.subtitle = md.renderInline(data.subtitle);

   if (data.qualifiers) {
      if (data.qualifiers.audience)
         data.qualifiers.audience = md.render(
            `${ASSUMED_AUDIENCE} ${data.qualifiers.audience}`,
         );

      if (data.qualifiers.disclosure)
         data.qualifiers.disclosure = md.render(
            `<b>Full disclosure:</b> ${data.qualifiers.disclosure}`,
         );

      if (data.qualifiers.context)
         data.qualifiers.context = md.render(
            `${CONTEXT} ${data.qualifiers.context}`,
         );

      if (data.qualifiers.discusses) {
         let discusses = Array.isArray(data.qualifiers.discusses)
            ? niceList(data.qualifiers.discusses)
            : Maybe.just(data.qualifiers.discusses);

         data.qualifiers.discusses = discusses
            .map((s) => `${DISCUSSES} ${md.renderInline(s)}.`)
            .unwrapOr(undefined);
      }

      if (data.qualifiers.epistemic) {
         data.qualifiers.epistemic = md.render(
            `${EPISTEMIC_STATUS} ${data.qualifiers.epistemic}`,
         );
      }

      if (data.qualifiers.retraction) {
         if (typeof data.qualifiers.retraction === 'object') {
            let { title, url } = data.qualifiers.retraction;
            data.qualifiers.retraction = md.render(
               `<strong>Caveat lector:</strong> I have since retracted this (see [${title}](${url})), but as a matter of policy I leave even work I have retracted publicly available as a matter of record.`,
            );
         }
      }
   }

   if (data.updates) {
      for (let update of data.updates) update.changes = md.render(update.changes);
   }

   if (data.book) {
      if (data.book.review?.summary)
         data.book.review.summary = md.render(data.book.review.summary);

      if (hasAuthor(data.book)) {
         data.book.author = md.renderInline(data.book.author);
      }

      if (hasAuthors(data.book)) {
         data.book.authors = data.book.authors.map((author) =>
            md.renderInline(author),
         );
      }
   }

   if (data.thanks) data.thanks = md.render(data.thanks);

   return data;
}
