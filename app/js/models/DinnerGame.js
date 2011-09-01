/**
 * Dinner Game class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGame
 */
var DinnerGameClass = {
	// Attributes
	INDEX_BACKGROUND: 1,
	INDEX_KITCHEN: 2,
	INDEX_RECEPTION: 3,
	INDEX_TABLES: [4,5,6,7],
	/**
	 * @type Easel.Container
	 */
	pageContainer: null,
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
	 * @type Array
	 */
	tables: new Array(),
	/**
	 * @type Waiter
	 */
	waiter: null,
	// Constructor
	/**
	 * @constructor
	 * @class DinnerGame
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		console.log('Dinner Game init');
		// init Page Container
		this.pageContainer = new Container();
		Yadobe.stage.addChild(this.pageContainer);
		// init background
		this.createBackground();
		// init singleton
		this.recipes = RecipeManager.Factory.newInstance();
		// Kitchen
		var kitchenModel = new KitchenPlace('Cuisine', 10);
		this.kitchen = new KitchenPlaceGraph(kitchenModel);
		this.pageContainer.addChildAt(this.kitchen.getContainer(), this.INDEX_KITCHEN);
		// Reception
		var receptionModel = new ReceptionPlace('Réception', 3);
		this.reception = new ReceptionPlaceGraph(receptionModel);
		this.pageContainer.addChildAt(this.reception.getContainer(), this.INDEX_RECEPTION);
		// Tables
		this.tables = new Array();
		var colors = ['red','blue','green','yellow'];
		for(var i=0; i<4; i++) {
			var tableModel = new TablePlace(i, colors[i]);
			var tableGraph = new TablePlaceGraph(tableModel);
			this.tables.push(tableGraph);
			this.pageContainer.addChildAt(tableGraph.getContainer(), this.INDEX_TABLES[i]);
		}
	   Yadobe.update = true;
		
	},
	createBackground: function() {
		var background = new Bitmap(DINNERCONST.IMAGE.background);
		background.x = 0;
		background.y = 0;
		this.pageContainer.addChildAt(background, this.INDEX_BACKGROUND);
	},
	/**
	 * Launch the game
	 * @clas DinnerGame
	 * @method launch
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	launch: function() {
		this.reception.launch();
	},
	/**
	 * Pause the game
	 * @class DinnerGame
	 * @method pause
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	pause: function() {
		this.reception.pause();
	}
};
var DinnerGame = new JS.Class(Page, DinnerGameClass);
