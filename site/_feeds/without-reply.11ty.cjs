const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class FeedWithoutReply extends JSONFeed {
   includeReplyViaEmail = false;
   permalink = '/feeds/without-reply.json';
};
