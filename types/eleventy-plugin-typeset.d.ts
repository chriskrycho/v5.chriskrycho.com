import { Options } from './typeset'
import { Config } from './eleventy'

declare module 'eleventy-plugin-typeset' {
   export default function typesetPlugin(
      options?: Options,
   ): (config: Config, namespace: string) => void
}
