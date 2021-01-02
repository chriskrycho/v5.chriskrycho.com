const sveltePreprocess = require('svelte-preprocess')

const production = !process.env.ROLLUP_WATCH

module.exports = {
   preprocess: sveltePreprocess({
      sourceMap: true,
      defaults: {
         script: 'typescript',
      },

      // enable run-time checks when not in production
      dev: !production,
   }),
}
