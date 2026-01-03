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

    registerBlockType('reportgenix/education', {
        title: __('Education Section', 'reportgenix-tools'),
        icon: 'book-alt',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'What is Profit Margin and Why Does It Matter?'
            },
            content: {
                type: 'array',
                default: [
                    'Profit margin is the percentage of revenue that remains as profit after deducting all costs. For Shopify store owners, understanding your profit margin is critical for sustainable growth.',
                    'Many ecommerce sellers focus solely on revenue, but high sales don\'t guarantee profitability. If your margins are too thin, rising costs from shipping, ads, or platform fees can quickly turn profits into losses.',
                    'A healthy profit margin gives you room to invest in marketing, absorb unexpected costs, and scale your business confidently. Most successful Shopify stores aim for a net profit margin of 15-25% after all expenses.',
                    'By regularly calculating your profit margins using this free calculator, you can identify underpriced products, optimize your pricing strategy, and make data-driven decisions that improve your bottom line.'
                ]
            },
            formulaTitle: {
                type: 'string',
                default: 'Profit Margin Formula'
            },
            formulaText: {
                type: 'string',
                default: 'Profit Margin = ((Revenue - Costs) ÷ Revenue) × 100'
            },
            exampleTitle: {
                type: 'string',
                default: 'Example Calculation'
            },
            exampleData: {
                type: 'array',
                default: [
                    {label: 'Selling Price:', value: '$50.00'},
                    {label: 'Product Cost:', value: '$15.00'},
                    {label: 'Shipping:', value: '$5.00'},
                    {label: 'Shopify Fees:', value: '$1.75 (2.9% + $0.30)'},
                    {label: 'Marketing:', value: '$8.00'},
                    {label: '', value: ''},
                    {label: 'Total Costs:', value: '$29.75', bold: true},
                    {label: 'Net Profit:', value: '$20.25', bold: true},
                    {label: 'Profit Margin:', value: '40.5%', bold: true}
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
            formulaBoxColor: {
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

            function updateContentParagraph(index, value) {
                var newContent = attributes.content.slice();
                newContent[index] = value;
                setAttributes({ content: newContent });
            }

            function addContentParagraph() {
                var newContent = attributes.content.slice();
                newContent.push('New paragraph here.');
                setAttributes({ content: newContent });
            }

            function removeContentParagraph(index) {
                var newContent = attributes.content.slice();
                newContent.splice(index, 1);
                setAttributes({ content: newContent });
            }

            function updateExampleRow(index, field, value) {
                var newData = attributes.exampleData.slice();
                newData[index][field] = value;
                setAttributes({ exampleData: newData });
            }

            function addExampleRow() {
                var newData = attributes.exampleData.slice();
                newData.push({label: 'Label:', value: 'Value', bold: false});
                setAttributes({ exampleData: newData });
            }

            function removeExampleRow(index) {
                var newData = attributes.exampleData.slice();
                newData.splice(index, 1);
                setAttributes({ exampleData: newData });
            }

            function addExampleSpacer() {
                var newData = attributes.exampleData.slice();
                newData.push({label: '', value: ''});
                setAttributes({ exampleData: newData });
            }

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Main Content', 'reportgenix-tools'), initialOpen: true },
                        el(TextControl, {
                            label: __('Title', 'reportgenix-tools'),
                            value: attributes.title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el('h4', { style: { marginTop: '20px', marginBottom: '10px' } }, __('Content Paragraphs', 'reportgenix-tools')),
                        attributes.content.map(function(paragraph, index) {
                            return el('div', { key: index, style: { marginBottom: '15px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' } },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                                    el('strong', {}, __('Paragraph', 'reportgenix-tools') + ' ' + (index + 1)),
                                    el(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeContentParagraph(index); }
                                    }, __('Remove', 'reportgenix-tools'))
                                ),
                                el(TextareaControl, {
                                    value: paragraph,
                                    onChange: function(value) {
                                        updateContentParagraph(index, value);
                                    },
                                    rows: 3
                                })
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addContentParagraph
                        }, __('Add Paragraph', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Formula Settings', 'reportgenix-tools'), initialOpen: false },
                        el(TextControl, {
                            label: __('Formula Title', 'reportgenix-tools'),
                            value: attributes.formulaTitle,
                            onChange: function(value) {
                                setAttributes({ formulaTitle: value });
                            }
                        }),
                        el(TextareaControl, {
                            label: __('Formula Text', 'reportgenix-tools'),
                            value: attributes.formulaText,
                            onChange: function(value) {
                                setAttributes({ formulaText: value });
                            },
                            rows: 2
                        })
                    ),
                    el(PanelBody, { title: __('Example Calculation', 'reportgenix-tools'), initialOpen: false },
                        el(TextControl, {
                            label: __('Example Title', 'reportgenix-tools'),
                            value: attributes.exampleTitle,
                            onChange: function(value) {
                                setAttributes({ exampleTitle: value });
                            }
                        }),
                        el('h4', { style: { marginTop: '20px', marginBottom: '10px' } }, __('Example Data Rows', 'reportgenix-tools')),
                        attributes.exampleData.map(function(row, index) {
                            var isEmpty = !row.label && !row.value;
                            return el('div', {
                                key: index,
                                style: {
                                    marginBottom: '15px',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: isEmpty ? '#fffacd' : '#f9f9f9'
                                }
                            },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                                    el('strong', {}, isEmpty ? __('Spacer', 'reportgenix-tools') : __('Row', 'reportgenix-tools') + ' ' + (index + 1)),
                                    el(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeExampleRow(index); }
                                    }, __('Remove', 'reportgenix-tools'))
                                ),
                                !isEmpty && el(TextControl, {
                                    label: __('Label', 'reportgenix-tools'),
                                    value: row.label,
                                    onChange: function(value) {
                                        updateExampleRow(index, 'label', value);
                                    }
                                }),
                                !isEmpty && el(TextControl, {
                                    label: __('Value', 'reportgenix-tools'),
                                    value: row.value,
                                    onChange: function(value) {
                                        updateExampleRow(index, 'value', value);
                                    }
                                }),
                                !isEmpty && el(ToggleControl, {
                                    label: __('Bold Text', 'reportgenix-tools'),
                                    checked: row.bold || false,
                                    onChange: function(value) {
                                        updateExampleRow(index, 'bold', value);
                                    }
                                })
                            );
                        }),
                        el('div', { style: { display: 'flex', gap: '10px' } },
                            el(Button, {
                                isPrimary: true,
                                onClick: addExampleRow
                            }, __('Add Row', 'reportgenix-tools')),
                            el(Button, {
                                isSecondary: true,
                                onClick: addExampleSpacer
                            }, __('Add Spacer', 'reportgenix-tools'))
                        )
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
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Formula Box Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.formulaBoxColor,
                            onChange: function(value) {
                                setAttributes({ formulaBoxColor: value || '#6b5af7' });
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
                    className: 'rptx-education',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-formula-box-color': attributes.formulaBoxColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container'
                    },
                        el('div', { className: 'rptx-education__grid' },
                            el('div', { className: 'rptx-education__content' },
                                el(RichText, {
                                    tagName: 'h2',
                                    value: attributes.title,
                                    onChange: function(value) {
                                        setAttributes({ title: value });
                                    },
                                    placeholder: __('Enter title...', 'reportgenix-tools')
                                }),
                                attributes.content.map(function(paragraph, index) {
                                    return el(RichText, {
                                        key: index,
                                        tagName: 'p',
                                        value: paragraph,
                                        onChange: function(value) {
                                            updateContentParagraph(index, value);
                                        },
                                        placeholder: __('Enter paragraph text...', 'reportgenix-tools')
                                    });
                                })
                            ),
                            el('div', { className: 'rptx-education__formula' },
                                el('h3', {}, attributes.formulaTitle),
                                el('div', { className: 'rptx-formula-box' },
                                    attributes.formulaText
                                ),
                                el('div', { className: 'rptx-formula-example' },
                                    el('h4', {}, attributes.exampleTitle),
                                    el('div', { className: 'rptx-example-data' },
                                        attributes.exampleData.map(function(row, index) {
                                            if (!row.label && !row.value) {
                                                return el('div', { key: index, className: 'rptx-example-spacer' });
                                            }
                                            return el('div', {
                                                key: index,
                                                className: 'rptx-example-row' + (row.bold ? ' rptx-example-row--bold' : '')
                                            },
                                                row.label && el('span', { className: 'rptx-example-label' }, row.label),
                                                row.value && el('span', { className: 'rptx-example-value' }, row.value)
                                            );
                                        })
                                    )
                                )
                            )
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
