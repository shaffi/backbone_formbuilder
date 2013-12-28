/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, Templates) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: Templates["home"],
        render: function() {				
			$(this.el).html(this.template());
			return this;
		}
    });

    return HomeView;
});