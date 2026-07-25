const NBSP = '&nbsp;';
const NBSP_PUNCTUATION_START = /([«¿¡]) /g;
const NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

/**
   Dashes, ellipses, and non-breaking spaces.

   Emits entity references rather than literal characters; they survive to the
   output verbatim because entity decoding is off through the whole pipeline.
 */
export default function punctuation(text: string): string {
   return (
      text
         // En dash. Number ranges are handled first, as a special case, before
         // the more general em dash rules below.
         // https://en.wikipedia.org/wiki/Dash#En_dash
         .replace(/(\d+)\s?-\s?(\d+)/g, '$1&thinsp;&ndash;&thinsp;$2')
         .replace(/(\d+)\s?–\s?(\d+)/g, '$1&thinsp;&ndash;&thinsp;$2')
         .replace(/(\d+)\s?&mdash;\s?(\d+)/g, '$1&thinsp;&ndash;&thinsp;$2')

         // Em dash
         // https://en.wikipedia.org/wiki/Dash#Em_dash
         .replace(/--/g, '–')
         .replace(/ – /g, '&thinsp;&mdash;&thinsp;')

         // Ellipsis
         // https://en.wikipedia.org/wiki/Ellipsis
         .replace(/\.\.\./g, '&hellip;')

         // Non-breaking space
         // https://en.wikipedia.org/wiki/Non-breaking_space
         .replace(NBSP_PUNCTUATION_START, '$1' + NBSP)
         .replace(NBSP_PUNCTUATION_END, NBSP + '$1')
   );
}
