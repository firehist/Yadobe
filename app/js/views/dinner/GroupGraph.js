/**
 * GroupGraph class
 * @since 02/09/2011
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module dinner
 */
var GroupGraphClass = {
    // Includes
	include: JS.State,
    // Attributes
	/**
	 * Model of GroupGraph
	 * @type Group
	 */
    model: null,
    /**
	 * Container for Group
	 * @type Container
	 */
	container: null,
	/**
	 * BitmapSeq available for Group
	 * @type BitmapSequence
	 */
	bitmapSeq: null,
   /**
	 * The base y coord of GroupGraph
	 * @type int
	 */
	x: 0,
	/**
	 * The base x coord of GroupGraph
	 * @type int
	 */
	y: 0,
	/**
	 * The kitchen graph
	 * @type KitchenPlaceGraph
	 */
    /**
	 * @constructor
	 * @class GroupGraph
	 * @method initialize
	 * @param {GroupGrah} model
	 */
	initialize: function(model) {
		console.log('GroupGraph.initialize(model)');
		this.model = model;
        this.x = DINNERCONST.POSITION.firstgroup.x;
        this.y = DINNERCONST.POSITION.firstgroup.y
        this.createGroup();
		this.container = new Container();
		this.addMouseListener();
	},
    /**
     * @method getContainer
     * @return container
     */
    getContainer: function() {
		return this.container;
	},
    /**
     * @method createGroup
     */
    createGroup: function() {
		var frameData = {
			walking_east: [0, 7],
			walking_north: [8, 15],
			walking_south: [16, 23],
			walking_west: [24, 31],
            waiting: 0
		};
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.group_walking, 96, 96, frameData);
		this.bitmapSeq = new BitmapSequence(sprite);
        this.bitmapSeq.x = this.x;
		this.bitmapSeq.y = this.y;
		this.bitmapSeq.scaleX = this.bitmapSeq.scaleY = 1.6;
		this.bitmapSeq.shadow = new Shadow("#454", 0, 5, 4);
		this.container.addChild(group);
	},
    /**
     * @method addMouseListener
     */
    addMouseListener: function() {
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Group clicked');
				}
			}
			target.onMouseOver = function() {
				if(!target.clicked) {
					target.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target.onMouseOut = function() {
				if(!target.clicked) {
					target.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this.container);
	},
	/**
	 * @method update
	 */
	update: function() {
		
	}	

};
var GroupGraph = new JS.Class(GroupGraphClass);

/**
 * GroupGraph states declaration
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @since 08/09/2011
 */
GroupGraph.states({
	/**
	 * Nothing state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 08/09/2011
	 */
	Waiting: {
		update: function() {
			this.bitmapSeq.gotoAndPlay('waiting');
			this.setState('WalkingLeftFull');
		}
	},
	/**
	 * Walking to reception
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 09/09/2011
	 */
	Walking2Reception: {
        update: function() {
			if(this.bitmapSeq.y <= DINNERCONST.POSITION.reception.y) {
				console.debug('lol');
				this.bitmapSeq.gotoAndStop('walking_north');
				this.setState('Waiting');
			} else {
				this.bitmapSeq.y -= 5;
			}
        }
    },
	/**
	 * StopFrontEmpty2Full state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
    Walking2Table: {
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
    Eating: {
        update: function() {
			// TODO: in this state, group is associated with a table and this table
            // manage state during eating (order, buying, eating...)
        }
    }
});
