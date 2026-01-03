(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = blockEditor.InspectorControls;
    var RichText = blockEditor.RichText;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var Button = components.Button;
    var __ = i18n.__;

    registerBlockType('reportgenix/faq', {
        title: __('FAQ Section', 'reportgenix-tools'),
        icon: 'editor-help',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'Frequently Asked Questions'
            },
            subtitle: {
                type: 'string',
                default: 'Everything Shopify merchants need to know about profit margins.'
            },
            faqItems: {
                type: 'array',
                default: [
                    {
                        question: 'What is a good profit margin for a Shopify store?',
                        answer: 'A healthy profit margin for Shopify stores typically ranges between <strong>20% to 50%</strong>, depending on your industry and business model.',
                        isOpen: true
                    }
                ]
            },
            fullWidth: {
                type: 'boolean',
                default: false
            },
            backgroundColor: {
                type: 'string',
                default: '#ffffff'
            },
            toggleColor: {
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

            function updateFaqItem(index, field, value) {
                var newItems = attributes.faqItems.slice();
                newItems[index][field] = value;
                setAttributes({ faqItems: newItems });
            }

            function addFaqItem() {
                var newItems = attributes.faqItems.slice();
                newItems.push({
                    question: 'New Question?',
                    answer: 'Your answer here.',
                    isOpen: false
                });
                setAttributes({ faqItems: newItems });
            }

            function removeFaqItem(index) {
                var newItems = attributes.faqItems.slice();
                newItems.splice(index, 1);
                setAttributes({ faqItems: newItems });
            }

            function toggleFaqItem(index) {
                var newItems = attributes.faqItems.slice();
                newItems[index].isOpen = !newItems[index].isOpen;
                setAttributes({ faqItems: newItems });
            }

            function moveItemUp(index) {
                if (index === 0) return;
                var newItems = attributes.faqItems.slice();
                var temp = newItems[index];
                newItems[index] = newItems[index - 1];
                newItems[index - 1] = temp;
                setAttributes({ faqItems: newItems });
            }

            function moveItemDown(index) {
                if (index === attributes.faqItems.length - 1) return;
                var newItems = attributes.faqItems.slice();
                var temp = newItems[index];
                newItems[index] = newItems[index + 1];
                newItems[index + 1] = temp;
                setAttributes({ faqItems: newItems });
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
                    el(PanelBody, { title: __('FAQ Items', 'reportgenix-tools'), initialOpen: false },
                        attributes.faqItems.map(function(item, index) {
                            return el('div', { key: index, style: { marginBottom: '20px', padding: '15px', border: '1px solid #6b5af7', borderRadius: '4px', backgroundColor: '#f0fdf4' } },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
                                    el('strong', {}, __('FAQ Item', 'reportgenix-tools') + ' ' + (index + 1)),
                                    el('div', { style: { display: 'flex', gap: '5px' } },
                                        index > 0 && el(Button, {
                                            onClick: function() { moveItemUp(index); },
                                            isSmall: true,
                                            icon: 'arrow-up-alt2',
                                            label: __('Move Up', 'reportgenix-tools')
                                        }),
                                        index < attributes.faqItems.length - 1 && el(Button, {
                                            onClick: function() { moveItemDown(index); },
                                            isSmall: true,
                                            icon: 'arrow-down-alt2',
                                            label: __('Move Down', 'reportgenix-tools')
                                        }),
                                        el(Button, {
                                            isDestructive: true,
                                            isSmall: true,
                                            onClick: function() { removeFaqItem(index); }
                                        }, __('Remove', 'reportgenix-tools'))
                                    )
                                ),
                                el(ToggleControl, {
                                    label: __('Open by Default', 'reportgenix-tools'),
                                    checked: item.isOpen || false,
                                    onChange: function(value) {
                                        updateFaqItem(index, 'isOpen', value);
                                    }
                                }),
                                el('div', { style: { marginBottom: '8px' } },
                                    el('label', { style: { display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '12px' } }, __('Question', 'reportgenix-tools')),
                                    el('p', { style: { fontSize: '11px', color: '#666', margin: '0 0 8px' } }, __('Click in the preview below to edit with formatting', 'reportgenix-tools'))
                                ),
                                el('div', { style: { marginBottom: '8px' } },
                                    el('label', { style: { display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '12px' } }, __('Answer', 'reportgenix-tools')),
                                    el('p', { style: { fontSize: '11px', color: '#666', margin: '0 0 8px' } }, __('Click in the preview below to edit with formatting', 'reportgenix-tools'))
                                )
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addFaqItem
                        }, __('Add FAQ Item', 'reportgenix-tools'))
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
                                setAttributes({ backgroundColor: value || '#ffffff' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Active Toggle Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.toggleColor,
                            onChange: function(value) {
                                setAttributes({ toggleColor: value || '#6b5af7' });
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
                    className: 'rptx-faq',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-toggle-color': attributes.toggleColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('div', { className: 'rptx-faq__header' },
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
                        el('div', { className: 'rptx-faq__list' },
                            attributes.faqItems.map(function(item, index) {
                                return el('div', {
                                    key: index,
                                    className: 'rptx-faq__item' + (item.isOpen ? ' active' : '')
                                },
                                    el('div', { className: 'rptx-faq__question', onClick: function() { toggleFaqItem(index); } },
                                        el(RichText, {
                                            tagName: 'h3',
                                            value: item.question,
                                            onChange: function(value) {
                                                updateFaqItem(index, 'question', value);
                                            },
                                            placeholder: __('Enter question...', 'reportgenix-tools'),
                                            onClick: function(e) {
                                                e.stopPropagation();
                                            }
                                        }),
                                        el('div', { className: 'rptx-faq__toggle' },
                                            el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                                                el('polyline', { points: '6 9 12 15 18 9' })
                                            )
                                        )
                                    ),
                                    el('div', { className: 'rptx-faq__answer' },
                                        el(RichText, {
                                            tagName: 'p',
                                            value: item.answer,
                                            onChange: function(value) {
                                                updateFaqItem(index, 'answer', value);
                                            },
                                            placeholder: __('Enter answer...', 'reportgenix-tools')
                                        })
                                    )
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
