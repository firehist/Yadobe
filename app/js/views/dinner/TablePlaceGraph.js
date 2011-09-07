/**
 * TablePlaceGraph class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 **/
var TablePlaceGraphClass = {
	// Attributes
	/**
	 * Model of TablePlaceGraph
	 * @type TablePlace
	 */
	model: null,
	/**
	 * Container for Table
	 * @type Container
	 */
	container: null,
	/**
	 * Icon object
	 * @type Bitmap
	 */
	icons: null,
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 07/09/2011
	 * @param model TablePlace
	 */
	initialize: function(model) {
		console.log('TablePlaceGraph.initialize(model)');
		this.model = model;
		this.container = new Container();
		this.addMouseListener();
		this.createTable();
		this.createIcons();
	},
	/**
	 * Get table container
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 * @return Container The table container
	 */
	getContainer: function() {
		return this.container;
	},
	/**
	 * Create the icons graphic
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 07/09/2011
	 */
	createIcons: function() {
		var frameData = {menu: 0, waiting: 1, payment: 2};
		var sprite = new SpriteSheet(DINNERCONST.IMAGE.bubbles, 64, 64, frameData);
		this.icons = new BitmapSequence(sprite);
		var index = parseInt(this.model.name, 10);
		this.icons.x = DINNERCONST.POSITION.tables[index].x + 10;
		this.icons.y = DINNERCONST.POSITION.tables[index].y - 10;
		this.container.addChildAt(this.icons, 1);
	},
	/**
	 * Create the table graphic
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	createTable: function() {
		var table = new Bitmap(DINNERCONST.IMAGE['table_' + this.model.color]);
		var index = parseInt(this.model.name, 10);
		table.x = DINNERCONST.POSITION.tables[index].x;
		table.y = DINNERCONST.POSITION.tables[index].y;
		this.container.addChildAt(table, 0);
	},
	/**
	 * Each action to update table graph
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 07/09/2011
	 */
	update: function() {
		// Icon update
		if(this.model.inState('WaitingForOrder')) {
			this.updateIcon('menu');
		} else if(this.model.inState('WaitingMeal')) {
			this.updateIcon('waiting');
		} else if(this.model.inState('WaitingForPaymentState')) {
			this.updateIcon('payment');
		} else {
			this.hideIcon();
		}
		//
	},
	/**
	 * Hide icon table
	 * @author Benjamin longearet <firehist@gmail.com>
	 * @since 07/09/2011
	 */
	hideIcon: function() {
		this.icons.visible = false;
	},
	/**
	 * Update the icon display (blink bubles)
	 * @author Benjamin longearet <firehist@gmail.com>
	 * @since 07/09/2011
	 */
	updateIcon: function(nameIcon) {
		var nb = Ticker.getTicks();
		if(this.icons.visible === true) nb = nb % 24;
		else nb = nb % 3;
		if(nb == 0) {
			this.icons.visible = !this.icons.visible;
			this.icons.gotoAndStop(nameIcon);
		}
	},
	/**
	 * Event on the table
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	addMouseListener: function() {
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Table clicked');
				}
			}
			target.onMouseOver = function() {
				if(!target.clicked) {
					target.shadow = new Shadow("#454", 0, 5, 4);;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target.onMouseOut = function() {
				if(!target.clicked) {
					target.shadow = null;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this.container);
	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
