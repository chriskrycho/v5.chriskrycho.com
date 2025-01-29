import JSONFeed from '../../eleventy/feed.ts';

export default class FeedWithoutReply extends JSONFeed {
   includeReplyViaEmail = false;
   permalink = '/feeds/without-reply.json';
}
