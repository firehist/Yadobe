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
	/**
	 * Select the direction (top, left, right, bottom) for the Waiter and signal when arrived
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 12/09/2011
	 */
	selectDirection : function() {
		if ((this.model.inState('Moving')) && (this.model.destination[0])) {
            
			// If the waiter is already at the requested position, do not move and execute action
			if (this.model.destination[0].position.name == this.model.position.name) {
				this.crossingPoint = 0;
				this.model.setState('Waiting');
				this.model.arrivedToDestination();
				return;
			}
			
			var newState = 'Nothing';
            
			var point = this.nextPoint();
            
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
            
			// Need to move to the top
			if (movementY > WaiterGraph.stepInPixels) {
				newState = 'WalkingTopEmpty';
			}
			// Need to move to the bottom
			else if (movementY + WaiterGraph.stepInPixels < 0) {
				newState = 'WalkingBottomEmpty';
			}
            
			// If no direction is needed, it is because we arrived to the new point
			if (newState == 'Nothing') {
                
				// If there is no more point where to go for this path, stop and say to the model that the Waiter was arrived
				if (this.isLastPoint()) {
					this.crossingPoint = 0;
					this.model.setState('Waiting');
					this.model.arrivedToDestination();
				}
				else {
					// Else, go to the next point of the path
					this.crossingPoint++;
				}
			}
            
			// Execute the next movement
			this.setState(newState);
		}
	},
	/**
	 * Return the coordinates of the next point to reach
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 12/09/2011
	 */
	nextPoint : function() {
		var point;
        
		// Try to get a path of points with the key "currentPosition-destination"
		var hashKey = this.model.position.name + '-' + this.model.destination[0].position.name;
		if (DINNERCONST.PATH[hashKey]) {
			point = DINNERCONST.PATH[hashKey][this.crossingPoint];
		}
		else {
			// Try to get the reverse path of points (with the key "destination-currentPosition")
			hashKey = this.model.destination[0].position.name + '-' + this.model.position.name;
			if (DINNERCONST.PATH[hashKey]) {
				point = DINNERCONST.PATH[hashKey][DINNERCONST.PATH[hashKey].length - this.crossingPoint - 1];
			}
			else {
				//throw 'No path of points found for ' + hashKey + '.';
				Debug.log(this, 'nextPoint', 'No path of points found for ' + hashKey + '.');
			}
		}
        
		return point;
	},
	/**
	 * Return true if the next point to reach is the last one of the patch
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 12/09/2011
	 */
	isLastPoint : function() {
        
		// Try to get a path of points with the key "currentPosition-destination"
		var hashKey = this.model.position.name + '-' + this.model.destination[0].position.name;
		if (DINNERCONST.PATH[hashKey]) {
			return (DINNERCONST.PATH[hashKey].length == this.crossingPoint + 1);
		}
		else {
			// Try to get a path of points with the key "destination-currentPosition"
			hashKey = this.model.destination[0].position.name + '-' + this.model.position.name;
			if (DINNERCONST.PATH[hashKey]) {
				return (DINNERCONST.PATH[hashKey].length == this.crossingPoint + 1);
			}
			else {
				throw 'No path of points found for ' + hashKey + '.';
			}
		}
        
		return false;
	}
};
var WaiterGraph = new JS.Class(WaiterGraphClass);

/**
 * Number of pixels for a step of the waiter
 * @static
 * @type {Integer}
 */
WaiterGraph.stepInPixels = 8;

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
            
			// If the waiter is not already displayed, show him as Front
			if ((!this._graph.currentSequence) || (!this._graph.currentSequence.startsWith('stopped_bottom'))) {
				this._graph.gotoAndStop('stopped_bottom');
				this.setState('StopBottomEmpty');
			}
            
			// Select the next direction he will go
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
            
			var point = this.nextPoint();
            
			// We arrived to the expected point or to the end of the map
			if ((this._graph.y <= yMin) || (this._graph.y <= point.y)) {
				this._graph.gotoAndStop('stopped_top');
				this.setState('StopTopEmpty');
			}
			else {
				// If the Waiter is not already displayed as walking to the top, display it
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
            
			var point = this.nextPoint();
            
			// We arrived to the expected point or to the end of the map
			if ((this._graph.x >= xMax) || (this._graph.x >= point.x)) {
				this._graph.gotoAndStop('stopped_right');
				this.setState('StopRightEmpty');
			}
			else {
				// If the Waiter is not already displayed as walking to the right, display it
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
            
			var point = this.nextPoint();
            
			// We arrived to the expected point or to the end of the map
			if ((this._graph.x <= xMin) || (this._graph.x <= point.x)) {
				this._graph.gotoAndStop('stopped_left');
				this.setState('StopLeftEmpty');
			}
			else {
				// If the Waiter is not already displayed as walking to the left, display it
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
            
			var point = this.nextPoint();
            
			// We arrived to the expected point or to the end of the map
			if ((this._graph.y >= yMax) || (this._graph.y >= point.y)) {
				this._graph.gotoAndStop('stopped_bottom');
				this.setState('StopBottomEmpty');
			}
			else {
				// If the Waiter is not already displayed as walking to the bottom, display it
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
	}
});
