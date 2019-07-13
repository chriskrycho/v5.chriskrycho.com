import { ServeStaticOptions } from 'serve-static'

interface BrowserSyncConfig {
   /** Browsersync includes a user-interface that is accessed via a separate port. The UI allows to controls all devices, push sync updates and much more. */
   ui?:
      | false
      | {
           port: number
           weinre?: {
              port: number
           }
        }

   files?:
      | string
      | Array<
           | string
           | {
                match?: string[]
                fn?: (event: any, file: string) => any
             }
        >
      | false

   watchEvents?: string[]
   watch?: boolean
   ignore?: string[]
   single?: boolean
   watchOptions?: {
      ignoreInitial?: boolean
      ignored?: boolean
   }
   server?:
      | boolean
      | string
      | string[]
      | {
           baseDir?: string
           directory?: boolean
           serveStaticOptions?: ServeStaticOptions
           routes?: Dict<string>
        }

   proxy?:
      | string
      | boolean
      | {
           target?: string
           ws?: boolean
           middleware?: any
           reqHeaders?: string[]
           proxyReq?: any
           proxyRes?: any
        }
}

type Empty = { isEmpty: true; empty: string } | { isEmpty: false }

type GrayMatter = {
   content: string
   excerpt?: string
   orig: Buffer
   language: string
   matter: string
   stringify(): string
} & Empty

export type Engine = (input: string) => GrayMatter

export type EngineName =
   | 'html'
   | 'md'
   | 'js'
   | '11ty.js'
   | 'liquid'
   | 'njk'
   | 'hbs'
   | 'mustache'
   | 'ejs'
   | 'haml'
   | 'pug'
   | 'jstl'

export interface Collection {
   /** the full path to the source input file (including the path to the input directory) */
   inputPath: string
   /** 
      Mapped from the input file name, useful for permalinks. Read more about
      [`fileSlug`].

      [`fileSlug`]: https://www.11ty.io/docs/data/#fileslug
     */
   fileSlug: string
   /** the full path to the output file to be written for this content */
   outputPath: string
   /** url used to link to this piece of content. */
   url: string
   /**
      the resolved date used for sorting. Read more about [Content Dates].

      [Content Dates]: https://www.11ty.io/docs/dates/
     */
   date: string
   /** all data for this piece of content (includes any data inherited from layouts) */
   data: Dict<unknown>
   /** the rendered content of this template. This does *not• include layout wrappers */
   templateContent: string
}

export interface Collections {
   getAll(): Collection[]

   /**
      Note that while Array `.reverse()` mutates the array in-place, all Eleventy
      Collection API methods return new copies of collection arrays and can be modified
      without side effects to other collections. [However, you do need to be careful ⚠️
      when using Array `.reverse()` in templates!][warning]

      [warning]: https://www.11ty.io/docs/collections/#array-reverse
    */
   getAllSorted(): Collection[]

   getFilteredByTag(tagName: string): Collection[]

   getFilteredByGlob(glob: string | string[]): Collection[]
}

interface Renderer {
   render(input: string): string
}

export interface Config {
   dir?: {
      /** Controls the top level directory/file/glob that we’ll use to look for templates. */
      input?: string

      /** Controls the directory inside which the finished templates will be written to. */
      output?: string

      /**
        The includes directory is meant for [Eleventy layouts], include files, extends
        files, partials, or macros. These files will not be processed as full template
        files, but can be consumed by other templates.

        [Eleventy layouts]: https://www.11ty.io/docs/layouts/

        **Note:** This value is relative to your input directory.
       */
      includes?: string

      /**
        This configuration option is optional but useful if you want your [Eleventy
        layouts][layouts] to live outside of the [Includes directory]. Just like
        the [Includes directory], these files will not be processed as full template files,
        but can be consumed by other templates.

        [layouts]: https://www.11ty.io/docs/layouts/
        [Includes directory]: https://www.11ty.io/docs/config/#directory-for-includes

        __Note:__ This setting only applies to Eleventy's language-agnostic [layouts]
        \(when defined in front matter or data files).

        When using `{% extends %}`, Eleventy will still search the `_includes` directory.
        See [this note about existing templating features][note].

        [note]: https://www.11ty.io/docs/layouts/#addendum-about-existing-templating-features

        **Note:** This value is relative to your input directory.
       */
      layouts?: string

      data?: string
   }

