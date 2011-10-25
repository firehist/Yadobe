/**
 * GroupGraph class
 * @since 02/09/2011
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module dinner
 */
var GroupGraphClass = {
	
    // Includes
	//include: JS.State,
	
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
		this._graph = new Container();
        this.createGroup();
		//this.setState('Walking2Reception');
        //this.model.setState('QueuingUpBusy');
		for (var i=0; i < this.model.personNumber; i++) {
			this._graph.getChildAt(i).gotoAndPlay('walking_north');
		}
		this.direction = 'north';
        this.isWalking = true;
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
			person.x = i * 15;
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
			// if state is Walking2Reception we disable to click on group
            target._graph.onPress = function() {
                // check if the group is sitting (is dependant on table)
                if (target.model.inState('QueuingUpWaiting')) {
                    if (!target._graph.clicked) {
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
	},
    drawSittingDown: function() {
        console.debug("Group is going to sit down");
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
    },
    updateBubble: function() {
        this.drawBubble(null);
	},
    update: function() {
        this.model.runAction();
        var dy = GroupGraph.stepInPixels;
        var yMin = DINNERCONST.POSITION.reception.y + dy + DinnerGamePage.getInstance().getIndexOfFirstEmpty(this.model)*30;
        if (this.model.inState("QueuingUpWaiting")) {
			this.updateBubble();
            if (this._graph.y > yMin) {
                this.model.setState('QueuingUpBusy');
                for (var i=0; i < this.model.personNumber; i++) {
                    this._graph.getChildAt(i).gotoAndPlay('walking_north');
                }
                this.direction = 'north';
            }
        }
        if (this.model.inState("QueuingUpBusy")) {
            if (this._graph.y <= yMin) {
				this.model.setState('QueuingUpWaiting');
                for (var i=0; i < this.model.personNumber; i++) {
                    this._graph.getChildAt(i).gotoAndPlay('waiting');
                }
                this.direction = '';
			} else {
				// Move the group and it persons forward
				this._graph.y -= dy;
			}
        }
        if (this.model.inState("SittingDown")) {
            this.drawSittingDown();
            this.model.setState("ReadingMenu");
        }
        if (this.model.inState("ReadingMenu")) {
            this.updateBubble("ReadingMenu");
        }
        if (this.model.inState("WaitingToOrder")) {
			this.drawBubble("WaitingToOrder");
        }
        if (this.model.inState("WaitingMeal")) {
            this.drawBubble("WaitingMeal");
        }
        if (this.model.inState("Eating")) {
           
        }
        if (this.model.inState("WaitingForPayment")) {
            
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
