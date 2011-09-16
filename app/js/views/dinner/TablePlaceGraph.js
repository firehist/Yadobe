/**
 * TablePlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var TablePlaceGraphClass = {
	// Attributes
	/**
	 * Model of TablePlaceGraph
	 * @type TablePlace
	 */
	model: null,
	/**
	 * Display object available for the waiter
	 * @type {DisplayObject}
	 */
	_graph: null,
	// Constructor
	/**
	 * @constructor
	 * @class TablePlace
	 * @method initialize
	 * @param {TablePlace} model
	 */
	initialize: function(model) {
		console.log('TablePlaceGraph.initialize(model)');
		this.model = model;
		this._graph = new Container();
		this.addMouseListener();
		this.createTable();
		
		// @TODO To remove ! For tests
        this.model.setState('WaitingForOrder');
	},
	/**
	 * Get TablePlace graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The TablePlace graph
	 */
	getGraph: function() {
		return this._graph;
	},
	createTable: function() {
		var table = new Bitmap(DINNERCONST.IMAGE['table_' + this.model.color]);
		table.x = DINNERCONST.POSITION.tables[this.model.number - 1].x;
		table.y = DINNERCONST.POSITION.tables[this.model.number - 1].y;
		this._graph.addChildAt(table, 0);
	},
	addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function(e) {
				if (!target._graph.clicked) {

                    // If the persons of the table are waiting to order
                    if (target.model.inState('WaitingForOrder')) {

                        var destination = new Destination(target.model, function() {
                            console.log("Waiter arrived to table " + target.model.number + ".");
                            console.log("The table " + target.model.number + " passed an order and is waiting their meal.");
                            // @TODO The group pass the order
                            target.model.setState('WaitingMeal');
                        });
                        
    					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
                    }
                    // If the persons of the table are waiting their meals
                    else if (target.model.inState('WaitingMeal')) {

                        var destination = new Destination(target.model, function() {
	                        var waiterModel = DinnerGamePage.getInstance().waiter.model;
	                        
	                    	// Check if there are some Menus in the Waiter inventory
	                    	if ((waiterModel.inventory) && (waiterModel.inventoryCurrent > 0)) {
	                    		
	                    		// Look for the item(s) of the waiter inventory which are destined to this table
	                    		for (var index in waiterModel.inventory) {
	                    			
	                    			var item = waiterModel.inventory[index];
	                                // The item is a menu and it is destined to this table
	                    			if ((item instanceof Menu) && (item.table == target.model.number)) {
	                    				
	                    				// @TODO Add the menu to the table
	                                    console.log("The menu arrived to the good table :D");
	                                    waiterModel.delFromInventory(index);
	                                    
	    	                    		//@TODO replace "true" on the Table order : if (this.model.AreAllMenusServed()) {...}
	                                    // And move after the "for" loop
	    	                    		if (true) {
	    	                    			console.log("The group of the table " + target.model.number + " started to eat.");
	    	                                target.model.setState('Eating');
	    	                    		}
	                    			}
	                    			// @TODO To suppress ! Just for test
	                    			else {
	                    				console.log("The menu arrived to the bad table (table " + target.model.number + " instead of table " + item.table + ").");
	                    			}
	                    		}
	                    		
	                    	}
                        });
    					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
                    }
				}
			};
			target._graph.onMouseOver = function() {
				if (!target.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			};
			target._graph.onMouseOut = function() {
				if (!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			};
		})(this);
	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
