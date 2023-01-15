import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import abbr from 'markdown-it-abbr';
import anchor from 'markdown-it-anchor';
import defList from 'markdown-it-deflist';
import footnotes from 'markdown-it-footnote';
import mark from 'markdown-it-mark';
import implicitFigures from 'markdown-it-implicit-figures';
import sup from 'markdown-it-sup';
import { env } from 'process';
import { Result } from 'true-myth';
import slugify from 'uslug';
import { setup } from 'highlightjs-glimmer';
// @ts-expect-error -- no types yet
import unison from 'highlightjs-unison';

setup(hljs);

hljs.registerLanguage('unison', unison);

type HighlightError = {
   short: string;
   long: string;
};

function highlight(language: string, content: string): Result<string, HighlightError> {
   return Result.tryOr(
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
