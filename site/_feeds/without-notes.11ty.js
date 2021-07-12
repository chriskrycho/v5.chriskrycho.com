import JSONFeed from '../../eleventy/feed';

module.exports = class FeedWithoutNotes extends JSONFeed {
   collection = 'nonNotes';
   includeReplyViaEmail = false;
   permalink = '/feeds/without-notes.json';
};
