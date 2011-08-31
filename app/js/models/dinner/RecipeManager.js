/**
 * RecipeManager class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var RecipeManager = new JS.Class({
	// Attributes
	/**
	 * List of all starter recipes
	 * @param mixed listRecipes
	 */
	listRecipes: { 
		'starter': {},
		'dish': {},
		'dessert': {},
		'drink': {}
	},
	// Constructor
	initialize: function() {},
	// Methods
	/**
	 * Get duration of menu
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int The duration of the menu
	 */
	existRecipe: function(name, type) {
		return (this.listRecipes[type][name] && this.listRecipes[type][name] instanceof Recipe);
	},
	/**
	 * Get recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getRecipe: function(name, type) {
		if(this.existRecipe(name, type)) {
			return this.listRecipes[type][name]
		}
		return false;
	},
	/**
	 * Get starter recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getStarter: function(name) {
		return this.getRecipe(name, 'starter');
	},
	/**
	 * Get dish recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getDish: function(name) {
		return this.getRecipe(name, 'dish');
	},
	/**
	 * Get dessert recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getDessert: function(name) {
		return this.getRecipe(name, 'dessert');
	},
	/**
	 * Get drink recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getDrink: function(name) {
		return this.getRecipe(name, 'drink');
	},
	/**
	 * Add recipe to manager
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	createRecipe: function(name, duration, type, price) {
		this.listRecipes[type][name] = new Recipe(name, duration, type, price);
	},
	/**
	 * Shortcut for createRecipe
	 */
	createStarterRecipe: function(name, duration, price) {
		this.createRecipe(name, duration, 'starter', price);
	},
	createDishRecipe: function(name, duration, price) {
		this.createRecipe(name, duration, 'dish', price);
	},
	createDessertRecipe: function(name, duration, price) {
		this.createRecipe(name, duration, 'dessert', price);
	},
	createDrinkRecipe: function(name, duration, price) {
		this.createRecipe(name, duration, 'drink', price);
	}
});

RecipeManager.Factory = {};
RecipeManager.Factory.newInstance = function() {
	var r = new RecipeManager();
	r.createRecipe('Steak', 30, 'dish', 15);
	r.createRecipe('Poisson', 35, 'dish', 12);
	r.createRecipe('Salade du chef', 10, 'starter', 10);
	r.createRecipe('Coco-Cala', 5, 'drink', 2);
	r.createRecipe('Mousse au chocolat', 10, 'dessert', 5);
	return r;
};