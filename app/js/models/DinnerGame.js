/**
 * Dinner Game class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGame
 */
var DinnerGameClass = {
	// Attributes
	/**
	 * @type RecipeManager
	 */
	recipes: null,
	/**
	 * @type KitchenPlace
	 */
	kitchen: null,
	/**
	 * @type ReceptionPlace
	 */
	reception: null,
	/**
	 * @type Array
	 */
	tables: new Array(),
	// Constructor
	/**
	 * @constructor
	 * @class DinnerGame
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		console.log('Dinner Game init');
		this.recipes = RecipeManager.Factory.newInstance();
		this.kitchen = new KitchenPlace('Cuisine', 10);
		this.reception = new ReceptionPlace('Réception', 3);
		this.tables = new Array();
		var colors = ['red','orange','green','red'];
		for(var i=1; i<=4; i++) {
			this.tables.push(new TablePlace('Table ' + i, colors[i]));
		}
		
	},
	/**
	 * Launch the game
	 * @clas DinnerGame
	 * @method launch
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	launch: function() {
		this.reception.launch();
	},
	/**
	 * Pause the game
	 * @class DinnerGame
	 * @method pause
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	pause: function() {
		this.reception.pause();
	}
};
var DinnerGame = new JS.Class(DinnerGameClass);