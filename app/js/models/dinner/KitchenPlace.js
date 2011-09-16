/**
 * KitchenPlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var KitchenPlaceClass = {
	// Attributes
	/**
	 * List of menu waiting to be cook
	 * @type Array
	 */
	pendingMenuList: [],
	/**
	 * List of menu in kitchen
	 * @type int
	 */
	cookingMenuList: [],
	/**
	 * List of menu waiting for animation
	 * @type int
	 */
	animateMenuList: [],
	/**
	 * List of menu ready
	 * @type Object of menu which are ready
	 */
	readyMenuList: {},
	/**
	 * Max length of menuList
	 * @type int
	 */
	maxMenuList: 10,
	// Constructor
	/**
	 * @constructor
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 * @param {String} name
	 * @param {int} maxMenuList
     * @param {Point} coordinates Grid coordinates to access the place by the waiter
	 */
	initialize: function(name, maxMenuList, coordinates) {
		this.callSuper(name, coordinates);
		if(maxMenuList)	this.maxMenuList = maxMenuList;
	},
	// Methods
	/**
	 * Get the total menu in kitchen
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int sum of three menu list
	 */
	_getTotalLength: function() {
		return this.pendingMenuList.length + this.cookingMenuList.length + Tools.ObjSize(this.readyMenuList);
	},
	/**
	 * Run action of reception with moving group to a table
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	runAction: function(menuGraph) {
		/*
		if(Tools.ObjSize(this.readyMenuList) > 0) {
			// @TODO Envoyer ordre de déplacement au serveur avec un callback
			var callback = function(){
				DinnerGamePage.getInstance().kitchen.removePlate(menuGraph);
			};
			DinnerGamePage.getInstance().kitchen.removePlate(menuGraph);
			DinnerGamePage.getInstance().updateConsoleLog('Kitchen clicked - Menu dépilé et ajouter au serveur');
		}
		else {
			DinnerGamePage.getInstance().updateConsoleLog('Kitchen clicked - Pas d\'action');
		}
		 */
	},
	/**
	 * Add a menu to the list
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param menu Menu
	 * @return boolean true if successful, false else
	 */
	addMenu: function(menu) {
		if ((this._getTotalLength() < this.maxMenuList) && (menu instanceof Menu)) {
			this.pendingMenuList.push(menu);
			this.launchCook();
			return true;
		}
		return false;
	},
	/**
	 * Launch the cook of next menu if exist and if cooking list are not full
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 05/09/2011
	 */
	launchCook: function() {
		
        // Test if menu are pending
		if (this.pendingMenuList.length > 0) {
			
            // Test if kitchen is not full
			if (this.cookingMenuList < DINNERCONST.COOK.maxCooking) {
				var menu = this.pendingMenuList.shift();
				this.cookingMenuList.push( menu );
				
                //TimeManager.setCookTimer(menu.getDurationMenuInMs(), this, menu);
				TimeManager.setCookTimer(2000, this, menu);
			}
		}
	},
	/**
	 * Switch the first menu to ready state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return boolean true if successful, false else
	 */
	setReady: function() {
		if(this.cookingMenuList.length > 0) {
			this.animateMenuList.push( this.cookingMenuList.shift() );
			this.launchCook();
			return true;
		}
		return false;
	},
	/**
	 * Switch the first menu in animation to readyList
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	setReadyDone: function() {
		if(this.animateMenuList.length > 0) {
			var menu = this.animateMenuList.shift();
			this.readyMenuList[menu.toString()] = menu;
		}
	},
	/**
	 * Remove the selected menu
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 06/09/2011
	 */
	removeMenu: function(menu) {
		if(this.readyMenuList[menu.toString()]) {
			delete this.readyMenuList[menu.toString()];
		}
	}
};
var KitchenPlace = new JS.Class(Place, KitchenPlaceClass);
