import svelte from 'rollup-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
   input: './scripts/main.js',
   output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: './site/_assets/js/main.js',
   },
   plugins: [
      // teach rollup how to handle typescript imports
      typescript({
         tsconfig: './scripts/tsconfig.json',
         sourceMap: true,
      }),
      svelte({
         preprocess: autoPreprocess({
            sourceMap: true,
            typescript: '',
         }),
         compilerOptions: {
            sourcemap: true,
            dev: !production,
         },
      }),
      resolve({ browser: true }),
      production && terser(),
   ],
};
