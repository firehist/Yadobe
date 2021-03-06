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
	 * @var string color
	 */
	color: '',
	/**
	 * Refer to the group which actually are at the table
	 * @var Group group
	 */
	group: null,
	/**
	 * Save the menu of the table during customers are here
	 * @var List<Menu> menuList
	 */
	menuList: new Array(),
	// Constructor
	initialize: function(name, color) {
		this.callSuper(name);
		this.color = color;
		this.setState('Empty');
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
	 * Empty state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	Empty: {
        runAction: function() {
            console.log('Empty State : runAction()');
        }
    },
	/**
	 * Idle state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
    Idle: {
        runAction: function() {
            console.log('Idle State : runAction()');
        }
    },
	/**
	 * WaitingForOrder state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
    WaitingForOrder: {
        runAction: function() {
            console.log('WaitingForOrder State : runAction()');
        }
    },
	/**
	 * WaitingMeal state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
    WaitingMeal: {
        runAction: function() {
            console.log('WaitingMeal State : runAction()');
        }
    },
	/**
	 * Eating state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
    Eating: {
        runAction: function() {
            console.log('Eating State : runAction()');
        }
    },
	/**
	 * WaitingForPaymentState state
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
    WaitingForPaymentState: {
        runAction: function() {
            console.log('WaitingForPaymentState State : runAction()');
        }
    }
});