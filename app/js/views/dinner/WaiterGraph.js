/**
 * Waiter class
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 **/
var WaiterGraphClass = {
	// Includes
	include: JS.State,
	// Attributes
	/**
	 * Model of WaiterGraph
	 * @type {Waiter}
	 */
	model: null,
	/**
	 * Diaplay object available for the waiter
	 * @type {DisplayObject} _graph
	 */
	_graph: null,
	// Constructor
	/**
	 * @constructor
	 * @param {Waiter} model
	 */
	initialize: function(model) {
        this.model = model;
		this.setState('Nothing');
		this.createWaiter();
	},
	/**
	 * Get waiter graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The waiter graph
	 */
	getGraph: function() {
		return this._graph;
	},
	/**
	 * Create the bitmatSequence for the waiter
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	createWaiter: function() {
		var frameData = {
            walking_top: [0, 7],
            walking_right: [8, 15],
            walking_left: [16, 23],
            walking_bottom: [24, 31],
            stopped_top: [32, 32],
            stopped_right: [33, 33],
            stopped_left: [34, 34],
            stopped_bottom: [35, 35]
        };
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.carrier, 96, 96, frameData);
		this._graph = new BitmapSequence(sprite);
		this._graph.x = this.model.position.accessCoordinates.x;
		this._graph.y = this.model.position.accessCoordinates.y;
		this._graph.scaleX = 1.2;
        this._graph.scaleY = 1.2;
		this._graph.shadow = new Shadow("#454", 0, 5, 4);
        
	}
};
var WaiterGraph = new JS.Class(WaiterGraphClass);

/**
 * WaiterGraph states declaration
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 */
WaiterGraph.states({
	/**
	 * Nothing state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	Nothing: {
		update: function() {
			//this._graph.gotoAndPlay('walking_left');
			this.setState('WalkingLeftEmpty');
		}
	},
	/**
	 * WalkingTopEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	WalkingTopEmpty: {
        update: function() {
			var yMin = 10;
            if (this._graph.y <= yMin) {
				this._graph.gotoAndStop('stopped_top');
				this.setState('StopTopEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_top') {
                    this._graph.gotoAndPlay('walking_top');
                }
				this._graph.y -= 5;
			}
        }
    },
	/**
	 * WalkingRightEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	WalkingRightEmpty: {
        update: function() {
			var xMax = 650;
            if (this._graph.x >= xMax) {
				this._graph.gotoAndStop('stopped_right');
				this.setState('StopRightEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_right') {
                    this._graph.gotoAndPlay('walking_right');
                }
				this._graph.x += 5;
			}
        }
    },
	/**
	 * WalkingLeftEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	WalkingLeftEmpty: {
        update: function() {
			var xMin = 10;
            if (this._graph.x <= xMin) {
				this._graph.gotoAndStop('stopped_left');
				this.setState('StopLeftEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_left') {
                    this._graph.gotoAndPlay('walking_left');
                }
				this._graph.x -= 5;
			}
        }
    },
	/**
	 * WalkingBottomEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	WalkingBottomEmpty: {
        update: function() {
			var yMax = 460;
            if (this._graph.y >= yMax) {
				this._graph.gotoAndStop('stopped_bottom');
				this.setState('StopBottomEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_bottom') {
                    this._graph.gotoAndPlay('walking_bottom');
                }
				this._graph.y += 5;
			}
        }
    },
	/**
	 * StopTopEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	StopTopEmpty: {
        update: function() {
            this._graph.gotoAndPlay('stopped_top');
        }
    },
	/**
	 * StopRightEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	StopRightEmpty: {
        update: function() {
            this._graph.gotoAndPlay('stopped_right');
            this.setState('WalkingTopEmpty');
        }
    },
	/**
	 * StopLeftEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	StopLeftEmpty: {
        update: function() {
            this._graph.gotoAndPlay('stopped_left');
            this.setState('WalkingBottomEmpty');
        }
    },
	/**
	 * StopBottomEmpty state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
	StopBottomEmpty: {
        update: function() {
            this._graph.gotoAndPlay('stopped_bottom');
            this.setState('WalkingRightEmpty');
        }
    },
	/**
	 * StopFrontEmpty2Full state
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 */
    StopFrontEmpty2Full: {
        update: function() {
			if (this.count == 0) {
				this._graph.gotoAndStop('walking_left');
				this._graph.loop = true;
				this.count++;
			}
            else if (this.count < 5) {
				this.count++;
			}
            else if (this.count == 5) {
				this._graph.gotoAndPlay('stop_front_full2empty');
				this.count++;
			}
            else if (this.count == 6) {
				if (this._graph.currentFrame == this._graph.currentEndFrame) {
					this._graph.gotoAndStop(this._graph.currentEndFrame);
					this.count++;
				}
                else if (this._graph.currentFrame == (this._graph.currentStartFrame + 4) ) {
					//this.kitchen.displayPlate();
				}
			}
            else if (this.count == 7) {
				//this.kitchen.model.setReadyDone();
				this.count++;
			}
            else if (this.count > 7) {
                this.count++;
				if (this.count == 10) {
					this.count = 0;
					this._graph.gotoAndPlay('walking_right_empty');
					this.setState('WalkingRightEmpty');
				}
			}
        }
    }
});
