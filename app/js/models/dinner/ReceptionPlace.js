/**
 * ReceptionPlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 * @class ReceptionPlace
 **/
var ReceptionPlaceClass = {
	// Attributes
	/**
	 * The name of creation group Constante in DINNERCONST.TIME
	 * @var String _groupCreationTimer
	 * @private
	 */
	_groupCreationTimer: 'createGroup',
	/**
	 * List of group waiting to reception desk
	 * @var Array<Group> groupList
	 */
	//groupList: new Array(),
	/**
	 * Max length of groupList
	 * @var int maxGroupList
	 */
	maxGroupList: 5,
    /**
     * store the position int the queue
     * @type array of boolean
     */
    busyList: new Array(),
	/**
	 * @var bool isSelected
	 */
	isSelected: false,
	// Constructor
	/**
	 * @constructor
	 * @class ReceptionPlace
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @param {String} name Name of this place
	 * @param {int} maxGroupList Maximum waiting list
     * @param {Point} coordinates Grid coordinates to access the place by the waiter
	 */
	initialize: function(name, maxGroupList, coordinates) {
		console.log('Reception init');
		this.callSuper(name, coordinates);
		this.maxGroupList = maxGroupList;
	},
	// Methods
	/**
	 * Test if groupList is empty
	 * @class ReceptionPlace
	 * @method _isGroupEmpty
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @private
	 * @return boolean true groupList is empty, false else
	 * @private
	 */
	_isGroupEmpty: function() {
		return this.menuList.length == 0;
	},
	/**
	 * Launch the game
	 * @class ReceptionPlace
	 * @method launch
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011	 
	 */
	launch: function() {
		TimeManager.setDinnerTimer(this._groupCreationTimer, this.createGroup, this);
	},
	/**
	 * Pause the game
	 * @class ReceptionPlace
	 * @method pause
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011	 
	 */
	pause: function() {
		TimeManager.stopDinnerTimer(this._groupCreationTimer, this);
	},
	/**
	 * Run action of reception with moving group to a table
	 *  - runAction performed by click on object
	 * @class ReceptionPlace
	 * @method runAction
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
	 * @class ReceptionPlace
	 * @method addGroup
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return boolean true if successful, false else
	 */
	addGroup: function(group) {
		if(group instanceof Group) {
            DinnerGamePage.getInstance().addGroup(group);
			this.groupList.push(group);
            console.debug("[addGroup-] Stop");
            return true;
		}
		return false;
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
	/**
	 * Create a random group
	 * @class ReceptionPlace
	 * @method createGroup
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	createGroup: function() {
		// @TODO add test for create group
		if (this.maxGroupList > this.getGroupListLength()) {
            console.debug('Create Group');
			var g = Group.Factory.newInstance();
			this.addGroup(g);
		}
	}
};
var ReceptionPlace = new JS.Class(Place, ReceptionPlaceClass);
