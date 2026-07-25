const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class NotesFeed extends JSONFeed {
   collection = 'notes';
   title = 'Notes';
}
