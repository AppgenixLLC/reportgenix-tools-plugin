/**
 * FAQ Block Frontend JavaScript
 * Handles toggle functionality for FAQ items
 */

(function() {
    'use strict';

    function initFaqToggles() {
        var faqToggles = document.querySelectorAll('[data-faq-toggle]');

        faqToggles.forEach(function(toggle) {
            // Remove any existing listeners to prevent duplicates
            var newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);

            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                var item = this.closest('[data-faq-item]');
                if (item) {
                    item.classList.toggle('active');
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFaqToggles);
    } else {
        initFaqToggles();
    }

    // Re-initialize after Gutenberg block updates (for editor preview)
    if (window.wp && window.wp.domReady) {
        window.wp.domReady(initFaqToggles);
    }
})();
