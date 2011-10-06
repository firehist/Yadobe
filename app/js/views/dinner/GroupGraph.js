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
	 * Display object available for the group
	 * @type {DisplayObject} or Bitmap
	 */
	_graph: null,
	/**
	 * Bitmap object available for the bubbles
	 * @type {Bitmap}
	 */
	_bubbles: {},
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
		this.setState('Waiting');
		this._graph = new Container();
        this.createGroup();
		this.createBubbles();
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
    	// Create all the persons of the group
    	this._graph.x = DINNERCONST.POSITION.firstgroup.x;
    	this._graph.y = DINNERCONST.POSITION.firstgroup.y;
		for (var i=0; i < this.model.personNumber; i++) {
			var person = this.createPerson();
			person.x = i * 50;
			person.y = 0;
			person.scaleX = 1.5;
			person.scaleY = 1.5;
			this._graph.addChildAt(person, i);
		}

	},
    /**
     * @method createGroup
     */
    createBubbles: function() {
		this._bubbles = {
			"WaitingToOrder": new Bitmap(DINNERCONST.IMAGE.group_WaitingToOrder),
			"WaitingMeal": new Bitmap(DINNERCONST.IMAGE.group_WaitingMeal),
			"WaitingForPayment": new Bitmap(DINNERCONST.IMAGE.group_WaitingForPayment)			
		};
		// Add all bubbles with visible = false in the graph
		for(var index in this._bubbles) {
			this._bubbles[index].visible = false;
			this._graph.addChild(this._bubbles[index]);
		}
	},
    /**
     *
     */
    createPerson: function() {
		var sprite = new SpriteSheet(
			DINNERCONST.IMAGE["human_" + this.model.color],
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
		
		var bitmapSequence = new BitmapSequence(sprite);
		bitmapSequence.shadow = new Shadow("#454", 0, 5, 4);
		
		return bitmapSequence;
    },	
    /**
     * @method addMouseListener
     */
    addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function() {
				console.log('Group clicked');
				// Test si le groupe est assis (fonctionne avec la table) ou non
				if(target.model.inState('QueuingUp')) {
					if(!target._graph.clicked) {
						console.debug('[GroupGraph.onPress] Group clicked');
						DinnerGamePage.getInstance().waiter.model.addToInventory(target.model);
					}
				} else {
					TABLEGROUPMOUSELISTENER.onPressWaitingMeal(target);
				}
			};
			target._graph.onMouseOver = TABLEGROUPMOUSELISTENER.onMouseOver(target);
			target._graph.onMouseOut = TABLEGROUPMOUSELISTENER.onMouseOut(target);
		})(this);
	},
	/**
	 * Draw the correct bubble
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The group graph
	 */
	drawBubble: function(index) {
		for(var indexBubble in this._bubbles) {
			if(indexBubble == index) {
				this._bubbles[indexBubble].visible = true;
			} else {
				this._bubbles[indexBubble].visible = false;
			}
		}
	}
};
var GroupGraph = new JS.Class(GroupGraphClass);

/**
 * Number of pixels for a step of the group
 * @static
 * @type {Integer}
 */
GroupGraph.stepInPixels = 8;

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
			this.updateBubble();
			if (this.model.inState('QueuingUp')) {
				//console.debug("[GroupGraph.Waiting.update]");
                var yMin = DINNERCONST.POSITION.reception.y + 10 + DinnerGamePage.getInstance().getIndexOfFirstEmpty(this.model)*30;
                if (yMin < this._graph.y) {
				this.setState('Waiting');
                //if (this._graph.y == DINNERCONST.POSITION.firstgroup.y) {
					this.setState('Walking2Reception');
					for (var i=0; i < this.model.personNumber; i++) {
						this._graph.getChildAt(i).gotoAndPlay('walking_north');
					}
	                this.direction = 'north';
				}
			} else if (this.model.inState('WaitingToOrder')) {
				this.setState('SittingDown');
			}
		},
		updateBubble: function() {
			this.drawBubble(null);
		}
	},
	/**
	 * Walking2Reception state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/01/2011
	 */
	Walking2Reception: {
        update: function() {
            var dy = GroupGraph.stepInPixels;
            //console.debug("[GroupGraph.Walking2Reception] getIndexOfFirstEmpty: " + DinnerGamePage.getInstance().getIndexOfFirstEmpty(this.model));
			var yMin = DINNERCONST.POSITION.reception.y + 10 + DinnerGamePage.getInstance().getIndexOfFirstEmpty(this.model)*30;
			if (yMin >= this._graph.y) {
				this.setState('Waiting');
				for (var i=0; i < this.model.personNumber; i++) {
					this._graph.getChildAt(i).gotoAndPlay('waiting');
				}
                this.direction = '';
			}
			else {
				// Move the group and it persons forward
				this._graph.y -= dy;
			}
        },
		updateBubble: function() {
			this.drawBubble(null);
		}
    },
	/**
	 * Walking2Table state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
	Walking2Table: {
        update: function() {
			this.updateBubble();
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
                //console.debug("Eating state");
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
        },
		updateBubble: function() {
			this.drawBubble(null);
		}
    },
    /**
	 * ReadMenu state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    ReadMenu: {
        update: function() {
			this.updateBubble();
            //console.debug("[Group " + this.model.color + "] nous lisons le menu");
            // TODO : créer la méthode this.model.generateDinnerMenu()
            // qui génère les menus pour chaque person du groupe
            //this.model.generateDinnerMenu();
            TimeManager.setStateTimer(
                Tools.randomXToY(1000, 5000),
                this,
                'WaitingOrder');
        },
		updateBubble: function() {
			this.drawBubble(null);
		}
    },
    /**
	 * SittingDown state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    SittingDown: {
        update: function() {
			this.updateBubble();
			// Place each person of the group at the sits of the table
        	this._graph.x = DINNERCONST.POSITION.tables[this.model.position.number - 1].coord.x;
        	this._graph.y = DINNERCONST.POSITION.tables[this.model.position.number - 1].coord.y;
        	
        	// List of available sits
        	var possibleSits = [0, 1, 2, 3];
        	
        	// For each person of the group, sit down them
			for (var i=0; i < this.model.personNumber; i++) {
				var person = this._graph.getChildAt(i);
				
				// Choose a sit on the table randomly and which is not already used by another person
				var sit = Tools.randomFromArray(possibleSits);
				person.x = DINNERCONST.POSITION.at_table[sit].dx;
				person.y = DINNERCONST.POSITION.at_table[sit].dy;
				person.gotoAndPlay('at_table_' + sit);
				
				// Remove this sit from the list of available sits
				possibleSits.splice(possibleSits.indexOf(sit), 1);
				
				person.scaleX = 1;
				person.scaleY = 1;
			}
			this.setState('ReadMenu');
        },
		updateBubble: function() {
			this.drawBubble(null);
		}
    },
    /**
	 * WaitingOrder state
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
    WaitingOrder: {
        update: function() {
			this.updateBubble();
            //console.debug("[Group " + this.model.color + "] nous attendons pour commander");
            if (this.model.menuList.length == 0) {
                console.debug("[GroupGraph] WaitingOrder: generation du menu");
                this.model.generateMenu();
            }
        },
		updateBubble: function() {
			if(this.model.inState("WaitingToOrder")) {
				this.drawBubble("WaitingToOrder");
			} else if(this.model.inState("WaitingMeal")) {
                this.drawBubble("WaitingMeal");
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
			this.updateBubble();
            //console.debug("[GroupGraph.Eating.update]");
        
        },
		updateBubble: function() {
			this.drawBubble(null);
		}
    }
});
