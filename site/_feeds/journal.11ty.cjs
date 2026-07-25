const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class JournalFeed extends JSONFeed {
   collection = 'journal';
   title = 'Journal';
};
