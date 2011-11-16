/**
 * DinnerGamePage class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class DinnerGamePage
 */
var DinnerGamePageClass = {
	// Debug information
	debug: true,
	debugClassName: 'DinnerGamePage',
	// Attributes
	text: null,
	/**
	 * @type {KitchenPlaceGraph}
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
	 * @type {WaiterGraph}
	 */
	waiter: null,
	/**
	 * List of menuGraph
	 * @type {MenuGraph}
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
		this.pageContainer.addChildAt(this.kitchen.getGraph(), DINNERCONST.SCENES.kitchen);
		
		// Reception
		var receptionModel = new ReceptionPlace('Réception', 4, DINNERCONST.ACCESS.reception);
		this.reception = new ReceptionPlaceGraph(receptionModel);
		this.pageContainer.addChildAt(this.reception.getGraph(), DINNERCONST.SCENES.reception);
		
		// Tables
		this.tables = new Array();
		var colors = ['red','blue','green','yellow'];
		for (var i=0; i<colors.length; i++) {
			Debug.log(this, 'initialize', 'table: ' +  i + ' START');
            var tableModel = new TablePlace(i + 1, colors[i], DINNERCONST.ACCESS.tables[i]);
			Debug.log(this, 'initialize', 'model ok');
			var tableGraph = new TablePlaceGraph(tableModel);
			Debug.log(this, 'initialize', 'graph ok');
			this.tables.push(tableGraph);
			this.pageContainer.addChildAt(tableGraph.getGraph(), DINNERCONST.SCENES.tables[i]);
			Debug.log(this, 'initialize', 'table: ' +  i + ' END');
		}
        
		// Waiter
		// Display the waiter on the kitchen at the beginning
		var waiterModel = new Waiter('Serveur', kitchenModel, 1);
		this.waiter = new WaiterGraph(waiterModel);
		this.pageContainer.addChild(this.waiter.getGraph());
	},
	/**
	 * Refresh the elements of the game
	 */
	tick: function() {
		// Refresh the kitchen
		if ((this.kitchen) && (this.kitchen instanceof KitchenPlaceGraph)) {
			this.kitchen.update();
		}
		
		// Refresh the waiter
		if ((this.waiter) && (this.waiter instanceof WaiterGraph)) {
			this.waiter.update();
        }

        // Refresh the group
        var groupGraphList = DinnerGamePage.getInstance().groupList;
        for(var i=0; i<groupGraphList.length; i++) {
            if (!groupGraphList[i].model.inState('IsGone')) {
                groupGraphList[i].update();
            }
        }
		
        // Refresh the menu graph list
        var menuGraphList = DinnerGamePage.getInstance().menuList;
        for(i=0; i<menuGraphList.length; i++) {
               menuGraphList[i].update();
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
		Debug.log(this, 'launch', 'Timer for createGroup launched');
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
		//this.reception.pause();
        TimeManager.stopDinnerTimer('createGroup', this);
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
			if (this.groupList[i].model.inState("QueuingUpBusy") || this.groupList[i].model.inState("QueuingUpWaiting")) {
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
		if (this.getNumOfGroupInRecep() < this.reception.model.maxGroupList) {
			var g = Group.Factory.newInstance();
            Debug.log(this, 'createGroup', 'Groupe created ('+g+'): ' + g.name);
			this.addGroup(g);
            this.reception.model.waitingGroups.push(g);
		}
	},
    /**
     * @author DJE
     * @since 08/09/2011
     */
    addGroup: function(groupModel) {
        var groupGraph = new GroupGraph(groupModel);
        this.groupList.push(groupGraph);
        //this.pageContainer.addChildAt(groupGraph.getGraph(), DINNERCONST.SCENES.group);
        this.pageContainer.addChild(groupGraph.getGraph());
    },
    /**
     * @author Dominique Jeannin <jeannin.dominique@gmail.com>
     * @since 13/09/2011
     */
    getIndexOfFirstEmpty: function(expectedGroup) {
        var waitingGroups = this.reception.model.waitingGroups;
        counter = 0;
        for (var i=0; i<waitingGroups.length; i++) {
            if (waitingGroups[i] === expectedGroup) {
                counter = i;
                break;
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