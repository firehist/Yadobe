/**
 * DinnerGamePage class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGamePage
 */
var DinnerGamePageClass = {
	// Attributes
	text: null,
	/**
	 * @type {KitchenPlaceGraph}
	 */
	kitchen: null,
	/**
	 * @type ReceptionPlaceGraph
	 */
	reception: null,
	/**
	 * The list of TableGraph
	 * @type Array
	 */
	tables: new Array(),
	/**
	 * The waiterGraph
	 * @type {WaiterGraph}
	 */
	waiter: null,
	/**
	 * List of menuGraph
	 * @type {MenuGraph}
	 */
	menuList: [],
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		
		// Init Page Container
		this.callSuper();
		
		// Init background
		this.createBackground();
		this.createConsoleLog();
		
		// Kitchen
		var kitchenModel = new KitchenPlace('Cuisine', DINNERCONST.COOK.maxMenuInKitchen, DINNERCONST.ACCESS.kitchen);
		this.kitchen = new KitchenPlaceGraph(kitchenModel);
		this.pageContainer.addChildAt(this.kitchen.getGraph(), DINNERCONST.SCENES.kitchen);
		
		// Reception
		var receptionModel = new ReceptionPlace('Réception', 3, DINNERCONST.ACCESS.reception);
		this.reception = new ReceptionPlaceGraph(receptionModel);
		this.pageContainer.addChildAt(this.reception.getGraph(), DINNERCONST.SCENES.reception);
		
		// Tables
		this.tables = new Array();
		var colors = ['red','blue','green','yellow'];
		for (var i=0; i < 4; i++) {
			var tableModel = new TablePlace(i + 1, colors[i], DINNERCONST.ACCESS.tables[i]);
			var tableGraph = new TablePlaceGraph(tableModel);
			this.tables.push(tableGraph);
			this.pageContainer.addChildAt(tableGraph.getGraph(), DINNERCONST.SCENES.tables[i]);
		}
        
		// Waiter
		// Display the waiter on the kitchen at the beginning
		var waiterModel = new Waiter('Serveur', kitchenModel, 1);
		this.waiter = new WaiterGraph(waiterModel);
		this.pageContainer.addChild(this.waiter.getGraph());
        
	},
	/**
	 * Refresh the elements of the game
	 */
	tick: function() {
		
		// Refresh the kitchen
		if ((this.kitchen) && (this.kitchen instanceof KitchenPlaceGraph)) {
			this.kitchen.update();
		}
		
		// Refresh the waiter
		if ((this.waiter) && (this.waiter instanceof WaiterGraph)) {
			this.waiter.update();
		}
	},
	createConsoleLog: function() {
		var log = new Shape();
		log.graphics.beginStroke("#000000").beginFill("#CCCCCC").drawRoundRect(10, 10, 250, 50, 5);
		this.pageContainer.addChild(log);
		this.text = new Text('', '12px normal Verdana', '#000000');
		this.text.x = 30;
		this.text.y = 30;
		this.text.maxWidth = 220;
		this.text.maxHeight = 20;
		this.pageContainer.addChild(this.text);
	},
	updateConsoleLog: function(newText) {
		this.text.text = newText;
		Yadobe.getInstance().setUpdate();
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
	if ((DinnerGamePage.instance == null) || (!DinnerGamePage.instance instanceof DinnerGamePage)) {
		DinnerGamePage.instance = new DinnerGamePage();
	}
	return DinnerGamePage.instance;
};