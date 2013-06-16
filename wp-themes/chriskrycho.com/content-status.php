         <article class="status">

            <?php
            /* Metadata for the post. Do not display on pages. */
            if (!is_page()):
            ?>
            <div class="content-meta">

               <? /* Publication date */ ?>
               <p class="pubdate">Published: <a href="<? the_permalink(); ?>" class="permalink"><? echo get_the_date(); ?></a></p>
               
            </div>
            <?php
            endif;
            ?>

            <?/* Content section */?>
            <div class="content hyphenate">

               <? the_content('Read on, intrepid explorer &rarr;'); ?>

            </div>

         </article>