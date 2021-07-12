import JSONFeed from '../../eleventy/feed';

module.exports = class MicroBlogFeed extends JSONFeed {
   includeReplyViaEmail = false;
   permalink = '/feeds/micro-blog.json';

   /** @type {'off'} */
   photoItemTitles = 'off';
};
