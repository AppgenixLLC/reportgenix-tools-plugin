(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = blockEditor.InspectorControls;
    var MediaUpload = blockEditor.MediaUpload;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;
    var Button = components.Button;
    var __ = i18n.__;

    // Icon options
    var iconOptions = [
        { label: 'Dollar', value: 'dollar' },
        { label: 'Card', value: 'card' },
        { label: 'Chart', value: 'chart' },
        { label: 'Document', value: 'document' },
        { label: 'Trending', value: 'trending' },
        { label: 'Monitor', value: 'monitor' }
    ];

    // Get SVG icon by name
    function getIcon(iconName) {
        var icons = {
            dollar: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('path', { d: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' })
            ),
            card: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('rect', { x: '1', y: '3', width: '22', height: '18', rx: '2' }),
                el('line', { x1: '1', y1: '9', x2: '23', y2: '9' })
            ),
            chart: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('path', { d: 'M21.21 15.89A10 10 0 1 1 8 2.83' }),
                el('path', { d: 'M22 12A10 10 0 0 0 12 2v10z' })
            ),
            document: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
                el('polyline', { points: '14 2 14 8 20 8' }),
                el('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
                el('line', { x1: '16', y1: '17', x2: '8', y2: '17' })
            ),
            trending: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('polyline', { points: '23 6 13.5 15.5 8.5 10.5 1 18' }),
                el('polyline', { points: '17 6 23 6 23 12' })
            ),
            monitor: el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                el('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }),
                el('line', { x1: '8', y1: '21', x2: '16', y2: '21' }),
                el('line', { x1: '12', y1: '17', x2: '12', y2: '21' })
            )
        };
        return icons[iconName] || icons.chart;
    }

    registerBlockType('reportgenix/features-grid', {
        title: __('Features Grid', 'reportgenix-tools'),
        icon: 'grid-view',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'Why Shopify Merchants Love This Calculator'
            },
            subtitle: {
                type: 'string',
                default: 'Built specifically for ecommerce sellers who want to know their true profit margins.'
            },
            features: {
                type: 'array',
                default: [
                    {
                        iconType: 'svg',
                        icon: 'dollar',
                        iconImage: '',
                        showIcon: true,
                        title: 'Shopify Fee Calculator Built-In',
                        description: 'Automatically factor in Shopify\'s transaction fees (2.9% + 30¢), payment processing costs, and subscription fees for accurate profit calculations.'
                    },
                    {
                        iconType: 'svg',
                        icon: 'card',
                        iconImage: '',
                        showIcon: true,
                        title: 'All Costs Included',
                        description: 'Enter product cost, shipping, packaging, marketing spend per unit, and returns rate. See your true net profit margin, not just gross margin.'
                    },
                    {
                        iconType: 'svg',
                        icon: 'chart',
                        iconImage: '',
                        showIcon: true,
                        title: 'Instant Margin Analysis',
                        description: 'Get instant results showing gross profit, net profit, margin percentage, and markup ratio. Make informed pricing decisions in seconds.'
                    }
                ]
            },
            fullWidth: {
                type: 'boolean',
                default: false
            },
            backgroundColor: {
                type: 'string',
                default: '#f9fafb'
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
                default: 80
            },
            paddingTopTablet: {
                type: 'number',
                default: 60
            },
            paddingBottomTablet: {
                type: 'number',
                default: 60
            },
            paddingTopMobile: {
                type: 'number',
                default: 40
            },
            paddingBottomMobile: {
                type: 'number',
                default: 40
            }
        },

        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function updateFeature(index, field, value) {
                var newFeatures = attributes.features.slice();
                newFeatures[index][field] = value;
                setAttributes({ features: newFeatures });
            }

            function addFeature() {
                var newFeatures = attributes.features.slice();
                newFeatures.push({
                    iconType: 'svg',
                    icon: 'chart',
                    iconImage: '',
                    showIcon: true,
                    title: 'New Feature',
                    description: 'Feature description here.'
                });
                setAttributes({ features: newFeatures });
            }

            function removeFeature(index) {
                var newFeatures = attributes.features.slice();
                newFeatures.splice(index, 1);
                setAttributes({ features: newFeatures });
            }

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Section Settings', 'reportgenix-tools'), initialOpen: true },
                        el(TextControl, {
                            label: __('Title', 'reportgenix-tools'),
                            value: attributes.title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el(TextareaControl, {
                            label: __('Subtitle', 'reportgenix-tools'),
                            value: attributes.subtitle,
                            onChange: function(value) {
                                setAttributes({ subtitle: value });
                            }
                        })
                    ),
                    el(PanelBody, { title: __('Features', 'reportgenix-tools'), initialOpen: true },
                        attributes.features.map(function(feature, index) {
                            var iconType = feature.iconType || 'svg';
                            var showIcon = typeof feature.showIcon !== 'undefined' ? feature.showIcon : true;

                            return el('div', { key: index, style: { marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' } },
                                el('h4', { style: { marginTop: 0 } }, __('Feature', 'reportgenix-tools') + ' ' + (index + 1)),

                                el(ToggleControl, {
                                    label: __('Show Icon', 'reportgenix-tools'),
                                    checked: showIcon,
                                    onChange: function(value) {
                                        updateFeature(index, 'showIcon', value);
                                    }
                                }),

                                showIcon && el(SelectControl, {
                                    label: __('Icon Type', 'reportgenix-tools'),
                                    value: iconType,
                                    options: [
                                        { label: __('SVG Icon', 'reportgenix-tools'), value: 'svg' },
                                        { label: __('Custom Image', 'reportgenix-tools'), value: 'image' }
                                    ],
                                    onChange: function(value) {
                                        updateFeature(index, 'iconType', value);
                                    }
                                }),

                                showIcon && iconType === 'svg' && el(SelectControl, {
                                    label: __('SVG Icon', 'reportgenix-tools'),
                                    value: feature.icon || 'chart',
                                    options: iconOptions,
                                    onChange: function(value) {
                                        updateFeature(index, 'icon', value);
                                    }
                                }),

                                showIcon && iconType === 'image' && el('div', { style: { marginBottom: '15px' } },
                                    el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: '600' } }, __('Icon Image', 'reportgenix-tools')),
                                    feature.iconImage && el('img', {
                                        src: feature.iconImage,
                                        style: { maxWidth: '100px', height: 'auto', display: 'block', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }
                                    }),
                                    el(MediaUpload, {
                                        onSelect: function(media) {
                                            updateFeature(index, 'iconImage', media.url);
                                        },
                                        allowedTypes: ['image'],
                                        value: feature.iconImage,
                                        render: function(obj) {
                                            return el(Button, {
                                                onClick: obj.open,
                                                isPrimary: !feature.iconImage,
                                                isSecondary: !!feature.iconImage
                                            }, feature.iconImage ? __('Change Image', 'reportgenix-tools') : __('Upload Image', 'reportgenix-tools'));
                                        }
                                    }),
                                    feature.iconImage && el(Button, {
                                        onClick: function() {
                                            updateFeature(index, 'iconImage', '');
                                        },
                                        isDestructive: true,
                                        isSmall: true,
                                        style: { marginTop: '8px' }
                                    }, __('Remove Image', 'reportgenix-tools'))
                                ),

                                el(TextControl, {
                                    label: __('Title', 'reportgenix-tools'),
                                    value: feature.title,
                                    onChange: function(value) {
                                        updateFeature(index, 'title', value);
                                    }
                                }),
                                el(TextareaControl, {
                                    label: __('Description', 'reportgenix-tools'),
                                    value: feature.description,
                                    onChange: function(value) {
                                        updateFeature(index, 'description', value);
                                    }
                                }),
                                el(Button, {
                                    isDestructive: true,
                                    onClick: function() {
                                        removeFeature(index);
                                    }
                                }, __('Remove Feature', 'reportgenix-tools'))
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addFeature
                        }, __('Add Feature', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Layout & Colors', 'reportgenix-tools'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Full Width Container', 'reportgenix-tools'),
                            checked: attributes.fullWidth,
                            onChange: function(value) {
                                setAttributes({ fullWidth: value });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Background Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.backgroundColor,
                            onChange: function(value) {
                                setAttributes({ backgroundColor: value || '#f9fafb' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Primary Color', 'reportgenix-tools')),
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
                    className: 'rptx-features',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-primary-color': attributes.primaryColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('div', { className: 'rptx-features__header' },
                            el('h2', {}, attributes.title),
                            el('p', {}, attributes.subtitle)
                        ),
                        el('div', { className: 'rptx-features__grid' },
                            attributes.features.map(function(feature, index) {
                                var showIcon = typeof feature.showIcon !== 'undefined' ? feature.showIcon : true;
                                var iconType = feature.iconType || 'svg';

                                return el('article', { key: index, className: 'rptx-feature-card' },
                                    showIcon && el('div', { className: 'rptx-feature-card__icon' },
                                        iconType === 'image' && feature.iconImage
                                            ? el('img', { src: feature.iconImage, alt: feature.title, style: { width: '100%', height: '100%', objectFit: 'contain' } })
                                            : getIcon(feature.icon || 'chart')
                                    ),
                                    el('h3', {}, feature.title),
                                    el('p', {}, feature.description)
                                );
                            })
                        )
                    )
                )
            ];
        },

        save: function() {
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
