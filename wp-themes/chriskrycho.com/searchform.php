<?
/**
 * Search form template
 */
global $homeUrl;
?>

<form role="search" class="customform" method="get" action="<? echo $homeUrl ?>/">
   <input type="text" value="<? echo get_search_query(); ?>" name="search" id="search" placeholder="discover something"/>
   <input type="submit" id="searchsubmit" value="&rarr;" />
</form>