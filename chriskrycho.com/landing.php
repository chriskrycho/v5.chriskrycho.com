<?php
/*
Template name: Landing page
*/

/**
 * index.php
 * Programmatic flow for the template. All layout is designated to the relevant sections of the template.
 */

/* Global variables */
global $siteName;
global $charset;
global $universalHome;
global $stylesheetDirectory;

?>
<!doctype html>
<html lang="en-US">
<head>
   <title>
      <? echo $siteName; ?>
   </title>

   <!-- Set document meta -->
   <meta charset="<? echo $charset; ?>" />

   <!-- Mobile devices should view the screen at their native width -->
   <meta name='viewport' content='width=device-width,initial-scale=1.0' />

   <!-- Styles -->
   <link rel="stylesheet" type="text/css" media="screen" href="<? echo $stylesheetDirectory; ?>/styles/landing.css" />

   <!-- All Javascript (including jQuery) functionality -->
   <script type="text/javascript" src="http://use.typekit.com/onj0yed.js"></script>
   <script type="text/javascript" src="http://use.typekit.com/paa6dol.js"></script>

   <!-- jQuery -->
   <script type="text/javascript" src="<? echo $universalHome ?>utilities/jquery.min.js"></script>
   <script type="text/javascript">
      (function() {
         
         $(document).ready( function() {
            $('html').css('visibility','hidden');
         });
         
         try {
            Typekit.load({
               active: function() {
                  if (jQuery.support.opacity) {
                     $(document).ready( function() {
                        $('html').css('visibility', 'visible').hide().fadeIn(750);
                     });
                  } else {
                     $(document).ready( function() {
                        $('html').css('visibility', 'visible');
                     });
                  }
               },
               inactive: function() {
                  $(document).ready( function() {
                     $('html').css('visibility', 'visible');
                  });
               }
            });
         } catch(e) {}
         
      }) ();
   </script>   
   <!-- IE Fixes -->
   <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <link rel="stylesheet" type="text/css" media="screen" href="<? echo $stylesheetDirectory; ?>/styles/ie-landing.css" />
   <![endif]-->

   <? wp_head(); ?>

</head>
<html>
<body>

   <?php
   /* Get the core content, including any and all "articles" */
   while (have_posts()):
      the_post();
   endwhile;
   ?>
   
   <div id="wrapper">
      <? the_content(); ?>
   </div>
   
</body>
</html>