/**
 * TablePlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var TablePlaceClass = {
	// Debug information
	debug: true,
	debugClassName: 'TablePlace',
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
	removeGroup: function() {
		this.group = null;
		this.setState("Free");
	},
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
	},
    areAllMenusServed: function() {
        var menuListToString = this.menuList.join();
        Debug.log(this, 'areAllMenusServed', "Liste des menus attendus concaténés dans menuListToString: " + menuListToString);
        for (var aMenuOfGroup in this.group.menuList) {
            // if menu from group is not found int the list of menu from the table
            Debug.log(this, 'areAllMenusServed', "menuListToString.indexOf(this.group.menuList[aMenuOfGroup]): " + menuListToString.indexOf(this.group.menuList[aMenuOfGroup]));
            if (menuListToString.indexOf(this.group.menuList[aMenuOfGroup]) == -1) {
                Debug.log(this, 'areAllMenusServed', aMenuOfGroup + " n'est pas un menu déjà servi");
                return false;
            } else {
                Debug.log(this, 'areAllMenusServed', aMenuOfGroup + " est un menu déjà servi");
            }
        }
        return true;
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
			Debug.log(this, 'State[Free].runAction', "Free State");
        }
    },
	/**
	 * Free state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	Busy: {
        runAction: function() {
			Debug.log(this, 'State[Busy].runAction', "Busy State");
        }
    }
});