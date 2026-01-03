<?php
/**
 * Benchmarks Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Benchmarks Block
 */
function reportgenix_register_benchmarks_block() {
    // Register block script
    wp_register_script(
        'reportgenix-benchmarks-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/benchmarks/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-benchmarks-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/benchmarks/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/benchmarks', [
        'editor_script' => 'reportgenix-benchmarks-block-editor',
        'style'         => 'reportgenix-benchmarks-block-style',
        'render_callback' => 'reportgenix_render_benchmarks_block',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'Profit Margin Benchmarks by Industry',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'How does your Shopify store compare? Here are typical ecommerce profit margin ranges.',
            ],
            'benchmarks' => [
                'type'    => 'array',
                'default' => [
                    ['icon' => '👗', 'title' => 'Fashion & Apparel', 'range' => '30-50%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
                    ['icon' => '💄', 'title' => 'Beauty & Cosmetics', 'range' => '50-80%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
                    ['icon' => '💻', 'title' => 'Electronics', 'range' => '10-20%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
                    ['icon' => '🏠', 'title' => 'Home & Garden', 'range' => '25-45%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
                    ['icon' => '💎', 'title' => 'Jewelry & Accessories', 'range' => '50-70%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
                    ['icon' => '🥗', 'title' => 'Food & Beverage', 'range' => '20-40%', 'showIcon' => true, 'iconType' => 'emoji', 'iconImage' => ''],
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
            'cardBackgroundColor' => [
                'type'    => 'string',
                'default' => '#ffffff',
            ],
            'rangeColor' => [
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
add_action('init', 'reportgenix_register_benchmarks_block');

/**
 * Render Benchmarks Block
 */
function reportgenix_render_benchmarks_block($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    $benchmarks = isset($attributes['benchmarks']) ? $attributes['benchmarks'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#f9fafb';
    $card_bg_color = isset($attributes['cardBackgroundColor']) ? esc_attr($attributes['cardBackgroundColor']) : '#ffffff';
    $range_color = isset($attributes['rangeColor']) ? esc_attr($attributes['rangeColor']) : '#6b5af7';

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
        --rptx-card-bg-color: {$card_bg_color};
        --rptx-range-color: {$range_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-benchmarks" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-benchmarks__header">
                    <?php if ($title) : ?>
                        <h2><?php echo wp_kses_post($title); ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo wp_kses_post($subtitle); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($benchmarks)) : ?>
                <div class="rptx-benchmarks__grid">
                    <?php foreach ($benchmarks as $benchmark) : ?>
                        <?php
                        $show_icon = isset($benchmark['showIcon']) ? $benchmark['showIcon'] : true;
                        $icon_type = isset($benchmark['iconType']) ? $benchmark['iconType'] : 'emoji';
                        $icon_image = isset($benchmark['iconImage']) ? $benchmark['iconImage'] : '';
                        $icon_emoji = isset($benchmark['icon']) ? $benchmark['icon'] : '';
                        ?>
                        <div class="rptx-benchmark-card">
                            <?php if ($show_icon) : ?>
                                <div class="rptx-benchmark-card__icon">
                                    <?php if ($icon_type === 'image' && !empty($icon_image)) : ?>
                                        <img src="<?php echo esc_url($icon_image); ?>" alt="<?php echo esc_attr($benchmark['title']); ?>" />
                                    <?php elseif (!empty($icon_emoji)) : ?>
                                        <?php echo esc_html($icon_emoji); ?>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                            <?php if (!empty($benchmark['title'])) : ?>
                                <h4><?php echo esc_html($benchmark['title']); ?></h4>
                            <?php endif; ?>
                            <?php if (!empty($benchmark['range'])) : ?>
                                <div class="rptx-benchmark-card__range">
                                    <?php echo esc_html($benchmark['range']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
