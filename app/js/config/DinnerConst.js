/**
 * DINNERCONST Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var DINNERCONST = {};
/**
 * DINNERCONST.LOADING Struct
 * All time keywork hava to be set in JS.Package
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 * @type Array
 */
DINNERCONST.LOADING = [
	'TimeManager',
	'Page',
	'TablePlaceGraph',
	'ReceptionPlaceGraph',
	'KitchenPlaceGraph',
	'Group',
	'RecipeManager',
	'Waiter',
	'DinnerGamePage'
];
/**
 * DINNERCONST.TIME Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 * @type Object
 */
DINNERCONST.TIME = {
	/**
	 * Cons for creation group information
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 */
	createGroup: {
		timeRef: 1000,
		getRandTime: function() {
			return DINNERCONST.TIME.createGroup.timeRef;
		}
	}
};
/**
 * DINNERCONST.COLOR Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @type Object
 */
DINNERCONST.COLOR = {
	red: new Tools.Color('255, 0, 0', '#FF0000', '0, 100, 100'),
	blue: new Tools.Color('0, 0, 255', '#0000FF', '100, 100, 0'),
	green: new Tools.Color('0, 255, 0', '#00FF00', '100, 0, 100'),
	yellow: new Tools.Color('255, 255, 0', '#FFFF00', '60, 100, 100')
};
/**
 * DINNERCONST.IMAGE Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 * @type Object
 */
DINNERCONST.IMAGE = {
	kitchen: 'img/dinnerGame/stage_01_kitchen.png',
	reception: 'img/dinnerGame/stage_01_reception.png',
	table_red: 'img/dinnerGame/stage_01_table_red.png',
	table_green: 'img/dinnerGame/stage_01_table_green.png',
	table_yellow: 'img/dinnerGame/stage_01_table_yellow.png',
	table_blue: 'img/dinnerGame/stage_01_table_blue.png',
	human_table: 'img/dinnerGame/stage_01_table_human.png',
	background: 'img/dinnerGame/stage_01.jpg',
	menus: 'img/dinnerGame/kitchen/menus.png',
	luigi_walking: 'img/dinnerGame/kitchen/luigi_walking.png'
//	luigi_walking_right_empty: 'img/dinnerGame/kitchen/luigi_walking_right_empty.png',
//	luigi_walking_left_full: 'img/dinnerGame/kitchen/luigi_walking_left_full.png',
//	luigi_stop_front_full2empty: 'img/dinnerGame/kitchen/luigi_stop_front_full2empty.png',
//	luigi_walking_left_empty: 'img/dinnerGame/kitchen/luigi_walking_left_empty.png'
};
/**
 * DINNERCONST.POSITION Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 * @type Object
 */
DINNERCONST.POSITION = {
	kitchen: new Point(500, 70),
	reception: new Point(0, 225),
	tables: [
		new Point(340, 240),
		new Point(570, 240),
		new Point(570, 410),
		new Point(340, 410)
	]
};
/**
 * DINNERCONST.SCENES Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 02/09/2011
 * @type Object
 */
DINNERCONST.SCENES = {
	log: 1,
	interfaceGame: 2,
	background: 3,
	kitchen: 4,
	reception: 5,
	tables: [6,7,8,9],
	waiter: 10
};
/**
 * DINNERCONST.COOK Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 05/09/2011
 * @type Object
 */
DINNERCONST.COOK = {
	maxCooking: 3,
	maxMenuInKitchen: 8
};