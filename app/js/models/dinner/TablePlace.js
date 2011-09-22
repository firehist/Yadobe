/**
 * TablePlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var TablePlaceClass = {
	// Includes
	include: JS.State,
    
	// Attributes
	/**
	 * A HTML string color name (red, orange, black, etc...)
	 * @type {String}
	 */
	color: '',
	/**
	 * Refer to the group which actually are at the table
	 * @type {Group}
	 */
	group: null,
	/**
	 * Save the menu of the table during customers are here
	 * @type {List<Menu>}
	 */
	menuList: new Array(),
	/**
	 * Number of the table 
	 * @type Integer
	 */
	number : null,
    /*
     * @constructor
     * @param {Integer} number
     * @param {String} color
     * @param {Point} coordinates Grid coordinates to access the place by the waiter
     */
	initialize: function(number, color, coordinates) {
		this.callSuper("Table" + number, coordinates);
		this.number = number;
		this.color = color;
		this.setState('Free');
	},
    
	// Methods
	/**
	 * Compute the table bill by adding all menu price
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @return int
	 */
	getPriceTable: function() {
		var price = 0;
		if(this.menuList.length > 0) {
			for(var i in this.menuList) {
				if(this.menuList[i] instanceof Menu.klass) {
					price += this.menuList[i].getPriceMenu();
				}
			}
		}
		return price;
	}
};
var TablePlace = new JS.Class(Place, TablePlaceClass);

/**
 * TablePlace states declaration
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 * @module TablePlace
 */
TablePlace.states({
	/**
	 * Free state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	Free: {
        runAction: function() {
            console.log('Free State : runAction()');
        }
    },
	/**
	 * Free state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	Busy: {
        runAction: function() {
            console.log('Busy State : runAction()');
        }
    }
});