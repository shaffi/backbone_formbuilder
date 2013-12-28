/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        jqueryui: {
            exports: "$",
            deps: ['jquery']
        },
        handlebars: {
            exports: 'Handlebars'
        },        
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'bootstrap'
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        bootstrap:   '../bower_components/bootstrap/dist/js/bootstrap.min',
        rivets: '../bower_components/rivets/dist/rivets.min',
        jqueryui:'../bower_components/jquery-ui/ui/jquery-ui'
   
    }
});

require([
    'backbone','bootstrap', 'formbuilderapp',"jquery",
    "jqueryui"
], function (Backbone,bootstrap, formbuilderapp, $) {
    formbuilderapp.initialize();
});
