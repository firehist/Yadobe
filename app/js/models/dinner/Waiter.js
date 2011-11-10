/**
 * Waiter class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var WaiterClass = {
	// Debug information
	debug: true,
	debugClassName: 'Waiter',
	// Includes
	include: JS.State,
	// Attributes
	/**
	 * Name of waiter
	 * @type string
	 */
	name: null,
	/**
	 * Destination of waiter
	 * @type List<Destination>
	 */
	destination: null,
	/**
	 * Destinations size
	 * @type int
	 */
	destinationMax: 2,
	/**
	 * Current position of waiter
	 * @type Place
	 */
	position: null,
	/**
	 * Inventory of waiter
	 * @type List<Menu>
	 */
	inventory: new Array(),
	/**
	 * Inventory current size
	 * @type Integer
	 */
	inventoryCurrent: 0,
	/**
	 * Inventory max size
	 * @type Integer
	 */
	inventoryMax: 2,
    
	/**
     * @constructor
     */
	initialize: function(name, position, inventoryMax) {
		Debug.log(this, 'initialize', 'test');
		this.name = name;
		this.destination = [];
		if (position instanceof Place) {
			this.position = position;
		}
		else {
			throw new Exception('Given position does not inerhit from Place.');
		}
		this.inventoryMax = inventoryMax;
	},
	
	// Methods
	/**
	 * Set destination to the waiter
	 * @method moveTo
     * @param {Destination} destination
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 07/09/2011
	 */
	moveTo: function(destination) {        
		// Check the destination passed in parameter is a Destination and got a Place as position
		if (destination instanceof Destination) {
			if ((!destination.position) || (!destination.position instanceof Place)) {
				throw 'Please give a Place as position of the Waiter destination.';
			}
			else {
                
				// If all destination slots are full, replace the destination of the last slot
				if (this.destination.length == this.destinationMax) {
					this.destination[this.destinationMax - 1]= destination;
				}
				else {
					this.destination.push(destination);
				}
				this.setState('Moving');
			}
		}
		else {
			throw 'Unknown destination';
		}
	},
	addToInventory: function(item) {
		
		// Added item is a menu
		if ((item instanceof Menu) && (this.inventoryCurrent <= this.inventoryMax + item.size())) {
			this.inventory.push(item);
			this.inventoryCurrent += item.size();
			Debug.log(this, 'addToInventory', "A menu for table " + item.table + " was added to Waiter.");
		}
        
		// Added item is a group of persons. The inventory must be empty to add a group.
		else if ((item instanceof Group) && (this.inventoryCurrent == 0)) {
			
			this.inventory.push(item);
			
			// A group fill all the spaces of the inventory
			this.inventoryCurrent = this.inventoryMax;
			Debug.log(this, 'addToInventory', "A group was added to Waiter.");
		}
	},
	delFromInventory: function(index) {
		if (this.inventoryCurrent > 0) {
			var item;
			
			if (index) {
				item = this.inventory[index];
				this.inventory.splice(index, 1);
			}
			else {
				// If no index is specified return the first item of the list and delete it
				item = this.inventory.shift();
			}

			if (item instanceof Menu) {
				this.inventoryCurrent -= item.size();
			}
			else if (item instanceof Group) {
				this.inventoryCurrent = 0;
			}
			return item;
		}
		return false;
	},
	clearInventory: function() {
		this.inventoryCurrent = 0;
		this.inventory = [];
		Debug.log(this, 'clearInventory', "Inventory cleared.");
	},
	displayInventory: function() {
		
		var intentoryAsString = '';
		for (var index in this.inventory) {
			
			var item = this.inventory[index];
			
			if (item instanceof Group) {
				intentoryAsString += index + ' : Group : ' + item + '\n';
			} else if (item instanceof Menu) {
				intentoryAsString += index + ' : Menu : ' + item + '\n';
			}
		}
		Debug.log(this, 'displayInventory', "Inventory:\n" + intentoryAsString);
	},
	arrivedToDestination : function() {
		// Execute the method on arrival to the destination
		this.destination[0].actionOnArrival();
        
		// Set the current position of the waiter with the destination position
		this.position = this.destination[0].position;
        
		// Clear the last destination
		this.destination.shift();
        
		// Execute the next action
		if (this.destination.length > 0) {
			this.setState('Moving');
		}
	}
};
var Waiter = new JS.Class(WaiterClass);

/**
 * Waiter states declaration
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 * @module Waiter
 */
Waiter.states({
	/**
	 * Waiting state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 07/09/2011
	 */
	Waiting: {},
	/**
	 * Moving state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 07/09/2011
	 */
	Moving: {},
	/**
	 * TakingOrder state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 15/09/2011
	 */
	TakingOrder: {}
});