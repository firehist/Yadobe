/**
 * STAGE 01 Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 07/09/2011
 */
var STAGE01 = {};
/**
 * STAGE01.IMAGE Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 07/09/2011
 * @type Object
 */
STAGE01.IMAGE = {
	// Global
	background: 'global/background.jpg',
	// group
	human_table_red: 'group/human_table_red.png',
	human_table_green: 'group/human_table_green.png',
	human_table_yellow: 'group/human_table_yellow.png',
	human_table_blue: 'group/human_table_blue.png',
	// kitchen
	kitchen: 'kitchen/kitchen.png',
	luigi_walking: 'kitchen/luigi_walking.png',
	menus: 'kitchen/menus.png',
	// Reception
	reception: 'reception/reception.png',
	// Table
	table_red: 'table/table_red.png',
	table_green: 'table/table_green.png',
	table_yellow: 'table/table_yellow.png',
	table_blue: 'table/table_blue.png'
	// Waiter
};
/**
 * STAGE01.POSITION Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 07/09/2011
 * @type Object
 */
STAGE01.POSITION = {
	kitchen: new Point(500, 70),
	reception: new Point(0, 225),
	tables: [
		new Point(340, 240),
		new Point(570, 240),
		new Point(570, 410),
		new Point(340, 410)
	],
    group : new Point(50, 300)
};