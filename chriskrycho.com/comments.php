<?php
if (is_single()):
?>
               <footer id="comments">
<?php
   if (have_comments()):
?>
                  <h3 class="discussion-header">Discussion</h3>
                  <ul class="comments-ul">

<?php
      wp_list_comments( array( 'callback' => 'ck_comments' ) );
?>

                  </ul> <!-- comments-ul -->
<?
   endif;   /* have_comments */
   if (comments_open()):
?>
                  <div id="respond">
<?php
         reformatted_comment_form();
?>
                  </div>
<?php
   else:
?>
      <p>Discussion is closed at this time.</p>
<?php
   endif; /* comments_open */
?>
               </footer>
<?php
endif;   /* is_single */
?>