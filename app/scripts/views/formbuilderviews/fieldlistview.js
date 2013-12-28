define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbuilderviews/fieldbuttonview'

    ], function ($, _, Backbone,  Templates, Fieldbuttonview) {
        'use strict';
        var FieldlistView = Backbone.View.extend({
        tagName:"ul",
        id:"avlblfieldslist",
        className:'list-group',
        initialize: function () {

        },
        addField : function(field){
            var fb_field = new Fieldbuttonview({model : field});
            $(this.el).append(fb_field.render().el); 
        },
        render: function () {
          this.collection.each(this.addField, this);
          return this;
        }
    });
    return FieldlistView;
});