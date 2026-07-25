const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class ElsewhereFeed extends JSONFeed {
   collection = 'elsewhere';
   title = 'Elsewhere';
};
