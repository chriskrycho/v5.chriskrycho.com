/**
 * Enqueue the styles for the current color scheme.
 *
 * @since chriskrycho.com 1.0
 */
function ck_enqueue_color_scheme() {
	$options = twentyeleven_get_theme_options();
	$color_scheme = $options['color_scheme'];

	if ( 'Coffee House Journal' == $color_scheme )
		wp_enqueue_style( 'Coffee House Journal', get_template_directory_uri() . '/colors/coffee-house-journal.css', array(), null );
	elseif ( 'From the Heart' == $color_scheme )
	   wp_enqueue_style( 'From the Heart', get_template_directory_uri() . '/colors/from-the-heart.css', array(), null );
	elseif ( 'Lost in a Daydream' == $color_scheme )
	   wp_enqueue_style( 'Lost in a Daydream', get_template_directory_uri() . '/colors/lost-in-a-daydream.css', array(), null );
	elseif ( 'terra' == $color_scheme )
	   wp_enqueue_style( 'terra', get_template_directory_uri() . '/colors/terra.css', array(), null );
   else
      wp_enqueue_style( 'default colors', get_template_directory_uri() . '/colors/default.css', array(), null );

	do_action( 'twentyeleven_enqueue_color_scheme', $color_scheme );
}
add_action( 'wp_enqueue_scripts', 'ck_enqueue_color_scheme' );