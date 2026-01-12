<?php
/**
 * Pros and Cons Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Pros and Cons Block
 */
function reportgenix_register_pros_cons_block() {
    // Register block script
    wp_register_script(
        'reportgenix-pros-cons-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/pros-cons/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-pros-cons-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/pros-cons/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/pros-cons', [
        'editor_script' => 'reportgenix-pros-cons-block-editor',
        'style'         => 'reportgenix-pros-cons-block-style',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'Pros and Cons of Our Profit Margin Calculator',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'We believe in transparency. Here\'s what our calculator does well and where it has limitations.',
            ],
            'prosTitle' => [
                'type'    => 'string',
                'default' => 'Pros',
            ],
            'consTitle' => [
                'type'    => 'string',
                'default' => 'Cons',
            ],
            'pros' => [
                'type'    => 'array',
                'default' => [
                    [
                        'title' => '100% Free Forever',
                        'description' => 'No hidden fees, no premium tier, no email required. Use unlimited calculations at no cost.',
                    ],
                ],
            ],
            'cons' => [
                'type'    => 'array',
                'default' => [
                    [
                        'title' => 'Single Product Calculation',
                        'description' => 'Calculates one product at a time. For bulk product analysis, you\'ll need spreadsheet software or dedicated tools.',
                    ],
                ],
            ],
            'showVerdict' => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'verdictTitle' => [
                'type'    => 'string',
                'default' => 'Our Verdict',
            ],
            'verdictText' => [
                'type'    => 'string',
                'default' => 'This calculator is best for quick pricing decisions, validating product margins before launch, and understanding your true profitability on individual products.',
            ],
            'verdictIcon' => [
                'type'    => 'string',
                'default' => '💡',
            ],
            'fullWidth' => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'backgroundColor' => [
                'type'    => 'string',
                'default' => '#f9fafb',
            ],
            'prosColor' => [
                'type'    => 'string',
                'default' => '#10B981',
            ],
            'consColor' => [
                'type'    => 'string',
                'default' => '#EF4444',
            ],
            'verdictBackgroundColor' => [
                'type'    => 'string',
                'default' => '#667eea',
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
add_action('init', 'reportgenix_register_pros_cons_block');

/**
 * Render Pros and Cons Block
 */
function reportgenix_render_pros_cons_block($attributes) {
    $title = isset($attributes['title']) ? esc_html($attributes['title']) : '';
    $subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
    $pros_title = isset($attributes['prosTitle']) ? esc_html($attributes['prosTitle']) : 'Pros';
    $cons_title = isset($attributes['consTitle']) ? esc_html($attributes['consTitle']) : 'Cons';
    $pros = isset($attributes['pros']) ? $attributes['pros'] : [];
    $cons = isset($attributes['cons']) ? $attributes['cons'] : [];
    $show_verdict = isset($attributes['showVerdict']) ? $attributes['showVerdict'] : true;
    $verdict_title = isset($attributes['verdictTitle']) ? esc_html($attributes['verdictTitle']) : '';
    $verdict_text = isset($attributes['verdictText']) ? esc_html($attributes['verdictText']) : '';
    $verdict_icon = isset($attributes['verdictIcon']) ? esc_html($attributes['verdictIcon']) : '💡';

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#f9fafb';
    $pros_color = isset($attributes['prosColor']) ? esc_attr($attributes['prosColor']) : '#10B981';
    $cons_color = isset($attributes['consColor']) ? esc_attr($attributes['consColor']) : '#EF4444';
    $verdict_bg_color = isset($attributes['verdictBackgroundColor']) ? esc_attr($attributes['verdictBackgroundColor']) : '#667eea';

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
        --rptx-pros-color: {$pros_color};
        --rptx-cons-color: {$cons_color};
        --rptx-verdict-bg-color: {$verdict_bg_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    ob_start();
    ?>
    <section class="rptx-pros-cons" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-pros-cons__header">
                    <?php if ($title) : ?>
                        <h2><?php echo $title; ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo $subtitle; ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="rptx-pros-cons__grid">
                <!-- Pros Card -->
                <div class="rptx-pros-cons__card rptx-pros-cons__card--pros">
                    <div class="rptx-pros-cons__card-header">
                        <div class="rptx-pros-cons__icon rptx-pros-cons__icon--pros">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h3><?php echo $pros_title; ?></h3>
                    </div>
                    <ul class="rptx-pros-cons__list">
                        <?php foreach ($pros as $pro) : ?>
                            <li>
                                <span class="rptx-pros-cons__bullet rptx-pros-cons__bullet--pros">✓</span>
                                <div>
                                    <strong><?php echo esc_html($pro['title']); ?></strong>
                                    <p><?php echo esc_html($pro['description']); ?></p>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Cons Card -->
                <div class="rptx-pros-cons__card rptx-pros-cons__card--cons">
                    <div class="rptx-pros-cons__card-header">
                        <div class="rptx-pros-cons__icon rptx-pros-cons__icon--cons">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                        <h3><?php echo $cons_title; ?></h3>
                    </div>
                    <ul class="rptx-pros-cons__list">
                        <?php foreach ($cons as $con) : ?>
                            <li>
                                <span class="rptx-pros-cons__bullet rptx-pros-cons__bullet--cons">✗</span>
                                <div>
                                    <strong><?php echo esc_html($con['title']); ?></strong>
                                    <p><?php echo esc_html($con['description']); ?></p>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>

            <?php if ($show_verdict && ($verdict_title || $verdict_text)) : ?>
                <div class="rptx-pros-cons__verdict">
                    <div class="rptx-pros-cons__verdict-icon"><?php echo $verdict_icon; ?></div>
                    <div class="rptx-pros-cons__verdict-content">
                        <?php if ($verdict_title) : ?>
                            <h4><?php echo $verdict_title; ?></h4>
                        <?php endif; ?>
                        <?php if ($verdict_text) : ?>
                            <p><?php echo $verdict_text; ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
