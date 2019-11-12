export interface Options {
   emDashes?: boolean
   enDashes?: boolean
   initials?: boolean
}

/**
   Given a valid DOM element `container`, apply nice typographical spacing.

   @param options Options for which spacing rules to use.
   @param [content] A document element to apply rules to.
 */
function spacewell(options: Options): (content: string) => string
function spacewell(options: Options, content: string): string
function spacewell(
   options: Options,
   content?: string,
): string | ((content: string) => string)
