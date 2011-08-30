/**
 * Yadobe class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var Yadobe = new JS.Class({
	// Attributes
	dinnerGame: null,
	// Constructor
	initialize: function() {
		console.log('init');
		this.dinnerGame = new DinnerGame();
	}
	// methods
});