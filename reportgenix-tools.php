<?php
/**
 * Plugin Name: Reportgenix Tools
 * Plugin URI: https://reportgenix.com
 * Description: A WordPress plugin with custom post type for tools supporting Gutenberg blocks
 * Version: 1.1.3
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
define('REPORTGENIX_TOOLS_VERSION', '1.1.3');
define('REPORTGENIX_TOOLS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('REPORTGENIX_TOOLS_PLUGIN_URL', plugins_url('/', __FILE__));
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
 * Register meta boxes for tool post type
 */
function reportgenix_add_tool_meta_boxes() {
    add_meta_box(
        'reportgenix_tool_details',
        __('Tool Details', 'reportgenix-tools'),
        'reportgenix_tool_details_callback',
        'tool',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'reportgenix_add_tool_meta_boxes');

/**
 * Meta box callback function
 */
function reportgenix_tool_details_callback($post) {
    // Add nonce for security
    wp_nonce_field('reportgenix_tool_meta_box', 'reportgenix_tool_meta_box_nonce');

    // Get existing values
    $short_description = get_post_meta($post->ID, '_reportgenix_short_description', true);
    $bullet_points = get_post_meta($post->ID, '_reportgenix_bullet_points', true);

    // If bullet_points is empty, set default empty array
    if (empty($bullet_points) || !is_array($bullet_points)) {
        $bullet_points = ['', '', ''];
    }
    ?>

    <div class="reportgenix-meta-fields">
        <style>
            .reportgenix-meta-fields .meta-field {
                margin-bottom: 20px;
            }
            .reportgenix-meta-fields label {
                display: block;
                font-weight: 600;
                margin-bottom: 8px;
                color: #1d2327;
            }
            .reportgenix-meta-fields textarea,
            .reportgenix-meta-fields input[type="text"] {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #8c8f94;
                border-radius: 4px;
                font-size: 14px;
            }
            .reportgenix-meta-fields textarea {
                min-height: 100px;
                resize: vertical;
            }
            .reportgenix-meta-fields .description {
                color: #646970;
                font-size: 13px;
                margin-top: 5px;
            }
            .bullet-point-field {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-bottom: 10px;
            }
            .bullet-point-field span {
                color: #2271b1;
                font-weight: 600;
                padding-top: 8px;
            }
            .bullet-point-field input {
                flex: 1;
            }
            .add-bullet-point,
            .remove-bullet-point {
                margin-top: 10px;
                cursor: pointer;
            }
            .remove-bullet-point {
                color: #d63638;
                text-decoration: none;
                padding: 4px 8px;
                border: 1px solid #d63638;
                border-radius: 3px;
                font-size: 12px;
                background: #fff;
            }
            .remove-bullet-point:hover {
                background: #d63638;
                color: #fff;
            }
        </style>

        <div class="meta-field">
            <label for="reportgenix_short_description">
                <?php _e('Short Description', 'reportgenix-tools'); ?>
            </label>
            <textarea
                id="reportgenix_short_description"
                name="reportgenix_short_description"
                rows="4"
            ><?php echo esc_textarea($short_description); ?></textarea>
            <p class="description">
                <?php _e('A brief description of the tool to display on the archive page (recommended: 120-150 characters).', 'reportgenix-tools'); ?>
            </p>
        </div>

        <div class="meta-field">
            <label><?php _e('Key Features (Bullet Points)', 'reportgenix-tools'); ?></label>
            <div id="bullet-points-container">
                <?php
                foreach ($bullet_points as $index => $point) {
                    ?>
                    <div class="bullet-point-field">
                        <span>●</span>
                        <input
                            type="text"
                            name="reportgenix_bullet_points[]"
                            value="<?php echo esc_attr($point); ?>"
                            placeholder="<?php _e('Enter feature or benefit', 'reportgenix-tools'); ?>"
                        />
                        <?php if ($index > 0) : ?>
                            <button type="button" class="remove-bullet-point" onclick="this.parentElement.remove()">
                                <?php _e('Remove', 'reportgenix-tools'); ?>
                            </button>
                        <?php endif; ?>
                    </div>
                    <?php
                }
                ?>
            </div>
            <button type="button" class="button add-bullet-point" id="add-bullet-point">
                <?php _e('+ Add Bullet Point', 'reportgenix-tools'); ?>
            </button>
            <p class="description">
                <?php _e('Add key features or benefits of this tool (recommended: 3-5 points).', 'reportgenix-tools'); ?>
            </p>
        </div>

        <script>
            document.getElementById('add-bullet-point').addEventListener('click', function() {
                var container = document.getElementById('bullet-points-container');
                var newField = document.createElement('div');
                newField.className = 'bullet-point-field';
                newField.innerHTML = '<span>●</span>' +
                    '<input type="text" name="reportgenix_bullet_points[]" placeholder="<?php _e('Enter feature or benefit', 'reportgenix-tools'); ?>" />' +
                    '<button type="button" class="remove-bullet-point" onclick="this.parentElement.remove()"><?php _e('Remove', 'reportgenix-tools'); ?></button>';
                container.appendChild(newField);
            });
        </script>
    </div>
    <?php
}

/**
 * Save meta box data
 */
function reportgenix_save_tool_meta($post_id) {
    // Check if nonce is set
    if (!isset($_POST['reportgenix_tool_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['reportgenix_tool_meta_box_nonce'], 'reportgenix_tool_meta_box')) {
        return;
    }

    // Check if this is an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save short description
    if (isset($_POST['reportgenix_short_description'])) {
        update_post_meta(
            $post_id,
            '_reportgenix_short_description',
            sanitize_textarea_field($_POST['reportgenix_short_description'])
        );
    }

    // Save bullet points
    if (isset($_POST['reportgenix_bullet_points'])) {
        $bullet_points = array_map('sanitize_text_field', $_POST['reportgenix_bullet_points']);
        // Remove empty values
        $bullet_points = array_filter($bullet_points, function($value) {
            return !empty(trim($value));
        });
        // Re-index array
        $bullet_points = array_values($bullet_points);

        update_post_meta($post_id, '_reportgenix_bullet_points', $bullet_points);
    } else {
        delete_post_meta($post_id, '_reportgenix_bullet_points');
    }
}
add_action('save_post', 'reportgenix_save_tool_meta');

/**
 * Load custom templates for tool post type
 */
function reportgenix_load_tool_templates($template) {
    global $post;

    // Single tool template
    if (is_singular('tool')) {
        // Force enqueue styles when template loads
        wp_enqueue_style(
            'reportgenix-tools-main-style',
            REPORTGENIX_TOOLS_PLUGIN_URL . 'assets/public/css/reportgenix-tools-main.css',
            [],
            REPORTGENIX_TOOLS_VERSION,
            'all'
        );

        $plugin_template = REPORTGENIX_TOOLS_PLUGIN_DIR . 'templates/single-tool.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }

    // Archive tools template
    if (is_post_type_archive('tool')) {
        // Force enqueue styles when template loads
        wp_enqueue_style(
            'reportgenix-tools-main-style',
            REPORTGENIX_TOOLS_PLUGIN_URL . 'assets/public/css/reportgenix-tools-main.css',
            [],
            REPORTGENIX_TOOLS_VERSION,
            'all'
        );

        $plugin_template = REPORTGENIX_TOOLS_PLUGIN_DIR . 'templates/archive-tool.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }

    return $template;
}
add_filter('template_include', 'reportgenix_load_tool_templates');

/**
 * Enqueue frontend styles
 */
function reportgenix_enqueue_frontend_styles() {
    // Check if we're on a tool post type page
    $is_tool_archive = is_post_type_archive('tool');
    $is_tool_single = is_singular('tool');

    // Also check via query var for better compatibility
    global $wp_query;
    if (isset($wp_query->query_vars['post_type']) && $wp_query->query_vars['post_type'] === 'tool') {
        $is_tool_archive = true;
    }

    // Enqueue styles on tool pages
    if ($is_tool_archive || $is_tool_single) {
        wp_enqueue_style(
            'reportgenix-tools-main-style',
            REPORTGENIX_TOOLS_PLUGIN_URL . 'assets/public/css/reportgenix-tools-main.css',
            [],
            REPORTGENIX_TOOLS_VERSION,
            'all'
        );
    }
}
add_action('wp_enqueue_scripts', 'reportgenix_enqueue_frontend_styles', 10);

/**
 * Customize page title for tools archive
 */
function reportgenix_custom_archive_title($title) {
    if (is_post_type_archive('tool')) {
        $title = __('Free Shopify Tools & Calculators for Store Owners', 'reportgenix-tools');
    }
    return $title;
}
add_filter('pre_get_document_title', 'reportgenix_custom_archive_title');

/**
 * Add SEO meta tags for tools archive
 */
function reportgenix_add_meta_tags() {
    if (is_post_type_archive('tool')) {
        $meta_title = __('Free Shopify Tools & Calculators for Store Owners', 'reportgenix-tools');
        $meta_description = __('Free tools and calculators built for Shopify merchants. Profit margin calculator, ROAS calculator, break-even analysis, pricing tools & more. No signup required.', 'reportgenix-tools');
        $site_url = home_url('/tools/');
        ?>
        <meta name="description" content="<?php echo esc_attr($meta_description); ?>" />
        <meta name="robots" content="index, follow" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="<?php echo esc_url($site_url); ?>" />
        <meta property="og:title" content="<?php echo esc_attr($meta_title); ?>" />
        <meta property="og:description" content="<?php echo esc_attr($meta_description); ?>" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="<?php echo esc_url($site_url); ?>" />
        <meta name="twitter:title" content="<?php echo esc_attr($meta_title); ?>" />
        <meta name="twitter:description" content="<?php echo esc_attr($meta_description); ?>" />
        <?php
    }
}
add_action('wp_head', 'reportgenix_add_meta_tags', 1);

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
