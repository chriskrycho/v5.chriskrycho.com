// @ts-check

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
   input: 'scripts/main.ts',
   output: [
      {
         sourcemap: true,
         format: 'module',
         file: './site/_assets/js/main.js',
      },
      {
         sourcemap: true,
         format: 'iife',
         file: './site/_assets/js/main.old.js',
      },
   ],
   plugins: [
      // teach rollup how to handle typescript imports
      typescript({
         tsconfig: './scripts/tsconfig.json',
         sourceMap: true,
      }),
      resolve({ browser: true }),
      production &&
         strip({
            include: ['**/*.js', '**/*.ts'],
            functions: ['assert', 'unreachable'],
         }),
      production &&
         terser({
            compress: {
               unsafe: true,
               passes: 2,
            },
         }),
   ],
});
