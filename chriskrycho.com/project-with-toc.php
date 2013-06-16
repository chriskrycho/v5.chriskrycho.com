<?php
/*
Template name: Project page (w/TOC)
*/

/* Get the header, which opens the document and includes all head information */
get_header();

/* Get the core content, including any and all "articles" */
if (have_posts()):

   while (have_posts()):

      the_post();
      get_template_part('content', 'project');

   endwhile;

else:

   get_template_part('empty');

endif;

/* Get the footer, which closes out the document */
get_footer();
?>