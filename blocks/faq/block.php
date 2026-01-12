<?php
/**
 * FAQ Block
 *
 * @package ReportgenixTools
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register FAQ Block
 */
function reportgenix_register_faq_block() {
    // Register block script
    wp_register_script(
        'reportgenix-faq-block-editor',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/faq/js/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        REPORTGENIX_TOOLS_VERSION,
        false
    );

    // Register block styles
    wp_register_style(
        'reportgenix-faq-block-style',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/faq/css/style.css',
        [],
        REPORTGENIX_TOOLS_VERSION
    );

    // Register frontend script for FAQ toggle functionality
    wp_register_script(
        'reportgenix-faq-block-frontend',
        REPORTGENIX_TOOLS_PLUGIN_URL . 'blocks/faq/js/frontend.js',
        [],
        REPORTGENIX_TOOLS_VERSION,
        true
    );

    // Register block
    register_block_type('reportgenix/faq', [
        'editor_script' => 'reportgenix-faq-block-editor',
        'style'         => 'reportgenix-faq-block-style',
        'script'        => 'reportgenix-faq-block-frontend',
        'attributes'    => [
            'title' => [
                'type'    => 'string',
                'default' => 'Frequently Asked Questions',
            ],
            'subtitle' => [
                'type'    => 'string',
                'default' => 'Everything Shopify merchants need to know about profit margins.',
            ],
            'faqItems' => [
                'type'    => 'array',
                'default' => [
                    [
                        'question' => 'What is a good profit margin for a Shopify store?',
                        'answer' => 'A healthy profit margin for Shopify stores typically ranges between <strong>20% to 50%</strong>, depending on your industry and business model.',
                        'isOpen' => true,
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
            'toggleColor' => [
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
add_action('init', 'reportgenix_register_faq_block');

/**
 * Render FAQ Block
 */
function reportgenix_render_faq_block($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    $faq_items = isset($attributes['faqItems']) ? $attributes['faqItems'] : [];

    // Get settings
    $full_width = isset($attributes['fullWidth']) ? $attributes['fullWidth'] : false;
    $bg_color = isset($attributes['backgroundColor']) ? esc_attr($attributes['backgroundColor']) : '#ffffff';
    $toggle_color = isset($attributes['toggleColor']) ? esc_attr($attributes['toggleColor']) : '#6b5af7';

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
        --rptx-toggle-color: {$toggle_color};
        --rptx-padding-top: {$padding_top}px;
        --rptx-padding-bottom: {$padding_bottom}px;
        --rptx-padding-top-tablet: {$padding_top_tablet}px;
        --rptx-padding-bottom-tablet: {$padding_bottom_tablet}px;
        --rptx-padding-top-mobile: {$padding_top_mobile}px;
        --rptx-padding-bottom-mobile: {$padding_bottom_mobile}px;
    ";

    // Build Schema.org FAQ JSON-LD
    $schema_items = [];
    foreach ($faq_items as $item) {
        if (!empty($item['question']) && !empty($item['answer'])) {
            $schema_items[] = [
                '@type' => 'Question',
                'name' => wp_strip_all_tags($item['question']),
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => wp_strip_all_tags($item['answer']),
                ],
            ];
        }
    }

    $schema_markup = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $schema_items,
    ];

    ob_start();
    ?>
    <section class="rptx-faq" style="<?php echo esc_attr($section_style); ?>">
        <div class="<?php echo esc_attr($container_class); ?>">
            <?php if ($title || $subtitle) : ?>
                <div class="rptx-faq__header">
                    <?php if ($title) : ?>
                        <h2><?php echo wp_kses_post($title); ?></h2>
                    <?php endif; ?>
                    <?php if ($subtitle) : ?>
                        <p><?php echo wp_kses_post($subtitle); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($faq_items)) : ?>
                <div class="rptx-faq__list">
                    <?php foreach ($faq_items as $index => $item) : ?>
                        <?php
                        $is_open = isset($item['isOpen']) ? $item['isOpen'] : false;
                        $item_class = 'rptx-faq__item';
                        if ($is_open) {
                            $item_class .= ' active';
                        }
                        ?>
                        <div class="<?php echo esc_attr($item_class); ?>" data-faq-item>
                            <div class="rptx-faq__question" data-faq-toggle>
                                <h3><?php echo wp_kses_post($item['question']); ?></h3>
                                <div class="rptx-faq__toggle">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div class="rptx-faq__answer">
                                <p><?php echo wp_kses_post($item['answer']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!empty($schema_items)) : ?>
            <script type="application/ld+json">
            <?php echo wp_json_encode($schema_markup, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); ?>
            </script>
        <?php endif; ?>
    </section>
    <?php
    return ob_get_clean();
}
