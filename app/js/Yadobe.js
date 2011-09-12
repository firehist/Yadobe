/**
 * Yadobe class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var YadobeClass = {
	// Attributes
	totalRessource: {
		dinner: 0
	},
	totalRessourceLoaded: {
		dinner: 0
	},
	/**
	 * Use to refresh canvas draw. True = yes, false = no
	 * Its necessary for decrease latency drawing on the canvas
	 * @type boolean
	 */
	update: false,
	/**
	 * Canvas used by the application
	 * @type object
	 */
	canvas: null,
	/**
	 * Main stage of the application
	 * @type Easel.Stage
	 */
	stage: null,
	/**
	 * CurrentPage instance
	 */
	currentPage: null,
	// Constructor
	/**
	 * @constructor
	 * @authod Benjamin Longearet <firehist@gmail.com>
	 * @since 29/08/2011
	 * @param canvasId String ID of the canvas HTML Object
	 */
	initialize: function(canvasId) {
		console.log('Yadobe init');
		Yadobe.instance = this;
		// Get canvas
		this.canvas = window.document.getElementById(canvasId);
		// Create main stage
		this.stage = new Stage(this.canvas);
		// Initialize Yadobe
		this.initYadobe();
	},
	// methods
	/**
	 * Initialize event and tick function for draw on canvas
	 * @class Yadobe
	 * @method initDinnerGameImage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 * @private
	 */
	initYadobe: function() {
		this.update = false;
		this.stage.enableMouseOver(25);
		Ticker.addListener(Yadobe.getInstance());
		// Load yadobe splashScreen
		this.initWaitingPage();
	},
	/**
	 * Initialise waiting page
	 * @class Yadobe
	 * @method initWaitingPage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @private
	 */
	initWaitingPage: function() {
		JS.require('WaitingPage', function() {
			var wp = WaitingPage.getInstance();
			Yadobe.getInstance().setCurrentPage(wp);
			wp.launchLoading();
		});
	},
	/**
	 * Load the game when ressources are loaded
	 * @class Yadobe
	 * @method loadGame
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 * @public
	 */
	loadGame: function() {
//		this.setCurrentPage(IndexPage.getInstance());
		this.setCurrentPage(DinnerGamePage.getInstance());
		this.setUpdate();
	},
	/**
	 * Set update to true (for refresh canvas)
	 * @class Yadobe
	 * @method setUpdate
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @public
	 */
	setUpdate: function() {
		this.update = true;
	},
	/**
	 * Method use to refresh canvas drawing
	 * @class Yadobe
	 * @method tick
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @public
	 */
	tick: function() {
		//if(this.update) {
			//this.update = false; // only update once
			if (typeof DinnerGamePage != "undefined" && this.currentPage instanceof DinnerGamePage) {
				DinnerGamePage.getInstance().kitchen.update();
				DinnerGamePage.getInstance().waiter.update();
			}
			this.stage.update();
		//}
	},
	/**
	 * Set the current display page and hide the old one
	 * @class Yadobe
	 * @method setCurrentPage
	 * @author BenjaminLongearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @param refPage Page New current page
	 * @public
	 */
	setCurrentPage: function(refPage) {
		if(this.currentPage instanceof Page) {
			this.currentPage.hide();
		}
		refPage.show();
		this.currentPage = refPage;
		this.setUpdate();
	}	
};
var Yadobe = new JS.Class(YadobeClass);

// Static attribute
Yadobe.instance = null;
// Static method singleton
Yadobe.getInstance = function() {
	if(Yadobe.instance != null) {
		return Yadobe.instance;
	}
	return false;
};