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
	 * @type String
	 * @private
	 */
	_groupCreationTimer: 'createGroup',
	/**
	 * List of group waiting to reception desk
	 * @type Group[]
	 */
	//groupList: new Array(),
	/**
	 * Max length of groupList
	 * @type Integer
	 */
	maxGroupList: 1,
    /**
     * store the position in the queue
     * @type array of Group
     */
    waitingGroups: new Array(),
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
	 * @param {Integer} maxGroupList Maximum waiting list
     * @param {Point} coordinates Grid coordinates to access the place by the waiter
	 */
	initialize: function(name, maxGroupList, coordinates) {
		console.log('Reception init');
		this.callSuper(name, coordinates);
		this.maxGroupList = maxGroupList;
	},
	getOutGroup: function(group) {
        for (var i=0; i<this.waitingGroups.length; i++) {
            if (this.waitingGroups[i] == group) {
                this.waitingGroups.splice(i, 1);
                console.log("[ReceptionPlace.getOutGroup] Le group " + i + " est sorti de la reception");
                break;
            }
        }
    },
	// Methods
	/**
	 * Test if groupList is empty
	 * @class ReceptionPlace
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @private
	 * @return Boolean true groupList is empty, false else
	 */
	_isGroupEmpty: function() {
		return this.menuList.length == 0;
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
	}
};
var ReceptionPlace = new JS.Class(Place, ReceptionPlaceClass);
