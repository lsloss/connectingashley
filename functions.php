<?php 
/**
 * Functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package connectingashley
 */

/**
 * Connecting Ashley Theme only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

if ( ! function_exists( 'connectingashley_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function connectingashley_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on _bem, use a find and replace
		 * to change '_bem' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'connectingashley', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', 'connectingashley' ),
		) );

		/*
		* Add support for Gutenberg.
		*
		* @link https://wordpress.org/gutenberg/handbook/reference/theme-support/
		*/
		add_theme_support( 'gutenberg', array(
    		// Theme supports wide images, galleries and videos.
			'wide-images' => true,

    		// Make specific theme colors available in the editor.
			'colors' => array(
				'#ffffff',
				'#000000',
			),
		) );

		/*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '_bem_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Set the default content width.
		$GLOBALS['content_width'] = 525;

		// define images sizes
		add_image_size( 'thumbnail', 400, 300, true );
		add_image_size( 'medium', 600, 450, true );
		add_image_size( 'large', 800, 600, true );
		add_image_size( 'post-thumbnail', 800, 600, true );

		// // add another thumbnail, e.g. Highlight Image
		// if (class_exists('MultiPostThumbnails')) {
		// 	new MultiPostThumbnails(array(
		// 		'label' => 'Highlight Image',
		// 		'id' => 'highlight-image',
		// 		'post_type' => 'post'
		// 	));
		// }
	}
endif;
add_action( 'after_setup_theme', 'connectingashley_setup' );

/*
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
// function connectingashley_widgets_init() {
// 	register_sidebar( array(
// 		'name'          => esc_html__( 'Sidebar', 'connectingashley' ),
// 		'id'            => 'sidebar-1',
// 		'description'   => '',
// 		'class'         => 'sidebar',
// 		'before_widget' => '<section id="%1$s" class="widget %2$s">',
// 		'after_widget'  => '</section>',
// 		'before_title'  => '<h2 class="widget-title widget__title">',
// 		'after_title'   => '</h2>',
// 	) );
// }
// add_action( 'widgets_init', 'connectingashley_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function connectingashley_scripts() {

	 // register main stylesheet
	 wp_enqueue_style( 'connectingashley-stylesheet', get_theme_file_uri() . '/assets/dist/css/app.min.css', array(), '', 'all' );

	if (is_page_template('map.php')) {
		wp_enqueue_script('connectingashley-map-script', get_template_directory_uri() . '/assets/dist/js/app.min.js', array(), '20210719', true);
		wp_localize_script('connectingashley-map-script', 'WPURLS', array('siteurl' => get_option('siteurl')));
	}

}
add_action( 'wp_enqueue_scripts', 'connectingashley_scripts' );

// Use BEM navigation over Wordpress default the_posts_navigation().
// Call prev_next_pagination() to use in template
if ( ! function_exists( 'prev_next_pagination' ) ) :
function prev_next_pagination() {
	// Don't print empty markup if there's only one page.
	if ( $GLOBALS['wp_query']->max_num_pages < 2 ) {
		return;
	}
	?>
	<nav aria-label="pagination">
		<ul class="post-navigation">
			<?php if ( get_next_posts_link() ) : ?>
				<li class="post-navigation__item post-navigation__item--previous"><?php next_posts_link( __( '<span aria-hidden="true">&larr;</span> Older posts' ) ); ?></li>
			<?php endif; ?>
			<?php if ( get_previous_posts_link() ) : ?>
				<li class="post-navigation__item post-navigation__item--next"><?php previous_posts_link( __( 'Newer posts <span aria-hidden="true">&rarr;</span>' ) ); ?></li>
			<?php endif; ?>
		</ul>
	</nav>
	<?php
}
endif;

// Set upload directory for ACF
add_filter('acf/upload_prefilter', 'field_name_upload_prefilter');
function field_name_upload_prefilter($errors)
{
	// in this filter we add a WP filter that alters the upload path
	add_filter('upload_dir', 'field_name_upload_dir');
	return $errors;
}
// second filter
function field_name_upload_dir($uploads)
{
	// here is where we later the path
	$uploads['path'] = $uploads['basedir'] . '/mapdata';
	$uploads['url'] = $uploads['baseurl'] . '/mapdata';
	$uploads['subdir'] = '';
	return $uploads;
}