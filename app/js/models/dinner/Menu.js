/**
 * Menu class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 * @class
 **/
var MenuClass = {
	// Attributes
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
	// Constructor
	initialize: function(starter, dish, dessert, drink) {
		this.starter = starter;
		this.dish = dish;
		this.dessert = dessert;
		this.drink = drink;
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
	}	
};
var Menu = new JS.Class(MenuClass);