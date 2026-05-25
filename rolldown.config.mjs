// @ts-check

import { defineConfig } from 'rolldown';

const production = !process.argv.includes('--watch') && !process.argv.includes('-w');

const minify = production
   ? {
        compress: {
           treeshake: {
              manualPureFunctions: ['assert', 'unreachable'],
              unknownGlobalSideEffects: false,
           },
        },
     }
   : false;

const outputDefaults = {
   sourcemap: true,
   minify,
};

export default defineConfig({
   input: 'scripts/main.ts',
   platform: 'browser',
   tsconfig: './scripts/tsconfig.json',
   treeshake: production ? { manualPureFunctions: ['assert', 'unreachable'] } : true,
   output: [
      {
         ...outputDefaults,
         format: 'module',
         file: './site/_assets/js/main.js',
      },
      {
         ...outputDefaults,
         format: 'iife',
         file: './site/_assets/js/main.old.js',
      },
   ],
});
