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
	 * Reference of the waitingPage
	 * @type waitingPage
	 */
	waitingPage: null,
	/**
	 * Reference of the dinnerGame
	 * @type DinnerGame
	 */
	dinnerGame: null,
	// Constructor
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
	 * Draw a waiting screen
	 * Load all ressources for the game
	 * @class Yadobe
	 * @method initDinnerGameImage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initYadobe: function() {
		this.update = false;
		this.stage.enableMouseOver(25);
		Ticker.addListener(Yadobe.getInstance());
		// Load yadobe splashScreen
		this.initWaitingPage();
	},
	/**
	 * 
	 */
	initWaitingPage: function() {
		JS.require('WaitingPage', function() {
			var y = Yadobe.getInstance();
			y.waitingPage = new WaitingPage();
			y.initDinnerGame();
		});
	},
	/**
	 * Load ressources and images for DinnerGame
	 * @class Yadobe
	 * @method initDinnerGame
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initDinnerGame: function() {
		this.totalRessource.dinner = DINNERCONST.LOADING.length + Tools.ObjSize(DINNERCONST.IMAGE);
		this.totalRessourceLoaded.dinner = 0;
		// load image for DinnerGame package
		this.initDinnerGameRessource();
		// load image for DinnerGame package
		this.initDinnerGameImage();
	},
	/**
	 * 
	 */
	initDinnerGameRessource: function() {
		for(var i in DINNERCONST.LOADING) {
			var callback = function(){
				var y = Yadobe.getInstance();
				y.initDinnerGameLoadDone.call(y)
			};
			JS.require(DINNERCONST.LOADING[i], callback);
		}
	},
	/**
	 * Load all image in DINNERCONST.IMAGE object
	 * @class Yadobe
	 * @method initDinnerGameImage
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initDinnerGameImage: function() {
		for(var x in DINNERCONST.IMAGE) {
			var src = DINNERCONST.IMAGE[x].toString();
			DINNERCONST.IMAGE[x] = new Image();
			DINNERCONST.IMAGE[x].onload = (function(l) {l.initDinnerGameLoadDone()})(this);
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
	initDinnerGameLoadDone: function() {
		this.totalRessourceLoaded.dinner++;
		this.waitingPage.setProgressBarValue(parseInt(this.totalRessourceLoaded.dinner*100/this.totalRessource.dinner, 10));
		if(this.totalRessourceLoaded.dinner == this.totalRessource.dinner) {
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
		// Test if all image and package are loaded before init DinnerGame
		if(this.totalRessourceLoaded.dinner == this.totalRessource.dinner) {
			console.log("loadGame()");
			this.dinnerGame = new DinnerGame();
			window.setTimeout("Yadobe.getInstance().setUpdate()", 1000);
		}
	},
	/**
	 * Set update to true (for refresh canvas)
	 * @class Yadobe
	 * @method setUpdate
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
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
	 */
	tick: function() {
		if(this.update) {
			console.log('Yadobe tick()');	
			this.update = false; // only update once
			this.stage.update();
		}
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