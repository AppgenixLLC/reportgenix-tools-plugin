<?php
/**
 * Template for displaying single tool posts
 *
 * @package ReportgenixTools
 */

get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">', '</h1>'); ?>

                    <div class="entry-meta">
                        <span class="posted-on">
                            <?php echo get_the_date(); ?>
                        </span>
                        <span class="byline">
                            <?php _e('by', 'reportgenix-tools'); ?>
                            <?php the_author(); ?>
                        </span>
                    </div>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="post-thumbnail">
                        <?php the_post_thumbnail('large'); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages([
                        'before' => '<div class="page-links">' . __('Pages:', 'reportgenix-tools'),
                        'after'  => '</div>',
                    ]);
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php
                    // Custom fields or meta data can be displayed here
                    $custom_fields = get_post_custom();
                    if (!empty($custom_fields)) {
                        echo '<div class="tool-meta">';
                        // You can add custom field display logic here
                        echo '</div>';
                    }
                    ?>
                </footer>

            </article>

            <?php
            // If comments are open or there is at least one comment
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;

        endwhile;
        ?>

    </main>
</div>

<?php
get_sidebar();
get_footer();
