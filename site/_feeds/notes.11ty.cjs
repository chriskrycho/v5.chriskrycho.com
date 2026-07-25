const JSONFeed = require('../../eleventy/feed.ts').default;

module.exports = class NotesFeed extends JSONFeed {
   collection = 'notes';
   title = 'Notes';
};
