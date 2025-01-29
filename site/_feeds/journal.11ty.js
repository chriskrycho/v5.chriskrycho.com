import JSONFeed from '../../eleventy/feed.ts';

export default class JournalFeed extends JSONFeed {
   collection = 'journal';
   title = 'Journal';
}
