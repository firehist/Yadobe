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
	 * @type Destination
	 */
	destination: null,
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
    
	// Constructor
	initialize: function(name, position, inventoryMax) {
		this.name = name
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
		if (destination instanceof Destination) {
			this.destination = destination;
            this.setState('Moving');
		}
        else {
            throw new Exception('Unknown destination');
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
	Moving: {}
});