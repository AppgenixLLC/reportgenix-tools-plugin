(function(blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;
    var RangeControl = components.RangeControl;
    var Button = components.Button;
    var __ = i18n.__;

    registerBlockType('reportgenix/pros-cons', {
        title: __('Pros and Cons', 'reportgenix-tools'),
        icon: 'yes-no',
        category: 'reportgenix-blocks',
        attributes: {
            title: { type: 'string', default: 'Pros and Cons of Our Profit Margin Calculator' },
            subtitle: { type: 'string', default: 'We believe in transparency. Here\'s what our calculator does well and where it has limitations.' },
            prosTitle: { type: 'string', default: 'Pros' },
            consTitle: { type: 'string', default: 'Cons' },
            pros: {
                type: 'array',
                default: [
                    { title: '100% Free Forever', description: 'No hidden fees, no premium tier, no email required. Use unlimited calculations at no cost.' }
                ]
            },
            cons: {
                type: 'array',
                default: [
                    { title: 'Single Product Calculation', description: 'Calculates one product at a time. For bulk product analysis, you\'ll need spreadsheet software or dedicated tools.' }
                ]
            },
            showVerdict: { type: 'boolean', default: true },
            verdictTitle: { type: 'string', default: 'Our Verdict' },
            verdictText: { type: 'string', default: 'This calculator is best for quick pricing decisions, validating product margins before launch, and understanding your true profitability on individual products.' },
            verdictIcon: { type: 'string', default: '💡' },
            fullWidth: { type: 'boolean', default: false },
            backgroundColor: { type: 'string', default: '#f9fafb' },
            prosColor: { type: 'string', default: '#10B981' },
            consColor: { type: 'string', default: '#EF4444' },
            verdictBackgroundColor: { type: 'string', default: '#667eea' },
            paddingTop: { type: 'number', default: 80 },
            paddingBottom: { type: 'number', default: 80 },
            paddingTopTablet: { type: 'number', default: 60 },
            paddingBottomTablet: { type: 'number', default: 60 },
            paddingTopMobile: { type: 'number', default: 40 },
            paddingBottomMobile: { type: 'number', default: 40 }
        },

        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function updatePro(index, field, value) {
                var newPros = attributes.pros.slice();
                newPros[index][field] = value;
                setAttributes({ pros: newPros });
            }

            function updateCon(index, field, value) {
                var newCons = attributes.cons.slice();
                newCons[index][field] = value;
                setAttributes({ cons: newCons });
            }

            function addPro() {
                var newPros = attributes.pros.slice();
                newPros.push({ title: 'New Pro', description: 'Description here.' });
                setAttributes({ pros: newPros });
            }

            function addCon() {
                var newCons = attributes.cons.slice();
                newCons.push({ title: 'New Con', description: 'Description here.' });
                setAttributes({ cons: newCons });
            }

            function removePro(index) {
                var newPros = attributes.pros.slice();
                newPros.splice(index, 1);
                setAttributes({ pros: newPros });
            }

            function removeCon(index) {
                var newCons = attributes.cons.slice();
                newCons.splice(index, 1);
                setAttributes({ cons: newCons });
            }

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Section Settings', 'reportgenix-tools'), initialOpen: true },
                        el(TextControl, {
                            label: __('Title', 'reportgenix-tools'),
                            value: attributes.title,
                            onChange: function(value) { setAttributes({ title: value }); }
                        }),
                        el(TextareaControl, {
                            label: __('Subtitle', 'reportgenix-tools'),
                            value: attributes.subtitle,
                            onChange: function(value) { setAttributes({ subtitle: value }); }
                        }),
                        el(TextControl, {
                            label: __('Pros Title', 'reportgenix-tools'),
                            value: attributes.prosTitle,
                            onChange: function(value) { setAttributes({ prosTitle: value }); }
                        }),
                        el(TextControl, {
                            label: __('Cons Title', 'reportgenix-tools'),
                            value: attributes.consTitle,
                            onChange: function(value) { setAttributes({ consTitle: value }); }
                        })
                    ),
                    el(PanelBody, { title: __('Pros', 'reportgenix-tools'), initialOpen: false },
                        attributes.pros.map(function(pro, index) {
                            return el('div', { key: index, style: { marginBottom: '15px', padding: '12px', border: '1px solid #10B981', borderRadius: '4px', backgroundColor: '#f0fdf4' } },
                                el('h4', { style: { margin: '0 0 10px', color: '#10B981' } }, __('Pro', 'reportgenix-tools') + ' ' + (index + 1)),
                                el(TextControl, {
                                    label: __('Title', 'reportgenix-tools'),
                                    value: pro.title,
                                    onChange: function(value) { updatePro(index, 'title', value); }
                                }),
                                el(TextareaControl, {
                                    label: __('Description', 'reportgenix-tools'),
                                    value: pro.description,
                                    onChange: function(value) { updatePro(index, 'description', value); }
                                }),
                                el(Button, {
                                    isDestructive: true,
                                    onClick: function() { removePro(index); }
                                }, __('Remove', 'reportgenix-tools'))
                            );
                        }),
                        el(Button, { isPrimary: true, onClick: addPro }, __('Add Pro', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Cons', 'reportgenix-tools'), initialOpen: false },
                        attributes.cons.map(function(con, index) {
                            return el('div', { key: index, style: { marginBottom: '15px', padding: '12px', border: '1px solid #EF4444', borderRadius: '4px', backgroundColor: '#fef2f2' } },
                                el('h4', { style: { margin: '0 0 10px', color: '#EF4444' } }, __('Con', 'reportgenix-tools') + ' ' + (index + 1)),
                                el(TextControl, {
                                    label: __('Title', 'reportgenix-tools'),
                                    value: con.title,
                                    onChange: function(value) { updateCon(index, 'title', value); }
                                }),
                                el(TextareaControl, {
                                    label: __('Description', 'reportgenix-tools'),
                                    value: con.description,
                                    onChange: function(value) { updateCon(index, 'description', value); }
                                }),
                                el(Button, {
                                    isDestructive: true,
                                    onClick: function() { removeCon(index); }
                                }, __('Remove', 'reportgenix-tools'))
                            );
                        }),
                        el(Button, { isPrimary: true, onClick: addCon }, __('Add Con', 'reportgenix-tools'))
                    ),
                    el(PanelBody, { title: __('Verdict', 'reportgenix-tools'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show Verdict Section', 'reportgenix-tools'),
                            checked: attributes.showVerdict,
                            onChange: function(value) { setAttributes({ showVerdict: value }); }
                        }),
                        attributes.showVerdict && el(TextControl, {
                            label: __('Verdict Icon (Emoji)', 'reportgenix-tools'),
                            value: attributes.verdictIcon,
                            onChange: function(value) { setAttributes({ verdictIcon: value }); }
                        }),
                        attributes.showVerdict && el(TextControl, {
                            label: __('Verdict Title', 'reportgenix-tools'),
                            value: attributes.verdictTitle,
                            onChange: function(value) { setAttributes({ verdictTitle: value }); }
                        }),
                        attributes.showVerdict && el(TextareaControl, {
                            label: __('Verdict Text', 'reportgenix-tools'),
                            value: attributes.verdictText,
                            onChange: function(value) { setAttributes({ verdictText: value }); }
                        })
                    ),
                    el(PanelBody, { title: __('Layout & Colors', 'reportgenix-tools'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Full Width Container', 'reportgenix-tools'),
                            checked: attributes.fullWidth,
                            onChange: function(value) { setAttributes({ fullWidth: value }); }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Background Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.backgroundColor,
                            onChange: function(value) { setAttributes({ backgroundColor: value || '#f9fafb' }); }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Pros Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.prosColor,
                            onChange: function(value) { setAttributes({ prosColor: value || '#10B981' }); }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Cons Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.consColor,
                            onChange: function(value) { setAttributes({ consColor: value || '#EF4444' }); }
                        }),
                        el('p', { style: { marginTop: '20px', fontWeight: 'bold' } }, __('Verdict Background Color', 'reportgenix-tools')),
                        el(ColorPalette, {
                            value: attributes.verdictBackgroundColor,
                            onChange: function(value) { setAttributes({ verdictBackgroundColor: value || '#667eea' }); }
                        })
                    ),
                    el(PanelBody, { title: __('Spacing', 'reportgenix-tools'), initialOpen: false },
                        el('h4', {}, __('Desktop', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTop,
                            onChange: function(value) { setAttributes({ paddingTop: value }); },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottom,
                            onChange: function(value) { setAttributes({ paddingBottom: value }); },
                            min: 0,
                            max: 200
                        }),
                        el('hr'),
                        el('h4', {}, __('Tablet', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTopTablet,
                            onChange: function(value) { setAttributes({ paddingTopTablet: value }); },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottomTablet,
                            onChange: function(value) { setAttributes({ paddingBottomTablet: value }); },
                            min: 0,
                            max: 200
                        }),
                        el('hr'),
                        el('h4', {}, __('Mobile', 'reportgenix-tools')),
                        el(RangeControl, {
                            label: __('Padding Top (px)', 'reportgenix-tools'),
                            value: attributes.paddingTopMobile,
                            onChange: function(value) { setAttributes({ paddingTopMobile: value }); },
                            min: 0,
                            max: 200
                        }),
                        el(RangeControl, {
                            label: __('Padding Bottom (px)', 'reportgenix-tools'),
                            value: attributes.paddingBottomMobile,
                            onChange: function(value) { setAttributes({ paddingBottomMobile: value }); },
                            min: 0,
                            max: 200
                        })
                    )
                ),
                el('section', {
                    className: 'rptx-pros-cons',
                    style: {
                        '--rptx-bg-color': attributes.backgroundColor,
                        '--rptx-pros-color': attributes.prosColor,
                        '--rptx-cons-color': attributes.consColor,
                        '--rptx-verdict-bg-color': attributes.verdictBackgroundColor,
                        '--rptx-padding-top': attributes.paddingTop + 'px',
                        '--rptx-padding-bottom': attributes.paddingBottom + 'px'
                    }
                },
                    el('div', { className: attributes.fullWidth ? 'custom-container custom-container--full' : 'custom-container' },
                        el('div', { className: 'rptx-pros-cons__header' },
                            el('h2', {}, attributes.title),
                            el('p', {}, attributes.subtitle)
                        ),
                        el('div', { className: 'rptx-pros-cons__grid' },
                            el('div', { className: 'rptx-pros-cons__card rptx-pros-cons__card--pros' },
                                el('div', { className: 'rptx-pros-cons__card-header' },
                                    el('div', { className: 'rptx-pros-cons__icon rptx-pros-cons__icon--pros' },
                                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5' },
                                            el('polyline', { points: '20 6 9 17 4 12' })
                                        )
                                    ),
                                    el('h3', {}, attributes.prosTitle)
                                ),
                                el('ul', { className: 'rptx-pros-cons__list' },
                                    attributes.pros.map(function(pro, index) {
                                        return el('li', { key: index },
                                            el('span', { className: 'rptx-pros-cons__bullet rptx-pros-cons__bullet--pros' }, '✓'),
                                            el('div', {},
                                                el('strong', {}, pro.title),
                                                el('p', {}, pro.description)
                                            )
                                        );
                                    })
                                )
                            ),
                            el('div', { className: 'rptx-pros-cons__card rptx-pros-cons__card--cons' },
                                el('div', { className: 'rptx-pros-cons__card-header' },
                                    el('div', { className: 'rptx-pros-cons__icon rptx-pros-cons__icon--cons' },
                                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5' },
                                            el('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                            el('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
                                        )
                                    ),
                                    el('h3', {}, attributes.consTitle)
                                ),
                                el('ul', { className: 'rptx-pros-cons__list' },
                                    attributes.cons.map(function(con, index) {
                                        return el('li', { key: index },
                                            el('span', { className: 'rptx-pros-cons__bullet rptx-pros-cons__bullet--cons' }, '✗'),
                                            el('div', {},
                                                el('strong', {}, con.title),
                                                el('p', {}, con.description)
                                            )
                                        );
                                    })
                                )
                            )
                        ),
                        attributes.showVerdict && el('div', { className: 'rptx-pros-cons__verdict' },
                            el('div', { className: 'rptx-pros-cons__verdict-icon' }, attributes.verdictIcon),
                            el('div', { className: 'rptx-pros-cons__verdict-content' },
                                el('h4', {}, attributes.verdictTitle),
                                el('p', {}, attributes.verdictText)
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
