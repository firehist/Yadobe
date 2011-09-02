/**
 * ReceptionPlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var ReceptionPlaceGraphClass = {
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
		this.createReception();
	},
	getContainer: function() {
		return this.container;
	},
	createReception: function() {
		var reception = new Bitmap(DINNERCONST.IMAGE.reception);
		reception.x = DINNERCONST.POSITION.reception.x;
		reception.y = DINNERCONST.POSITION.reception.y;
		this.container.addChildAt(reception, 0);
	},
	addMouseListener: function() {
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Reception clicked');
				}
			}
			target.onMouseOver = function() {
				if(!target.clicked) {
					target.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.update = true;
				}
			}
			target.onMouseOut = function() {
				if(!target.clicked) {
					target.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.update = true;
				}
			}
		})(this.container);
	}
	// Methods
};
var ReceptionPlaceGraph = new JS.Class(ReceptionPlaceGraphClass);
