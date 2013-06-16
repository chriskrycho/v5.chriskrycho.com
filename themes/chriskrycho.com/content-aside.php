         <article class="aside">

            <?php
            /* Metadata for the post. Do not display on pages. */
            if (!is_page()):
            ?>
            <div class="content-meta">

               <? /* Publication date */ ?>
               <p class="pubdate">Published: <a href="<? the_permalink(); ?>" class="permalink"><? echo get_the_date(); ?></a></p>
               
               <? /* Categories */ ?>
               <p class="categories">Filed under: <? the_category(', '); ?></p>

               <? if (has_tag()): /* Tags */ ?>
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
            
         </article>