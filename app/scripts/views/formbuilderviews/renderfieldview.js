define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, Templates) {
    'use strict';
    var renderfieldview = Backbone.View.extend({
        template: Templates["formbuildertemplates/partials/render_field"],
        className: 'form-group well',
        _modelBinder: undefined,
        initialize: function () {
            this._modelBinder = new Backbone.ModelBinder();
            this.parentView = this.options.parentView;
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },
        events: {
            'click #fieldcontent': 'showteEditView',
            'click #duplicatebbtn': 'duplicate',
            'click #removebtn': 'clear'
        },
        showteEditView: function (e) {
            e.preventDefault();
            vent.trigger('formbuilder:showEditview', this.model);
        },
        clear: function () {
            return this.model.destroy();
        },
        duplicate: function () {
            var duplicateModel = this.model.clone();
            duplicateModel.set('field_label', duplicateModel.get('field_label') + '_copy');
            this.parentView.collection.add(duplicateModel);
        },
        renderFieldView: function (viewTemplateID) {
            var fieldtemplate = Templates["formbuildertemplates/fields/" + viewTemplateID];
            $(this.el)
                .find("#fieldcontent")
                .append(fieldtemplate(this.model.toJSON()));
        },
        render: function () {
            $(this.el)
                .html(this.template());
            var viewTemplateID = this.model.get('view_template_id');
            this.renderFieldView(viewTemplateID);
            return this;
        }
    });
    return renderfieldview;
});