define(['backbone','routes/adproutes','rivets'], function(Backbone,Adprouter) {
	var initialize = function() {
		new Adprouter();
		Backbone.history.start();
		window.vent = _.extend({}, Backbone.Events);
		
	}
	return {
		initialize: initialize
	};
});