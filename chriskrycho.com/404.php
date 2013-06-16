<?php
/**
 * index.php
 * Programmatic flow for a 404 page.
 */

/* Get the header, which opens the document and includes all head information */
get_header();

/* There are no posts, so the loop is meaningless */
?>

<article>
   <header><h1>Nothing doing...</h1></header>
   <div class='content hyphenate'>
      <p>Sorry to say, but this link doesn't seem to be legitimate. A tragedy, I say!</p>
      <p>Your best option is probably to click one of the <em>real</em> links in the menu up there to the right, but as an unhappy alternative, you might have to resort to <em>searching</em>.</p>
      <p>Good luck &ndash; you're going to need it!</p>
      <? get_search_form(); ?>
   </div>
</article>

<?php
/* Get the footer, which closes out the document */
get_footer();
?>