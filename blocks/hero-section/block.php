<?php
/**
 * Hero Section Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Hero Section Block
 */
function reportgenix_register_hero_block() {
    // Debug
    error_log('Reportgenix: Registering hero block');
    error_log('Reportgenix: Script URL: ' . REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/hero-section/js/block.js');

    // Register block script
    wp_register_script(
        'reportgenix-hero-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/hero-section/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles (editor + frontend)
    wp_register_style(
        'reportgenix-hero-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/hero-section/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register block
    register_block_type('reportgenix/hero-section', [
        'editor_script' => 'reportgenix-hero-block-editor',
        'style'         => 'reportgenix-hero-block-style',
        'render_callback' => 'reportgenix_render_hero_block',
        'attributes'    => [
            'badge' => [
                'type'    => 'string',
                'default' => '100% Free Tool',
            ],
            'title' => [
                'type'    => 'string',
                'default' => 'Free Shopify Profit Margin Calculator',
            ],
            'highlightText' => [
                'type'    => 'string',
                'default' => 'Shopify Profit Margin',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'Know your real profit on every product. Calculate gross margin, net profit, and optimal pricing — with all costs included.',
            ],
            'buttonText' => [
                'type'    => 'string',
                'default' => 'Calculate Your Profit Now',
            ],
            'buttonLink' => [
                'type'    => 'string',
                'default' => '#calculator',
            ],
            'stat1Value' => [
                'type'    => 'string',
                'default' => '50K+',
            ],
            'stat1Label' => [
                'type'    => 'string',
                'default' => 'Calculations Made',
            ],
            'stat2Value' => [
                'type'    => 'string',
                'default' => '4.9/5',
            ],
            'stat2Label' => [
                'type'    => 'string',
                'default' => 'User Rating',
            ],
            'stat3Value' => [
                'type'    => 'string',
                'default' => 'Free',
            ],
            'stat3Label' => [
                'type'    => 'string',
                'default' => 'Forever',
            ],
            'fullWidth' => [
                'type'    => 'boolean',
                'default' => false,
            ],
            'badgeColor' => [
                'type'    => 'string',
                'default' => '#6b5af7',
            ],
            'highlightColor' => [
                'type'    => 'string',
                'default' => '#fbbf24',
            ],
            'buttonColor' => [
                'type'    => 'string',
                'default' => '#6b5af7',
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
                'default' => 60,
            ],
            'paddingTopTablet' => [
                'type'    => 'number',
                'default' => 60,
            ],
            'paddingBottomTablet' => [
                'type'    => 'number',
                'default' => 40,
            ],
            'paddingTopMobile' => [
                'type'    => 'number',
                'default' => 40,
            ],
            'paddingBottomMobile' => [
                'type'    => 'number',
                'default' => 30,
            ],
        ],
    ]);
}
add_action('init', 'reportgenix_register_hero_block');

/**
 * Render Hero Block
 */
function reportgenix_render_hero_block($attributes) {
    $badge = esc_html($attributes['badge']);
    $title = esc_html($attributes['title']);
    $highlight = esc_html($attributes['highlightText']);
    $subtitle = esc_html($attributes['subtitle']);
    $button_text = esc_html($attributes['buttonText']);
    $button_link = esc_url($attributes['buttonLink']);

    // Get color settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $badge_color = isset($attributes['badgeColor']) ? esc_attr($attributes['badgeColor']) : '#6b5af7';
    $highlight_color = isset($attributes['highlightColor']) ? esc_attr($attributes['highlightColor']) : '#fbbf24';
    $button_color = isset($attributes['buttonColor']) ? esc_attr($attributes['buttonColor']) : '#6b5af7';
    $primary_color = isset($attributes['primaryColor']) ? esc_attr($attributes['primaryColor']) : '#6b5af7';

    // Get spacing settings
    $padding_top = isset($attributes['paddingTop']) ? intval($attributes['paddingTop']) : 80;
    $padding_bottom = isset($attributes['paddingBottom']) ? intval($attributes['paddingBottom']) : 60;
    $padding_top_tablet = isset($attributes['paddingTopTablet']) ? intval($attributes['paddingTopTablet']) : 60;
    $padding_bottom_tablet = isset($attributes['paddingBottomTablet']) ? intval($attributes['paddingBottomTablet']) : 40;
    $padding_top_mobile = isset($attributes['paddingTopMobile']) ? intval($attributes['paddingTopMobile']) : 40;
    $padding_bottom_mobile = isset($attributes['paddingBottomMobile']) ? intval($attributes['paddingBottomMobile']) : 30;

    // Container class
    $container_class = $full_width ? 'custom-container custom-container--full' : 'custom-container';

    // Replace highlight text in title
    $title_with_highlight = str_replace(
        $highlight,
        '<span class="rptx-hero__highlight">' . $highlight . '</span>',
        $title
    );

    // Inline styles for custom colors and spacing
    $section_style = "
        --rptx-badge-color: {$badge_color};
        --rptx-highlight-color: {$highlight_color};
        --rptx-button-color: {$button_color};
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
    <section class="rptx-hero" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <span class="rptx-hero__badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <?php echo $badge; ?>
            </span>
            <h1 class="rptx-hero__title"><?php echo $title_with_highlight; ?></h1>
            <p class="rptx-hero__subtitle"><?php echo $subtitle; ?></p>
            <a href="<?php echo $button_link; ?>" class="rptx-btn rptx-btn--primary rptx-btn--large">
                <?php echo $button_text; ?>
            </a>

            <div class="rptx-hero__stats">
                <div class="rptx-hero__stat">
                    <div class="rptx-hero__stat-value"><?php echo esc_html($attributes['stat1Value']); ?></div>
                    <div class="rptx-hero__stat-label"><?php echo esc_html($attributes['stat1Label']); ?></div>
                </div>
                <div class="rptx-hero__stat">
                    <div class="rptx-hero__stat-value"><?php echo esc_html($attributes['stat2Value']); ?></div>
                    <div class="rptx-hero__stat-label"><?php echo esc_html($attributes['stat2Label']); ?></div>
                </div>
                <div class="rptx-hero__stat">
                    <div class="rptx-hero__stat-value"><?php echo esc_html($attributes['stat3Value']); ?></div>
                    <div class="rptx-hero__stat-label"><?php echo esc_html($attributes['stat3Label']); ?></div>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
