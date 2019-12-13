import JSONFeed from '../../eleventy/feed'

module.exports = class AppearancesFeed extends JSONFeed {
   collection = 'appearances'
   title = 'Appearances'
}
