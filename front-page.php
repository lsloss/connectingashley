<?php

/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package connectingashley
 */

get_header(); ?>

<main id="main" class="main main--index">

    <div class="hero-image">
        <?php get_template_part('template-parts/content', 'hero'); ?>
    </div>



    <?php
    if (have_posts()) :

        /* Start the Loop */
        while (have_posts()) :
            the_post(); ?>

            <div class="content">
                <?php the_content(); ?>
                <a href="/map" class="discover">Discover</a>
            </div>

    <?php endwhile;

    endif;
    ?>

</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>