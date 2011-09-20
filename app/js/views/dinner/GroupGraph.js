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
	 * Display object available for the group
	 * @type {DisplayObject}
	 */
	container: null,
	/**
	 * Bitmap or BitmapSquence available for Group
	 * @type BitmapSequence or Bitmap
	 */
	_graph: null,
    /**
     * indicates the current direction
     * @type string
     */
    direction: '',
	/**
	 * This is the position of selected TablePlace where group have to sit down
	 * @type Point
	 */
	goToTablePoint: null,
	/**
     * @type int
     */
    segment: 0,
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
		this.setState('Walking2Reception');
		this.container = new Container();
        this.createGroup();
		this.addMouseListener();
	},
	/**
	 * Get group graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The group graph
	 */
	getGraph: function() {
		return this._graph;
	},
    /**
     * @method createGroup
     */
    createGroup: function() {
		this.setGraph();
		this._graph.x = this.x;
		this._graph.y = this.y;
		this._graph.scaleX = this._graph.scaleY = 1.5;
		//this._graph.shadow = new Shadow("#454", 0, 5, 4);
		this.container.addChild(this._graph);
	},
    /**
     *
     */
    setGraph: function() {
		var imageName = "DINNERCONST.IMAGE.human_" + this.model.color;
		console.debug("[GroupGraph.setGraph] imageName : " + imageName);
		var sprite = new SpriteSheet(
			eval(imageName),
			96, 96,
			{
				walking_east: [0, 7],
				walking_north: [8, 15],
				walking_south: [16, 23],
				waiting: 14,
				at_table_0: 24,
				at_table_1: 25,
				at_table_2: 26,
				at_table_3: 27
			}
		);
		sprite = SpriteSheetUtils.flip(
			sprite,
			{
				walking_west:["walking_east", true, false, false]
			}
		);

		this._graph = new BitmapSequence(sprite);
    },	
    /**
     * @method addMouseListener
     */
    addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function() {
				if(!target._graph.clicked) {
					console.debug('[GroupGraph.onPress] Group clicked');
					DinnerGamePage.getInstance().linkGroupWithTable(target);
				}
			};
			target._graph.onMouseOver = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			};
			target._graph.onMouseOut = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this);
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
			if (this._graph.y == DINNERCONST.POSITION.firstgroup.y) {
				// Before group are really waiting
                this.setState('Walking2Reception');
				this._graph.gotoAndPlay('walking_north');
                this.direction = 'north';
			} else {
                // TODO: we manage time of waiting adn decrease mood related to time spent
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
            var dy = 8;
            //console.debug("[GroupGraph.Walking2Reception.update]");
			var yMin = DINNERCONST.POSITION.reception.y + 10 + DinnerGamePage.getInstance().getIndexOfFirstEmpty()*20;
			if (yMin >= this._graph.y) {
				this.setState('Waiting');
				this._graph.gotoAndPlay('waiting');
                this.direction = '';
			} else {
				this._graph.y -= dy;
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
            //console.debug("Walking2Table");
            var dx = 10;
            var dy = 8;
            var xGridCoeff = 20;
            //var yGridCoeff = 10;
            
            var xSquare = Math.pow(this.goToTablePoint.x - this._graph.x, 2);
            var ySquare = Math.pow(this.goToTablePoint.y - this._graph.y, 2);

			var xSquareByEast = Math.pow(this.goToTablePoint.x - (this._graph.x+dx), 2);
			var xSquareByWest = Math.pow(this.goToTablePoint.x - (this._graph.x-dx), 2);
			var ySquareByNorth = Math.pow(this.goToTablePoint.y - (this._graph.y-dy), 2);
			var ySquareBySouth = Math.pow(this.goToTablePoint.y - (this._graph.y+dy), 2);

            var distByNorth = Math.sqrt(xSquare+ySquareByNorth);
            var distBySouth = Math.sqrt(xSquare+ySquareBySouth);
            var distByEast = Math.sqrt(xSquareByEast+ySquare);
            var distByWest = Math.sqrt(xSquareByWest+ySquare);
			
            if (distByNorth <= 2*dy || distBySouth <= 2*dy || distByEast <= 2*dx || distByWest <= 2*dx) {
                console.debug("Eating state");
                this.setState('Eating');
				this._graph.gotoAndPlay('waiting');
            } else {
                
                if (distByNorth == Math.min(distByNorth, Math.min(distBySouth, Math.min(distByEast, distByWest)))) {
                    this._graph.y -= dy;
                    if (this.direction != 'north') {
                        this.segment = 0;
                        this.direction = 'north';
                        this._graph.gotoAndPlay('walking_'+this.direction);
                    }
                } else if (distBySouth == Math.min(distBySouth, Math.min(distByNorth, Math.min(distByEast, distByWest)))) {
                    this._graph.y += dy;
                    this.segment += dy;
                    if (this.direction != 'south') {
                        this.segment = 0;
                        this.direction = 'south';
                        this._graph.gotoAndPlay('walking_'+this.direction);
                    }
                } else if (distByEast == Math.min(distByEast, Math.min(distByNorth, Math.min(distBySouth, distByWest)))) {
                    this._graph.x += dx;
                    this.segment += dx;
                    if (this.direction != 'east' && this.segment > xGridCoeff*dx) {
                        this.segment = 0;
                        this.direction = 'east';
                        this._graph.gotoAndPlay('walking_'+this.direction);
                    }
                } else {
                    this._graph.x -= dx;
                    this.segment += dx;
                    if (this.direction != 'west' && this.segment > xGridCoeff*dx) {
                        this.segment = 0;
                        this.direction = 'west';
                        this._graph.gotoAndPlay('walking_'+this.direction);
                    }
                }
            }
        }
    },
    /**
	 * ReadMenu state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    ReadMenu: {
        update: function() {
            //console.debug("[GroupGraph.ReadMenu.update]");
            var xSave = this._graph.x;
			var ySave = this._graph.y;
			for (var i=0; i<this.model.personNumber; i++) {
				this._graph.x += DINNERCONST.POSITION.at_table[i].dx;
				this._graph.y += DINNERCONST.POSITION.at_table[i].dy;
				this._graph.scaleX = this._graph.scaleY = 1;
				this._graph.shadow = new Shadow("#454", 0, 0, 0);
				this._graph.gotoAndPlay('at_table_'+i);
			}
            this._graph.x = xSave;
			this._graph.y = ySave;
        }
    },
    /**
	 * WaitingOrder state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    WaitingOrder: {
        update: function() {
            //console.debug("[GroupGraph.Eating.update]");
           
            
        }
    },
	/**
	 * Eating state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    Eating: {
        update: function() {
            //console.debug("[GroupGraph.Eating.update]");
        
        }
    }
});
