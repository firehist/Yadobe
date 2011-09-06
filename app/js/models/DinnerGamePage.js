/**
 * DinnerGamePage class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGamePage
 */
var DinnerGamePageClass = {
	// Attributes
	/**
	 * @type RecipeManager
	 */
	recipes: null,
	/**
	 * @type KitchenPlaceGraph
	 */
	kitchen: null,
	/**
	 * @type ReceptionPlaceGraph
	 */
	reception: null,
	/**
	 * @type Array of TablePlaceGraph
	 */
	tables: new Array(),
	/**
	 * @type Waiter
	 */
	waiter: null,
	// Constructor
	/**
	 * @constructor
	 * @class DinnerGamePage
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		console.log('Dinner Game init');
		DinnerGamePage.instance = this;
		// init Page Container
		this.callSuper();
		// init background
		this.createBackground();
		// init singleton
		this.recipes = RecipeManager.Factory.newInstance();
		// Kitchen
		var kitchenModel = new KitchenPlace('Cuisine', 10);
		this.kitchen = new KitchenPlaceGraph(kitchenModel);
		this.pageContainer.addChildAt(this.kitchen.getContainer(), DINNERCONST.SCENES.kitchen);
		// Reception
		var receptionModel = new ReceptionPlace('Reception', 4);
		this.reception = new ReceptionPlaceGraph(receptionModel);
		this.pageContainer.addChildAt(this.reception.getContainer(), DINNERCONST.SCENES.reception);
		// Tables
		this.tables = new Array();
		var colors = ['red','blue','green','yellow'];
		for(var i=0; i<4; i++) {
			var tableModel = new TablePlace(i, colors[i]);
			var tableGraph = new TablePlaceGraph(tableModel);
			this.tables.push(tableGraph);
			this.pageContainer.addChildAt(tableGraph.getContainer(), DINNERCONST.SCENES.tables[i]);
		}
				
		Yadobe.update = true;
	},
	createBackground: function() {
		var background = new Bitmap(DINNERCONST.IMAGE.background);
		background.x = 0;
		background.y = 0;
		this.pageContainer.addChildAt(background, DINNERCONST.SCENES.background);
	},
	/**
	 * Launch the game
	 * @clas DinnerGamePage
	 * @method launch
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	launch: function() {
		this.reception.launch();
	},
	/**
	 * Pause the game
	 * @class DinnerGamePage
	 * @method pause
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	pause: function() {
		this.reception.pause();
	}
};
var DinnerGamePage = new JS.Class(Page, DinnerGamePageClass);

// Static attribute
DinnerGamePage.instance = null;
// Static method singleton
DinnerGamePage.getInstance = function() {
	if(DinnerGamePage.instance != null) {
		return DinnerGamePage.instance;
	} else {
		return new DinnerGamePage();
	}
};