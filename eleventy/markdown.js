const { env } = require('process')

const hljs = require('highlight.js')
const markdownIt = require('markdown-it')
const anchor = require('markdown-it-anchor')
const defList = require('markdown-it-deflist')
const footnotes = require('markdown-it-footnote')
const sup = require('markdown-it-sup')
const slugify = require('uslug')
const { Result } = require('true-myth')

/**
   @param {string} content
   @param {string} languageName 
 */
function highlight(languageName, content) {
   return Result.tryOr(
      {
         short: `error highlighting '${languageName}' with highlight.js`,
         long: `error highlighting '${languageName}' with highlight.js\ncontent:\n${content}\n`,
      },
      () => hljs.highlight(languageName, content).value,
   )
}

/**
  @param {{ short: string, long: string }} err
 */
function logErr(err) {
   console.error(env['DEBUG'] ? err.long : err.short)
}

/**
   Garbage, but does the job for the moment.
   @param {any} slug
   @param {any} opts
   @param {any} state
   @param {any} idx
 */
function renderPermalink(slug, opts, state, idx) {
   const marker = [
      Object.assign(new state.Token('span_open', 'span', 1), {
         attrs: [['class', '__marker']],
      }),
      Object.assign(new state.Token('html_block', '', 0), {
         content: opts.permalinkSymbol,
      }),
      new state.Token('span_close', 'span', -1),
   ]

   const openTokens = [
      Object.assign(new state.Token('link_open', 'a', 1), {
         attrs: [
            ['class', opts.permalinkClass],
            ['href', opts.permalinkHref(slug, state)],
         ],
      }),
      ...marker,
   ]

   const closeTokens = [...marker, new state.Token('link_close', 'a', -1)]

   state.tokens[idx + 1].children.unshift(...openTokens)
   state.tokens[idx + 1].children.push(...closeTokens)
}

const md = markdownIt({
   html: true,
   typographer: true,
   highlight: (str, lang) =>
      lang && hljs.getLanguage(lang)
         ? highlight(lang, str).unwrapOrElse(e => {
              logErr(e)
              return str
           })
         : str,
})
   .use(footnotes)
   .use(defList)
   .use(sup)
   .use(anchor, {
      permalink: true,
      level: 1,
      permalinkClass: 'section-link',
      permalinkSymbol: '—',
      renderPermalink,
      slugify,
   })

md.renderer.rules.footnote_caption = /** @type import('markdown-it').TokenRender */ (
   tokens,
   idx,
) => {
   var n = Number(tokens[idx].meta.id + 1).toString()

   if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId
   }

   return n
}

module.exports = md
