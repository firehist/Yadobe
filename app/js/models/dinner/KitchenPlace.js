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
	 * @property pendingMenuList
	 * @type Array
	 * @default Array
	 */
	pendingMenuList: new Array(),
	/**
	 * List of menu ready
	 * @property readyMenuList
	 * @type List<Menu>
	 * @default Array
	 */
	readyMenuList: new Array(),
	/**
	 * Max length of menuList
	 * @property maxGroupList
	 * @type int
	 * @default 10
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
	 * @return int sum of two menu list
	 */
	_getTotalLength: function() {
		return this.pendingMenuList.length + this.readyMenuList.length;
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
	 * @param {int} menu
	 * @return boolean true if successful, false else
	 */
	addMenu: function(menu) {
		if(this._getTotalLength() < this.maxMenuList && menu instanceof Menu.klass) {
			this.pendingMenuList.push(menu);
			return true;
		}
		return false;
	},
	/**
	 * Switch the first menu to ready state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return boolean true if successful, false else
	 */
	setReady: function() {
		if(this.pendingMenuList.length > 0) {
			this.readMenuList.push( this.pendingMenuList.shift() );
			return true;
		}
		return false;
	}
};
var KitchenPlace = new JS.Class(Place, KitchenPlaceClass);