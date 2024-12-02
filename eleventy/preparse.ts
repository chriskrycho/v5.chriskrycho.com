import { Data } from 'eleventy';
import markdown from './markdown';

/**
  Pre-parse the various
 */
export function preparseYaml(data: Data): Data {
   if (data.title) data.title = markdown.renderInline(data.title);
   if (data.subtitle) data.subtitle = markdown.renderInline(data.subtitle);

   if (data.qualifiers) {
      if (data.qualifiers.audience)
         data.qualifiers.audience = markdown.renderInline(data.qualifiers.audience);

      if (data.qualifiers.context)
         data.qualifiers.context = markdown.render(
            `<b>A bit of context:</b>: ${data.qualifiers.context}`,
         );

      if (data.qualifiers.discusses)
         data.qualifiers.discusses = data.qualifiers.discusses.map(
            markdown.renderInline.bind(markdown),
         );

      if (data.qualifiers.epistemic)
         data.qualifiers.epistemic = markdown.renderInline(data.qualifiers.epistemic);
   }

   if (data.updates) {
      for (let update of data.updates)
         update.changes = markdown.renderInline(update.changes);
   }

   if (data.book?.review?.summary)
      data.book.review.summary = markdown.renderInline(data.book.review.summary);

   if (data.thanks) data.thanks = markdown.renderInline(data.thanks);

   return data;
}
