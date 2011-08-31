/**
 * Yadobe class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var YadobeClass = {
	// Attributes
	dinnerGame: null,
	// Constructor
	initialize: function(canvasId) {
		console.log('Yadobe init');
		// Get canvas
		Yadobe.canvas = document.getElementById(canvasId);
		// Create main stage
		Yadobe.stage = new Stage(Yadobe.canvas);
		// Initialize dinnerGame
		this.dinnerGame = new DinnerGame();
	}
	// methods
};
var Yadobe = new JS.Class(YadobeClass);
// Static attributes
Yadobe.canvas = null;
Yadobe.stage = null;