<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package connectingashley
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'article article--page' ); ?>>
	<header class="header header--page">
		<?php the_title( '<h1 class="title title--page">', '</h1>' ); ?>
	</header>

	<div class="content content--page">
		<?php the_content(); ?>
	</div>

	<footer class="footer footer--page">
		<?php
			edit_post_link(
				sprintf(
					/* translators: %s: Name of current post */
					esc_html__( 'Edit %s', 'connectingashley' ),
					the_title( '<span class="screen-reader-text">"', '"</span>', false )
				),
				'<div class="edit-item edit-item--page">',
				'</div>'
			);
		?>
	</footer>
</article>