/**
 * TABLEGROUPMOUSELISTENER Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 06/10/2011
 */
var TABLEGROUPMOUSELISTENER = {
	onPressWaitingMeal: function(target) {
		var destination = new Destination(target.model, function() {
			var waiterModel = DinnerGamePage.getInstance().waiter.model;

			// Check if there are some Menus in the Waiter inventory
			if ((waiterModel.inventory) && (waiterModel.inventoryCurrent > 0)) {

				// Look for the item(s) of the waiter inventory which are destined to this table
				for (var index in waiterModel.inventory) {

					var item = waiterModel.inventory[index];
					// The item is a menu and it is destined to this table
					if ((item instanceof Menu) && (item.table == target.model.number)) {

						// @TODO Add the menu to the table
						console.log("The menu arrived to the good table :D");
						waiterModel.delFromInventory(index);

						//@TODO replace "true" on the Table order : if (this.model.AreAllMenusServed()) {...}
						// And move after the "for" loop
						if (true) {
							console.log("The group of the table " + target.model.number + " started to eat.");
							target.model.group.setState('Eating');
						}
					}
					// @TODO To suppress ! Just for test
					else {
						console.log("The menu arrived to the bad table (table " + target.model.number + " instead of table " + item.table + ").");
					}
				}
				target.model.group.setState('Eating'); // this is not the correct place (see TODOs in the loop for)

			}
		});
		DinnerGamePage.getInstance().waiter.model.moveTo(destination);
	},
	onMouseOver: function(target) {
		return function() {
			if (!target._graph.clicked) {
				target._graph.alpha = 0.8;
				$('body').css('cursor', 'pointer');
			}
		}
	},
	onMouseOut: function(target) {
		return function() {
			if (!target._graph.clicked) {
				target._graph.alpha = 1;
				$('body').css('cursor', 'default');
			}
		}
	}
};