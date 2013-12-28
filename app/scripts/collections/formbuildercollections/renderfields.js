define([
    'underscore',
    'backbone',
    'models/formbuildermodels/formbuilderfield'
], function (_, Backbone, FormbuilderField) {
    'use strict';
    var Renderfields = Backbone.Collection.extend({
    	model:FormbuilderField,
    	initialize:function(){

    	}
    });
    return Renderfields;
});