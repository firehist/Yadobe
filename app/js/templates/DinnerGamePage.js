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
	 * @type KitchenPlaceGraph
	 */
	kitchen: null,
	/**
	 * @type ReceptionPlaceGraph
	 */
	reception: null,
	/**
	 * The list of TablePlaceGraph
	 * @type Array of TablePlaceGraph
	 */
	tables: new Array(),
	/**
	 * The waiterGraph
	 * @type WaiterGraph
	 */
	waiter: null,
	/**
	 * List of menuGraph
	 * @type MenuGraph
	 */
	menuList: [],
    /**
	 * List of groupGraph
	 * @type GroupGraph
	 */
	groupList: [],
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		DinnerGamePage.instance = this;
		// init Page Container
		this.callSuper();
		// init background
		this.createBackground();
		this.createConsoleLog();
		// Kitchen
		var kitchenModel = new KitchenPlace('Cuisine', DINNERCONST.COOK.maxMenuInKitchen);
		this.kitchen = new KitchenPlaceGraph(kitchenModel);
		this.pageContainer.addChildAt(this.kitchen.getContainer(), DINNERCONST.SCENES.kitchen);
		// Reception
		var receptionModel = new ReceptionPlace('Reception', 6);
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
		this.reception.model.launch();
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
	},
    /**
     * @author DJE
     * @since
     */
    addGroup: function(groupModel) {
        console.debug("[addGroup] Start");
        var groupGraph = new GroupGraph(groupModel);
        this.groupList.push(groupGraph);
        this.pageContainer.addChild(groupGraph.getContainer());
        console.debug("[addGroup] Stop");
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