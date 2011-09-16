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
	 * Display object available for the waiter
	 * @type {DisplayObject}
	 */
	_graph: null,
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
		this._graph = new Container();
		this.addMouseListener();
		this.createTable();
	},
	/**
	 * Get TablePlace graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The TablePlace graph
	 */
	getGraph: function() {
		return this._graph;
	},
	createTable: function() {
		var table = new Bitmap(DINNERCONST.IMAGE['table_' + this.model.color]);
		var index = parseInt(this.model.name.substr(5,this.model.name.length - 5), 10);
		table.x = DINNERCONST.POSITION.tables[index].x;
		table.y = DINNERCONST.POSITION.tables[index].y;
		this._graph.addChildAt(table, 0);
	},
	addMouseListener: function() {
		(function(target) {
			target._graph.onPress = function(e) {
				if (!target._graph.clicked) {
                    var destination = new Destination(target.model, function() {
                        DinnerGamePage.getInstance().updateConsoleLog('Arrived to ' + target.model.name);
                    });
					DinnerGamePage.getInstance().waiter.model.moveTo(destination);
				}
			};
			target._graph.onMouseOver = function() {
				if (!target.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			};
			target._graph.onMouseOut = function() {
				if (!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			};
		})(this);
	}
	// Methods
};
var TablePlaceGraph = new JS.Class(TablePlaceGraphClass);
