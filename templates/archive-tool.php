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
                    <span class="hero__badge-count">12</span>
                    Free Tools Available
                </div>
                <h1>Free <span class="highlight">Business Tools</span> & Calculators</h1>
                <p class="hero__subtitle">Powerful calculators and tools to help freelancers, agencies, and ecommerce merchants run their businesses smarter. No signup required.</p>
            </div>
        </section>

        <?php if (have_posts()) : ?>
            <section class="tools-section">
                <div class="container">
                    <div class="tools-section__header">
                        <h2 class="tools-section__title">All Tools</h2>
                        <span class="tools-section__count"><span id="toolCount">12</span> tools</span>
                    </div>

                    <div class="tools-grid">
                        <!-- Coming Soon -->
                        <div class="tool-card tool-card--disabled" data-category="freelance">
                            <span class="tool-card__badge tool-card__badge--coming">Coming Soon</span>
                            <div class="tool-card__header">
                                <div class="tool-card__icon tool-card__icon--green">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <h3 class="tool-card__title">Project Timeline Generator</h3>
                                <p class="tool-card__description">Create visual project timelines with milestones and deliverables. Export as image or PDF for client presentations.</p>
                            </div>
                            <div class="tool-card__footer">
                                <div class="tool-card__tags">
                                    <span class="tool-card__tag">Freelance</span>
                                    <span class="tool-card__tag">Planning</span>
                                </div>
                                <span class="tool-card__cta">
                                Coming Soon
                            </span>
                            </div>
                        </div>
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
