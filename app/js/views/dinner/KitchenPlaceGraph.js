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
	 * Display object available for the kitchen
	 * @type {DisplayObject}
	 */
	_graph: null,
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
		this._graph = new Container();
		//this.addMouseListener();
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
	 * Get litchen graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The litchen graph
	 */
	getGraph: function() {
		return this._graph;
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
		this._graph.addChildAt(kitchen, 2);
	},
	addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function(e) {
				if(!target._graph.clicked) {
                    var destination = new Destination(target.model, function() {
                        DinnerGamePage.getInstance().updateConsoleLog('Arrived to ' + target.model.name);
                    });
					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
				}
			}
			target._graph.onMouseOver = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target._graph.onMouseOut = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this);
	},
	/**
	 * Create instance of luigi class
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createLuigi: function() {
		this.luigi = new LuigiGraph(this, Yadobe.getInstance().canvas.width + 10, DINNERCONST.POSITION.kitchen.y - 70);
		this._graph.addChildAt(this.luigi.getGraph(), 1);
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
		this._graph.addChild(menuGraph._graph);
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
