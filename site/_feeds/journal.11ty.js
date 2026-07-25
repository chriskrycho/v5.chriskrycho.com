const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class JournalFeed extends JSONFeed {
   collection = 'journal';
   title = 'Journal';
}
