<?php
/**
 * Template for displaying single tool posts
 *
 * @package ReportgenixTools
 */

get_header();

// Force load CSS directly in template
$css_url = plugins_url('assets/public/css/main-style.css', dirname(__FILE__));
?>
<link rel="stylesheet" href="<?php echo esc_url($css_url); ?>?ver=<?php echo REPORTGENIX_TOOLS_VERSION; ?>" media="all">

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php
        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                <div class="entry-content">
                    <?php
                    the_content();
                    ?>
                </div>

            </article>

            <?php

        endwhile;
        ?>

    </main>
</div>

<?php get_footer(); ?>
