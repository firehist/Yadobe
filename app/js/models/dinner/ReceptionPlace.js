/**
 * ReceptionPlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var ReceptionPlace = new JS.Class(Place, {
	// Attributes
	_timer: null,
	/**
	 * List of group waiting to reception desk
	 * @var List<Group> groupList
	 */
	groupList: new Array(),
	/**
	 * Max length of groupList
	 * @var int maxGroupList
	 */
	maxGroupList: 2,
	// Constructor
	initialize: function(name, maxGroupList) {
		this.callSuper(name);
		this.maxGroupList = maxGroupList;
		// Launch Time Manager for Create Group
		TimeManager.setTimer('createGroup', this.createGroup, this);
	},
	// Methods
	/**
	 * Test if groupList is empty
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * return boolean true groupList is empty, false else
	 */
	_isGroupEmpty: function() {
		return this.menuList.length == 0;
	},
	/**
	 * Compute the table bill by adding all menu price
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int
	 */
	getPriceTable: function() {
		var price = 0;
		if(!this._isGroupEmpty()) {
			for(var i in this.menuList) {
				var menu = this.menuList[i];
				if(menu instanceof Menu) {
					price += menu.getPriceMenu();
				}
			}
		}
		return price;
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
	 * Add a group to the list if reception
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return boolean true if successful, false else
	 */
	addGroup: function(group) {
		if( (this.groupList.length < this.maxGroupList) && (group instanceof Group) ) {
			this.groupList.push(group);
			return true;
		}
		return false;
	},
	/**
	 * Get the current group list length
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int the current group list length
	 */
	getGroupListLength: function(){
		return this.groupList.length;
	},
	/**
	 * 
	 */
	createGroup: function() {
		// @TODO add test for create group
		var g = Group.Factory.newInstance();
		this.addGroup(g);
	}
});