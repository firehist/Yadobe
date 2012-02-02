/**
 * TablePlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var TablePlaceGraphClass = {
	// Debug information
	debug: true,
	debugClassName: 'TablePlaceGraph',
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
		Debug.log(this, 'initialize', "Initialize table model");
		Debug.log(this, 'initialize', model);
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
					Debug.log(target, 'addMouseListener.onPress', "Table clicked: " + target.model.name);
                    var groupModel = target.model.group;

                    // A group is sitting at the table
                    if (target.model.inState('Busy')) {
	                    // If the persons of the table are waiting to order
	                    if (groupModel.inState('WaitingToOrder')) {
                            // Use the common function with groupGraph
							TABLEGROUPMOUSELISTENER.onPressWaitingToOrder(target);
	                    }
	                    // If the persons of the table are waiting their meals
	                    else if (groupModel.inState('WaitingMeal')) {
							// Use the common function with groupGraph
							TABLEGROUPMOUSELISTENER.onPressWaitingMeal(target);
	                    }
                        // If the persons of the table are waiting for payment
                        else if (groupModel.inState('WaitingForPayment')) {
                            //groupModel.destroy();
                            groupModel.setState("IsGone");
                            target.groupGraph.update();
                            Debug.log(target, 'addMouseListener[OnPress]', "WaitingForPayment: groupModel is " + groupModel.name);
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
								Debug.log(target, 'addMouseListener.onPress', "Inventory.item: " + item.name);
                                // The item is a group
                    			if (item instanceof Group) {
                                    // free the position of the group in the reception
                                    receptionModel.getOutGroup(item);
                    				// Set the group on the table
                                    target.model.group = item;
                                    // Set the table on the group
                                    item.position = target.model;
                                    // Set the group to the table: we need to retrieve the corresponding GroupGraph
                                    // from a given groupModel (here item)
                                    var groupList = DinnerGamePage.getInstance().groupList;
                                    for (var groupGraphIt in groupList) {
                                        Debug.log(target, 'addMouseListener.onPress', "GRoupGraph iterator : " + groupList[groupGraphIt].model.name);
                                        if (groupList[groupGraphIt].model === item) {
                                            target.groupGraph = groupList[groupGraphIt];
                                            Debug.log(target, 'addMouseListener.onPress', "Table linked to group Graph" + groupList[groupGraphIt]);
                                        }
                                    }
                                    // Remove the group from the waiter inventory
                                    waiterModel.delFromInventory(index);
                                    // change the state of group and table
                                    target.model.setState('Busy');
                                    target.model.group.setState('SittingDown');
                    			} else {
									Debug.log(target, 'addMouseListener.onPress', "Object type of item is not recognized.");
                                }
                    		}
                    	}
                    } // if inState('Free')
				}
			};
			target._graph.onMouseOver = TABLEGROUPMOUSELISTENER.onMouseOver(target);
			target._graph.onMouseOut = TABLEGROUPMOUSELISTENER.onMouseOut(target);
		})(this);

	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
