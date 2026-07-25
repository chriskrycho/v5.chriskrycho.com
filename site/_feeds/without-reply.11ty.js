const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class FeedWithoutReply extends JSONFeed {
   includeReplyViaEmail = false;
   permalink = '/feeds/without-reply.json';
}
