         <article>

            <header>
               <h1>
                  <?php
                  if (is_singular()):
                     the_title();
                  else:
                     echo '<a href="' . get_permalink() . '">' .  get_the_title() . '</a>';
                  endif;
                  ?>
               </h1>
            </header>

            <?php
            /* Content section */
            the_content('Read on, intrepid explorer &rarr;');

            /* Post footer. Only display for single view (no comments on pages, and don't display them on archives) */
            comments_template();
            ?>

         </article>