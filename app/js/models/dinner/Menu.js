/**
 * Menu class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 * @class
 **/
var MenuClass = {
	// Includes
	include: JS.State,
	
	// Attributes
	table: -1,
	/**
	 * Starter
	 * @type Recipe
	 */
	starter: null,
	/**
	 * Dish
	 * @type Recipe
	 */
	dish: null,
	/**
	 * Dessert
	 * @type Recipe
	 */
	dessert: null,
	/**
	 * Drink
	 * @type Recipe
	 */
	drink: null,
	
	/**
	 * @construct
	 */
	initialize: function(starter, dish, dessert, drink, table) {
		this.table = table;
		this.starter = starter;
		this.dish = dish;
		this.dessert = dessert;
		this.drink = drink;
		this.setState('Wait');
	},
	
	// Methods
	_validRecipe: function(object) {
		return (object != null && object instanceof Recipe);
	},
	/**
	 * Get duration of menu
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int The duration of the menu
	 */
	getDurationMenu: function() {
		var duration = 0;
		if(this._validRecipe(this.starter)) duration += this.starter.getDuration();
		if(this._validRecipe(this.dish)) duration += this.dish.getDuration();
		if(this._validRecipe(this.dessert)) duration += this.dessert.getDuration();
		if(this._validRecipe(this.drink)) duration += this.drink.getDuration();
		return duration;
	},
	/**
	 * Get duration of menu in millisecond
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int The duration of the menu
	 */
	getDurationMenuInMs: function() {
		return this.getDurationMenu() * 100;
	},
	/**
	 * Return the size of the menu
     * @author Yannick Galatol
	 * @return Integer the size of the menu
	 */
	size: function() {
		var size = 0;
		
		// Dish need 1 space in the Waiter inventory
		if (this.dish != null) {
			size++;
		}
		
		// 1 space is required for one or two items between starter and dessert 
		if ((this.starter != null) || (this.dessert != null)) {
			size++;
		}
		
		return size;
	},
    setTable : function(tableNum) {
        this.table = tableNum;
    }
};
var Menu = new JS.Class(MenuClass);

/**
 * Group states declaration
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/10/2011
 * @module Group
 */
Menu.states({
	Wait: {},
    Cooking: {},
	Ready: {},
	Use: {},
	Finish: {}
});