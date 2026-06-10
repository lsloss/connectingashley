<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package connectingashley
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments
 */
if ( post_password_required() ) {
	return;
}
?>

<div class="comments">
	<?php
	if ( have_comments() ) : ?>
		<h2 class="comments__title">
			<?php
				printf( // WPCS: XSS OK
					esc_html( _nx( '%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', get_comments_number(), 'comments title', 'connectingashley' ) ),
					number_format_i18n( get_comments_number() ),
					'<span class="comments__post-title">' . get_the_title() . '</span>'
				);
			?>
		</h2>

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>
		<nav id="comment-nav-above" class="navigation comments__nav">
			<h2 class="screen-reader-text"><?php esc_html_e( 'Comment navigation', 'connectingashley' ); ?></h2>
			<div class="comments__nav-links">

				<div class="comments__nav-link comments__nav-link--previous"><?php previous_comments_link( esc_html__( 'Older Comments', 'connectingashley' ) ); ?></div>
				<div class="comments__nav-link comments__nav-link--next"><?php next_comments_link( esc_html__( 'Newer Comments', 'connectingashley' ) ); ?></div>

			</div><!-- .comments__nav-links -->
		</nav><!-- #comment-nav-above -->
		<?php endif; // Check for comment navigation ?>

		<div class="comments__list">
			<?php
				wp_list_comments( array(
					'style'      => 'div',
					'short_ping' => true,
					'callback'	 => 'connectingashley_comments',
				) );
			?>
		</div><!-- .comments__list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>
		<nav id="comment-nav-above" class="navigation comments__nav">
			<h2 class="screen-reader-text"><?php esc_html_e( 'Comment navigation', 'connectingashley' ); ?></h2>
			<div class="comments__nav-links">

				<div class="comments__nav-link comments__nav-link--previous"><?php previous_comments_link( esc_html__( 'Older Comments', 'connectingashley' ) ); ?></div>
				<div class="comments__nav-link comments__nav-link--next"><?php next_comments_link( esc_html__( 'Newer Comments', 'connectingashley' ) ); ?></div>

			</div><!-- .nav-links -->
		</nav><!-- #comment-nav-above -->
		<?php endif; // Check for comment navigation

	endif; // Check for have_comments()


	// If comments are closed and there are comments leave a note
	if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>

		<p class="no-comments comments__no-comment"><?php esc_html_e( 'Comments are closed.', 'connectingashley' ); ?></p>
	<?php
	endif;

	$fields = array(
	'author' =>
	  '<p class="comment-form-author comments__field"><label for="author" class="comments__field-label">' . __( 'Name', 'connectingashley' ) . '</label> ' .
	  ( $req ? '<span class="required comments__field-required">*</span>' : '' ) .
	  '<input class="comments__field-input comments__field-input--name" id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
	  '" size="30"' . $aria_req . ' /></p>',

	'email' =>
	  '<p class="comment-form-email comments__field"><label for="email" class="comments__field-label">' . __( 'Email', 'connectingashley' ) . '</label> ' .
	  ( $req ? '<span class="required comments__field-required">*</span>' : '' ) .
	  '<input class="comments__field-input comments__field-input--email" id="email" name="email" type="text" value="' . esc_attr( $commenter['comment_author_email'] ) .
	  '" size="30"' . $aria_req . ' /></p>',

	'url' =>
	  '<p class="comment-form-url comments__field"><label for="url" class="comments__field-label">' . __( 'Website', 'connectingashley' ) . '</label><input class="comments__field-input comments__field-input--website" id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) .
	  '" size="30" /></p>',
	);

	comment_form(array(
		'id_form' => 'commentform',
		'class_form' => 'comment-form comments__form',
		'id_submit' => 'submit',
		'class_submit' => 'submit comments__form-submit',
		'name_submit' => 'submit',
		'title_reply' => __( 'Leave a Reply', 'connectingashley' ),
		'title_reply_to' => __( 'Leave a Reply to %s', 'connectingashley' ),
		'cancel_reply_link' => __( 'Cancel Reply', 'connectingashley' ),
		'label_submit' => __( 'Post Comment', 'connectingashley' ),
		'format' => 'xhtml',
		'comment_field' => '<p class="comment-form-comment comments__field"><label for="comment" class="comments__field-label">' . _x( 'Comment', 'noun', 'connectingashley' ) .
		'</label><textarea class="comments__field-input comments__field-input--comment" id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>',
		'must_log_in' => '<p class="must-log-in comments__warning comments__warning--not-logged-in">' .
		sprintf(
			__( 'You must be <a href="%s">logged in</a> to post a comment.', 'connectingashley' ),
			wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
		) . '</p>',

		'logged_in_as' => '<p class="logged-in-as comments__user">' .
		sprintf(
			__( 'Logged in as <a href="%1$s" class="comments__user-name">%2$s</a>. <a href="%3$s" class="comments__logout-link" title="Log out of this account">Log out?</a>', 'connectingashley' ),
			admin_url( 'profile.php' ),
			$user_identity,
			wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
		) . '</p>',

		'comment_notes_before' => '<p class="comment-notes comments__notes">' .
		__( 'Your email address will not be published.', 'connectingashley' ) . ( $req ? $required_text : '' ) .
		'</p>',

		'comment_notes_after' => '<p class="form-allowed-tags comments__notes">' .
		sprintf(
			__( 'You may use these HTML tags and attributes: %s', 'connectingashley' ),
			' <code class="comments__notes-code">' . allowed_tags() . '</code>'
		) . '</p>',

		'fields' => apply_filters( 'comment_form_default_fields', $fields ),
	));
	?>

</div>