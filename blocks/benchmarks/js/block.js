(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = blockEditor.InspectorControls;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var Button = components.Button;
    var __ = i18n.__;

    registerBlockType('reportgenix/benchmarks', {
        title: __('Industry Benchmarks', 'reportgenix-tools'),
        icon: 'chart-bar',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'Profit Margin Benchmarks by Industry'
            },
            subtitle: {
                type: 'string',
                default: 'How does your Shopify store compare? Here are typical ecommerce profit margin ranges.'
            },
            benchmarks: {
                type: 'array',
                default: [
                    {icon: '👗', title: 'Fashion & Apparel', range: '30-50%', showIcon: true, iconType: 'emoji', iconImage: ''},
                    {icon: '💄', title: 'Beauty & Cosmetics', range: '50-80%', showIcon: true, iconType: 'emoji', iconImage: ''},
                    {icon: '💻', title: 'Electronics', range: '10-20%', showIcon: true, iconType: 'emoji', iconImage: ''},
                    {icon: '🏠', title: 'Home & Garden', range: '25-45%', showIcon: true, iconType: 'emoji', iconImage: ''},
                    {icon: '💎', title: 'Jewelry & Accessories', range: '50-70%', showIcon: true, iconType: 'emoji', iconImage: ''},
                    {icon: '🥗', title: 'Food & Beverage', range: '20-40%', showIcon: true, iconType: 'emoji', iconImage: ''}
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
            cardBackgroundColor: {
                type: 'string',
                default: '#ffffff'
            },
            rangeColor: {
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

            function updateBenchmark(index, field, value) {
                var newBenchmarks = attributes.benchmarks.slice();
                newBenchmarks[index][field] = value;
                setAttributes({ benchmarks: newBenchmarks });
            }

            function addBenchmark() {
                var newBenchmarks = attributes.benchmarks.slice();
                newBenchmarks.push({
                    icon: '📊',
                    title: 'New Industry',
                    range: '0-0%',
                    showIcon: true,
                    iconType: 'emoji',
                    iconImage: ''
                });
                setAttributes({ benchmarks: newBenchmarks });
            }

            function removeBenchmark(index) {
                var newBenchmarks = attributes.benchmarks.slice();
                newBenchmarks.splice(index, 1);
                setAttributes({ benchmarks: newBenchmarks });
            }

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Header Settings', 'reportgenix-tools'), initialOpen: true },
                        el(TextControl, {
                            label: __('Title', 'reportgenix-tools'),
                            value: attributes.title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el(TextControl, {
                            label: __('Subtitle', 'reportgenix-tools'),
                            value: attributes.subtitle,
                            onChange: function(value) {
                                setAttributes({ subtitle: value });
                            }
                        })
                    ),
                    el(PanelBody, { title: __('Benchmarks', 'reportgenix-tools'), initialOpen: false },
                        attributes.benchmarks.map(function(benchmark, index) {
                            return el('div', { key: index, style: { marginBottom: '20px', padding: '15px', border: '1px solid #6b5af7', borderRadius: '4px', backgroundColor: '#f0fdf4' } },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
                                    el('strong', {}, __('Benchmark', 'reportgenix-tools') + ' ' + (index + 1)),
                                    el(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeBenchmark(index); }
                                    }, __('Remove', 'reportgenix-tools'))
                                ),
                                el(ToggleControl, {
                                    label: __('Show Icon', 'reportgenix-tools'),
                                    checked: benchmark.showIcon !== undefined ? benchmark.showIcon : true,
                                    onChange: function(value) {
                                        updateBenchmark(index, 'showIcon', value);
                                    }
                                }),
                                benchmark.showIcon !== false && el(SelectControl, {
                                    label: __('Icon Type', 'reportgenix-tools'),
                                    value: benchmark.iconType || 'emoji',
                                    options: [
                                        { label: __('Emoji', 'reportgenix-tools'), value: 'emoji' },
                                        { label: __('Custom Image', 'reportgenix-tools'), value: 'image' }
                                    ],
                                    onChange: function(value) {
                                        updateBenchmark(index, 'iconType', value);
                                    }
                                }),
                                benchmark.showIcon !== false && (benchmark.iconType === 'emoji' || !benchmark.iconType) && el(TextControl, {
                                    label: __('Icon (Emoji)', 'reportgenix-tools'),
                                    value: benchmark.icon,
                                    onChange: function(value) {
                                        updateBenchmark(index, 'icon', value);
                                    },
                                    help: __('Add an emoji icon', 'reportgenix-tools')
                                }),
                                benchmark.showIcon !== false && benchmark.iconType === 'image' && el('div', { style: { marginBottom: '12px' } },
                                    el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '12px' } }, __('Custom Icon Image', 'reportgenix-tools')),
                                    benchmark.iconImage && el('img', {
                                        src: benchmark.iconImage,
                                        style: { maxWidth: '100px', marginBottom: '8px', display: 'block', borderRadius: '4px' }
                                    }),
                                    el(MediaUpload, {
                                        onSelect: function(media) {
                                            updateBenchmark(index, 'iconImage', media.url);
                                        },
                                        allowedTypes: ['image'],
                                        value: benchmark.iconImage,
                                        render: function(obj) {
                                            return el(Button, {
                                                onClick: obj.open,
                                                isSecondary: true
                                            }, benchmark.iconImage ? __('Change Image', 'reportgenix-tools') : __('Upload Image', 'reportgenix-tools'));
                                        }
                                    }),
                                    benchmark.iconImage && el(Button, {
                                        onClick: function() {
                                            updateBenchmark(index, 'iconImage', '');
                                        },
                                        isDestructive: true,
                                        isSmall: true,
                                        style: { marginTop: '8px' }
                                    }, __('Remove Image', 'reportgenix-tools'))
                                ),
                                el(TextControl, {
                                    label: __('Industry Title', 'reportgenix-tools'),
                                    value: benchmark.title,
                                    onChange: function(value) {
                                        updateBenchmark(index, 'title', value);
                                    }
                                }),
                                el(TextControl, {
                                    label: __('Margin Range', 'reportgenix-tools'),
                                    value: benchmark.range,
                                    onChange: function(value) {
                                        updateBenchmark(index, 'range', value);
                                    },
                                    help: __('e.g., 30-50%', 'reportgenix-tools')
                                })
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addBenchmark
                        }, __('Add Benchmark', 'reportgenix-tools'))
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
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Card Background Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.cardBackgroundColor,
                            onChange: function(value) {
                                setAttributes({ cardBackgroundColor: value || '#ffffff' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Range Text Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.rangeColor,
                            onChange: function(value) {
                                setAttributes({ rangeColor: value || '#6b5af7' });
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
                    className: 'rptx-benchmarks',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-card-bg-color': attributes.cardBackgroundColor,
                        '--rptx-range-color': attributes.rangeColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('div', { className: 'rptx-benchmarks__header' },
                            el(RichText, {
                                tagName: 'h2',
                                value: attributes.title,
                                onChange: function(value) {
                                    setAttributes({ title: value });
                                },
                                placeholder: __('Enter title...', 'reportgenix-tools')
                            }),
                            el(RichText, {
                                tagName: 'p',
                                value: attributes.subtitle,
                                onChange: function(value) {
                                    setAttributes({ subtitle: value });
                                },
                                placeholder: __('Enter subtitle...', 'reportgenix-tools')
                            })
                        ),
                        el('div', { className: 'rptx-benchmarks__grid' },
                            attributes.benchmarks.map(function(benchmark, index) {
                                var showIcon = benchmark.showIcon !== undefined ? benchmark.showIcon : true;
                                var iconType = benchmark.iconType || 'emoji';

                                return el('div', { key: index, className: 'rptx-benchmark-card' },
                                    showIcon && el('div', { className: 'rptx-benchmark-card__icon' },
                                        iconType === 'image' && benchmark.iconImage ?
                                            el('img', { src: benchmark.iconImage, alt: benchmark.title }) :
                                            benchmark.icon
                                    ),
                                    el('h4', {}, benchmark.title),
                                    el('div', { className: 'rptx-benchmark-card__range' }, benchmark.range)
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
