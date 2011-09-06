/**
 * KitchenPlace class
 * @since 31/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 **/
var KitchenPlaceGraphClass = {
	// Attributes
	/**
	 * Model of KitchenPlaceGraph
	 * @type KitchenPlace
	 */
	model: null,
	/**
	 * Container for kitchen
	 * @type Container
	 */
	container: null,
	/**
	 * Luigi information
	 * @type LuigiGraph
	 */
	luigi: null,
	/**
	 * Plates ready on kitchen
	 * @type Array of MenuGraph
	 */
	plates: {},
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param model KitchenPlace
	 */
	initialize: function(model) {
		this.model = model;
		this.container = new Container();
		this.createLuigi();
		this.createKitchen();
		this.initPlates();
	},
	// Methods
	/**
	 * Initialize plates object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	initPlates: function() {
		for(var i=0; i<this.model.maxMenuList; i++) {
			this.plates[i] = null;
		}
	},
	/**
	 * Get kitchen container
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 29/08/2011
	 * @return Container The kitchen container
	 */
	getContainer: function() {
		return this.container;
	},
	/**
	 * Create kitchen gaphic with image
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 29/08/2011
	 */
	createKitchen: function() {
		var kitchen = new Bitmap(DINNERCONST.IMAGE.kitchen);
		kitchen.x = DINNERCONST.POSITION.kitchen.x;
		kitchen.y = DINNERCONST.POSITION.kitchen.y;
		this.container.addChildAt(kitchen, 2);
	},
	/**
	 * Create instance of luigi class
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createLuigi: function() {
		this.luigi = new LuigiGraph(this, Yadobe.getInstance().canvas.width + 10, DINNERCONST.POSITION.kitchen.y - 70);
		this.container.addChildAt(this.luigi.bitmapSeq, 1);
	},
	/**
	 * Compute position to put new plate
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @return Index of empty place or false if full
	 */
	addPlate: function(menuGraph) {
		for(var index in this.plates) {
			if(this.plates[index] == null) {
				this.plates[index] = menuGraph;
				return index;
			}
		}
		return false;
	},
	/**
	 * Create menuGraph object and display it
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	displayPlate: function() {
		var menu = this.model.animateMenuList[0];
		var menuGraph = new MenuGraph(menu);
		// Add to menuGraph manager
		DinnerGamePage.getInstance().menuList.push(menuGraph);
		// Compute position
		var platesLength = this.addPlate(menuGraph);
		var x = Yadobe.getInstance().canvas.width - 230 + (platesLength * 30);
		var y = DINNERCONST.POSITION.kitchen.y + 20;
		menuGraph.setPosition(x, y);
		menuGraph.changeState("Ready");
		this.container.addChild(menuGraph.menu);
	},
	/**
	 * Create menuGraph object and display it
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param menuGraph MenuGraph
	 */
	removePlate: function(menuGraph) {
		var list = this.model.maxMenuList;
		for(var i=0; i<list; i++) {
			if(this.plates[i] != null && this.plates[i].toString() == menuGraph.toString()) {
				this.plates[i] = null;
				menuGraph.setState('Nothing');
				menuGraph.update();
				this.model.removeMenu(menuGraph.model);
			}
		}
	},
	/**
	 * Call each refresh canvas
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 05/09/2011
	 */
	update: function() {
		if(this.model.animateMenuList.length > 0 || (this.model.animateMenuList.length == 0 && !this.luigi.inState('Nothing'))) {
			this.luigi.update();
		}
	}
};
var KitchenPlaceGraph = new JS.Class(KitchenPlaceGraphClass);
