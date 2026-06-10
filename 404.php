<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package connectingashley
 */

get_header(); ?>

	<main id="main" class="main main--404">

			<section>
				<header class="header header--page">
					<h1 class="title title--page"><?php esc_html_e( 'Sorry, That page can&rsquo;t be found.', 'connectingashley' ); ?></h1>
				</header>

				<div class="content content--404">
                	<?php get_search_form(); ?>
				</div>
			</section>

		</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>