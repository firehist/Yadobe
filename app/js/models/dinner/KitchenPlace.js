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
	pendingMenuList: new Array(),
	/**
	 * List of menu in kitchen
	 * @type int
	 */
	cookingMenuList: new Array(),
	/**
	 * List of menu waiting for animation
	 * @type int
	 */
	animateMenuList: new Array(),
	/**
	 * List of menu ready
	 * @type List<Menu>
	 */
	readyMenuList: new Array(),
	/**
	 * Max length of menuList
	 * @type int
	 */
	maxMenuList: 10,
	// Constructor
	/**
	 * @constructor
	 * @class KitchenPlace
	 * @method initialize
	 * @param {String} name
	 * @param {int} maxMenuList
	 */
	initialize: function(name, maxMenuList) {
		this.callSuper(name);
		if(maxMenuList)	this.maxMenuList = maxMenuList;
		/** DEV **/
		this.readyMenuList.push()
	},
	// Methods
	/**
	 * Get the total menu in kitchen
	 * @class KitchenPlace
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int sum of three menu list
	 */
	_getTotalLength: function() {
		return this.pendingMenuList.length + this.cookingMenuList.length + this.readyMenuList.length;
	},
	/**
	 * Run action of reception with moving group to a table
	 * @class KitchenPlace
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	runAction: function() {
		if(this.readyMenuList.length > 0) {
			// @TODO Tester si serveur à côté
			// @TODO Tester si serveur peu recevoir objet
			//var group = this.groupList.shift();
			DinnerGamePage.getInstance().updateConsoleLog('Kitchen clicked - Menu dépilé et ajouter au serveur');
		} else {
			DinnerGamePage.getInstance().updateConsoleLog('Kitchen clicked - Pas d\'action');
		}

	},
	/**
	 * Add a menu to the list
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param menu Menu
	 * @return boolean true if successful, false else
	 */
	addMenu: function(menu) {
		if(this._getTotalLength() < this.maxMenuList && menu.klass === Menu) {
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
		if(this.pendingMenuList.length > 0) {
			// Test if kitchen are not full
			if(this.cookingMenuList < DINNERCONST.COOK.maxCooking) {
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
	setReadyDone: function() {
		this.readyMenuList.push( this.animateMenuList.shift() );
	}
};
var KitchenPlace = new JS.Class(Place, KitchenPlaceClass);
