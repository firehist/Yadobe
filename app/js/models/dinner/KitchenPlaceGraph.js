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
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Kitchen clicked');
				}
			}
			target.onMouseOver = function() {
				if(!target.clicked) {
					target.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target.onMouseOut = function() {
				if(!target.clicked) {
					target.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this.container);
	}
	// Methods
};
var KitchenPlaceGraph = new JS.Class(KitchenPlaceGraphClass);
