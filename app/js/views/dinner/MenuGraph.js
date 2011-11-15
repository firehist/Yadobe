/**
 * Menu Graph class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/09/2011
 **/
var MenuGraphClass = {

    // Debug information
	debug: true,
	debugClassName: 'MenuGraph',
	// Attributes
    /**
	 * Menu model related to this Graph
	 * @type Menu
	 */
	model: null,
	/**
	 * Display object available for the menu
	 * @type {DisplayObject}
	 */
	_graph: null,
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param model Menu
	 */
	initialize: function(model) {
		this.model = model;
		this.createMenuPlace();
		this.addMouseListener();
	},
	/**
	 * Create the bitmapSequence for this menuGraph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createMenuPlace: function() {
		var frameData = {empty: 0, full:2, fullTable: [3, 6], fullTableHover: [7, 10] };
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.menus, 30, 30, frameData);
		this._graph = new BitmapSequence(sprite);
		this._graph.scaleX = this._graph.scaleY = 1.3;
	},
	/**
	 * Get menu graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The menu graph
	 */
	getGraph: function() {
		return this._graph;
	},
	/**
	 * Set new position for menuGraph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param x The x coordinate
	 * @param y The y coordinate
	 */
	setPosition: function(x, y) {
		this._graph.x = x;
		this._graph.y = y;
	},
	/**
	 * Mouse event listener
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	addMouseListener: function() {
		(function(menuGraph) {
			menuGraph._graph.onPress = function(e) {
				if(!menuGraph._graph.clicked) {
					// Remove the plate from the kitchen and add it to the waiter
					var kitchen = DinnerGamePage.getInstance().kitchen;
                    var destination = new Destination(kitchen.model, function() {
                    	kitchen.removePlate(menuGraph);
                    	DinnerGamePage.getInstance().waiter.model.addToInventory(menuGraph.model);
                    });
					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
				}
			};
			menuGraph._graph.onMouseOver = function() {
				if(!menuGraph._graph.clicked) {
                    Debug.log(target, 'addMouseListener[onMouseOver]', "State: " + this.model.getState());
					menuGraph._graph.gotoAndStop(menuGraph._graph.currentFrame + 4);
					$('body').css('cursor', 'pointer');
				}
			};
			menuGraph._graph.onMouseOut = function() {
				if(!menuGraph._graph.clicked) {
					menuGraph._graph.gotoAndStop(menuGraph._graph.currentFrame - 4);
					$('body').css('cursor', 'default');
				}
			};
		})(this);
	},
	/**
	 * Update graph view
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 03/11/2011
	 */
	update: function() {
		if(this.model.inState("Ordered") || this.model.inState("Preparing") || this.model.inState("")) {
			// Not visible
			this._graph.visible = false;
		} else if(this.model.inState("WaitingToBeServed")) {
			// Menu is displayed with related table number
			this._graph.gotoAndStop("fullTable");
			this._graph.gotoAndStop( (this._graph.currentStartFrame-1)  + (this.model.table - 1) );
			this._graph.visible = true;
		} else if(this.model.inState("BeingEating")) {
			this._graph.gotoAndStop("full");
			this._graph.visible = true;
		} else if(this.model.inState("Terminated")) {
			this._graph.gotoAndStop("empty");
			this._graph.visible = true;
		}
	}
};
var MenuGraph = new JS.Class(MenuGraphClass);