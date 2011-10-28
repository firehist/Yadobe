/**
 * RecipeManager class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 **/
var RecipeManagerClass = {
	// Attributes
	/**
	 * List of all starter recipes
	 * @param mixed listRecipes
	 */
	listRecipes: { 
		starter: [],
		dish: [],
		dessert: [],
		drink: []
	},
	// Constructor
	/**
	 * @constructor
	 */
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
	 * Get recipe object
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return mixed recipe object or false if an error occured
	 */
	getRecipe: function(name, type) {
		for (var index in this.listRecipes[type]) {
			if (this.listRecipes[type][index].name === name) {
				return this.listRecipes[type][index];
			}
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
	 * @param name String The name of recipe
	 * @param duration int The duration of recipe
	 * @param type String (starter, dish, dessert or drink)
	 * @param price float The price of this recipe
	 */
	createRecipe: function(name, duration, type, price) {
		this.listRecipes[type].push(new Recipe(name, duration, type, price));
	},
	/**
	 * Generate random menu
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 05/09/2011
	 * @return Menu random menu
	 */
	createRandomMenu: function() {
        return new Menu(
			this.listRecipes.starter[Tools.randomXToY(0, this.listRecipes.starter.length - 1)],
			this.listRecipes.dish[Tools.randomXToY(0, this.listRecipes.dish.length - 1)],
			this.listRecipes.dessert[Tools.randomXToY(0, this.listRecipes.dessert.length - 1)],
			this.listRecipes.drink[Tools.randomXToY(0, this.listRecipes.drink.length - 1)],
			-1
		);
	}
};
var RecipeManager = new JS.Class(RecipeManagerClass);

/**
 * RecipeManager singleton managment
 * @author BenjaminLongearet
 * @since 30/08/2011
 * @type RecipeManager
 * @static
 */
RecipeManager.instance = null;

/**
 * @author BenjaminLongearet
 * @since 30/08/2011
 * @return RecipeManager
 * @static
 */
RecipeManager.getInstance = function() {
	if(RecipeManager.instance != null) {
		return RecipeManager.instance;
	}
	else {
		return new RecipeManager();
	}
};
