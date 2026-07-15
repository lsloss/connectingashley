<?php

/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package connectingashley
 */
?>

<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Discover the Ashley Ward in Bristol with our interactive map.">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<a class="skip-link screen-reader-text" href="#main"><?php _e('Skip to content', 'connectingashley'); ?></a>

	<header class="site-header">
		<?php if (is_front_page()) : ?>
			<h1 class="site-header__title"><a class="site-header__link" href="<?php echo esc_url(home_url('/')); ?>" rel="home">Connecting <span>Ashley</span><span class="screen-reader-text"> Bristol, UK</span></a></h1>
		<?php else : ?>
			<h2 class="site-header__title"><a class="site-header__link" href="<?php echo esc_url(home_url('/')); ?>" rel="home">Connecting <span>Ashley</span></a></h2>
		<?php endif; ?>
	</header>