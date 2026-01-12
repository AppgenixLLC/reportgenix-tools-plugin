<?php
/**
 * How It Works Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register How It Works Block
 */
function reportgenix_register_how_it_works_block() {
    // Register block script
    wp_register_script(
        'reportgenix-how-it-works-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/how-it-works/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-how-it-works-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/how-it-works/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/how-it-works', [
        'editor_script' => 'reportgenix-how-it-works-block-editor',
        'style'         => 'reportgenix-how-it-works-block-style',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'How to Calculate Your Shopify Profit Margin',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'Three simple steps to understand your true ecommerce profitability.',
            ],
            'steps' => [
                'type'    => 'array',
                'default' => [
                    [
                        'title' => 'Enter Your Costs',
                        'description' => 'Input your product cost (COGS), shipping fees, packaging costs, and any marketing spend per unit sold.',
                    ],
                    [
                        'title' => 'Add Your Selling Price',
                        'description' => 'Enter your current or planned selling price. The calculator includes Shopify fees automatically.',
                    ],
                    [
                        'title' => 'See Your Real Profit',
                        'description' => 'Instantly view your gross margin, net margin, profit per unit, and markup percentage with detailed breakdowns.',
                    ],
                ],
            ],
            'fullWidth' => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'backgroundColor' => [
                'type'    => 'string',
                'default' => '#ffffff',
            ],
            'numberColor' => [
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
add_action('init', 'reportgenix_register_how_it_works_block');

/**
 * Render How It Works Block
 */
function reportgenix_render_how_it_works_block($attributes) {
    $title = isset($attributes['title']) ? esc_html($attributes['title']) : '';
    $subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
    $steps = isset($attributes['steps']) ? $attributes['steps'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#ffffff';
    $number_color = isset($attributes['numberColor']) ? esc_attr($attributes['numberColor']) : '#6b5af7';

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
        --rptx-number-color: {$number_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-how-it-works" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-how-it-works__header">
                    <?php if ($title) : ?>
                        <h2><?php echo $title; ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo $subtitle; ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="rptx-steps">
                <?php foreach ($steps as $index => $step) : ?>
                    <div class="rptx-step">
                        <div class="rptx-step__number"><?php echo intval($index + 1); ?></div>
                        <h3><?php echo esc_html($step['title']); ?></h3>
                        <p><?php echo esc_html($step['description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
