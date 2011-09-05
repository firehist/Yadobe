/**
 * KitchenPlace class
 * @since 31/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var KitchenPlaceGraphClass = {
	// Attributes
	/**
	 * Model of KitchenPlaceGraph
	 * @type KitchenPlace
	 */
	model: null,
	/**
	 * Container for kitchen
	 * @type Container
	 */
	container: null,
	// Constructor
	/**
	 * @constructor
	 * @class KitchenPlace
	 * @method initialize
	 * @param {KitchenPlace} model
	 */
	initialize: function(model) {
		console.log('KitchenPlaceGraph.initialize(model)');	
		this.model = model;
		this.container = new Container();
		this.addMouseListener();
		this.createKitchen();
	},
	getContainer: function() {
		return this.container;
	},
	createKitchen: function() {
		var kitchen = new Bitmap(DINNERCONST.IMAGE.kitchen);
		kitchen.x = DINNERCONST.POSITION.kitchen.x;
		kitchen.y = DINNERCONST.POSITION.kitchen.y;
		this.container.addChildAt(kitchen, 0);
	},
	addMouseListener: function() {
		(function(kitchenPlaceGraph) {
			var container = kitchenPlaceGraph.container;
			container.onPress = function(e) {
				if(!container.clicked) {
					//DinnerGamePage.getInstance().updateConsoleLog('Kitchen clicked');
					kitchenPlaceGraph.model.runAction();
				}
			}
			container.onMouseOver = function() {
				if(!container.clicked) {
					container.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			container.onMouseOut = function() {
				if(!container.clicked) {
					container.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this);
	}
	// Methods
};
var KitchenPlaceGraph = new JS.Class(KitchenPlaceGraphClass);
