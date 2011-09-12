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
	 * Display object available for the waiter
	 * @type {DisplayObject}
	 */
	_graph: null,
	/**
	 * Current index of point for the waiter path
	 * @type {Integer}
	 */
    crossingPoint : 0,
    
	// Constructor
	/**
	 * @constructor
	 * @param {Waiter} model
	 */
	initialize: function(model) {
        this.model = model;
        this.crossingPoint = 0;
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
        
	},
    selectDirection : function() {
        if ((this.model.inState('Moving')) && (this.model.destination)) {
            
            var newState = 'Nothing';
            
            var point = WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name][this.crossingPoint];
            
            var movementX = this._graph.x - point.x;
            var movementY = this._graph.y - point.y;
            
            // Need to move to the left
            if (movementX > WaiterGraph.stepInPixels) {
                newState = 'WalkingLeftEmpty';
                
                // Randomly, move horizontally (so break) rather than vertically (continue)
                if (Tools.randomXToY(0,1) == 0) {
                    this.setState(newState);
                    return;
                }
            }
            // Need to move to the right
            else if (movementX + WaiterGraph.stepInPixels < 0) {
                newState = 'WalkingRightEmpty';

                // Randomly, move horizontally (so break) rather than vertically (continue)
                if (Tools.randomXToY(0,1) == 0) {
                    this.setState(newState);
                    return;
                }
            }

            if (movementY > WaiterGraph.stepInPixels) {
                newState = 'WalkingTopEmpty';
            }
            else if (movementY + WaiterGraph.stepInPixels < 0) {
                newState = 'WalkingBottomEmpty';
            }
            
            if (newState == 'Nothing') {
                if (this.crossingPoint == WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name].length - 1) {
                    this.crossingPoint = 0;
                    this.model.setState('Waiting');
                    this.model.arrivedToDestination();
                }
                else {
                    this.crossingPoint++;
                }
            }
            this.setState(newState);
        }
    }
};
var WaiterGraph = new JS.Class(WaiterGraphClass);

/**
 * Number of pixels for a step of the waiter
 * @static
 * @type {Integer}
 */
WaiterGraph.stepInPixels = 5;

WaiterGraph.POINTS = [];
WaiterGraph.POINTS['Cuisine-Réception'] = [new Point(100,100), new Point(300,100), new Point(300, 300)];
    
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
			this.selectDirection();
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
            
            var point;
            try {
                point = WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name][this.crossingPoint];
            }
            catch(e) {
                point = new Point(this._graph.x, this._graph.y);
            }
            
            if ((this._graph.y <= yMin) || (this._graph.y <= point.y)) {
				this._graph.gotoAndStop('stopped_top');
				this.setState('StopTopEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_top') {
                    this._graph.gotoAndPlay('walking_top');
                }
				this._graph.y -= WaiterGraph.stepInPixels;
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
            
            var point;
            try {
                point = WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name][this.crossingPoint];
            }
            catch(e) {
                point = new Point(this._graph.x, this._graph.y);
            }
            
            if ((this._graph.x >= xMax) || (this._graph.x >= point.x)) {
				this._graph.gotoAndStop('stopped_right');
				this.setState('StopRightEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_right') {
                    this._graph.gotoAndPlay('walking_right');
                }
				this._graph.x += WaiterGraph.stepInPixels;
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
            
            var point;
            try {
                point = WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name][this.crossingPoint];
            }
            catch(e) {
                point = new Point(this._graph.x, this._graph.y);
            }
            
            if ((this._graph.x <= xMin) || (this._graph.x <= point.x)) {
				this._graph.gotoAndStop('stopped_left');
				this.setState('StopLeftEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_left') {
                    this._graph.gotoAndPlay('walking_left');
                }
				this._graph.x -= WaiterGraph.stepInPixels;
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
            
            var point;
            try {
                point = WaiterGraph.POINTS[this.model.position.name + '-' + this.model.destination.position.name][this.crossingPoint];
            }
            catch(e) {
                point = new Point(this._graph.x, this._graph.y);
            }
            
            if ((this._graph.y >= yMax) || (this._graph.y >= point.y)) {
				this._graph.gotoAndStop('stopped_bottom');
				this.setState('StopBottomEmpty');
			}
            else {
                if (this._graph.currentSequence != 'walking_bottom') {
                    this._graph.gotoAndPlay('walking_bottom');
                }
				this._graph.y += WaiterGraph.stepInPixels;
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
            this.setState('Nothing');
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
            this.setState('Nothing');
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
            this.setState('Nothing');
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
            this.setState('Nothing');
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
