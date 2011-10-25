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
						console.debug("The menu arrived to the good table :D");
						
						// Add the menu to the table and change its state
						item.setState("Use");
						target.model.menuList.push(item);
						
						// we delete the item from the inventory
						waiterModel.delFromInventory(index);

						//@TODO replace "true" on the Table order : if (this.model.AreAllMenusServed()) {...}
						// And move after the "for" loop
						if (true) {
							console.debug("The group of the table " + target.model.number + " started to eat.");
							target.model.group.setState('Eating');
						}
					}
					// @TODO To suppress ! Just for test
					else {
						console.debug("The menu arrived to the bad table (table " + target.model.number + " instead of table " + item.table + ").");
					}
				}
				target.model.group.setState('Eating'); // this is not the correct place (see TODOs in the loop for)

			}
		});
		DinnerGamePage.getInstance().waiter.model.moveTo(destination);
	},
    onPressWaitingToOrder: function(target) {
        var groupModel = target.model.group;
        var destination = new Destination(target.model, function() {
            console.log("Waiter arrived to table " + target.model.number + ".");
            console.log("The table " + target.model.number + " passed an order and is waiting their meal.");

            //target.setState("WaitingOrder");
            //groupModel.setState('WaitingMeal');

            // Launch cooking for all menu in Wait state
            var kitchenModel = DinnerGamePage.getInstance().kitchen.model;
            for (var i=0; i<groupModel.menuList.length; i++) {
                if (groupModel.menuList[i].inState('Wait')) {
                    kitchenModel.addMenu(groupModel.menuList[i]);
                }
            }
        });
        DinnerGamePage.getInstance().waiter.model.moveTo(destination);
    },
	onMouseOver: function(target) {
		return function() {
			if (((target instanceof GroupGraph) && !target.model.inState('QueuingUpBusy')) || !(target instanceof GroupGraph)) {
				if (target instanceof GroupGraph) {
                    console.debug("[OnMouseOver] State of Group: " + target.model.getState());
                }
                if (!target._graph.clicked) {
					target._graph.alpha = 0.8;
					$('body').css('cursor', 'pointer');
				}
			}
		}
	},
	onMouseOut: function(target) {
		return function() {
			if (((target instanceof GroupGraph) && !target.model.inState('QueuingUpBusy')) || !(target instanceof GroupGraph)) {
				if (!target._graph.clicked) {
					target._graph.alpha = 1;
					$('body').css('cursor', 'default');
				}
			}
		}
	}
};