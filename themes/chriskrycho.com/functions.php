<?php
/**
 * Blog info variables
 */

/* Site info */
$siteName            = get_bloginfo('name');
$siteDescription     = get_bloginfo('description');
$siteEmail           = get_bloginfo('admin_email');

$homeUrl             = get_bloginfo('url');
$wpUrl               = get_bloginfo('wpurl');

/* Stylesheet info */
$stylesheetUrl       = get_bloginfo('stylesheet_url');
$stylesheetDirectory = get_bloginfo('stylesheet_directory');
$templateDirectory   = get_bloginfo('template_directory');
$templateUrl         = get_bloginfo('template_url');

/* HTML concrete meta information */
$atomUrl             = get_bloginfo('atom_url');
$rss2Url             = get_bloginfo('rss2_url');
$rssUrl              = get_bloginfo('rss_url');
$pingbackUrl         = get_bloginfo('pingback_url');
$rdfUrl              = get_bloginfo('rdf_url');

$commentsAtomUrl     = get_bloginfo('comments_atom_url');
$commentsRss2Url     = get_bloginfo('comments_rss2_url');

/* HTML abstract meta data */
$charset             = get_bloginfo('charset');
$htmlType            = get_bloginfo('html_type');
$language            = get_bloginfo('language');
$textDirection       = get_bloginfo('text_direction');

/* Wordpress info */
$wpVersion           = get_bloginfo('version');

/**
 * Personally defined global variables
 */

/* Site header "attribution" */
$universalHome       = 'http://chriskrycho.com/';
$mainSiteByline      = 'a peculiar fellow';
$subSiteByline       = "<a href='$universalHome'>Chris Krycho</a>";

/**
 * Custom functions
 */

/**
 * Function ck_comments supplies the template for comments.
 * Not currently designed to be overridden by child themes.
 *
 * Arguments:
 * @param $comment   - the comment being formatted
 * @param $args      -
 * @param $depth     - how deep the current comment is
 */
function ck_comments($comment, $args, $depth) {

   $GLOBALS['comment'] = $comment;
   $commentType = $comment->comment_type;
   /* Slightly different implementations for pingback and actual comments: */
   switch ($commentType):
      case 'pingback':
      case 'trackback':
?>
   <li class="pingback-li">
      <article class="pingback">
         <p>
            <?php echo ucfirst($commentType) . ": "; ?>
            <a href="<?php echo get_comment_author_url(); ?>" class="pingback-link">
               <?php echo get_comment_author(); ?> at <?php comment_time('g:ia'); ?> on <?php comment_time('n/j/Y'); ?>
            </a>
         </p>
      </article>
<?php
   /* Wordpress itself adds the closing <li> tag */
         break;
      default:
?>
   <li class="comment-li" id="comment-li-<?php comment_ID(); ?>">
      <article class="comment" id="comment-<?php comment_ID(); ?>">
         <div class="comment-avatar">
            <?php echo get_avatar($comment, 82); ?>
         </div>
         <div class="comment-meta">
            <p>
               <?php
               $authorUrl = get_comment_author_url();
               if ($authorUrl != ''):
               ?>
               <span><a href="<?php echo get_comment_author_url(); ?>" class="comment-author-link"><?php echo get_comment_author(); ?></a> thought to say:</span>
               <?php else: ?>
               <span><?php echo get_comment_author(); ?> thought to say:</span>
               <?php endif; ?>
               <span class="comment-date">
                  <a href="<?php comment_link(); ?>" class="comment-permalink' title='comment permalink">
                     <?php comment_time('g:ia')?> on <?php comment_time('n/j/Y'); ?>
                  </a>
               </span>
            </p>
         </div>
<?php
         comment_text();

         /* The comment reply link */
         if (comments_open()):
            comment_reply_link( array('reply_text' => 'Offer a rejoinder&darr;',
                                      'depth' => $depth,
                                      'max_depth' => $args['max_depth']
                                      ) );
         endif;
?>
      </article>

<?php
   /* Wordpress itself adds the closing <li> tag */
         break;
   endswitch;
}

