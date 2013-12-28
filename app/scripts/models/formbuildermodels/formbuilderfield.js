/*global define*/

define([
    'underscore',
    'backbone',
    'vendor/deepmodel/deep-model.min',

], function (_, Backbone, deepmodel) {
    'use strict';

    var FormbuilderField = Backbone.DeepModel.extend({
        defaults : {
        	field_name : '' ,
            field_label:'',
        	field_data : {
                 type: 'text',
                 name: 'd',
                 id: 'f',
                 placeholder_text:'',
                 min:1,
                 max:30,
                 help_text:'',
                 required:'required'
            },
        	view_template_id:'' ,
        	edit_template_id:''
        }
    });

    return FormbuilderField;
});
