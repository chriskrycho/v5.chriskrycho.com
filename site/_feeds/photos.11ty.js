import JSONFeed from '../../eleventy/feed';

module.exports = class PhotosFeed extends JSONFeed {
   collection = 'photos';
   title = 'Photos';
};
