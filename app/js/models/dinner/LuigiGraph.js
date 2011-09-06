/**
 * Luigi class
 * @since 05/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var LuigiGraphClass = {
	// Includes
	include: JS.State,
	// Attributes
	xBase: 0,
	x: 0,
	y: 0,
	container: null,
	/**
	 * BitmapSequence of LuigiGraph
	 * @type Luigi
	 */
	kitchen: null,
	/**
	 * Counter use to fix speed of bitmapSeq
	 */
	count: 0,
	/**
	 * List of bitmapSeq available
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
		this.setState('Nothing');
		this.container = new Container();
		this.x = this.xBase = x;
		this.y = y;
		this.createWalkingLeftFull();
		this.createWalkingLeftEmpty();
		this.createWalkingRightEmpty();
		this.createStopFrontFull2Empty();
		//this.container.addChild(this.getLuigi('walking_left_full'));
	},
	getLuigi: function(type) {
		var bitmapSeq = this.bitmapSeq[type];
		bitmapSeq.x = this.x;
		bitmapSeq.y = this.y;
		return bitmapSeq;
	},
	/**
	 * Create walking left full bitmapSeq
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createWalkingLeftFull: function() {
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigi_walking_left_full, 128, 128);
		sprite.loop = true;
		this.bitmapSeq.walking_left_full = new BitmapSequence(sprite);
	},
	/**
	 * Create walking left empty bitmapSeq
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createWalkingLeftEmpty: function() {
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigi_walking_left_empty, 128, 128);
		this.bitmapSeq.walking_left_empty = new BitmapSequence(sprite);
	},
	/**
	 * Create walking right empty bitmapSeq
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createWalkingRightEmpty: function() {
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigi_walking_right_empty, 128, 128);
		this.bitmapSeq.walking_right_empty = new BitmapSequence(sprite);
	},
	/**
	 * Create stop full2empty bitmapSeq
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createStopFrontFull2Empty: function() {
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigi_stop_front_full2empty, 128, 128);
		sprite.loop = false;
		this.bitmapSeq.stop_front_full2empty = new BitmapSequence(sprite);
	}
};
var LuigiGraph = new JS.Class(LuigiGraphClass);

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
	Nothing: {
		update: function() {
			this.container.removeAllChildren();
			this.container.addChild(this.getLuigi('walking_left_full'));
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
            var xMin = Yadobe.getInstance().canvas.width - 300 + (this.kitchen.model.readyMenuList.length * 30);
			if(this.bitmapSeq['walking_left_full'].x <= xMin) {
				this.container.removeAllChildren();
				this.container.addChild(this.getLuigi('stop_front_full2empty'));
				this.setState('StopFrontEmpty2Full');
			} else {
				this.bitmapSeq['walking_left_full'].x -= 5;
				this.x = this.bitmapSeq['walking_left_full'].x;
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
				this.bitmapSeq['stop_front_full2empty'].gotoAndStop(0);
				this.count++;
			} else if(this.count < 5) {
				this.count++;
			} else if(this.count == 5) {
				if(this.bitmapSeq['stop_front_full2empty'].currentFrame == this.bitmapSeq['stop_front_full2empty'].spriteSheet.totalFrames) {
					this.bitmapSeq['stop_front_full2empty'].gotoAndStop(this.bitmapSeq['stop_front_full2empty'].spriteSheet.totalFrames);
					this.count++;
				} else {
					this.bitmapSeq['stop_front_full2empty'].gotoAndPlay(0);
				}
			} else if(this.count >= 5) {
				this.count++;
				if(this.count == 10) {
					this.kitchen.displayPlate();
					this.count = 0;
					this.container.removeAllChildren();
					this.container.addChild(this.getLuigi('walking_right_empty'));
					this.bitmapSeq['stop_front_full2empty'].gotoAndStop(0);
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
			if(this.bitmapSeq['walking_right_empty'].x >= this.xBase) {
				this.container.removeAllChildren();
				this.kitchen.model.setReadyDone();
				this.setState('Nothing');
			} else {
				this.bitmapSeq['walking_right_empty'].x += 5;
				this.x = this.bitmapSeq['walking_right_empty'].x;
			}
        }
    }
});