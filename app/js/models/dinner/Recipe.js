/**
 * Recipe class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var RecipeClass = {
	// Attributes
	/**
	 * Name of recipe
	 * @var string name
	 */
	name: null,
	/**
	 * Duration to cook this recipe
	 * @var int duration
	 */
	duration: null,
	/**
	 * Type of recipe
	 * @var string type (starter, dish, dessert, drink)
	 */
	type: null,
	/**
	 * Price of the recipe
	 * @var float price
	 */
	price: null,
	// Constructor
	initialize: function(name, duration, type, price) {
		this.name = name;
		this.duration = duration;
		this.type = type;
		this.price = price;
	},
	// Methods
	/**
	 * Get duration of recipe
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int The duration of the recipe
	 */
	getDuration: function() {
		return this.duration;
	}	
};
var Recipe = new JS.Class(RecipeClass);