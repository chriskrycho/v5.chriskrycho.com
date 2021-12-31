import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

const production = !process.env.ROLLUP_WATCH;

export default {
   input: 'scripts/main.ts',
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
            },
         }),
   ],
};
