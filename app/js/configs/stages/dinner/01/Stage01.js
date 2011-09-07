/**
 * STAGE 01 Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 07/09/2011
 */
var STAGE01 = {};
/**
 * STAGE01.IMAGE Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 * @type Object
 */
STAGE01.IMAGE = {
	// Stage information
	kitchen: 'img/dinnerGame/stage_01_kitchen.png',
	reception: 'img/dinnerGame/stage_01_reception.png',
	table_red: 'img/dinnerGame/stage_01_table_red.png',
	table_green: 'img/dinnerGame/stage_01_table_green.png',
	table_yellow: 'img/dinnerGame/stage_01_table_yellow.png',
	table_blue: 'img/dinnerGame/stage_01_table_blue.png',
	human_table_red: 'img/dinnerGame/stage_01_table_human_red.png',
	human_table_green: 'img/dinnerGame/stage_01_table_human_green.png',
	human_table_yellow: 'img/dinnerGame/stage_01_table_human_yellow.png',
	human_table_blue: 'img/dinnerGame/stage_01_table_human_blue.png',
	background: 'img/dinnerGame/stage_01.jpg',
	menus: 'img/dinnerGame/kitchen/menus.png',
	luigi_walking: 'img/dinnerGame/kitchen/luigi_walking.png'
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
	],
    firstgroup : new Point(50, 300)
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