   /**
     The `data.dir` global data files run through this template engine before transforming
     to JSON. Read more about [Global Data Files].

     [Global Data Files]: https://www.11ty.io/docs/data-global/
    */
   dataTemplateEngine?: EngineName | false
   markdownTemplateEngine?: EngineName | false
   htmlTemplateEngine?: EngineName | false
   templateFormats?: EngineName[]

   /**
      If your site lives in a different subdirectory (particularly useful with GitHub
      pages), use pathPrefix to specify this. It’s used by the `url` filter and inserted
      at the beginning of all absolute url href links. It does not affect your file
      structure. Leading or trailing slashes are all normalized away, so don’t worry about
      it.
    */
   pathPrefix?: string
   passthroughFileCopy?: boolean
   htmlOutputSuffx?: string
   jsDataFileSuffix?: string

   addCollection(
      name: string,
      builder: (collection: Collections) => Collection[] | object | Promise<object>,
   ): void

   addFilter(name: string, filter: (...args: any[]) => unknown): string

   addTransform(
      name: string,
      transform: (content: string, outputPath: string) => string | Promise<string>,
   ): string

   addLinter(
      name: string,
      linter: (
         content: string,
         inputPath: string,
         outputPath: string,
      ) => void | Promise<void>,
   ): void

   addShortcode(name: string, shortcode: (...args: any[]) => string): string
   addLiquidShortcode(name: string, shortcode: (...args: unknown[]) => string): void
   addNunjucksShortcode(name: string, shortcode: (...args: unknown[]) => string): void
   addHandlebarsShortcode(name: string, shortcode: (...args: unknown[]) => string): void
   addJavascriptShortcode(name: string, shortcode: (...args: unknown[]) => string): void
   addPairedShortcode(
      name: string,
      shortcode: (content: string, ...args: unknown[]) => string,
   ): void

   addJavaScriptFunction(name: string, fn: (...args: unknown) => string): void

   addFilter(name: string, filter: (...args: unknown[]) => unknown): void

   addLiquidFilter(name: string, filter: (...args: unknown[]) => unknown): object

   addNunjucksFilter(name: string, filter: (...args: unknown[]) => unknown): void

   addNunjucksAsyncFilter(
      name: string,
      filter: (...args: unknown[], callback: (...args: unknown[]) => unknown) => void,
   ): void

   addHandlebarsHelper(name: string, helper: (...args: unknown[]) => string): object

   /**
      Plugins are custom code that Eleventy can import into a project from an external
      repository.

      @param fn The plugin to include.
      @param config Use an optional second argument to addPlugin to customize your
         plugin’s behavior. These options are specific to the plugin. Please consult the
         plugin’s documentation (e.g. the [eleventy-plugin-syntaxhighlight README](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/master/README.md))
         to learn what options are available to you.
    */
   addPlugin<F extends Function>(fn: F, config?: Parameters<F>[0]): void

   /**
      Searching the entire directory structure for files to copy based on file extensions
      is not optimal with large directory structures. If we know what non-template static
      content we want to appear in our output, we can opt-in to specify files or
      directories for Eleventy to copy. This will probably speed up your build times.
      These entries are relative to the root of your project and not your Eleventy input
      directory.

      @param path The file path to copy (may be an individual file or directory.)
    */
   addPassthroughCopy(path: string): void

   /**
     You can namespace parts of your configuration using `eleventyConfig.namespace`. This
     will add a string prefix to all filters, tags, helpers, shortcodes (as of 0.7.0),
     collections, and transforms.

     @param withName The string prefix to apply to the items.
     @param context A callback in which to add your namespaced items.
    */
   namespace(withName: string, context: () => void): void

   setTemplateFormats(to: EngineName[] | string): void
   setDataDeepMerge(to: boolean): void
   setWatchJavaScriptDependencies(to: boolean): void
   setBrowserSyncConfig(to: BrowserSyncConfig): void
   setFrontMatterParsingOptions(to: {
      excerpt?: boolean
      excerpt_separator?: string
      excerpt_alias?: string
      engines?: Dict<Engine>
   }): void
   setLibrary(to: EngineName, using: Renderer): void
}

type NonMethodNames<T> = {
   [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]

export type UserConfig = Pick<Config, NonMethodNames<Config>>
