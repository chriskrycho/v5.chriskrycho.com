<?php
/**
 * index.php
 * Programmatic flow for the template. All layout is designated to the relevant sections of the template.
 */

/* Get the header, which opens the document and includes all head information */
get_header();

/* Get the core content, including any and all "articles" */
if (have_posts()):

   while (have_posts()):

      the_post();
      get_template_part('content', get_post_format());

   endwhile;

else:

   get_template_part('empty');

endif;

/* Get the footer, which closes out the document */
get_footer();
?>