/**
 * Function reformatted_comment_form supplies the custom outpu fields for the comment_form() call and calls the function.
 *
 * Arguments:
 * none
 */
function reformatted_comment_form() {
   /* Custom output for the comment form */
   $emailPrivacy = '<p class="require-contact-info">Anonymity is <em>most</em> unhelpful. Please identify yourself!</p><p class="email-anonymity">(Your email will not be published.)</p>';
   $replyText = '<h2>Pipe up!</h2>';
   $replyToText = '<h2>Your rejoinder to %s</h2>';
   $cancelReplyText = 'Opt for silence instead&uarr;';
   $clearNotesAfter = '';
   $submitText = 'Fire away!';

   $commentFormFields = array('comment_notes_before' => $emailPrivacy,
                              'comment_notes_after' => $clearNotesAfter,
                              'title_reply' => $replyText,
                              'title_reply_to' => $replyToText,
                              'cancel_reply_link' => $cancelReplyText,
                              'label_submit' => $submitText
                              );

   /* Display the comment form with the updated defaults */
   comment_form($commentFormFields);

   /* Put the allowed text after the submit button. */
   $allowedInput = '<p class="allowed-text">You may use <a href="https://help.github.com/articles/github-flavored-markdown" target="_blank">GitHub-flavored Markdown</a> and/or these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes:<br/><code>&lt;a href=&quot;&quot; title=&quot;&quot;&gt; &lt;abbr title=&quot;&quot;&gt; &lt;acronym title=&quot;&quot;&gt; &lt;b&gt; &lt;blockquote cite=&quot;&quot;&gt; &lt;cite&gt; &lt;code&gt; &lt;del datetime=&quot;&quot;&gt; &lt;em&gt; &lt;i&gt; &lt;q cite=&quot;&quot;&gt; &lt;strike&gt; &lt;strong&gt; </code></p>';
   echo $allowedInput;
}

/**
 * Function register_customs registers menus and sidebars.
 */
function register_custom_menus() {
   /* Register nav menus */
   register_nav_menus( array(
                            'site-nav' => 'Main Site Navigation'
                            ));

}

function register_custom_sidebars() {
   /* Register sidebars */
   register_sidebar( array(
                           'name' => "Connect",
                           'id' => 'connect-block',
                           'before_widget' => '<li>',
                           'after_widget' => '</li>',
                           'before_title' => '<h2>',
                           'after_title' => '</h2>'
                           ) );
   register_sidebar( array(
                           'name' => "Read",
                           'id' => 'read-block',
                           'before_widget' => '',
                           'after_widget' => '',
                           'before_title' => '<h2>',
                           'after_title' => '</h2>'
                     ) );
   register_sidebar( array(
                           'name' => "Discuss",
                           'id' => 'discuss-block',
                           'before_widget' => '',
                           'after_widget' => '',
                           'before_title' => '<h2>',
                           'after_title' => '</h2>'
                     ) );
   register_sidebar( array(
                           'name' => "Colophon",
                           'id' => 'colophon-block',
                           'before_widget' => '',
                           'after_widget' => '',
                           'before_title' => '<h2>',
                           'after_title' => '</h2>'
                     ) );


}

/* Make jump link go to top of page instead of to position of read-more link */
function remove_more_jump_link($link) { 
   $offset = strpos($link, '#more-');
   if ($offset) {
      $end = strpos($link, '"',$offset);
   }

   if ($end) {
      $link = substr_replace($link, '', $offset, $end-$offset);
   }

   return $link;
}

add_filter('the_content_more_link', 'remove_more_jump_link');
add_filter('show_admin_bar', '__return_false');

/* Add action(s) to initialization */
add_action('init', 'register_custom_menus');
add_action('widgets_init', 'register_custom_sidebars');
add_theme_support('post-formats', array('quote', 'status', 'aside', 'link', 'image'));

?>