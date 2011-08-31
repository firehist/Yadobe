/**
 * KitchenPlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var KitchenPlace = new JS.Class(Place, {
	// Attributes
	/**
	 * List of menu waiting to be cook
	 * @var List<Menu> pendingMenuList
	 */
	pendingMenuList: new Array(),
	/**
	 * List of menu ready
	 * @var List<Menu> readyMenuList
	 */
	readyMenuList: new Array(),
	/**
	 * Max length of menuList
	 * @var int maxGroupList
	 */
	maxMenuList: 10,
	// Constructor
	initialize: function(name, maxMenuList) {
		this.callSuper(name);
		if(maxMenuList)	this.maxMenuList = maxMenuList;
	},
	// Methods
	/**
	 * Get the total menu in kitchen
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int sum of two menu list
	 */
	_getTotalLength: function() {
		return this.pendingMenuList.length + this.readyMenuList.length;
	},
	/**
	 * Run action of reception with moving group to a table
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return Group The first group of list
	 */
	runAction: function() {
		if(!this._isGroupEmpty) {
			return this.groupList.shift();
		}
		return null;
	},
	/**
	 * Add a menu to the list
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param Menu menu
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
	 * @param int menu index
	 * @return boolean true if successful, false else
	 */
	setReady: function() {
		if(this.pendingMenuList.length > 0) {
			this.readMenuList.push( this.pendingMenuList.shift() );
			return true;
		}
		return false;
	}
});