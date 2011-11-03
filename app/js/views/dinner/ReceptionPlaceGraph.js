/**
 * ReceptionPlaceGraph class
 * @since 01/09/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var ReceptionPlaceGraphClass = {
	// Debug information
	debug: true,
	debugClassName: 'ReceptionPlaceGraph',
	// Attributes
	/**
	 * Model of ReceptionPlaceGraph
	 * @type ReceptionPlace
	 */
	model: null,
	/**
	 * @type array of GroupGraph
	 */
	//groupGraphList: new Array(),
	/**
	 * Container for reception
	 * @type Container
	 */
	_graph: null,
	// Constructor
	/**
	 * @constructor
	 * @class ReceptionPlace
	 * @method initialize
	 * @param {ReceptionPlace} model
	 */
	initialize: function(model) {
		Debug.log(this, 'initialize', 'Initialisation avec model');
		Debug.log(this, 'initialize', model);
		this.model = model;
		this._graph = new Container();
		this.addMouseListener();
		this.createReception();
	},
	/**
	 * Get reception graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The reception graph
	 */
	getGraph: function() {
		return this._graph;
	},
	createReception: function() {
		var reception = new Bitmap(DINNERCONST.IMAGE.reception);
		reception.x = DINNERCONST.POSITION.reception.x;
		reception.y = DINNERCONST.POSITION.reception.y;
		this._graph.addChildAt(reception, 0);
	},
    getMaxGroupList: function() {
        return this.model.maxGroupList;
    },
	addMouseListener: function() {
		(function(target) {
		/*
			target._graph.onPress = function(e) {
				if(!target._graph.clicked) {
					Debug.log(target, 'addMouseListener.onPress', 'Reception clicked');
				}
			};
			target._graph.onMouseOver = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			};
			target._graph.onMouseOut = function() {
				if(!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			};
		*/
		})(this);
	}
	// Methods
};
var ReceptionPlaceGraph = new JS.Class(ReceptionPlaceGraphClass);
