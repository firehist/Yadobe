/**
 * Waiter class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var WaiterClass = {
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
	 * Inventory size
	 * @type int
	 */
	inventoryMax: 2,
    
	/**
     * @constructor
     */
	initialize: function(name, position, inventoryMax) {
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
	addToInventory: function(menu) {
		if ((menu instanceof Menu) && (this.inventory.length < this.inventoryMax)) {
			this.inventory.push(menu);
		}
	},
	delFromInventory: function() {
		if(this.inventory.length > 0) {
			return this.inventory.shift();
		}
		return false;
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