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
            /* Metadata for the post. Do not display on pages. */
            if (!is_page()):
            ?>
            <div class="content-meta">

               <? /* Publication date */ ?>
               <p class="pubdate">Published: <a href="<? the_permalink(); ?>" class="permalink"><? echo get_the_date(); ?></a></p>

               <? /* Comments */ ?>
               <p class="comments">Comments: <a href="<? comments_link(); ?>" class="permalink"><? comments_number('0', '1', '%'); ?></a></p>

               <? /* Categories */ ?>
               <p class="categories">Filed under: <? the_category(', '); ?></p>

               <?php
               /* Tags */
               if (has_tag()):
               ?>
               <p class="tags">Topics: <?  the_tags('', ', ', ''); ?></p>
               <? endif; /* has_tag */ ?>
            </div>
            <?php
            endif;
            ?>

            <?/* Content section */?>
            <div class="content hyphenate">

               <? the_content('Read on, intrepid explorer &rarr;'); ?>

            </div>

            <?php
               /* Post footer. Only display for single view (no comments on pages, and don't display them on archives) */
               comments_template();
            ?>

         </article>