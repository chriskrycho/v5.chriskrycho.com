import { getLanguage, highlight as _highlight } from 'highlight.js'
import markdownIt from 'markdown-it'
import abbr from 'markdown-it-abbr'
import anchor, { AnchorOptions } from 'markdown-it-anchor'
import defList from 'markdown-it-deflist'
import footnotes from 'markdown-it-footnote'
import implicitFigures from 'markdown-it-implicit-figures'
import sup from 'markdown-it-sup'
import Core from 'markdown-it/lib/parser_core'
import Token from 'markdown-it/lib/token'
import div from 'markdown-it-div'
import { env } from 'process'
import { Result } from 'true-myth'
import slugify from 'uslug'

type HighlightError = {
   short: string
   long: string
}

function highlight(
   languageName: string,
   content: string,
): Result<string, HighlightError> {
   return Result.tryOr(
      {
         short: `error highlighting '${languageName}' with highlight.js`,
         long: `error highlighting '${languageName}' with highlight.js\ncontent:\n${content}\n`,
      },
      () => _highlight(languageName, content).value,
   )
}

function logErr(err: HighlightError): void {
   console.error(env['DEBUG'] ? err.long : err.short)
}

/**
   Garbage, but does the job for the moment.
 */
function renderPermalink(
   slug: string,
   opts: AnchorOptions,
   state: Core & { tokens: Token[] },
   idx: number,
): void {
   const marker = [
      Object.assign(new Token('span_open', 'span', 1), {
         attrs: [['class', '__marker']],
      }),
      Object.assign(new Token('html_block', '', 0), {
         content: opts.permalinkSymbol,
      }),
      new Token('span_close', 'span', -1),
   ]

   const openTokens = [
      Object.assign(new Token('link_open', 'a', 1), {
         attrs: [
            ['class', opts.permalinkClass],
            ['href', opts.permalinkHref?.(slug)],
         ],
      }),
   ]

   const closeTokens = [...marker, new Token('link_close', 'a', -1)]

   state.tokens[idx + 1].children.unshift(...openTokens)
   state.tokens[idx + 1].children.push(...closeTokens)
}

const md = markdownIt({
   html: true,
   highlight: (str, lang) =>
      lang && getLanguage(lang)
         ? highlight(lang, str).unwrapOrElse(e => {
              logErr(e)
              return str
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
      permalink: true,
      level: 1,
      permalinkClass: 'section-link',
      permalinkSymbol: '',
      renderPermalink,
      slugify,
   })
   .use(abbr)
   .use(div)

// eslint-disable-next-line @typescript-eslint/camelcase
md.renderer.rules.footnote_caption = (tokens, idx): string => {
   let n = Number(tokens[idx].meta.id + 1).toString()

   if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId
   }

   return n
}

export default md
