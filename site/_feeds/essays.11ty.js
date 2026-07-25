import JSONFeed from '../../eleventy/feed.ts';

export default class EssaysFeed extends JSONFeed {
   collection = 'essays';
   title = 'Essays';
}
