<?php
/**
 * Plugin Name: Reportgenix Tools
 * Plugin URI: https://reportgenix.com
 * Description: A WordPress plugin with custom post type for tools supporting Gutenberg blocks
 * Version: 1.0.0
 * Author: Reportgenix
 * Author URI: https://reportgenix.com
 * Text Domain: reportgenix-tools
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('REPORTGENIX_TOOLS_VERSION', '1.0.0');
define('REPORTGENIX_TOOLS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('REPORTGENIX_TOOLS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('REPORTGENIX_TOOLS_PLUGIN_FILE', __FILE__);

/**
 * Register custom post type
 */
function reportgenix_register_tool_post_type() {
    $labels = [
        'name'                  => _x('Tools', 'Post type general name', 'reportgenix-tools'),
        'singular_name'         => _x('Tool', 'Post type singular name', 'reportgenix-tools'),
        'menu_name'             => _x('Tools', 'Admin Menu text', 'reportgenix-tools'),
        'add_new'               => __('Add New', 'reportgenix-tools'),
        'add_new_item'          => __('Add New Tool', 'reportgenix-tools'),
        'edit_item'             => __('Edit Tool', 'reportgenix-tools'),
        'view_item'             => __('View Tool', 'reportgenix-tools'),
        'all_items'             => __('All Tools', 'reportgenix-tools'),
        'search_items'          => __('Search Tools', 'reportgenix-tools'),
        'not_found'             => __('No tools found.', 'reportgenix-tools'),
        'not_found_in_trash'    => __('No tools found in Trash.', 'reportgenix-tools'),
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [
            'slug'       => 'tools',
            'with_front' => false,
        ],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-admin-tools',
        'supports'           => [
            'title',
            'editor',
            'thumbnail',
            'excerpt',
            'custom-fields',
        ],
        'show_in_rest'       => true, // Enable Gutenberg editor
    ];

    register_post_type('tool', $args);
}
add_action('init', 'reportgenix_register_tool_post_type');

/**
 * Load custom templates for tool post type
 */
function reportgenix_load_tool_templates($template) {
    global $post;

    // Single tool template
    if (is_singular('tool')) {
        $plugin_template = REPORTGENIX_TOOLS_PLUGIN_DIR . 'templates/single-tool.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }

    // Archive tools template
    if (is_post_type_archive('tool')) {
        $plugin_template = REPORTGENIX_TOOLS_PLUGIN_DIR . 'templates/archive-tool.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }

    return $template;
}
add_filter('template_include', 'reportgenix_load_tool_templates');

/**
 * Register custom block category
 */
function reportgenix_register_block_category($categories) {
    return array_merge(
        [
            [
                'slug'  => 'reportgenix-blocks',
                'title' => __('Reportgenix Blocks', 'reportgenix-tools'),
                'icon'  => 'admin-tools',
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', 'reportgenix_register_block_category', 10, 1);

/**
 * Debug: Check if scripts are loaded (only for admin)
 */
function reportgenix_debug_scripts() {
    if (is_admin()) {
        global $wp_scripts;
        error_log('Reportgenix: Plugin loaded');
        error_log('Reportgenix: Block file path: ' . REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/hero-section/block.php');
    }
}
add_action('admin_init', 'reportgenix_debug_scripts');

/**
 * Load Gutenberg blocks
 */
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/hero-section/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/features-grid/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/how-it-works/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/pros-cons/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/education/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/comparison-table/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/benchmarks/block.php';
require_once REPORTGENIX_TOOLS_PLUGIN_DIR . 'blocks/faq/block.php';

/**
 * Plugin activation
 */
function reportgenix_tools_activate() {
    reportgenix_register_tool_post_type();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'reportgenix_tools_activate');

/**
 * Plugin deactivation
 */
function reportgenix_tools_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'reportgenix_tools_deactivate');
