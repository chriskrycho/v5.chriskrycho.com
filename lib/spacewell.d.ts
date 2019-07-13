export interface Options {
   emDashes?: boolean
   enDashes?: boolean
   initials?: boolean
}

function spacewell(options: Options): (content: string) => string
function spacewell(options: Options, content: string): string
function spacewell(
   options: Options,
   content?: string,
): string | ((content: string) => string)
