/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var AdpRouter = Backbone.Router.extend({
         routes : {
            'formbuilder' : 'formbuilder',
            '*other' : 'home'
        },

        home : function() {
         $('#maincontainer').empty();
            require([ 'views/home' ], function(home) {
                $('#maincontainer').html(new home().render().$el);
            });
        },
        formbuilder : function() {
            $('#maincontainer').empty();
            require([ 'views/formbuilder' ], function(formbuilder) {
                $('#maincontainer').html(new formbuilder().render().$el);
            });
        }

    });

    return AdpRouter;
});