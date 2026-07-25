const JSONFeed = (await import('../../eleventy/feed.ts')).default;

export default class PhotosFeed extends JSONFeed {
   collection = 'photos';
   title = 'Photos';
}
