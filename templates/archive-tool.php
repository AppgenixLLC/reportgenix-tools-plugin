<?php
/**
 * Template for displaying tools archive
 *
 * @package ReportgenixTools
 */

get_header();

// Force load CSS directly in template
$css_url = plugins_url('assets/public/css/main-style.css', dirname(__FILE__));
?>
<link rel="stylesheet" href="<?php echo esc_url($css_url); ?>?ver=<?php echo REPORTGENIX_TOOLS_VERSION; ?>" media="all">

<div id="primary" class="content-area">
    <main id="main" class="site-main reportgenix-tools-archive">

        <section class="hero">
            <div class="container">
                <div class="inner-wrap">
                    <div class="hero__badge">
                        <span class="hero__badge-count"><?php echo wp_count_posts('tool')->publish; ?></span>
                        <?php _e('Free Tools Available', 'reportgenix-tools'); ?>
                    </div>
                    <h1><?php _e('Free Shopify Tools & Calculators for Store Owners', 'reportgenix-tools'); ?></h1>
                    <p class="hero__subtitle"><?php _e('Free tools and calculators built for Shopify merchants. Profit margin calculator, ROAS calculator, break-even analysis, pricing tools & more. No signup required.', 'reportgenix-tools'); ?></p>
                </div>
            </div>
        </section>

        <?php if (have_posts()) : ?>
            <section class="tools-section">
                <div class="container">
                    <div class="tools-grid">
                        <?php
                        while (have_posts()) : the_post();
                            ?>
                            <div class="tool-card">
                                <div class="tool-card__header">
<!--                                    --><?php //if (has_post_thumbnail()) : ?>
<!--                                        <div class="tool-card__thumbnail">-->
<!--                                            <a href="--><?php //the_permalink(); ?><!--">-->
<!--                                                --><?php //the_post_thumbnail('medium', ['class' => 'tool-card__image']); ?>
<!--                                            </a>-->
<!--                                        </div>-->
<!--                                    --><?php //endif; ?>

                                    <div class="title-wrap">
                                        <h3 class="tool-card__title">
                                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                        </h3>

                                        <?php
                                        // Get custom meta fields
                                        $short_description = get_post_meta(get_the_ID(), '_reportgenix_short_description', true);
                                        $bullet_points = get_post_meta(get_the_ID(), '_reportgenix_bullet_points', true);

                                        // Display short description if available, otherwise fall back to excerpt
                                        if (!empty($short_description)) : ?>
                                            <p class="tool-card__description"><?php echo esc_html($short_description); ?></p>
                                        <?php elseif (has_excerpt()) : ?>
                                            <p class="tool-card__description"><?php echo get_the_excerpt(); ?></p>
                                        <?php endif; ?>
                                    </div>

                                    <?php if (!empty($bullet_points) && is_array($bullet_points)) : ?>
                                        <ul class="tool-card__features">
                                            <?php foreach ($bullet_points as $point) : ?>
                                                <?php if (!empty(trim($point))) : ?>
                                                    <li><?php echo esc_html($point); ?></li>
                                                <?php endif; ?>
                                            <?php endforeach; ?>
                                        </ul>
                                    <?php endif; ?>
                                </div>

                                <div class="tool-card__footer">
                                    <a href="<?php the_permalink(); ?>" class="tool-card__cta">
                                        <?php printf('Use %s Tool',  get_the_title()); ?> →
                                    </a>
                                </div>
                            </div>
                            <?php
                        endwhile;
                        ?>
                    </div>
                </div>
            </section>
            <?php
            // Pagination
            the_posts_pagination([
                'mid_size'  => 2,
                'prev_text' => __('&laquo; Previous', 'reportgenix-tools'),
                'next_text' => __('Next &raquo;', 'reportgenix-tools'),
            ]);

        else :
            ?>

            <div class="no-results">
                <h2><?php _e('No tools found', 'reportgenix-tools'); ?></h2>
                <p><?php _e('It seems we can\'t find any tools. Please check back later.', 'reportgenix-tools'); ?></p>
            </div>

        <?php endif; ?>

    </main>
</div>

<?php
get_footer();
