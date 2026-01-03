(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var __ = i18n.__;

    registerBlockType('reportgenix/hero-section', {
        title: __('Hero Section', 'reportgenix-tools'),
        icon: 'megaphone',
        category: 'reportgenix-blocks',
        attributes: {
            badge: {
                type: 'string',
                default: '100% Free Tool'
            },
            title: {
                type: 'string',
                default: 'Free Shopify Profit Margin Calculator'
            },
            highlightText: {
                type: 'string',
                default: 'Shopify Profit Margin'
            },
            subtitle: {
                type: 'string',
                default: 'Know your real profit on every product. Calculate gross margin, net profit, and optimal pricing — with all costs included.'
            },
            buttonText: {
                type: 'string',
                default: 'Calculate Your Profit Now'
            },
            buttonLink: {
                type: 'string',
                default: '#calculator'
            },
            stat1Value: {
                type: 'string',
                default: '50K+'
            },
            stat1Label: {
                type: 'string',
                default: 'Calculations Made'
            },
            stat2Value: {
                type: 'string',
                default: '4.9/5'
            },
            stat2Label: {
                type: 'string',
                default: 'User Rating'
            },
            stat3Value: {
                type: 'string',
                default: 'Free'
            },
            stat3Label: {
                type: 'string',
                default: 'Forever'
            },
            fullWidth: {
                type: 'boolean',
                default: false
            },
            badgeColor: {
                type: 'string',
                default: '#6b5af7'
            },
            highlightColor: {
                type: 'string',
                default: '#fbbf24'
            },
            buttonColor: {
                type: 'string',
                default: '#6b5af7'
            },
            primaryColor: {
                type: 'string',
                default: '#6b5af7'
            },
            paddingTop: {
                type: 'number',
                default: 80
            },
            paddingBottom: {
                type: 'number',
                default: 60
            },
            paddingTopTablet: {
                type: 'number',
                default: 60
            },
            paddingBottomTablet: {
                type: 'number',
                default: 40
            },
            paddingTopMobile: {
                type: 'number',
                default: 40
            },
            paddingBottomMobile: {
                type: 'number',
                default: 30
            }
        },

        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            // Helper function to highlight text in title
            function getTitleWithHighlight(title, highlight) {
                if (!highlight || title.indexOf(highlight) === -1) {
                    return title;
                }
                return title.replace(highlight, '<span class="rptx-hero__highlight">' + highlight + '</span>');
            }

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Hero Settings', 'reportgenix-tools'), initialOpen: true },
                        el(TextControl, {
                            label: __('Badge Text', 'reportgenix-tools'),
                            value: attributes.badge,
                            onChange: function(value) {
                                setAttributes({ badge: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Title', 'reportgenix-tools'),
                            value: attributes.title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Highlight Text (must be part of title)', 'reportgenix-tools'),
                            value: attributes.highlightText,
                            onChange: function(value) {
                                setAttributes({ highlightText: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Subtitle', 'reportgenix-tools'),
                            value: attributes.subtitle,
                            onChange: function(value) {
                                setAttributes({ subtitle: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Button Text', 'reportgenix-tools'),
                            value: attributes.buttonText,
                            onChange: function(value) {
                                setAttributes({ buttonText: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Button Link', 'reportgenix-tools'),
                            value: attributes.buttonLink,
                            onChange: function(value) {
                                setAttributes({ buttonLink: value });
                            }
                        })
                    ),
                    el(PanelBody, { title: __('Statistics', 'reportgenix-tools'), initialOpen: false },
                        el('h4', {}, __('Stat 1', 'reportgenix-tools')),
                        el(TextControl, {
                            label: __('Value', 'reportgenix-tools'),
                            value: attributes.stat1Value,
                            onChange: function(value) {
                                setAttributes({ stat1Value: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Label', 'reportgenix-tools'),
                            value: attributes.stat1Label,
                            onChange: function(value) {
                                setAttributes({ stat1Label: value });
                            }
                        }),
                        el('hr'),
                        el('h4', {}, __('Stat 2', 'reportgenix-tools')),
                        el(TextControl, {
                            label: __('Value', 'reportgenix-tools'),
                            value: attributes.stat2Value,
                            onChange: function(value) {
                                setAttributes({ stat2Value: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Label', 'reportgenix-tools'),
                            value: attributes.stat2Label,
                            onChange: function(value) {
                                setAttributes({ stat2Label: value });
                            }
                        }),
                        el('hr'),
                        el('h4', {}, __('Stat 3', 'reportgenix-tools')),
                        el(TextControl, {
                            label: __('Value', 'reportgenix-tools'),
                            value: attributes.stat3Value,
                            onChange: function(value) {
                                setAttributes({ stat3Value: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Label', 'reportgenix-tools'),
                            value: attributes.stat3Label,
                            onChange: function(value) {
                                setAttributes({ stat3Label: value });
                            }
                        })
                    ),
                    el(PanelBody, { title: __('Layout & Colors', 'reportgenix-tools'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Full Width Container', 'reportgenix-tools'),
                            checked: attributes.fullWidth,
                            onChange: function(value) {
                                setAttributes({ fullWidth: value });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Badge Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.badgeColor,
                            onChange: function(value) {
                                setAttributes({ badgeColor: value || '#6b5af7' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Highlight Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.highlightColor,
                            onChange: function(value) {
                                setAttributes({ highlightColor: value || '#fbbf24' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Button Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.buttonColor,
                            onChange: function(value) {
                                setAttributes({ buttonColor: value || '#6b5af7' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Primary Color (Stats)', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.primaryColor,
                            onChange: function(value) {
                                setAttributes({ primaryColor: value || '#6b5af7' });
                            }
                        })
                    ),
                    el(PanelBody, { title: __('Spacing', 'reportgenix-tools'), initialOpen: false },
                        el('h4', {}, __('Desktop', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTop,
                            onChange: function(value) {
                                setAttributes({ paddingTop: value });
                            },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottom,
                            onChange: function(value) {
                                setAttributes({ paddingBottom: value });
                            },
                            min: 0,
                            max: 200
                        }),
                        el('hr'),
                        el('h4', {}, __('Tablet', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTopTablet,
                            onChange: function(value) {
                                setAttributes({ paddingTopTablet: value });
                            },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottomTablet,
                            onChange: function(value) {
                                setAttributes({ paddingBottomTablet: value });
                            },
                            min: 0,
                            max: 200
                        }),
                        el('hr'),
                        el('h4', {}, __('Mobile', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTopMobile,
                            onChange: function(value) {
                                setAttributes({ paddingTopMobile: value });
                            },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottomMobile,
                            onChange: function(value) {
                                setAttributes({ paddingBottomMobile: value });
                            },
                            min: 0,
                            max: 200
                        })
                    )
                ),
                el('section', {
                    className: 'rptx-hero',
                    style: {
                        '--rptx-badge-color': attributes.badgeColor,
                        '--rptx-highlight-color': attributes.highlightColor,
                        '--rptx-button-color': attributes.buttonColor,
                        '--rptx-primary-color': attributes.primaryColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px',
                        '--rptx-padding-top-tablet': attributes.paddingTopTablet + 'px',
                        '--rptx-padding-bottom-tablet': attributes.paddingBottomTablet + 'px',
                        '--rptx-padding-top-mobile': attributes.paddingTopMobile + 'px',
                        '--rptx-padding-bottom-mobile': attributes.paddingBottomMobile + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('span', { className: 'rptx-hero__badge' },
                            el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                                el('polyline', { points: '20 6 9 17 4 12' })
                            ),
                            attributes.badge
                        ),
                        el('h1', {
                            className: 'rptx-hero__title',
                            dangerouslySetInnerHTML: { __html: getTitleWithHighlight(attributes.title, attributes.highlightText) }
                        }),
                        el('p', { className: 'rptx-hero__subtitle' }, attributes.subtitle),
                        el('a', {
                            href: attributes.buttonLink,
                            className: 'rptx-btn rptx-btn--primary rptx-btn--large'
                        }, attributes.buttonText),
                        el('div', { className: 'rptx-hero__stats' },
                            el('div', { className: 'rptx-hero__stat' },
                                el('div', { className: 'rptx-hero__stat-value' }, attributes.stat1Value),
                                el('div', { className: 'rptx-hero__stat-label' }, attributes.stat1Label)
                            ),
                            el('div', { className: 'rptx-hero__stat' },
                                el('div', { className: 'rptx-hero__stat-value' }, attributes.stat2Value),
                                el('div', { className: 'rptx-hero__stat-label' }, attributes.stat2Label)
                            ),
                            el('div', { className: 'rptx-hero__stat' },
                                el('div', { className: 'rptx-hero__stat-value' }, attributes.stat3Value),
                                el('div', { className: 'rptx-hero__stat-label' }, attributes.stat3Label)
                            )
                        )
                    )
                )
            ];
        },

        save: function() {
            // Dynamic block - rendered via PHP
            return null;
        }
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.i18n
);
