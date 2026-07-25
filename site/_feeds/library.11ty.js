const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class LibraryFeed extends JSONFeed {
   collection = 'library';
   title = 'Library';
}
