         <article>

            <?php
            
            /* Content section */
            if (is_single()):
               the_content();
            else:
               echo '<a href="' . get_permalink() . '" class="quote-link" title="quote permalink">';
               the_content();
               echo '</a>';
            endif;

            /* Post footer. Only display for single view (no comments on pages, and don't display them on archives) */
            comments_template();
            
            ?>
            
         </article>