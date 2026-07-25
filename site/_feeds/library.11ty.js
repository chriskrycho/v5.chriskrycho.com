import JSONFeed from '../../eleventy/feed.ts';

export default class LibraryFeed extends JSONFeed {
   collection = 'library';
   title = 'Library';
}
