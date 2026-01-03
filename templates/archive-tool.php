<?php
/**
 * Template for displaying tools archive
 *
 * @package ReportgenixTools
 */

get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <section class="hero">
            <div class="container">
                <div class="hero__badge">
                    <span class="hero__badge-count"><?php echo wp_count_posts('tool')->publish; ?></span>
                    <?php _e('Free Tools Available', 'reportgenix-tools'); ?>
                </div>
                <h1><?php _e('Free', 'reportgenix-tools'); ?> <span class="highlight"><?php _e('Business Tools', 'reportgenix-tools'); ?></span> <?php _e('& Calculators', 'reportgenix-tools'); ?></h1>
                <p class="hero__subtitle"><?php _e('Powerful calculators and tools to help freelancers, agencies, and ecommerce merchants run their businesses smarter. No signup required.', 'reportgenix-tools'); ?></p>
            </div>
        </section>

        <?php if (have_posts()) : ?>
            <section class="tools-section">
                <div class="container">
                    <div class="tools-section__header">
                        <h2 class="tools-section__title">All Tools</h2>
                        <span class="tools-section__count">
                            <span id="toolCount"><?php echo $wp_query->found_posts; ?></span>
                            <?php echo _n('tool', 'tools', $wp_query->found_posts, 'reportgenix-tools'); ?>
                        </span>
                    </div>

                    <div class="tools-grid">
                        <?php
                        while (have_posts()) : the_post();
                            ?>
                            <div class="tool-card">
                                <div class="tool-card__header">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <div class="tool-card__thumbnail">
                                            <a href="<?php the_permalink(); ?>">
                                                <?php the_post_thumbnail('medium', ['class' => 'tool-card__image']); ?>
                                            </a>
                                        </div>
                                    <?php endif; ?>

                                    <h3 class="tool-card__title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>

                                    <?php if (has_excerpt()) : ?>
                                        <p class="tool-card__description"><?php echo get_the_excerpt(); ?></p>
                                    <?php endif; ?>
                                </div>

                                <div class="tool-card__footer">
                                    <a href="<?php the_permalink(); ?>" class="tool-card__cta">
                                        <?php _e('Use Tool', 'reportgenix-tools'); ?> →
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
get_sidebar();
get_footer();
