/**
 * Waiter class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var WaiterClass = {
	// Attributes
	/**
	 * Name of waiter
	 * @param string name
	 */
	name: null,
	/**
	 * Actual position of waiter
	 * @param Place position
	 */
	position: null,
	/**
	 * Destination of waiter	 
	 * @param Place destination
	 */
	destination: null,
	/**
	 * Inventory of waiter
	 * @param List<Menu> inventory
	 */
	inventory: new Array(),
	/**
	 * Inventory size
	 * @param int inventoryMax
	 */
	inventoryMax: 2,
	// Constructor
	initialize: function(name, position, inventoryMax) {
		this.name = name
		if(position instanceof Place.klass) {
			this.position = position;
		}
		this.inventoryMax = inventoryMax;
	},
	// Methods
	/**
	 * Add destination to the waiter
	 * @method addDestination
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	addDestination: function(position) {
		if(position instanceof Place.klass) {
			this.destination.push(position);
		}
	},
	addToInventory: function(menu) {
		if(menu instanceof Menu.klass && this.inventory.length < this.inventoryMax) {
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