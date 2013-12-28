define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbuilderviews/renderfieldview'
    ], function ($, _, Backbone,  Templates, Renderfieldview) {
        'use strict';
        var Renderfiledslistview = Backbone.View.extend({
        tagName : 'fieldset',
        id:"fieldset",
        initialize: function () {
            this.collection.on("add",this.renderField, this);

        },
        renderField : function(field){
            var renderfield = new Renderfieldview({model : field, parentView: this});
            $(this.el).append(renderfield.render().el); 
        },
        render: function () {
         // this.collection.each(this.addField, this);
          return this;
        }
    });
    return Renderfiledslistview;
});