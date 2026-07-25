const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class ElsewhereFeed extends JSONFeed {
   collection = 'elsewhere';
   title = 'Elsewhere';
}
