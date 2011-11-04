/**
 * Luigi class
 * @since 05/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 **/
var LuigiGraphClass = {
	// Debug information
	debug: true,
	debugClassName: 'LuigiGraph',
	// Includes
	include: JS.State,
	
	// Attributes
	/**
	 * The base y coord of Luigi
	 * @type Integer
	 */
	x: 0,
	/**
	 * The base x coord of Luigi
	 * @type Integer
	 */
	y: 0,
	/**
	 * The kitchen graph
	 * @type KitchenPlaceGraph
	 */
	kitchen: null,
	/**
	 * Counter use to fix speed of _graph
	 * @type Integer
	 */
	count: 0,
	/**
	 * Display object available for Luigi
	 * @type DisplayObject
	 */
	_graph: null,
	
	// Constructor
	/**
	 * @constructor
	 * @param kitchen KitchenGraph
	 * @param x Integer
	 * @param y Integer
	 */
	initialize: function(kitchen, x, y) {
		LuigiGraph.instance = this;
		this.kitchen = kitchen;
		this.x = x;
		this.y = y;
		this.setState('Nothing');
		this.createLuigi();
	},
	
	// Methods
	/**
	 * Create the bitmatSequence for luigi
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createLuigi: function() {
		var frameData = {
			walking_right_empty: [0, 7],
			walking_left_full: [8, 15],
			walking_left_empty: [16, 23],
			stop_front_full2empty: [24, 31]
		};
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigi_walking, 128, 128, frameData);
		this._graph = new BitmapSequence(sprite);
		this._graph.x = this.x;
		this._graph.y = this.y;
		this._graph.scaleX = this._graph.scaleY = 1.2;
		this._graph.shadow = new Shadow("#454", 0, 5, 4);
	},
	/**
	 * Get Luigi graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The Luigi graph
	 */
	getGraph: function() {
		return this._graph;
	}
};
var LuigiGraph = new JS.Class(LuigiGraphClass);

/**
 * LuigiGraph singleton implement
 * @type LuigiGraph
 * @static
 */
LuigiGraph.instance = null;

/**
 * @returns LuigiGraph
 * @static
 */
LuigiGraph.getInstance = function() {
	if (LuigiGraph.instance != null) {
		return LuigiGraph.instance;
	}
	else {
		return null;
	}
};

/**
 * LuigiGraph states declaration
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/01/2011
 */
LuigiGraph.states({
	/**
	 * Nothing state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	Nothing: {
		update: function() {
			this._graph.gotoAndPlay('walking_left_full');
			Debug.log(this, 'State[Nothing].update', 'Luigi : Chaud devant, chaud !');
			this.setState('WalkingLeftFull');
		}
	},
	/**
	 * WalkingLeftFull state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	WalkingLeftFull: {
		update: function() {
			// @TODO not test with length but with position empty
			var xMin = Yadobe.getInstance().canvas.width - 290 + (Tools.ObjSize(this.kitchen.model.readyMenuList) * 30);
			if(this._graph.x <= xMin) {
				Debug.log(this, 'State[WalkingLeftFull].update', 'Luigi : Une assiette de prête !');
				this._graph.gotoAndPlay('stop_front_full2empty');
				this.setState('StopFrontEmpty2Full');
			} else {
				this._graph.x -= 5;
			}
		}
	},
	/**
	 * StopFrontEmpty2Full state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	StopFrontEmpty2Full: {
		update: function() {
			if(this.count == 0) {
				this._graph.gotoAndStop('stop_front_full2empty');
				this._graph.loop = false;
				this.count++;
			} else if(this.count < 5) {
				this.count++;
			} else if(this.count == 5) {
				this._graph.gotoAndPlay('stop_front_full2empty');
				this.count++;
			} else if(this.count == 6) {
				if(this._graph.currentFrame == this._graph.currentEndFrame) {
					this._graph.gotoAndStop(this._graph.currentEndFrame);
					this.count++;
				} else if(this._graph.currentFrame == (this._graph.currentStartFrame + 4) ) {
					this.kitchen.displayPlate();
				}
			} else if(this.count == 7) {
				this.kitchen.model.setReadyDone();
				this.count++;
			} else if(this.count > 7) {
				this.count++;
				if(this.count == 10) {
					this.count = 0;
					this._graph.gotoAndPlay('walking_right_empty');
					this.setState('WalkingRightEmpty');
				}
			}
		}
	},
	/**
	 * WalkingRightEmpty state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	WalkingRightEmpty: {
		update: function() {
			if (this._graph.x >= this.x) {
				this.setState('Nothing');
			}
			else {
				this._graph.x += 5;
			}
		}
	}
});
