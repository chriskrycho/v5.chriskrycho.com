<?php
/* Theme footer. Displays from page navigation through <footer> to close of document. */

global $universalHome;
global $homeUrl;

?>
      <? if (!is_page() && !is_404() && have_posts()): ?>
      <nav id="page-nav">
         <ul>
            <li class="newer">
               <?php
               if (is_single()):
                  next_post_link('%link', '&larr; back to the future');
               else:
                  previous_posts_link('&larr; back to the future');
               endif;
               ?>
            </li>
            <li class="home"><? if (!is_front_page()) echo '<a href="' . $homeUrl . '">&ndash;Home&ndash;</a>'; ?></li>
            <li class="older">
               <?php
               if (is_single()):
                  previous_post_link('%link', 'into the past &rarr;');
               else:
                  next_posts_link('into the past &rarr;');
               endif;
               ?>
            </li>
         </ul>
      </nav>
      <? else: ?>
         <? if (!is_front_page()): ?>
      <div class="spacer"></div>
         <? endif; ?>
      <? endif; ?>
   </div>   <?/* decorative-wrapper */?>
   <footer id="site-footer">

      <?/* Hard coded site-wide navigation */?>
      <nav id="supersite-nav" class="footer-block">
         <h1>Navigate</h1>
         <ul>
            <li>
               <h2>Search this site:</h2>
               <? get_search_form(); ?>
            </li>
            <li>
               <a href="<? echo $universalHome; ?>">Home</a><br/>
               <i>Creativity, reflection, & passionate endeavors.</i>
            </li>
            <li>
               <a href="<? echo $universalHome; ?>web">Designgineering</a><br/>
               <i>Web design & development.</i>
            </li>
            <li>
               <a href="<? echo $universalHome; ?>theology/">Ardent Fidelity</a><br/>
               <i>Reflections on a Christ-centered life.</i>
            </li>
            <li>
               <a href="<? echo $universalHome; ?>art/">Ars Artis</a><br/>
               <i>Creations & musings on creativity.</i>
            </li>
            <li>
               <a href="<? echo $universalHome; ?>family/">From the Hearth</a><br/>
               <i>Updates on our growing family.</i>
            </li>
         </ul>
      </nav>

      <section id="connect" class="footer-block">
         <h1>Connect</h1>
         <ul>
            <? dynamic_sidebar('Connect'); ?>
            <li>
               <a href="<? echo $homeUrl; ?>/feed" title="RSS feed" target="_blank">RSS/Atom</a><br/>
               <i>To the feed reader, quick!</i>
            </li>
            <li>
               <a href='https://alpha.app.net/chriskrycho' rel='me' data-type='follow' data-user-id='@chriskrycho' title="app.net/chriskrycho">App.net</a><br/>
               <i>Less noisy, more characters.</i>
            </li>
            <li>
               <a href="" class="email-link" title="chris|@|chriskrycho|.|com" target="_blank">Email</a><br/>
               <i>Send me a letter. But without the paper.</i>
            </li>
            <li>
               <a href="http://www.facebook.com/chriskrycho" title="facebook.com/chriskrycho" target="_blank">Facebook</a><br/>
               <i>Fun party meets family get-together.</i>
            </li>
            <li>
               <a href="https://plus.google.com/100517719789069874571/" title="Google+ profile" target="_blank">Google+</a><br/>
               <i>The nerdy new kid on the block.</i>
            </li>
            <li>
               <a href="http://www.goodreads.com/user/show/3165223-chris-krycho" title="Goodreads profile" target="_blank">Goodreads</a><br/>
               <i>A bookshelf, in cyberspace!</i>
            </li>
            <li>
               <a href="http://www.linkedin.com/in/chriskrycho" title="LinkedIn Profile" target="_blank">LinkedIn</a><br/>
               <i>A place for professional professionals.</i>
            </li>
            <li>
               <a href="http://nosegue.tumblr.com/">No Segue</a><br/>
               <i>A Tumblr about technology</i>
            </li>
            <li>
               <a href="http://www.twitter.com/chriskrycho" title="twitter.com/chriskrycho" target="_blank">Twitter</a><br/>
               <i>Your spastic journalist neighbors.</i>
            </li>
            <li>
               <a href="http://about.me/chriskrycho" title="About.me profile" target="_blank">About.me</a><br/>
               <i>Biographical sundries & links galore!</i>
            </li>
            <li>
               <a href="http://www.runningahead.com/logs/2667b469aeda433382cbcc8ed413d964/profile" target="_blank">RunningAhead</a><br/>
               <i>I run and run and run some more.</i>
            </li>
         </ul>
      </section>

      <section id="read" class="footer-block">
         <h1>Read</h1>
         <? dynamic_sidebar('Read'); ?>
      </section>

      <section id="discuss" class="footer-block">
         <h1>Discuss</h1>
         <? dynamic_sidebar('Discuss'); ?>
      </section>

      <section id="colophon" class="colophon footer-block">
         <h1>Colophon</h1>
         <p>
            <?php
            $now = getdate();
            $year = $now['year'];
            if ($year > 2012):
               echo "&copy;2012&ndash;$year Chris Krycho";
            else:
               echo "&copy;2012 Chris Krycho";
            endif; ?>
         </p>
         <? dynamic_sidebar('Colophon'); ?>
      </section>
   </footer>
   <? wp_footer(); ?>
   <script src='https://d2zh9g63fcvyrq.cloudfront.net/adn.js'></script>
</body>
</html>