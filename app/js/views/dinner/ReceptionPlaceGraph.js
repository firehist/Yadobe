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
			target.container.onPress = function(e) {
				if(!target.container.clicked) {
                    var destination = new Destination(target.model, function() {
                        DinnerGamePage.getInstance().updateConsoleLog('Arrived to ' + target.model.name);
                    });
					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
				}
			}
			target.container.onMouseOver = function() {
				if(!target.container.clicked) {
					target.container.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target.container.onMouseOut = function() {
				if(!target.container.clicked) {
					target.container.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this);
	}
	// Methods
};
var ReceptionPlaceGraph = new JS.Class(ReceptionPlaceGraphClass);
