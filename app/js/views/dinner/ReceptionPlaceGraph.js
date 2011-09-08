/**
 * ReceptionPlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var ReceptionPlaceGraphClass = {
	// Attributes
	/**
	 * Model of ReceptionPlaceGraph
	 * @type ReceptionPlace
	 */
	model: null,
	/**
	 * @type array of GroupGraph
	 */
	groupGraphList: new Array(),
	/**
	 * Container for reception
	 * @type Container
	 */
	container: null,
	// Constructor
	/**
	 * @constructor
	 * @class ReceptionPlace
	 * @method initialize
	 * @param {ReceptionPlace} model
	 */
	initialize: function(model) {
		console.log('ReceptionPlaceGraph.initialize(model)');	
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
	update: function() {
        console.debug("not implemented");
	},
	addMouseListener: function() {
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Reception clicked');
					this.model.isSelected = !this.model.isSelected;
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
var ReceptionPlaceGraph = new JS.Class(ReceptionPlaceGraphClass);
