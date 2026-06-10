<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package connectingashley
 */

get_header(); ?>

		<main id="main" class="main main--single">

		<?php
		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', get_post_format() ); ?>

			<ul class="post-navigation">
				<li class="post-navigation__item"><?php previous_post_link( '%link', '&laquo %title', true ); ?></li>
				<li class="post-navigation__item"><?php next_post_link( '%link', '%title &raquo', true ); ?></li>
			</ul>

			<?php endwhile; ?>

		</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>