// @ts-check

const THIN_SP = '&thinsp;'
const HAIR_SP = '&hairsp;'
const EM_DASH = '&mdash;'
const EN_DASH = '&ndash;'

/**
   Wrap em dashes and their immediate neighbors in non-breaking span and hair spaces.
   Normalize which em dash variant is used.

   @param {string} content 
 */
function emDashes(content) {
   if (!content) {
      throw new Error('`spacewell#emDashes()`: no content supplied.')
   }

   return content.replace(
      /(—|&mdash;|&#8212;|&x2014;)/g,
      `${HAIR_SP}${EM_DASH}${HAIR_SP}`,
   )
}

/**
   Wrap en dashes and their immediate neighbors in non-breaking span and thin spaces (for
   words, replacing normal spaces) or hair spaces (for numbers). Normalize which en dash
   variant is used.

   @param {string} content
 */
function enDashes(content) {
   if (!content) {
      throw new Error('`spacewell#enDashes()`: no content supplied.')
   }

   const OPEN = '<dash-wrap>'
   const CLOSE = '</dash-wrap>'

   // Do numbers first. Include a variety of ways digits might be constructed,
   // including e.g. Bible verses, other punctuation, etc.
   const numPatt = /([\d:.⅒⅑⅛⅜⅝⅞⅐⅙⅚⅕⅖⅗⅘¼¾⅓⅔½]+) ?(–|&ndash;|&8211;|&x2013;) ?([\d:.⅒⅑⅛⅜⅝⅞⅐⅙⅚⅕⅖⅗⅘¼¾⅓⅔½]+)/g
   const wordPatt = /(\w+) ?(–|&ndash;|&8211;|&x2013;) ?(\w+)/g
   const replacement = `${OPEN}$1${THIN_SP}${EN_DASH}${THIN_SP}$3${CLOSE}`

   return content.replace(numPatt, replacement).replace(wordPatt, replacement)
}

/**
   Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
   between the initials.

   @param {string} content 
 */
function initials(content) {
   if (!content) {
      throw new Error('`spacewell#initials()`: no content supplied.')
   }

   // TODO: implement this in a way that doesn't mistake ends of
   //     sentences. Basically, I *think* it should just be anytime
   //     that the period follows a capital letter, but there may be
   //     the occasional exception.
   console.error('`spacewell#initials()` not yet implemented.')
   return content
}

// NOTE: keys are mapped to names of functions in the module.
/** @type {{ [key in string]: (content: string) => string }} */
const FUNCTIONS = { emDashes, enDashes, initials }

/**
   Given a valid DOM element `container`, apply nice typographical spacing.

   @param {import('./spacewell').Options} options Options for which spacing rules to use.
   @param {string}  [content] A document element to apply rules to.
 */
function spacewell(
   { emDashes = false, enDashes = false, initials = false } = {},
   content,
) {
   const config = { emDashes, enDashes, initials }

   /** @param {string} content_ */
   function op(content_) {
      return Object.keys(config)
         .filter(key => Boolean(config[key]))
         .reduce((transformed, cfgKey) => FUNCTIONS[cfgKey](transformed), content_)
   }

   return content ? op(content) : op
}

// Let the user import whatever they like.
module.exports = { spacewell, emDashes, enDashes, initials }
