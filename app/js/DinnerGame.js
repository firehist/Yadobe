/**
 * @property RecipeManager recipe
 */
var DinnerGame = new JS.Class({
	// Attributes
	recipes: null,
	kitchen: null,
	reception: null,
	tables: null,
	// Constructor
	initialize: function() {
		console.log('init');
		this.recipes = RecipeManager.Factory.newInstance();
		this.kitchen = new KitchenPlace('Cuisine', 10);
		this.reception = new ReceptionPlace('Réception', 3);
		this.tables = new Array();
		var colors = ['red','orange','green','red'];
		for(var i=1; i<=4; i++) {
			this.tables.push(new TablePlace('Table ' + i, colors[i]));
		}
	}
	
});