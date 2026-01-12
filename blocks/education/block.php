<?php
/**
 * Education Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Education Block
 */
function reportgenix_register_education_block() {
    // Register block script
    wp_register_script(
        'reportgenix-education-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/education/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-education-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/education/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/education', [
        'editor_script' => 'reportgenix-education-block-editor',
        'style'         => 'reportgenix-education-block-style',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'What is Profit Margin and Why Does It Matter?',
            ],
            'content' => [
                'type'    => 'array',
                'default' => [
                    'Profit margin is the percentage of revenue that remains as profit after deducting all costs. For Shopify store owners, understanding your profit margin is critical for sustainable growth.',
                    'Many ecommerce sellers focus solely on revenue, but high sales don\'t guarantee profitability. If your margins are too thin, rising costs from shipping, ads, or platform fees can quickly turn profits into losses.',
                    'A healthy profit margin gives you room to invest in marketing, absorb unexpected costs, and scale your business confidently. Most successful Shopify stores aim for a net profit margin of 15-25% after all expenses.',
                    'By regularly calculating your profit margins using this free calculator, you can identify underpriced products, optimize your pricing strategy, and make data-driven decisions that improve your bottom line.',
                ],
            ],
            'formulaTitle' => [
                'type'    => 'string',
                'default' => 'Profit Margin Formula',
            ],
            'formulaText' => [
                'type'    => 'string',
                'default' => 'Profit Margin = ((Revenue - Costs) ÷ Revenue) × 100',
            ],
            'exampleTitle' => [
                'type'    => 'string',
                'default' => 'Example Calculation',
            ],
            'exampleData' => [
                'type'    => 'array',
                'default' => [
                    ['label' => 'Selling Price:', 'value' => '$50.00'],
                    ['label' => 'Product Cost:', 'value' => '$15.00'],
                    ['label' => 'Shipping:', 'value' => '$5.00'],
                    ['label' => 'Shopify Fees:', 'value' => '$1.75 (2.9% + $0.30)'],
                    ['label' => 'Marketing:', 'value' => '$8.00'],
                    ['label' => '', 'value' => ''],
                    ['label' => 'Total Costs:', 'value' => '$29.75', 'bold' => true],
                    ['label' => 'Net Profit:', 'value' => '$20.25', 'bold' => true],
                    ['label' => 'Profit Margin:', 'value' => '40.5%', 'bold' => true],
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
            'formulaBoxColor' => [
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
add_action('init', 'reportgenix_register_education_block');

/**
 * Render Education Block
 */
function reportgenix_render_education_block($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $content = isset($attributes['content']) ? $attributes['content'] : [];
    $formula_title = isset($attributes['formulaTitle']) ? esc_html($attributes['formulaTitle']) : '';
    $formula_text = isset($attributes['formulaText']) ? esc_html($attributes['formulaText']) : '';
    $example_title = isset($attributes['exampleTitle']) ? esc_html($attributes['exampleTitle']) : '';
    $example_data = isset($attributes['exampleData']) ? $attributes['exampleData'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#f9fafb';
    $formula_box_color = isset($attributes['formulaBoxColor']) ? esc_attr($attributes['formulaBoxColor']) : '#6b5af7';

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
        --rptx-formula-box-color: {$formula_box_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-education" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <div class="rptx-education__grid">
                <div class="rptx-education__content">
                    <?php if ($title) : ?>
                        <h2><?php echo wp_kses_post($title); ?></h2>
                    <?php endif; ?>
                    <?php foreach ($content as $paragraph) : ?>
                        <p><?php echo wp_kses_post($paragraph); ?></p>
                    <?php endforeach; ?>
                </div>
                <div class="rptx-education__formula">
                    <?php if ($formula_title) : ?>
                        <h3><?php echo $formula_title; ?></h3>
                    <?php endif; ?>
                    <?php if ($formula_text) : ?>
                        <div class="rptx-formula-box">
                            <?php echo esc_html($formula_text); ?>
                        </div>
                    <?php endif; ?>
                    <?php if (!empty($example_data)) : ?>
                        <div class="rptx-formula-example">
                            <?php if ($example_title) : ?>
                                <h4><?php echo $example_title; ?></h4>
                            <?php endif; ?>
                            <div class="rptx-example-data">
                                <?php foreach ($example_data as $item) : ?>
                                    <?php if (empty($item['label']) && empty($item['value'])) : ?>
                                        <div class="rptx-example-spacer"></div>
                                    <?php else : ?>
                                        <div class="rptx-example-row<?php echo isset($item['bold']) && $item['bold'] ? ' rptx-example-row--bold' : ''; ?>">
                                            <?php if (!empty($item['label'])) : ?>
                                                <span class="rptx-example-label"><?php echo esc_html($item['label']); ?></span>
                                            <?php endif; ?>
                                            <?php if (!empty($item['value'])) : ?>
                                                <span class="rptx-example-value"><?php echo esc_html($item['value']); ?></span>
                                            <?php endif; ?>
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
