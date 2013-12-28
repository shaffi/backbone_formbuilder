define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jqueryui'
], function ($, _, Backbone, Templates) {
    'use strict';
    var fieldbuttonview = Backbone.View.extend({
        template: Templates["formbuildertemplates/partials/field_lists"],
        tagName: 'li',
        className: 'list-group-item label-primary fielditem',
        initialize: function () {},
        events: {
            "dragstop": "mouseUpHandler"
        },
        mouseUpHandler: function (e) {
            vent.trigger('formbuilder:renderfield', this.model);
        },
        showtemplates: function (e) {
            e.preventDefault();
            vent.trigger('formbuilder:renderfield', this.model);
        },
        render: function () {
            $(this.el)
                .html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return fieldbuttonview;
});