/**
 * Luigi class
 * @since 05/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 **/
var LuigiGraphClass = {
	// Includes
	include: JS.State,
	// Attributes
	/**
	 * The base y coord of Luigi
	 * @type int
	 */
	x: 0,
	/**
	 * The base x coord of Luigi
	 * @type int
	 */
	y: 0,
	/**
	 * The kitchen graph
	 * @type KitchenPlaceGraph
	 */
	kitchen: null,
	/**
	 * Counter use to fix speed of bitmapSeq
	 * @type int
	 */
	count: 0,
	/**
	 * BitmapSeq available for Luigi
	 * @type BitmapSequence
	 */
	bitmapSeq: null,
	// Constructor
	/**
	 * @constructor
	 * @param kitchen KitchenGraph
	 * @param x int
	 * @param y int
	 */
	initialize: function(kitchen, x, y) {
		LuigiGraph.instance = this;
		this.kitchen = kitchen;
		this.x = x;
		this.y = y;
		this.setState('Nothing');
		this.container = new Container();
		this.createLuigi();
	},
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
		this.bitmapSeq = new BitmapSequence(sprite);
		this.bitmapSeq.x = this.x;
		this.bitmapSeq.y = this.y;
		this.bitmapSeq.scaleX = this.bitmapSeq.scaleY = 1.2;
		this.bitmapSeq.shadow = new Shadow("#454", 0, 5, 4);
	}
};
var LuigiGraph = new JS.Class(LuigiGraphClass);

/**
 * LuigiGraph singleton implement
 */
LuigiGraph.instance = null;
LuigiGraph.getInstance = function() {
	if(LuigiGraph.instance != null) return LuigiGraph.instance;
	else return null;
}

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
			this.bitmapSeq.gotoAndPlay('walking_left_full');
            console.debug('Luigi : Chaud devant, chaud !');
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
			if(this.bitmapSeq.x <= xMin) {
				console.debug('Luigi : Une assiette de prête !');
				this.bitmapSeq.gotoAndPlay('stop_front_full2empty');
				this.setState('StopFrontEmpty2Full');
			} else {
				this.bitmapSeq.x -= 5;
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
				this.bitmapSeq.gotoAndStop('stop_front_full2empty');
				this.bitmapSeq.loop = false;
				this.count++;
			} else if(this.count < 5) {
				this.count++;
			} else if(this.count == 5) {
				this.bitmapSeq.gotoAndPlay('stop_front_full2empty');
				this.count++;
			} else if(this.count == 6) {
				if(this.bitmapSeq.currentFrame == this.bitmapSeq.currentEndFrame) {
					this.bitmapSeq.gotoAndStop(this.bitmapSeq.currentEndFrame);
					this.count++;
				} else if(this.bitmapSeq.currentFrame == (this.bitmapSeq.currentStartFrame + 4) ) {
					this.kitchen.displayPlate();
				}
			} else if(this.count == 7) {
				this.kitchen.model.setReadyDone();
				this.count++;
			} else if(this.count > 7) {
				this.count++;
				if(this.count == 10) {
					this.count = 0;
					this.bitmapSeq.gotoAndPlay('walking_right_empty');
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
			if (this.bitmapSeq.x >= this.x) {
				this.setState('Nothing');
			}
            else {
				this.bitmapSeq.x += 5;
			}
        }
    }
});
