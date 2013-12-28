define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, Templates, rivets) {
    'use strict';
    var editFieldView = Backbone.View.extend({
        id: "editfieldcontainer",
        initialize: function () {
            this.listenTo(this.model, "destroy", this.remove);
            this.template = Templates["formbuildertemplates/edit/" + this.model.get('edit_template_id')];
        },
        remove: function () {
            this.options.parentView.editView = void 0;
            this.options.parentView.$el.find('#navtabs a[href="#fieldlists"]')
                .tab('show');
            return Backbone.View.prototype.remove.call(this);
        },
        render: function () {
            $(this.el)
                .html(this.template());
            return this;
        }
    });
    return editFieldView;
});