<?php
/**
 * Features Grid Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Features Grid Block
 */
function reportgenix_register_features_block() {
    // Register block script
    wp_register_script(
        'reportgenix-features-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/features-grid/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-features-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/features-grid/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/features-grid', [
        'editor_script' => 'reportgenix-features-block-editor',
        'style'         => 'reportgenix-features-block-style',
        'render_callback' => 'reportgenix_render_features_block',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'Why Shopify Merchants Love This Calculator',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'Built specifically for ecommerce sellers who want to know their true profit margins.',
            ],
            'features' => [
                'type'    => 'array',
                'default' => [
                    [
                        'iconType' => 'svg',
                        'icon' => 'dollar',
                        'iconImage' => '',
                        'showIcon' => true,
                        'title' => 'Shopify Fee Calculator Built-In',
                        'description' => 'Automatically factor in Shopify\'s transaction fees (2.9% + 30¢), payment processing costs, and subscription fees for accurate profit calculations.',
                    ],
                    [
                        'iconType' => 'svg',
                        'icon' => 'card',
                        'iconImage' => '',
                        'showIcon' => true,
                        'title' => 'All Costs Included',
                        'description' => 'Enter product cost, shipping, packaging, marketing spend per unit, and returns rate. See your true net profit margin, not just gross margin.',
                    ],
                    [
                        'iconType' => 'svg',
                        'icon' => 'chart',
                        'iconImage' => '',
                        'showIcon' => true,
                        'title' => 'Instant Margin Analysis',
                        'description' => 'Get instant results showing gross profit, net profit, margin percentage, and markup ratio. Make informed pricing decisions in seconds.',
                    ],
                ],
            ],
            'fullWidth' => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'backgroundColor' => [
                'type'    => 'string',
                'default' => '#f9fafb',
            ],
            'primaryColor' => [
                'type'    => 'string',
                'default' => '#6b5af7',
            ],
            'paddingTop' => [
                'type'    => 'number',
                'default' => 80,
            ],
            'paddingBottom' => [
                'type'    => 'number',
                'default' => 80,
            ],
            'paddingTopTablet' => [
                'type'    => 'number',
                'default' => 60,
            ],
            'paddingBottomTablet' => [
                'type'    => 'number',
                'default' => 60,
            ],
            'paddingTopMobile' => [
                'type'    => 'number',
                'default' => 40,
            ],
            'paddingBottomMobile' => [
                'type'    => 'number',
                'default' => 40,
            ],
        ],
    ]);
}
add_action('init', 'reportgenix_register_features_block');

/**
 * Get SVG icon by name
 */
function reportgenix_get_feature_icon($icon_name) {
    $icons = [
        'dollar' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        'card' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="22" height="18" rx="2"/><line x1="1" y1="9" x2="23" y2="9"/></svg>',
        'chart' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
        'document' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        'trending' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
        'monitor' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    ];

    return isset($icons[$icon_name]) ? $icons[$icon_name] : $icons['chart'];
}

/**
 * Render Features Block
 */
function reportgenix_render_features_block($attributes) {
    $title = isset($attributes['title']) ? esc_html($attributes['title']) : '';
    $subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
    $features = isset($attributes['features']) ? $attributes['features'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#f9fafb';
    $primary_color = isset($attributes['primaryColor']) ? esc_attr($attributes['primaryColor']) : '#6b5af7';

    // Get spacing
    $padding_top = isset($attributes['paddingTop']) ? intval($attributes['paddingTop']) : 80;
    $padding_bottom = isset($attributes['paddingBottom']) ? intval($attributes['paddingBottom']) : 80;
    $padding_top_tablet = isset($attributes['paddingTopTablet']) ? intval($attributes['paddingTopTablet']) : 60;
    $padding_bottom_tablet = isset($attributes['paddingBottomTablet']) ? intval($attributes['paddingBottomTablet']) : 60;
    $padding_top_mobile = isset($attributes['paddingTopMobile']) ? intval($attributes['paddingTopMobile']) : 40;
    $padding_bottom_mobile = isset($attributes['paddingBottomMobile']) ? intval($attributes['paddingBottomMobile']) : 40;

    $container_class = $full_width ? 'custom-container custom-container--full' : 'custom-container';

    // Inline styles
    $section_style = "
        --rptx-bg-color: {$bg_color};
        --rptx-primary-color: {$primary_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-features" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-features__header">
                    <?php if ($title) : ?>
                        <h2><?php echo $title; ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo $subtitle; ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="rptx-features__grid">
                <?php foreach ($features as $feature) :
                    $show_icon = isset($feature['showIcon']) ? $feature['showIcon'] : true;
                    $icon_type = isset($feature['iconType']) ? $feature['iconType'] : 'svg';
                    $icon_image = isset($feature['iconImage']) ? $feature['iconImage'] : '';
                ?>
                    <article class="rptx-feature-card">
                        <?php if ($show_icon) : ?>
                            <div class="rptx-feature-card__icon">
                                <?php if ($icon_type === 'image' && $icon_image) : ?>
                                    <img src="<?php echo esc_url($icon_image); ?>" alt="<?php echo esc_attr($feature['title']); ?>" />
                                <?php else : ?>
                                    <?php echo reportgenix_get_feature_icon($feature['icon']); ?>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                        <h3><?php echo esc_html($feature['title']); ?></h3>
                        <p><?php echo esc_html($feature['description']); ?></p>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
