import JSONFeed from '../../eleventy/feed.ts';

export default class PhotosFeed extends JSONFeed {
   collection = 'photos';
   title = 'Photos';
}
