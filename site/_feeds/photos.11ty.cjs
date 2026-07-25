const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class PhotosFeed extends JSONFeed {
   collection = 'photos';
   title = 'Photos';
};
