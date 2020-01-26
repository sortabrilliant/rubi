<?php
/**
 * Plugin Name:     Rubi
 * Description:     The easiest way to add Ruby characters to your site.
 * Version:         1.0.0
 * Author:          sorta brilliant
 * Author URI:      https://sortabrilliant.com/
 * License:         GPL-2.0-or-later
 * Text Domain:     rubi
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function sortabrilliant_rubi_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-wordpress-block/sortabrilliant-rubi" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'sortabrilliant-rubi-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'sortabrilliant-rubi-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	register_block_type( 'create-wordpress-block/sortabrilliant-rubi', array(
		'editor_script' => 'sortabrilliant-rubi-block-editor',
		'editor_style'  => 'sortabrilliant-rubi-block-editor',
	) );
}
add_action( 'init', 'sortabrilliant_rubi_block_init' );
