/**
 * TablePlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var TablePlaceGraphClass = {
	className: 'TablePlaceGraphClass',
    // Attributes
	/**
	 * Model of TablePlaceGraph
	 * @type TablePlace
	 */
	model: null,
	/**
	 * Refer to the group which actually are at the table
	 * @type {GroupGraph}
	 */
	groupGraph: null,
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
		var index = parseInt(this.model.name, 10);
		table.x = DINNERCONST.POSITION.tables[index].coord.x;
		table.y = DINNERCONST.POSITION.tables[index].coord.y;
		this.container.addChildAt(table, 0);
	},
	setGroupGraph: function(groupGraph) {
		this.groupGraph = groupGraph;
	},
	getGroupGraph: function() {
		return this.groupGraph;
	},
	addMouseListener: function() {
		(function(target, obj) {
			target.onPress = function() {
				if(!target.clicked) {
					console.log('Table clicked');
					DinnerGamePage.getInstance().linkGroupWithTable(obj);
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
		})(this.container, this);
	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
