<article id="post-<?php the_ID(); ?>" <?php post_class( 'article article--post' ); ?>>

<header class="header header--post">
	<?php
		if ( is_singular() ) :
			the_title( '<h1 class="title title--post">', '</h1>' );
		else :
			the_title( '<h2 class="title title--post"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif; ?>
</header>

	<?php the_post_thumbnail(); ?>

		<?php
		the_content( sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'connectingashley' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			get_the_title()
		) );
		?>
	
	<footer class="footer footer--post">

	</footer>
</article>