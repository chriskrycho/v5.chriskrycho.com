import svelte from 'rollup-plugin-svelte'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const svelteConfig = require('./svelte.config')

const production = !process.env.ROLLUP_WATCH

export default {
   input: './scripts/main.js',
   output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: './site/assets/js/main.js',
   },
   plugins: [
      // teach rollup how to handle typescript imports
      typescript({
         tsconfig: './scripts/tsconfig.json',
      }),
      svelte(svelteConfig),
      resolve({ browser: true }),
      production && terser(),
   ],
}
