<?php
/**
 * Custom connectingashley search form
 *
 * @package connectingashley
 */

?>
<form role="search" method="get" id="searchform" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text search-form__label" for="s"><?php echo esc_html__( 'Search for:', 'connectingashley' ); ?></label>
	<input class="search-form__query" type="search" value="<?php echo get_search_query( ); ?>" name="s" id="s" placeholder="<?php echo esc_html__( 'Search for', 'connectingashley' ); ?>" />
	<button class="search-form__submit" type="submit"><?php echo esc_attr_x( 'Search', 'submit button', 'connectingashley' ); ?></button>
</form>