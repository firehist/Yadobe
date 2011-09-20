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
	'GroupGraph',
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
		timeRef: Tools.randomXToY(5000, 15000),
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
	human_table_red: 'img/dinnerGame/stage_01_table_human_red.png',
	human_table_green: 'img/dinnerGame/stage_01_table_human_green.png',
	human_table_yellow: 'img/dinnerGame/stage_01_table_human_yellow.png',
	human_table_blue: 'img/dinnerGame/stage_01_table_human_blue.png',
	human_red: 'img/dinnerGame/stage_01_human_red.png',
	human_green: 'img/dinnerGame/stage_01_human_green.png',
	human_yellow: 'img/dinnerGame/stage_01_human_yellow.png',
	human_blue: 'img/dinnerGame/stage_01_human_blue.png',
	background: 'img/dinnerGame/stage_01.jpg',
	menus: 'img/dinnerGame/kitchen/menus.png',
	luigi_walking: 'img/dinnerGame/kitchen/luigi_walking.png',
	carrier: 'img/dinnerGame/carrier.png'
};
/**
 * DINNERCONST.POSITION Struct
 * Position in pixels of a PlaceGraph on the container
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 01/09/2011
 * @type Object
 */
DINNERCONST.POSITION = {
	kitchen: new Point(500, 70),
	reception: new Point(0, 225),
	tables: [
        {
            name: "red",
            coord: new Point(340, 240)
        },
		{
            name: "blue",
            coord: new Point(570, 240)
        },
		{
            name: "green",
            coord: new Point(570, 410)
        },
		{
            name: "yellow",
            coord: new Point(340, 410)
        }
    ],
	at_table: [
		{dx: 5, dy: -30},
		{dx: 30, dy: 0},
		{dx: 0, dy: 30},
		{dx: -30, dy: 0}
	],
    firstgroup: new Point(2, 510)
};
/**
 * DINNERCONST.ACCESS Struct
 * Coordinates on the grid where the waiter can access a place
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 * @type Object
 */
DINNERCONST.ACCESS = {
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
 * DINNERCONST.ACCESS Struct
 * Coordinates on the grid where the waiter can access a place
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 07/09/2011
 * @type Object
 */
DINNERCONST.ACCESS = {
	kitchen: new Point(550,100),
	reception: new Point(140,210),
	tables: [
		new Point(290,220),
		new Point(520,220),
		new Point(290,390),
		new Point(520,390)
	]
};

/**
 * DINNERCONST.PATH Struct
 * Paths of points that the waiter follow to move between two Places
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 13/09/2011
 * @static
 * @type Array<Point>
 */
DINNERCONST.PATH = new Array();
DINNERCONST.PATH['Cuisine-Réception'] = [new Point(550,100), new Point(240,160), new Point(240,210), new Point(140,210)];
DINNERCONST.PATH['Cuisine-Table1'] = [new Point(550,100), new Point(290,160), new Point(290,220)];
DINNERCONST.PATH['Cuisine-Table2'] = [new Point(550,100), new Point(550,160), new Point(520,220)];
DINNERCONST.PATH['Cuisine-Table3'] = [new Point(550,100), new Point(240,160), new Point(240,390), new Point(290,390)];
DINNERCONST.PATH['Cuisine-Table4'] = [new Point(550,100), new Point(470,100), new Point(470,390), new Point(520,390)];
DINNERCONST.PATH['Réception-Table1'] = [new Point(140,210), new Point(290,210), new Point(290,220)];
DINNERCONST.PATH['Réception-Table2'] = [new Point(140,210), new Point(240,210), new Point(240,160), new Point(520,160), new Point(520,220)];
DINNERCONST.PATH['Réception-Table3'] = [new Point(140,210), new Point(270,390), new Point(290,390)];
DINNERCONST.PATH['Réception-Table4'] = [new Point(140,210), new Point(240,330), new Point(520,330), new Point(520,390)];
DINNERCONST.PATH['Table1-Table2'] = [new Point(290,220), new Point(290,160), new Point(520,160), new Point(520,220)];
DINNERCONST.PATH['Table1-Table3'] = [new Point(290,220), new Point(270,220), new Point(270,390), new Point(290,390)];
DINNERCONST.PATH['Table1-Table4'] = [new Point(290,220), new Point(270,220), new Point(270,330), new Point(290,330), new Point(520,330), new Point(520,390)];
DINNERCONST.PATH['Table2-Table4'] = [new Point(520,220), new Point(500,220), new Point(500,390), new Point(520,390)];
DINNERCONST.PATH['Table2-Table3'] = [new Point(520,220), new Point(500,220), new Point(500,330), new Point(290,330), new Point(290,390)];
DINNERCONST.PATH['Table3-Table4'] = [new Point(290,390), new Point(290,330), new Point(520,330), new Point(520,390)];

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
	waiter: 10,
    group: 11
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
