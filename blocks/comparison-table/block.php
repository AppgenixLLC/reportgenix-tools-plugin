<?php
/**
 * Comparison Table Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Comparison Table Block
 */
function reportgenix_register_comparison_table_block() {
    // Register block script
    wp_register_script(
        'reportgenix-comparison-table-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/comparison-table/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-comparison-table-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/comparison-table/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/comparison-table', [
        'editor_script' => 'reportgenix-comparison-table-block-editor',
        'style'         => 'reportgenix-comparison-table-block-style',
        'render_callback' => 'reportgenix_render_comparison_table_block',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'Margin vs. Markup: Understanding the Difference',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'Don\'t confuse these two metrics. A 100% markup only equals a 50% profit margin.',
            ],
            'tableHeaders' => [
                'type'    => 'array',
                'default' => [
                    'Markup %',
                    'Profit Margin %',
                    'Cost Price',
                    'Selling Price',
                ],
            ],
            'tableRows' => [
                'type'    => 'array',
                'default' => [
                    ['25%', '20%', '$10.00', '$12.50'],
                    ['50%', '33.3%', '$10.00', '$15.00'],
                    ['100%', '50%', '$10.00', '$20.00'],
                    ['200%', '66.7%', '$10.00', '$30.00'],
                    ['300%', '75%', '$10.00', '$40.00'],
                ],
            ],
            'fullWidth' => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'narrowContainer' => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'backgroundColor' => [
                'type'    => 'string',
                'default' => '#ffffff',
            ],
            'headerBackgroundColor' => [
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
add_action('init', 'reportgenix_register_comparison_table_block');

/**
 * Render Comparison Table Block
 */
function reportgenix_render_comparison_table_block($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    $table_headers = isset($attributes['tableHeaders']) ? $attributes['tableHeaders'] : [];
    $table_rows = isset($attributes['tableRows']) ? $attributes['tableRows'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $narrow_container = isset($attributes['narrowContainer']) ? $attributes['narrowContainer'] : true;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#ffffff';
    $header_bg_color = isset($attributes['headerBackgroundColor']) ? esc_attr($attributes['headerBackgroundColor']) : '#6b5af7';

    // Get spacing
    $padding_top = isset($attributes['paddingTop']) ? intval($attributes['paddingTop']) : 80;
    $padding_bottom = isset($attributes['paddingBottom']) ? intval($attributes['paddingBottom']) : 80;
    $padding_top_tablet = isset($attributes['paddingTopTablet']) ? intval($attributes['paddingTopTablet']) : 60;
    $padding_bottom_tablet = isset($attributes['paddingBottomTablet']) ? intval($attributes['paddingBottomTablet']) : 60;
    $padding_top_mobile = isset($attributes['paddingTopMobile']) ? intval($attributes['paddingTopMobile']) : 40;
    $padding_bottom_mobile = isset($attributes['paddingBottomMobile']) ? intval($attributes['paddingBottomMobile']) : 40;

    // Container class
    $container_class = 'custom-container';
    if ($full_width) {
        $container_class .= ' custom-container--full';
    } elseif ($narrow_container) {
        $container_class .= ' custom-container--narrow';
    }

    // Inline styles
    $section_style = "
        --rptx-bg-color: {$bg_color};
        --rptx-header-bg-color: {$header_bg_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-comparison" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-comparison__header">
                    <?php if ($title) : ?>
                        <h2><?php echo wp_kses_post($title); ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo wp_kses_post($subtitle); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="rptx-comparison__table">
                <table>
                    <?php if (!empty($table_headers)) : ?>
                        <thead>
                            <tr>
                                <?php foreach ($table_headers as $header) : ?>
                                    <th><?php echo esc_html($header); ?></th>
                                <?php endforeach; ?>
                            </tr>
                        </thead>
                    <?php endif; ?>
                    <?php if (!empty($table_rows)) : ?>
                        <tbody>
                            <?php foreach ($table_rows as $row) : ?>
                                <tr>
                                    <?php foreach ($row as $cell) : ?>
                                        <td><?php echo esc_html($cell); ?></td>
                                    <?php endforeach; ?>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    <?php endif; ?>
                </table>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
