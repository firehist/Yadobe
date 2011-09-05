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
	/**
	 * Luigi information
	 */
	luigi: {},
	// Constructor
	/**
	 * @constructor
	 * @class KitchenPlace
	 * @method initialize
	 * @param {KitchenPlace} model
	 */
	initialize: function(model) {
		this.model = model;
		this.container = new Container();
		this.addMouseListener();
		this.createLuigi();
		this.createKitchen();
	},
	/**
	 * Get kitchen container
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 29/08/2011
	 * @return Container The kitchen container
	 */
	getContainer: function() {
		return this.container;
	},
	/**
	 * Create kitchen gaphic with image
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 29/08/2011
	 */
	createKitchen: function() {
		var kitchen = new Bitmap(DINNERCONST.IMAGE.kitchen);
		kitchen.x = DINNERCONST.POSITION.kitchen.x;
		kitchen.y = DINNERCONST.POSITION.kitchen.y;
		this.container.addChildAt(kitchen, 2);
	},
	/**
	 *
	 */
	createLuigi: function() {
		this.luigi.state = false;
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.luigiWalk, 128, 128);
		this.luigi.anim = new BitmapSequence(sprite);
		this.initLuigiPosition();
		this.luigi.anim.paused = true;
		this.container.addChildAt(this.luigi.anim, 1);
	},
	initLuigiPosition: function() {
		this.luigi.anim.x = Yadobe.getInstance().canvas.width + 10;
		this.luigi.anim.y = DINNERCONST.POSITION.kitchen.y - 50;
	},
	setLuigiAnimated: function() {
		var xMin = Yadobe.getInstance().canvas.width - 250 + (this.model.readyMenuList.length * 50);
		if(this.luigi.anim.x <= xMin) {
			this.luigi.anim.paused = true;
		} else {
			this.luigi.anim.paused = false;
			this.luigi.anim.x -= 5;
		}
	},
	/**
	 * Call each refresh canvas
	 */
	update: function() {
		if(this.model.animateMenuList.length > 0) {
			this.setLuigiAnimated();
		}
	},
	/**
	 * Event listener
	 * @TODO create a EventListener Class in dinner module
	 */
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
