import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import abbr from 'markdown-it-abbr';
// @ts-ignore -- this is silly, but TS incorrectly reports an error when
// importing this, indicating that it is an ES module not-importable in a CJS
// module… but it isn't! It has both! 🤷🏻‍♂️
import anchor from 'markdown-it-anchor';
import defList from 'markdown-it-deflist';
import footnotes from 'markdown-it-footnote';
import mark from 'markdown-it-mark';
import implicitFigures from 'markdown-it-implicit-figures';
import sup from 'markdown-it-sup';
import { env } from 'process';
import Result, { tryOr } from 'true-myth/result';
import slugify from 'uslug';
import { setup } from 'highlightjs-glimmer';

setup(hljs);

type HighlightError = {
   short: string;
   long: string;
};

function highlight(language: string, content: string): Result<string, HighlightError> {
   return tryOr(
      {
         short: `error highlighting '${language}' with highlight.js`,
         long: `error highlighting '${language}' with highlight.js\ncontent:\n${content}\n`,
      },
      () => hljs.highlight(content, { language }).value,
   );
}

function logErr(err: HighlightError): void {
   console.error(env['DEBUG'] ? err.long : err.short);
}

const md = markdownIt({
   html: true,
   highlight: (str, lang) =>
      lang && hljs.getLanguage(lang)
         ? highlight(lang, str).unwrapOrElse((e) => {
              logErr(e);
              return str;
           })
         : str,
})
   .use(footnotes)
   .use(defList)
   .use(sup)
   .use(implicitFigures, {
      figcaption: true,
   })
   .use(anchor, {
      level: 1,
      permalink: anchor.permalink.headerLink(),
      slugify,
   })
   .use(abbr)
   .use(mark);

md.renderer.rules.footnote_caption = (tokens, idx): string => {
   let n = Number(tokens[idx].meta.id + 1).toString();

   if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
   }

   return n;
};

md.renderer.rules.footnote_block_open = (_tokens, _idx, options): string => {
   return (
      (options.xhtmlOut
         ? '<hr class="footnotes-sep" />\n'
         : '<hr class="footnotes-sep">\n') +
      '<section class="footnotes">\n' +
      "<h2 id='footnotes'><a class='header-anchor' href='#footnotes'>Notes</a></h2>" +
      '<ol class="footnotes-list">\n'
   );
};

export default md;
