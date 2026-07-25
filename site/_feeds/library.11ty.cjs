const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class LibraryFeed extends JSONFeed {
   collection = 'library';
   title = 'Library';
};
