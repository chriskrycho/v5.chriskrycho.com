const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class EssaysFeed extends JSONFeed {
   collection = 'essays';
   title = 'Essays';
};
