/**
 * DinnerGamePage class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGamePage
 */
var DinnerGamePageClass = {
    className: 'DinnerGamePageClass',
	// Attributes
	text: null,
	/**
	 * @type KitchenPlaceGraph
	 */
	kitchen: null,
	/**
	 * @type ReceptionPlaceGraph
	 */
	reception: null,
	/**
	 * The list of TablePlaceGraph
	 * @type Array of TablePlaceGraph
	 */
	tables: new Array(),
	/**
	 * The waiterGraph
	 * @type WaiterGraph
	 */
	waiter: null,
	/**
	 * List of menuGraph
	 * @type MenuGraph
	 */
	menuList: [],
    /**
	 * List of groupGraph
	 * @type GroupGraph
	 */
	groupList: [],
	/**
	 * Record a selected group to set it in selected table
	 * @type GroupGraph
	 */
	groupGraphSelected: null,
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	initialize: function() {
		
        // Init Page Container
		this.callSuper();
		
        // Init background
		this.createBackground();
		this.createConsoleLog();
		
        // Kitchen
		var kitchenModel = new KitchenPlace('Cuisine', DINNERCONST.COOK.maxMenuInKitchen, DINNERCONST.ACCESS.kitchen);
		this.kitchen = new KitchenPlaceGraph(kitchenModel);
		this.pageContainer.addChildAt(this.kitchen.getContainer(), DINNERCONST.SCENES.kitchen);
		// Reception
		var receptionModel = new ReceptionPlace('Reception', 6);
		this.reception = new ReceptionPlaceGraph(receptionModel);
		this.pageContainer.addChildAt(this.reception.getContainer(), DINNERCONST.SCENES.reception);
		
        // Tables
		this.tables = new Array();
		var colors = ['red','blue','green','yellow'];
		for (var i=0; i<4; i++) {
            console.debug("DINNERCONST.POSITION.tables[i].coord: " + DINNERCONST.POSITION.tables[i].coord);
			var tableModel = new TablePlace(i, colors[i], DINNERCONST.POSITION.tables[i].coord);
			var tableGraph = new TablePlaceGraph(tableModel);
			this.tables.push(tableGraph);
			this.pageContainer.addChildAt(tableGraph.getContainer(), DINNERCONST.SCENES.tables[i]);
		}
	},
	createConsoleLog: function() {
		var log = new Shape();
		log.graphics.beginStroke("#000000").beginFill("#CCCCCC").drawRoundRect(10, 10, 250, 50, 5);
		this.pageContainer.addChild(log);
		this.text = new Text('', '12px normal Verdana', '#000000');
		this.text.x = 30;
		this.text.y = 30;
		this.text.maxWidth = 220;
		this.text.maxHeight = 20;
		this.pageContainer.addChild(this.text);
	},
	updateConsoleLog: function(newText) {
		this.text.text = newText;
	},
	createBackground: function() {
		var background = new Bitmap(DINNERCONST.IMAGE.background);
		background.x = 0;
		background.y = 0;
		this.pageContainer.addChildAt(background, DINNERCONST.SCENES.background);
	},
	/**
	 * Launch the game
	 * @clas DinnerGamePage
	 * @method launch
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	launch: function() {
		console.debug("DinnerGamePage.launch()");
        TimeManager.setDinnerTimer('createGroup', this.createGroup, this);
	},
	/**
	 * Pause the game
	 * @class DinnerGamePage
	 * @method pause
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	pause: function() {
		this.reception.pause();
	},
	/**
	 * Get the current group list length
	 * @class ReceptionPlace
	 * @method getGroupListLength
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int the current group list length
	 */
	getGroupListLength: function(){
		return this.groupList.length;
	},
	getNumOfGroupInRecep: function() {
		var counter = 0;
		for (var i=0; i<this.groupList.length; i++) {
			if (this.groupList[i].inState("Walking2Reception") || this.groupList[i].inState("Waiting")) {
				counter++;
			}
		}
		return counter;
	},
	/**
	 * Create a random group
	 * @class ReceptionPlace
	 * @method createGroup
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	createGroup: function() {
        console.debug("DinnerGamePage.createGroup()");
		if (this.reception.getMaxGroupList() > this.getNumOfGroupInRecep()) {
            console.debug('Create Group');
			var g = Group.Factory.newInstance();
			this.addGroup(g);
		}
	},
    /**
     * @author DJE
     * @since 08/09/2011
     */
    addGroup: function(groupModel) {
        var groupGraph = new GroupGraph(groupModel);
        this.groupList.push(groupGraph);
        this.pageContainer.addChildAt(groupGraph.getContainer(), DINNERCONST.SCENES.group);
    },
	/**
	 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
	 * @since 12/09/2011
	 */
	linkGroupWithTable: function(obj) {
        console.debug("[DinnerGamePage] linkGroupWithTable: obj is instanceof :" + obj.className);
		if (obj.className == "GroupGraphClass") {
            //console.debug("linkGroupWithTable: a groupgrpah is selected");
			this.groupGraphSelected = obj;
		} else if (obj.className == "TablePlaceGraphClass") {
            //console.debug("[DinnerGamePage] linkGroupWithTable: a table is selected");
            // search index corresponding to table's color
            for (var i=0; i<DINNERCONST.POSITION.tables.length; i++) {
                if (DINNERCONST.POSITION.tables[i].name == obj.model.color) {
				    console.debug("linkGroupWithTable: setState at ReadMenu");
                    //this.groupGraphSelected.goToTablePoint = DINNERCONST.POSITION.tables[i].coord;
					this.groupGraphSelected.setState('ReadMenu');
					obj.setGroupGraph(this.groupGraphSelected);
					this.groupGraphSelected._graph.x = DINNERCONST.POSITION.tables[i].coord.x;
					this.groupGraphSelected._graph.y = DINNERCONST.POSITION.tables[i].coord.y;
                    break;
                }
            }
		}
	},
    /**
     * @author Dominique Jeannin <jeannin.dominique@gmail.com>
     * @since 13/09/2011
     */
    getIndexOfFirstEmpty: function() {
        //TODO: this must be done by ReceptionPlace model
        var counter = 0;
        for (var i=0; i<this.groupList.length; i++) {
            if (!this.groupList[i].model.isGone) {
                counter++;
            }
        }
        return counter;
    }
};
var DinnerGamePage = new JS.Class(Page, DinnerGamePageClass);

// Static attribute
DinnerGamePage.instance = null;

// Static method singleton
DinnerGamePage.getInstance = function() {
	if ((DinnerGamePage.instance == null) || (!DinnerGamePage.instance instanceof DinnerGamePage)) {
		DinnerGamePage.instance = new DinnerGamePage();
	}
    return DinnerGamePage.instance;
};