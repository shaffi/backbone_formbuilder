/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'vendor/modelbinder/Backbone.ModelBinder.min',
    'collections/formbuildercollections/formbuilderfields',
    'templates',
    'views/formbuilderviews/fieldlistview',
    'collections/formbuildercollections/renderfields',
    'views/formbuilderviews/renderfieldlistview',
    'views/formbuilderviews/editfieldView',
    'vendor/deepmodel/deep-model.min'
], function ($, _, Backbone, modelbinder, FormbuilderFields, Templates, Fieldlistview, Renderfields, Renderfieldlistview, editFieldView, deepmodel) {
    'use strict';
    var FormbuilderView = Backbone.View.extend({
        template: Templates["formbuilder"],
        _modelBinder: undefined,
        events: {
            'click #save_btn': 'saveForm'
        },
        initialize: function () {
            this._modelBinder = new Backbone.ModelBinder();
            var _self = this;
            this.formbuilderFieldscollection = new FormbuilderFields([{
                "field_name": "Text input",
                "field_label": "Name",
                "view_template_id": "single_line_text",
                "edit_template_id": "textinput_edit_tmpl",
                "field_data": {
                    'type': 'text',
                    'name': 'd',
                    'id': 'f',
                    'placeholder_text': '',
                    'min': 1,
                    'max': 30,
                    "help_text":"", 
                    'required': 'required'
                }
            }, {
                "field_name": "Password",
                "field_label": "Enter your password",
                "view_template_id": "single_line_text",
                "edit_template_id": "textinput_edit_tmpl",
                "field_data": {
                    "type": "password",
                    "name": "d",
                    "id": "f",
                    "placeholder_text": "",
                    "min": 1,
                    "max": 30,
                    "help_text":"", 
                    "required": "required"
                }
            }, {
                "field_name": "Email",
                "field_label": "Enter your email",
                "view_template_id": "single_line_text",
                "edit_template_id": "textinput_edit_tmpl",
                "field_data": {
                    "type": "email",
                    "name": "d",
                    "id": "f",
                    "placeholder_text": "",
                    "min": 1,
                    "max": 30,
                    "help_text":"",
                    "required": "required"
                }
            }, {
                "field_name": "Telephone",
                "field_label": "Enter your telephone no ",
                "view_template_id": "single_line_text",
                "edit_template_id": "textinput_edit_tmpl",
                "field_data": {
                    "type": "tel",
                    "name": "d",
                    "id": "f",
                    "placeholder_text": "",
                    "min": 1,
                    "max": 30,
                    "help_text":"",
                    "required": "required"
                }
            }, {
                "field_name": "URL",
                "field_label": "Enter URL",
                "view_template_id": "single_line_text",
                "edit_template_id": "textinput_edit_tmpl",
                "field_data": {
                    "type": "url",
                    "name": "d",
                    "id": "f",
                    "placeholder_text": "",
                    "min": 1,
                    "max": 30,
                    "help_text":"", 
                    "required": "required"
                }
            }]);
            this.renderfieldscollection = new Renderfields();
            this.fieldlistview = new Fieldlistview({
                collection: this.formbuilderFieldscollection
            });
            this.renderlistview = new Renderfieldlistview({
                collection: this.renderfieldscollection
            });
            vent.on('formbuilder:renderfield', this.renderField, this);
            vent.on('formbuilder:showEditview', this.showEditview, this);
            this.registerpartials();
            // rivets.binders.input = {
            //     publishes: true,
            //     routine: rivets.binders.value.routine,
            //     bind: function(el) {
            //       return el.addEventListener('input', this.publish);
            //     },
            //     unbind: function(el) {
            //       return el.removeEventListener('input', this.publish);
            //     }
            //   };
            // rivets.configure({
            //     prefix: 'rv',
            //     templateDelimiters : ["{", "}"],
            //     adapter: {
            //         subscribe: function(obj, keypath, callback) {
            //             callback.wrapped = function(m, v) {
            //                 callback(v)
            //             };
            //             obj.on('change:' + keypath, callback.wrapped);
            //         },
            //         unsubscribe: function(obj, keypath, callback) {
            //             obj.off('change:' + keypath, callback.wrapped);
            //         },
            //         read: function(obj, keypath) {
            //             return obj.get(keypath);
            //         },
            //         publish: function(obj, keypath, value) {
            //             obj.set(keypath, value);
            //         }
            //     }
            // });
        },
        registerpartials: function () {
            Handlebars.registerPartial('fb_left_side', Templates["formbuildertemplates/partials/fb_left_side"]);
            Handlebars.registerPartial('fb_right_side', Templates["formbuildertemplates/partials/fb_right_side"]);
        },
        renderField: function (field) {
            var rfield = field.toJSON()
            this.renderfieldscollection.add(rfield);
        },
        showEditview: function (field) {
            $(this.el)
                .find('#navtabs a[href="#fieldsettings"]')
                .tab('show');
            this.editFieldView = new editFieldView({
                model: field,
                parentView: this
            });
            $(this.el)
                .find("#fieldsettings")
                .html("");
            $(this.el)
                .find("#fieldsettings")
                .html(this.editFieldView.render()
                    .el);
            this._modelBinder.bind(field, this.editFieldView.$el);
            // rivets.bind(this.editFieldView.$el, {
            //       fields: field
            //  });
        },
        renderViews: function () {
            $(this.el)
                .find("#fieldlists")
                .append(this.fieldlistview.render()
                    .el);
            $(this.el)
                .find("#rrenderedform")
                .append(this.renderlistview.render()
                    .el);
            // $(this.el)
            //     .find('#navtabs a[href="#fieldlists"]')
            //     .tab('show');
            this.setdraganddrop();
        },  
        setdraganddrop: function () {
            $(this.el)
                .find("#fieldset")
                .sortable({
                    connectWith: '#fieldset',
                    cursor: 'move',
                    zIndex: 9999,
                    cursorAt: {
                        top: 0,
                        left: 0
                    },
                    placeholder: 'ui-sortable-placeholder',
                    tolerance: 'pointer',
                    stop: function (event, ui) {
                        if ($(ui.item[0])
                            .hasClass('fielditem')) {
                            $(ui.item)
                                .remove();
                        }
                    },
                    forceHelperSize: true,
                    forcePlaceholderSize: true,
                    revert: 100
                });
            var _this = this;
            var $flist = $(this.el)
                .find("#fieldset");
            $(this.el)
                .find(".fielditem")
                .draggable({
                    connectToSortable: "#fieldset",
                    cursor: 'move',
                    cursorAt: {
                        top: 0,
                        left: 0
                    },                 
                    helper: 'clone',
                    revert: 'invalid'
                });
            $(this.el)
                .find("ul, li")
                .disableSelection();                
        },
        saveForm: function (e) {
            var output = JSON.stringify({
                fields: this.renderfieldscollection.toJSON()
            });
            console.log(output);
            $('#myModal')
                .modal('toggle');
            $('.modal-body')
                .html(output);
        },
        render: function () {
            $(this.el)
                .html(this.template());
            this.renderViews();
            $(this.el)
                .find('#navtabs a[href="#formsettings"]')
                .tab('show');
            return this;
        }
    });
    return FormbuilderView;
});