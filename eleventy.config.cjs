// This is a dumb little dance that lets me use Eleventy with ESM without doing
// a full Eleventy upgrade, which is good because I don't really want to bother
// with that (I should focus my efforts instead on lx!).
module.exports = require('./eleventy/config.ts').default;
