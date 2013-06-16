<?php
/**
 * header.php
 * Description: Theme header. Displays <head> and opens the body fo the document.
 */

global $siteName;
global $charset;
global $homeUrl;
global $siteDescription;
global $siteEmail;
global $subSiteByline;
global $universalHome;

?>
<!doctype html>
<html lang="en-US" class="no-wp-admin">
<head>
   <title>
      <?php

      if (is_front_page()):
         /* Do nothing */
         ;
      elseif (is_singular()):
         echo get_the_title() . " &raquo; ";
         
      elseif (is_date()):
         $date = single_month_title(' ', false);
         echo $date . " &raquo; ";
         
      elseif (is_tag()):
         $tag = single_tag_title('', false);
         echo $tag . " &raquo; ";
         
      elseif (is_category()):
         $category = single_cat_title('', false);
         echo $category . " &raquo; ";
         
      elseif (is_search()):
         echo get_search_query() . " &raquo; ";
         
      else:
         echo "Blog &raquo; ";
         
      endif;
      
      echo $siteName . " &raquo; Chris Krycho";
      
      ?>
   </title>

   <!-- Set document meta -->
   <meta charset="<? echo $charset; ?>" />

   <!-- Mobile devices should view the screen at their native width -->
   <meta name='viewport' content='width=device-width,initial-scale=1.0' />

   <!-- Styles -->
   <link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
   <link rel="stylesheet" type="text/css" media="screen" href="<?php echo $universalHome; ?>/utilities/tooltip/jquery.tooltip.css"

   <!-- Authorship -->
   <link rel="author" href="https://plus.google.com/u/0/100517719789069874571/" />
   
   <!-- All Javascript (including JQuery) functionality -->
   <script type="text/javascript" src="http://use.typekit.com/mir6lir.js"></script>

   <!-- jQuery -->
   <script type="text/javascript" src="<? echo $universalHome ?>utilities/jquery.min.js"></script>
   <script type="text/javascript" src="<? echo $universalHome ?>utilities/tooltip/jquery.tooltip.min.js"></script>
   <script type="text/javascript" src="<? echo $universalHome ?>utilities/custom-functions.js"></script>

   <!-- IE Fixes -->
   <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <link rel="stylesheet" type="text/css" media="screen" href="<? echo $stylesheetDirectory; ?>/styles/ie.css" />
   <![endif]-->
   
   <?php

   /* Enqueue scripts for elegant threaded comment handling*/
   if ( is_single() && comments_open()):
      wp_enqueue_script( 'comment-reply' );
   endif;

   /* wp_head is last, as required for best (read: not broken!) plugin functionality */
   wp_head();

   ?>

</head>
<body>
<div id="decorative-wrapper">


   <!--[if lt IE 9]>
   <div id="nav-wrapper">
   <![endif]-->
   
   <?php
   wp_nav_menu( array(
                     'theme_location' => 'site-nav',
                     'container' => 'nav',
                     'container_id' => 'site-nav'
                ));
   ?>
   
   <!--[if lt IE 9]>
   </div>
   <![endif]-->

   <header id="site-header">
      <h1><? echo '<a href="' . $homeUrl . '">' . $siteName . '</a>'; ?></h1>
      <h2><span class="italic"><? echo $siteDescription; ?> <span class="break">by <? echo $subSiteByline; ?></span></span></h2>
   </header>
   
         
      <?php
      if (is_date()):
         $date = single_month_title(' ', false);
         echo '<div id="content-header">Published during: ' . $date . '</div>';
         
      elseif (is_tag()):
         $tag = single_tag_title('', false);
         echo '<div id="content-header">Topic: &ldquo;' . $tag . '&rdquo;</div>';
         
      elseif (is_category()):
         $category = single_cat_title('', false);
         echo '<div id="content-header">Filed under: &ldquo;' . $category . '&rdquo;</div>';
         
      elseif (is_search()):
         echo '<div id="content-header">Search results for: &ldquo;' . get_search_query() . '&rdquo;</div>';
         
      endif;
      ?>