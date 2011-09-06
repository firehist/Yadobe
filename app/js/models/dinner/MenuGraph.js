/**
 * Menu class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/09/2011
 **/
var MenuGraphClass = {
	// Includes
	include: JS.State,
	// Attributes
	/**
	 * Menu model related to this Graph
	 * @type Menu
	 */
	model: null,
	/**
	 * The menu bitmap Sequence
	 * @type BitmapSequence
	 */
	menu: null,
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param model Menu
	 */
	initialize: function(model) {
		this.model = model;
		this.createMenuPlace();
		this.addMouseListener();
		this.setState('Nothing');
	},
	/**
	 * Create the bitmapSequence for this menuGraph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	createMenuPlace: function() {
		var frameData = {empty: 0, fish: 1, meat:2, ready1: 3, ready2: 4, ready3: 5, ready4: 6};
		var sprite = new SpriteSheet( DINNERCONST.IMAGE.plates, 30, 30, frameData);
		this.menu = new BitmapSequence(sprite);
		this.menu.scaleX = this.menu.scaleY = 1.2;
	},
	/**
	 * Combinate update function with a setState
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @para state State string
	 */
	changeState: function(state) {
		this.setState(state);
		this.update();
	},
	/**
	 * Set new position for menuGraph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param x The x coordinate
	 * @param y The y coordinate
	 */
	setPosition: function(x, y) {
		this.menu.x = x;
		this.menu.y = y;
	},
	/**
	 * Mouse event listener
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	addMouseListener: function() {
		(function(menuGraph) {
			var object = menuGraph.menu;
			console.debug(object);
			object.onPress = function(e) {
				if(!object.clicked) {
					DinnerGamePage.getInstance().kitchen.runAction(menuGraph);
				}
			}
			object.onMouseOver = function() {
				console.debug('lol');
				if(!object.clicked) {
					object.alpha = 0.9;
					$('body').css('cursor', 'pointer');
				}
			}
			object.onMouseOut = function() {
				console.debug('lol');
				if(!object.clicked) {
					object.alpha = 1;
					$('body').css('cursor', 'default');
				}
			}
		})(this);
	}
};
var MenuGraph = new JS.Class(MenuGraphClass);

/**
 * MenuGraph states declaration
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/01/2011
 */
MenuGraph.states({
	/**
	 * Not visible
	 */
	Nothing: {
		update: function() {
			this.menu.visible = false;
		}
	},
	/**
	 * Fish plate
	 */
	FullFish: {
		update: function() {
			this.menu.gotoAndStop("meat");
			this.menu.visible = true;
		}
	},
	/**
	 * Meat plate
	 */
	FullMeat: {
		update: function() {
			this.menu.gotoAndStop("fish");
			this.menu.visible = true;
		}
	},
	/**
	 * Empty plate
	 */
	Empty: {
        update: function() {
			this.menu.gotoAndStop("empty");
			this.menu.visible = true;
        }
    },
	/**
	 * Plate with number of table for kitchen
	 */
	Ready: {
		update: function() {
			this.menu.gotoAndStop("ready" + this.model.table);
			this.menu.visible = true;
		}
	}
});