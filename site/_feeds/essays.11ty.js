const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class EssaysFeed extends JSONFeed {
   collection = 'essays';
   title = 'Essays';
}
