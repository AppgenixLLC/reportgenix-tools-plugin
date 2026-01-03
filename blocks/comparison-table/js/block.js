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

    registerBlockType('reportgenix/comparison-table', {
        title: __('Comparison Table', 'reportgenix-tools'),
        icon: 'editor-table',
        category: 'reportgenix-blocks',
        attributes: {
            title: {
                type: 'string',
                default: 'Margin vs. Markup: Understanding the Difference'
            },
            subtitle: {
                type: 'string',
                default: 'Don\'t confuse these two metrics. A 100% markup only equals a 50% profit margin.'
            },
            tableHeaders: {
                type: 'array',
                default: [
                    'Markup %',
                    'Profit Margin %',
                    'Cost Price',
                    'Selling Price'
                ]
            },
            tableRows: {
                type: 'array',
                default: [
                    ['25%', '20%', '$10.00', '$12.50'],
                    ['50%', '33.3%', '$10.00', '$15.00'],
                    ['100%', '50%', '$10.00', '$20.00'],
                    ['200%', '66.7%', '$10.00', '$30.00'],
                    ['300%', '75%', '$10.00', '$40.00']
                ]
            },
            fullWidth: {
                type: 'boolean',
                default: false
            },
            narrowContainer: {
                type: 'boolean',
                default: true
            },
            backgroundColor: {
                type: 'string',
                default: '#ffffff'
            },
            headerBackgroundColor: {
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

            function updateHeader(index, value) {
                var newHeaders = attributes.tableHeaders.slice();
                newHeaders[index] = value;
                setAttributes({ tableHeaders: newHeaders });
            }

            function addHeader() {
                var newHeaders = attributes.tableHeaders.slice();
                newHeaders.push('New Column');
                // Add empty cell to all rows
                var newRows = attributes.tableRows.map(function(row) {
                    var newRow = row.slice();
                    newRow.push('');
                    return newRow;
                });
                setAttributes({
                    tableHeaders: newHeaders,
                    tableRows: newRows
                });
            }

            function removeHeader(index) {
                if (attributes.tableHeaders.length <= 1) return;
                var newHeaders = attributes.tableHeaders.slice();
                newHeaders.splice(index, 1);
                // Remove cell from all rows
                var newRows = attributes.tableRows.map(function(row) {
                    var newRow = row.slice();
                    newRow.splice(index, 1);
                    return newRow;
                });
                setAttributes({
                    tableHeaders: newHeaders,
                    tableRows: newRows
                });
            }

            function updateCell(rowIndex, cellIndex, value) {
                var newRows = attributes.tableRows.slice();
                newRows[rowIndex][cellIndex] = value;
                setAttributes({ tableRows: newRows });
            }

            function addRow() {
                var newRows = attributes.tableRows.slice();
                var emptyRow = attributes.tableHeaders.map(function() { return ''; });
                newRows.push(emptyRow);
                setAttributes({ tableRows: newRows });
            }

            function removeRow(index) {
                var newRows = attributes.tableRows.slice();
                newRows.splice(index, 1);
                setAttributes({ tableRows: newRows });
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
                    el(PanelBody, { title: __('Table Headers', 'reportgenix-tools'), initialOpen: false },
                        attributes.tableHeaders.map(function(header, index) {
                            return el('div', { key: index, style: { marginBottom: '15px', padding: '12px', border: '1px solid #6b5af7', borderRadius: '4px', backgroundColor: '#f0fdf4' } },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                                    el('strong', {}, __('Column', 'reportgenix-tools') + ' ' + (index + 1)),
                                    attributes.tableHeaders.length > 1 && el(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeHeader(index); }
                                    }, __('Remove', 'reportgenix-tools'))
                                ),
                                el(TextControl, {
                                    value: header,
                                    onChange: function(value) {
                                        updateHeader(index, value);
                                    }
                                })
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addHeader
                        }, __('Add Column', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Table Rows', 'reportgenix-tools'), initialOpen: false },
                        attributes.tableRows.map(function(row, rowIndex) {
                            return el('div', { key: rowIndex, style: { marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' } },
                                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
                                    el('strong', {}, __('Row', 'reportgenix-tools') + ' ' + (rowIndex + 1)),
                                    el(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeRow(rowIndex); }
                                    }, __('Remove Row', 'reportgenix-tools'))
                                ),
                                row.map(function(cell, cellIndex) {
                                    return el(TextControl, {
                                        key: cellIndex,
                                        label: attributes.tableHeaders[cellIndex] || ('Cell ' + (cellIndex + 1)),
                                        value: cell,
                                        onChange: function(value) {
                                            updateCell(rowIndex, cellIndex, value);
                                        }
                                    });
                                })
                            );
                        }),
                        el(Button, {
                            isPrimary: true,
                            onClick: addRow
                        }, __('Add Row', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Layout & Colors', 'reportgenix-tools'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Full Width Container', 'reportgenix-tools'),
                            checked: attributes.fullWidth,
                            onChange: function(value) {
                                setAttributes({ fullWidth: value });
                                if (value) {
                                    setAttributes({ narrowContainer: false });
                                }
                            }
                        }),
                        !attributes.fullWidth && el(ToggleControl, {
                            label: __('Narrow Container', 'reportgenix-tools'),
                            checked: attributes.narrowContainer,
                            onChange: function(value) {
                                setAttributes({ narrowContainer: value });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Background Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.backgroundColor,
                            onChange: function(value) {
                                setAttributes({ backgroundColor: value || '#ffffff' });
                            }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Table Header Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.headerBackgroundColor,
                            onChange: function(value) {
                                setAttributes({ headerBackgroundColor: value || '#6b5af7' });
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
                    className: 'rptx-comparison',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-header-bg-color': attributes.headerBackgroundColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', {
                        className: (attributes.fullWidth ? 'custom-container custom-container--full' :
                                   (attributes.narrowContainer ? 'custom-container custom-container--narrow' : 'custom-container'))
                    },
                        el('div', { className: 'rptx-comparison__header' },
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
                        el('div', { className: 'rptx-comparison__table' },
                            el('table', {},
                                el('thead', {},
                                    el('tr', {},
                                        attributes.tableHeaders.map(function(header, index) {
                                            return el('th', { key: index }, header);
                                        })
                                    )
                                ),
                                el('tbody', {},
                                    attributes.tableRows.map(function(row, rowIndex) {
                                        return el('tr', { key: rowIndex },
                                            row.map(function(cell, cellIndex) {
                                                return el('td', { key: cellIndex }, cell);
                                            })
                                        );
                                    })
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
