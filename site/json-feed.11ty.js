import JSONFeed from '../eleventy/feed'

module.exports = class BaseFeed extends JSONFeed {
   data() {
      return {
         ...super.data(),
         excludeFromEleventyCollections: true,
      }
   }
}
