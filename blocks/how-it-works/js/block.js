(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = blockEditor.InspectorControls;
    var RichText = blockEditor.RichText;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var Button = components.Button;
    var __ = i18n.__;

    registerBlockType('reportgenix/how-it-works', {
        title: __('How It Works', 'reportgenix-tools'),
        icon: 'list-view',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'How to Calculate Your Shopify Profit Margin'
            },
            subtitle: {
                type: 'string',
                default: 'Three simple steps to understand your true ecommerce profitability.'
            },
            steps: {
                type: 'array',
                default: [
                    {
                        title: 'Enter Your Costs',
                        description: 'Input your product cost (COGS), shipping fees, packaging costs, and any marketing spend per unit sold.'
                    },
                    {
                        title: 'Add Your Selling Price',
                        description: 'Enter your current or planned selling price. The calculator includes Shopify fees automatically.'
                    },
                    {
                        title: 'See Your Real Profit',
                        description: 'Instantly view your gross margin, net margin, profit per unit, and markup percentage with detailed breakdowns.'
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
            numberColor: {
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

            function updateStep(index, field, value) {
                var newSteps = attributes.steps.slice();
                newSteps[index][field] = value;
                setAttributes({ steps: newSteps });
            }

            function addStep() {
                var newSteps = attributes.steps.slice();
                newSteps.push({
                    title: 'New Step',
                    description: 'Step description here.'
                });
                setAttributes({ steps: newSteps });
            }

            function removeStep(index) {
                var newSteps = attributes.steps.slice();
                newSteps.splice(index, 1);
                setAttributes({ steps: newSteps });
            }

            function moveStepUp(index) {
                if (index === 0) return;
                var newSteps = attributes.steps.slice();
                var temp = newSteps[index];
                newSteps[index] = newSteps[index - 1];
                newSteps[index - 1] = temp;
                setAttributes({ steps: newSteps });
            }

            function moveStepDown(index) {
                if (index === attributes.steps.length - 1) return;
                var newSteps = attributes.steps.slice();
                var temp = newSteps[index];
                newSteps[index] = newSteps[index + 1];
                newSteps[index + 1] = temp;
                setAttributes({ steps: newSteps });
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
                    el(PanelBody, { title: __('Steps', 'reportgenix-tools'), initialOpen: true },
                        attributes.steps.map(function(step, index) {
                            return el('div', { key: index, style: { marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' } },
                                el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' } },
                                    el('h4', { style: { margin: 0 } }, __('Step', 'reportgenix-tools') + ' ' + (index + 1)),
                                    el('div', { style: { display: 'flex', gap: '5px' } },
                                        index > 0 && el(Button, {
                                            onClick: function() {
                                                moveStepUp(index);
                                            },
                                            isSmall: true,
                                            icon: 'arrow-up-alt2',
                                            label: __('Move Up', 'reportgenix-tools')
                                        }),
                                        index < attributes.steps.length - 1 && el(Button, {
                                            onClick: function() {
                                                moveStepDown(index);
                                            },
                                            isSmall: true,
                                            icon: 'arrow-down-alt2',
                                            label: __('Move Down', 'reportgenix-tools')
                                        })
                                    )
                                ),
                                el(TextControl, {
                                    label: __('Title', 'reportgenix-tools'),
                                    value: step.title,
                                    onChange: function(value) {
                                        updateStep(index, 'title', value);
                                    }
                                }),
                                el(TextareaControl, {
                                    label: __('Description', 'reportgenix-tools'),
                                    value: step.description,
                                    onChange: function(value) {
                                        updateStep(index, 'description', value);
                                    }
                                }),
                                el(Button, {
                                    isDestructive: true,
                                    onClick: function() {
                                        removeStep(index);
                                    }
                                }, __('Remove Step', 'reportgenix-tools'))
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addStep
                        }, __('Add Step', 'reportgenix-tools'))
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
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Number Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.numberColor,
                            onChange: function(value) {
                                setAttributes({ numberColor: value || '#6b5af7' });
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
                    className: 'rptx-how-it-works',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-number-color': attributes.numberColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('div', { className: 'rptx-how-it-works__header' },
                            el(RichText, {
                                tagName: 'h2',
                                value: attributes.title,
                                onChange: function(value) {
                                    setAttributes({ title: value });
                                },
                                placeholder: __('Enter section title...', 'reportgenix-tools')
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
                        el('div', { className: 'rptx-steps' },
                            attributes.steps.map(function(step, index) {
                                return el('div', { key: index, className: 'rptx-step' },
                                    el('div', { className: 'rptx-step__number' }, index + 1),
                                    el(RichText, {
                                        tagName: 'h3',
                                        value: step.title,
                                        onChange: function(value) {
                                            updateStep(index, 'title', value);
                                        },
                                        placeholder: __('Step title...', 'reportgenix-tools')
                                    }),
                                    el(RichText, {
                                        tagName: 'p',
                                        value: step.description,
                                        onChange: function(value) {
                                            updateStep(index, 'description', value);
                                        },
                                        placeholder: __('Step description...', 'reportgenix-tools')
                                    })
                                );
                            })
                        )
                    )
                )
            ];
        },

        save: function(props) {
            var attributes = props.attributes;

            return el('section', {
                className: 'rptx-how-it-works',
                style: {
                    '--rptx-bg-color': attributes.backgroundColor,
                    '--rptx-number-color': attributes.numberColor,
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
                    el('div', { className: 'rptx-how-it-works__header' },
                        el(RichText.Content, {
                            tagName: 'h2',
                            value: attributes.title
                        }),
                        el(RichText.Content, {
                            tagName: 'p',
                            value: attributes.subtitle
                        })
                    ),
                    el('div', { className: 'rptx-steps' },
                        attributes.steps.map(function(step, index) {
                            return el('div', { key: index, className: 'rptx-step' },
                                el('div', { className: 'rptx-step__number' }, index + 1),
                                el(RichText.Content, {
                                    tagName: 'h3',
                                    value: step.title
                                }),
                                el(RichText.Content, {
                                    tagName: 'p',
                                    value: step.description
                                })
                            );
                        })
                    )
                )
            );
        }
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.i18n
);
