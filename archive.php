<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package connectingashley
 */

get_header(); ?>

		<main id="main" class="main main--category">

		<?php
		if ( have_posts() ) : ?>
			<?php
			/* If exists, display highlight image
			 * If not, display thumbnail
			 */
			// if ( class_exists( 'MultiPostThumbnails' ) ) {
			//   MultiPostThumbnails::the_post_thumbnail( get_post_type(), 'highlight-image' );
			// } else if( has_post_thumbnail() ) {
			//   the_post_thumbnail('medium');
			// }
			?>

			<header class="header header--category">
				<?php
					the_archive_title( '<h1 class="title title--category">', '</h1>' );
					the_archive_description( '<div class="taxonomy-description content__description content__description--category">', '</div>' );
				?>
			</header>

			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_format() );

			endwhile;

            the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

		</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>