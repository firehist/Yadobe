/**
 * Yadobe class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var YadobeClass = {
	// Attributes
	dinnerGame: null,
	imgLoaded: 0,
	// Constructor
	initialize: function(canvasId) {
		console.log('Yadobe init');
		// Get canvas
		Yadobe.canvas = window.document.getElementById(canvasId);
		// Create main stage
		Yadobe.stage = new Stage(Yadobe.canvas);
		Yadobe.stage.enableMouseOver(25);
		// Initialize dinnerGame
		this.initGame();
	},
	// methods
	/**
	 * Initialize event and tick function for draw on canvas
	 * Draw a waiting screen
	 * Load all ressources for the game
	 * @class Yadobe
	 * @method initDinnerGameImage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initGame: function() {
		console.log('Yadobe.initGame()');	
		Yadobe.update = false;
		Yadobe.stage.enableMouseOver(25);
		Ticker.addListener(Yadobe);
		// @TODO draw waiting screen		
		this.initDinnerGameImage();
	},
	/**
	 * Load all image in DINNERCONST.IMAGE object
	 * @class Yadobe
	 * @method initDinnerGameImage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initDinnerGameImage: function() {
		console.log('initDinnerGameImage');
		for(var x in DINNERCONST.IMAGE) {
			var src = DINNERCONST.IMAGE[x].toString();
			DINNERCONST.IMAGE[x] = new Image();
			DINNERCONST.IMAGE[x].onload = (function(l) {l.initDinnerGameImageDone()})(this);
			DINNERCONST.IMAGE[x].src = src;
		}
	},
	/**
	 * Function call when a picture was finished to be loaded
	 * @class Yadobe
	 * @method initDinnerGameImageDone
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initDinnerGameImageDone: function() {
		this.imgLoaded++;
		if(this.imgLoaded == DINNERCONST.IMAGESIZE) {
			this.loadGame();
		}
	},
	/**
	 * Load the game when ressources are loaded
	 * @class Yadobe
	 * @method loadGame
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	loadGame: function() {
		this.dinnerGame = new DinnerGame();
		window.setTimeout("Yadobe.setUpdate()", 1000);
	}
	
};
var Yadobe = new JS.Class(YadobeClass);
// Static attributes
Yadobe.update = false;
Yadobe.canvas = null;
Yadobe.stage = null;
Yadobe.setUpdate = function() {
	Yadobe.update = true;
};
Yadobe.tick = function() {
	if(Yadobe.update) {
		console.log('Yadobe.tick()');	
		Yadobe.update = false; // only update once
		Yadobe.stage.update();
	}
};