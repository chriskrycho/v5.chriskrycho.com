import JSONFeed from '../../eleventy/feed.ts';

export default class NotesFeed extends JSONFeed {
   collection = 'notes';
   title = 'Notes';
}
