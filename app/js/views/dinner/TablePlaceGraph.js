/**
 * TablePlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
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
	// Constructor
	/**
	 * @constructor
	 * @class TablePlace
	 * @method initialize
	 * @param {TablePlace} model
	 */
	initialize: function(model) {
		console.log('TablePlaceGraph.initialize(model)');
		this.model = model;
		this.container = new Container();
		this.addMouseListener();
		this.createTable();
	},
	getContainer: function() {
		return this.container;
	},
	createTable: function() {
		var table = new Bitmap(DINNERCONST.IMAGE['table_' + this.model.color]);
		var index = parseInt(this.model.name.substr(5,this.model.name.length - 5), 10);
		table.x = DINNERCONST.POSITION.tables[index].x;
		table.y = DINNERCONST.POSITION.tables[index].y;
		this.container.addChildAt(table, 0);
	},
	addMouseListener: function() {
		(function(target) {
			target.container.onPress = function(e) {
				if (!target.container.clicked) {
                    var destination = new Destination(target.model, function() {
                        DinnerGamePage.getInstance().updateConsoleLog('Arrived to ' + target.model.name);
                    });
					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
				}
			}
			target.container.onMouseOver = function() {
				if (!target.clicked) {
					target.container.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			}
			target.container.onMouseOut = function() {
				if (!target.container.clicked) {
					target.container.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			}
		})(this);
	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
