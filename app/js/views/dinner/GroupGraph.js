/**
 * GroupGraph class
 * @since 02/09/2011
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module dinner
 */
var GroupGraphClass = {
    // Attributes
	/**
	 * Model of GroupGraph
	 * @type Group
	 */
    model: null,
	/**
	 * Display object available for the group
	 * @type {DisplayObject}
	 */
	_graph: null,
    /**
	 * @constructor
	 * @class GroupGraph
	 * @method initialize
	 * @param {GroupGrah} model
	 */
	initialize: function(model) {
		console.log('GroupGraph.initialize(model)');
		this.model = model;
		this._graph = new Container();
		this.addMouseListener();
	},
	/**
	 * Get group graph
     * @author Yannick Galatol <yannick.galatol@gmail.com>
     * @since 07/09/2011
	 * @return {DisplayObject} The group graph
	 */
	getGraph: function() {
		return this._graph;
	},
    /**
     * @method createGroup
     */
    createGroup: function() {
		var group = new Bitmap(DINNERCONST.IMAGE['_' + this.model.color]);
		group.x = DINNERCONST.POSITION.firstgroup.x;
		group.y = DINNERCONST.POSITION.firstgroup.y;
		this._graph.addChildAt(group, 0);
	},
    /**
     * @method addMouseListener
     */
    addMouseListener: function() {
		(function(target) {
			target.onPress = function(e) {
				if(!target.clicked) {
					console.log('Group clicked');
				}
			};
			target.onMouseOver = function() {
				if(!target.clicked) {
					target.alpha = 0.8;
					$('body').css('cursor', 'pointer');
					Yadobe.getInstance().setUpdate();
				}
			};
			target.onMouseOut = function() {
				if(!target.clicked) {
					target.alpha = 1;
					$('body').css('cursor', 'default');
					Yadobe.getInstance().setUpdate();
				}
			};
		})(this._graph);
	}

};

var GroupGraph = new JS.Class(GroupGraphClass);
