/*global define*/
define([
    'underscore',
    'backbone',
    'models/formbuildermodels/formbuilderfield'
], function (_, Backbone, FormbuilderField) {
    'use strict';

    var FormbuilderFields = Backbone.Collection.extend({
    	model:FormbuilderField,
        initialize:function(){

        }
       // url: 'data/data.json'
    });
    return FormbuilderFields;
});