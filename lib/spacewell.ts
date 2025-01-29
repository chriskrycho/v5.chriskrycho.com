import { logErr } from '../eleventy/utils.ts';

const THIN_SP = '&thinsp;';
// const HAIR_SP = '&hairsp;'
const EM_DASH = '&mdash;';
const EN_DASH = '&ndash;';

/**
   Wrap em dashes and their immediate neighbors in non-breaking span and hair spaces.
   Normalize which em dash variant is used.
 */
export function emDashes(content: string): string {
   return content.replace(
      /(—|&mdash;|&#8212;|&#x2014;)/g,
      `${THIN_SP}${EM_DASH}${THIN_SP}`,
   );
}

/**
   Wrap en dashes and their immediate neighbors in non-breaking span and thin spaces (for
   words, replacing normal spaces) or hair spaces (for numbers). Normalize which en dash
   variant is used.
 */
export function enDashes(content: string): string {
   const OPEN = '<dash-wrap>';
   const CLOSE = '</dash-wrap>';

   // Do numbers first. Include a variety of ways digits might be constructed,
   // including e.g. Bible verses, other punctuation, etc.
   const numPatt =
      /([\d:.⅒⅑⅛⅜⅝⅞⅐⅙⅚⅕⅖⅗⅘¼¾⅓⅔½]+) ?(–|&ndash;|&8211;|&#x2013;) ?([\d:.⅒⅑⅛⅜⅝⅞⅐⅙⅚⅕⅖⅗⅘¼¾⅓⅔½]+)/g;
   const wordPatt = /(\w+) ?(–|&ndash;|&8211;|&x2013;) ?(\w+)/g;
   const replacement = `${OPEN}$1${THIN_SP}${EN_DASH}${THIN_SP}$3${CLOSE}`;

   return content.replace(numPatt, replacement).replace(wordPatt, replacement);
}

/**
   Take e.g. "J. R. R. Tolkien" or "J.R.R. Tolkien" and use thin spaces
   between the initials.
 */
export function initials(content: string): string {
   // TODO: implement this in a way that doesn't mistake ends of
   //     sentences. Basically, I *think* it should just be anytime
   //     that the period follows a capital letter, but there may be
   //     the occasional exception.
   logErr('`spacewell#initials()` not yet implemented.');
   return content;
}

// NOTE: keys are mapped to names of functions in the module.
const FUNCTIONS = {
   emDashes,
   enDashes,
   initials,
} as const;

export interface Options {
   emDashes?: boolean;
   enDashes?: boolean;
   initials?: boolean;
}

/**
   Given a valid DOM element `container`, apply nice typographical spacing.

   @param options Options for which spacing rules to use.
   @param content A document element to apply rules to.
 */
export default function spacewell(options: Options): (content: string) => string;
export default function spacewell(options: Options, content: string): string;
export default function spacewell(
   options: Options,
   content?: string,
): string | ((content: string) => string) {
   function op(c: string): string {
      return (Object.keys(options) as Array<keyof Options>)
         .filter((key) => Boolean(options[key]))
         .reduce((transformed, cfgKey) => FUNCTIONS[cfgKey](transformed), c);
   }

   return content ? op(content) : op;
}
