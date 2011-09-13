/**
 * GroupGraph class
 * @since 02/09/2011
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module dinner
 */
var GroupGraphClass = {
    // Includes
	include: JS.State,
    className: 'GroupGraphClass',
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
     * indicates the current direction
     * @type string
     */
    direction: '',
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
	 * This is the position of selected TablePlace where group have to sit down
	 * @type Point
	 */
	goToTablePoint: null,
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
		//console.debug("imageName : " + imageName);
		var sprite = new SpriteSheet(
			imageName,
			96, 96,
			{
				walking_east: [0, 7],
				walking_north: [8, 15],
				walking_south: [16, 23],
				waiting: 14
			}
		);
		sprite = SpriteSheetUtils.flip(
			sprite, 
			{
				walking_west:["walking_east", true, false, false]
			}
		);

		this.bitmapSeq = new BitmapSequence(sprite);
		//console.debug("[GroupGraph.createGroup]après bitmapSeq");
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
		(function(target, obj) {
			target.onPress = function() {
				if(!target.clicked) {
					console.log('Group clicked');
					DinnerGamePage.getInstance().linkGroupWithTable(obj);
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
		})(this.container, this);
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
			//console.debug("[GroupGraph.Waiting.update]");
			if (this.bitmapSeq.y == DINNERCONST.POSITION.firstgroup.y) {
				this.setState('Walking2Reception');
				this.bitmapSeq.gotoAndPlay('walking_north');
                this.direction = 'north';
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
            //console.debug("[GroupGraph.Walking2Reception.update]");
			var yMin = DINNERCONST.POSITION.reception.y + 10;
			if (yMin >= this.bitmapSeq.y) {
				this.setState('Waiting');
				this.bitmapSeq.gotoAndPlay('waiting');
                this.direction = '';
			} else {
				this.bitmapSeq.y -= 5;
			}
        }
    },
	/**
	 * Walking2Table state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
	Walking2Table: {
        update: function() {
            consle.debug("Walking2Table");
            var dx = 5;
            var dy = 5;
            
            var xSquare = Math.pow(this.goToTablePoint.y - (this.bitmapSeq.y), 2);
            var ySquare = Math.pow(this.goToTablePoint.y - (this.bitmapSeq.y), 2);

            var xSquareByEast = Math.pow(this.gotToTablePoint.x - this.bitmapSeq.x+dy, 2);
            var xSquareByWest = Math.pow(this.gotToTablePoint.x - (this.bitmapSeq.x-dy), 2);
            var ySquareByNorth = Math.pow(this.gotToTablePoint.y - this.bitmapSeq.y-dy, 2);
            var ySquareBySouth = Math.pow(this.gotToTablePoint.y - (this.bitmapSeq.y+dy), 2);
            
            var distByNorth = Math.sqrt(xSquare+ySquareByNorth);
            var distBySouth = Math.sqrt(xSquare+ySquareBySouth);
            var distByEast = Math.sqrt(xSquareByEast+ySquare);
            var distByWest = Math.sqrt(xSquareByWest+ySquare);

            if (distByNorth <= 2*dy || distBySouth <= 2*dy || distByEast <= 2*dx || distByWest <= 2*dx) {
                this.setState('Eating');
				this.bitmapSeq.gotoAndPlay('waiting');
            } else {
                if (Math.min(distByNorth, Math.min(distBySouth, Math.min(distByEast, distByWest)))) {
                    this.bitmapSeq.y -= dy;
                    if (this.direction != 'north') {
                        this.direction = 'north';
                        this.bitmapSeq.gotoAndPlay('walking_'+this.direction);
                    }
                } else if (Math.min(distBySouth, Math.min(distByNorth, Math.min(distByEast, distByWest)))) {
                    this.bitmapSeq.y += dy;
                    if (this.direction != 'south') {
                        this.direction = 'south';
                        this.bitmapSeq.gotoAndPlay('walking_'+this.direction);
                    }
                } else if (Math.min(distByEast, Math.min(distByNorth, Math.min(distBySouth, distByWest)))) {
                    this.bitmapSeq.x += dx;
                    if (this.direction != 'east') {
                        this.direction = 'east';
                        this.bitmapSeq.gotoAndPlay('walking_'+this.direction);
                    }
                } else {
                    this.bitmapSeq.x -= dx;
                    if (this.direction != 'west') {
                        this.direction = 'west';
                        this.bitmapSeq.gotoAndPlay('walking_'+this.direction);
                    }
                }
            }
        }
    },
	/**
	 * Eating state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    Eating: {
        update: function() {
            //console.debug("[GroupGraph.Walking2Reception.update]");
            // 
			// TODO: in this state, group is associated with a table and this table
            // manage state during eating (order, buying, eating...)
        }
    }
});
