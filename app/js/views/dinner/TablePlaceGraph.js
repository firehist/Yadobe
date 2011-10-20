/**
 * TablePlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var TablePlaceGraphClass = {
	className: 'TablePlaceGraphClass',
    // Attributes
	/**
	 * Model of TablePlaceGraph
	 * @type TablePlace
	 */
	model: null,
	/**
	 * Refer to the group which actually are at the table
	 * @type {GroupGraph}
	 */
	groupGraph: null,
	/**
	 * Container for Table
	 * @type Container
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
		table.x = DINNERCONST.POSITION.tables[this.model.number - 1].coord.x;
		table.y = DINNERCONST.POSITION.tables[this.model.number - 1].coord.y;
        this._graph.addChildAt(table, 0);
	},
	setGroupGraph: function(groupGraph) {
		this.groupGraph = groupGraph;
	},
	getGroupGraph: function() {
		return this.groupGraph;
	},
	addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function() {
				if (!target._graph.clicked) {
                    console.log('Table clicked');

                    // A group is sitting at the table
                    if (target.model.inState('Busy')) {
                    	var groupModel = target.model.group;
	                    // If the persons of the table are waiting to order or reading the menu
	                    if (groupModel.inState('WaitingToOrder')) {
	
	                        var destination = new Destination(target.model, function() {
	                            console.log("Waiter arrived to table " + target.model.number + ".");
	                            console.log("The table " + target.model.number + " passed an order and is waiting their meal.");

                                groupModel.setState('WaitingMeal');
                                
                                // Launch cooking for all menu in Wait state
                                var kitchenModel = DinnerGamePage.getInstance().kitchen.model;
                                for (var i=0; i<groupModel.menuList.length; i++) {
									if (groupModel.menuList[i].inState('Wait')) {
                                        kitchenModel.addMenu(groupModel.menuList[i]);
									}
                                }
	                        });
	                        
	    					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
	                    }
	                    // If the persons of the table are waiting their meals
	                    else if (groupModel.inState('WaitingMeal')) {
							// Use the common function with groupGraph
							TABLEGROUPMOUSELISTENER.onPressWaitingMeal(target);
	                    }
                    }
                    // No group is sitting at the table
                    else if (target.model.inState('Free')) {

                        var waiterModel = DinnerGamePage.getInstance().waiter.model;
                        var receptionModel = DinnerGamePage.getInstance().reception.model;

                    	// Check if there a group is in the Waiter inventory
                    	if ((waiterModel.inventory) && (waiterModel.inventoryCurrent > 0)) {

                    		// Look for the item(s) of the waiter inventory
                    		for (var index in waiterModel.inventory) {
                    			
                    			var item = waiterModel.inventory[index];
                    			
                                // The item is a group
                    			if (item instanceof Group) {
                                   
                                    // free the position of the group in the reception
                                    receptionModel.getOutGroup(item);

                    				// Set the group on the table
                                    target.model.group = item;
                                    
                                    // Set the table on the group
                                    item.position = target.model;
                                    
                                    // Remove the group from the waiter inventory
                                    waiterModel.delFromInventory(index);
                                    
                                    target.model.group.setState('ReadingMenu');
                                    target.model.setState('Busy');
                    			}
                    			
                    		}
                    	}
                    }
				}
			};
			target._graph.onMouseOver = TABLEGROUPMOUSELISTENER.onMouseOver(target);
			target._graph.onMouseOut = TABLEGROUPMOUSELISTENER.onMouseOut(target);
		})(this);

	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
