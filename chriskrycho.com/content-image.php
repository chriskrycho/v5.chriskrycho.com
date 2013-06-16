         <article class="image">

            <? if (!is_page()): ?>
            <div class="content-meta">
            
               <? /* Title */ ?>
               <h2 class="title"><a href="<? the_permalink(); ?>" class="permalink"><? the_title(); ?></a></h2>

               <? /* Publication date */ ?>
               <p class="pubdate">Published: <a href="<? the_permalink(); ?>" class="permalink"><? echo get_the_date(); ?></a></p>

               <? /* Comments */ ?>
               <p class="comments">Comments: <a href="<? comments_link(); ?>" class="permalink"><? comments_number('0', '1', '%'); ?></a></p>

               <? if (has_tag()): ?>
               <p class="tags">Subjects: <?  the_tags('', ', ', ''); ?></p>
               <? endif; /* has_tag */ ?>
            </div>
            <? endif; ?>

            <?php
            /* Content section */
            if (!is_single()):
               echo '<a href="' . get_permalink() . '" class="quote-link" title="quote permalink">';
            endif;
            
            the_content();
                           
            if (!is_single()):
            	echo '</a>';
            endif;
            
            comments_template(); 
            ?>

         </article>