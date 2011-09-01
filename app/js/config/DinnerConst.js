/**
 * DINNERCONST Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var DINNERCONST = {};
/**
 * DINNERCONST.TIME Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
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
 */
DINNERCONST.COLOR = {
	red: new Tools.Color('255, 0, 0', '#FF0000', '0, 100, 100'),
	blue: new Tools.Color('0, 0, 255', '#0000FF', '100, 100, 0'),
	green: new Tools.Color('0, 255, 0', '#00FF00', '100, 0, 100'),
	yellow: new Tools.Color('255, 255, 0', '#FFFF00', '60, 100, 100')
};
/**
 * DINNERCONST.IMAGESIZE Number
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 */
DINNERCONST.IMAGESIZE = 8;
/**
 * DINNERCONST.IMAGE Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 */
DINNERCONST.IMAGE = {
	kitchen: '/img/dinnerGame/stage_01_kitchen.png',
	reception: '/img/dinnerGame/stage_01_reception.png',
	table_red: '/img/dinnerGame/stage_01_table_red.png',
	table_green: '/img/dinnerGame/stage_01_table_green.png',
	table_yellow: '/img/dinnerGame/stage_01_table_yellow.png',
	table_blue: '/img/dinnerGame/stage_01_table_blue.png',
	human_table: '/img/dinnerGame/stage_01_table_human.png',
	background: 'img/dinnerGame/stage_01.jpg'
};
/**
 * DINNERCONST.POSITION Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 */
DINNERCONST.POSITION = {
	kitchen: new Point(500, 50),
	reception: new Point(0, 225),
	tables: [
		new Point(340, 240),
		new Point(570, 240),
		new Point(570, 410),
		new Point(340, 410)
	]
};