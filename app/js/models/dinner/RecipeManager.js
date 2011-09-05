/**
 * RecipeManager class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var RecipeManagerClass = {
	// Attributes
	/**
	 * List of all starter recipes
	 * @param mixed listRecipes
	 */
	listRecipes: { 
		starter: {},
		dish: {},
		dessert: {},
		drink: {}
	},
	// Constructor
	initialize: function() {
		RecipeManager.instance = this;
		for(var type in YADOBECONST.RECIPES) {
			for(var recipe in YADOBECONST.RECIPES[type]) {
				var tmp = YADOBECONST.RECIPES[type][recipe];
				this.createRecipe(tmp.name, tmp.duration, type, tmp.price);
			}
		}
	},
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
	},
	createRandomMenu: function() {
		//return new Menu(
		//	this.getStarter(Tools.randomXToY(0, this.listRecipes.starter);
	}
};
var RecipeManager = new JS.Class(RecipeManagerClass);

RecipeManager.instance = null;
RecipeManager.getInstance = function() {
	if(RecipeManager.instance != null) {
		return RecipeManager.instance;
	} else {
		return new RecipeManager();
	}
}
