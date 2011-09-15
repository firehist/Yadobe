/**
 * Menu Graph class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/09/2011
 **/
var MenuGraphClass = {
	// Includes
	include: JS.State,
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
		this.setState('Nothing');
	},
	/**
	 * Create the bitmapSequence for this menuGraph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createMenuPlace: function() {
		var frameData = {empty: 0, fish: 1, meat:2, ready: [3, 6], ready_hover: [7, 10] };
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.menus, 30, 30, frameData);
		this._graph = new BitmapSequence(sprite);
		this._graph.scaleX = this._graph.scaleY = 1.3;
	},
	/**
	 * Combinate update function with a setState
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @para state State string
	 */
	changeState: function(state) {
		this.setState(state);
		this.update();
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
					DinnerGamePage.getInstance().kitchen.model.runAction(menuGraph);
				}
			}
			menuGraph._graph.onMouseOver = function() {
				if(!menuGraph._graph.clicked) {
					menuGraph._graph.gotoAndStop(menuGraph._graph.currentFrame + 4);
					$('body').css('cursor', 'pointer');
				}
			}
			menuGraph._graph.onMouseOut = function() {
				if(!menuGraph._graph.clicked) {
					menuGraph._graph.gotoAndStop(menuGraph._graph.currentFrame - 4);
					$('body').css('cursor', 'default');
				}
			}
		})(this);
	}
};
var MenuGraph = new JS.Class(MenuGraphClass);

/**
 * MenuGraph states declaration
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/01/2011
 */
MenuGraph.states({
	/**
	 * Not visible
	 */
	Nothing: {
		update: function() {
			this._graph.visible = false;
		}
	},
	/**
	 * Fish plate
	 */
	FullFish: {
		update: function() {
			this._graph.gotoAndStop("meat");
			this._graph.visible = true;
		}
	},
	/**
	 * Meat plate
	 */
	FullMeat: {
		update: function() {
			this._graph.gotoAndStop("fish");
			this._graph.visible = true;
		}
	},
	/**
	 * Empty plate
	 */
	Empty: {
        update: function() {
			this._graph.gotoAndStop("empty");
			this._graph.visible = true;
        }
    },
	/**
	 * Plate with number of table for kitchen
	 */
	Ready: {
		update: function() {
			this._graph.gotoAndStop("ready");
			this._graph.gotoAndStop( this._graph.currentFrame + (this.model.table - 1) );
			this._graph.visible = true;
		}
	}
});