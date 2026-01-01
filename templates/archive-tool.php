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

        <header class="page-header">
            <h1 class="page-title">
                <?php _e('Tools', 'reportgenix-tools'); ?>
            </h1>
            <?php
            $archive_description = get_the_archive_description();
            if ($archive_description) :
                ?>
                <div class="archive-description">
                    <?php echo wp_kses_post(wpautop($archive_description)); ?>
                </div>
            <?php endif; ?>
        </header>

        <?php if (have_posts()) : ?>

            <div class="tools-grid">

                <?php
                while (have_posts()) :
                    the_post();
                    ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class('tool-item'); ?>>

                        <?php if (has_post_thumbnail()) : ?>
                            <div class="tool-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <header class="entry-header">
                            <?php
                            the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>');
                            ?>
                        </header>

                        <div class="entry-summary">
                            <?php the_excerpt(); ?>
                        </div>

                        <footer class="entry-footer">
                            <a href="<?php the_permalink(); ?>" class="read-more">
                                <?php _e('View Tool', 'reportgenix-tools'); ?> &rarr;
                            </a>
                        </footer>

                    </article>

                <?php endwhile; ?>

            </div>

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
