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
		this.y = DINNERCONST.POSITION.firstgroup.y;
		this.setState('Waiting');
		this.container = new Container();
        this.createGroup();
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
		var imageName = eval("DINNERCONST.IMAGE.human_" + this.model.color);
		console.debug("imageName : " + imageName);
		var sprite = new SpriteSheet(
			imageName,
			96, 96,
			{
				walking_east: [0, 7],
				walking_north: [8, 15],
				walking_south: [16, 23],
				waiting: 7
			}
		);
		sprite = SpriteSheetUtils.flip(
			sprite, 
			{
				walking_west:["walking_east", true, false, false]
			}
		);
		this.bitmapSeq = new BitmapSequence(sprite);
		console.debug("[GroupGraph.createGroup]après bitmapSeq");
		this.bitmapSeq.x = this.x;
		this.bitmapSeq.y = this.y;
		this.bitmapSeq.scaleX = this.bitmapSeq.scaleY = 1.5;
		this.bitmapSeq.shadow = new Shadow("#454", 0, 5, 4);
		this.container.addChild(this.bitmapSeq);
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
	 * Waiting state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 08/09/2011
	 */
	Waiting: {
		update: function() {
			console.debug("[GroupGraph.WaitingState.update]");
			if (this.bitmapSeq.y == DINNERCONST.POSITION.firstgroup.y) {
				this.setState('Walking2Reception');
				this.bitmapSeq.gotoAndPlay('walking_north');
			} else {
				this.setState('Walking2Reception');
			}
		}
	},
	/**
	 * Walking2Reception state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	Walking2Reception: {
        update: function() {
		console.debug("[GroupGraph.WaitingState.update]");
			var yMin = DINNERCONST.POSITION.reception.y + 100;
			if (yMin >= this.bitmapSeq.y) {
				this.setState('Waiting');
				this.bitmapSeq.gotoAndPlay('waiting');
			} else {
				this.bitmapSeq.y -= 5;
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
