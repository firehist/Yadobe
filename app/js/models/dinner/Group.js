/**
 * Group class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var GroupClass ={
	// Attributes
	/**
	 * Name of the group
	 * @param string name
	 */
	name: '',
	/**
	 * Color of the group
	 * @param string color HTML string color
	 */
	color: '',
	/**
	 * Person in the group
	 * @param int personNumber
	 */
	personNumber: 2,
	/**
	 * Mood of Group (0 - 100)
	 * @param int mood
	 */
	mood: 100,
	/**
	 * Use to decrease mood if true
	 * @var boolean waiting
	 */
	waiting: false,
	/**
	 * The time where waiting set to true
	 *  Especially use to know since how many time the group is waiting
	 * @var int waitingTime in milliseconds
	 */
	waitingTime: null,
	/**
	 * define its end of life
	 * @var bool
	 */
	isGone: false,
	/**
	 * The total time of waiting state for this group
	 * @var int totalWaitingTime in milliseconds
	 * @default 0
	 */
	totalWaitingTime: 0,
	// Constructor
	/**
	 * @constructor
	 * @class Group
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @param name String Name of this group
	 * @param color String Color set in DINNERCONST.COLOR
	 * @param personNumber int Number of person in this group
	 */
	initialize: function(name, color, personNumber) {
		this.name = name;
		this.color = color;
		this.personNumber = personNumber;
	},
	// Methods
	/**
	 * Decrease the group mood of value
	 * @class Group
	 * @method setMoodDown
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param value int The value to decrease mood's group
	 */
	setMoodDown: function(value) {
		if(this.waiting === true) {
			this.mood -= value;
		}
	},
	/**
	 * Set group in waiting state and save time
	 * @class Group
	 * @method setWaiting
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	setWaiting: function() {
		this.waiting = true;
		var d = new Date();
		this.waitingTime = d.getTime();
	},
	/**
	 * Set group in NO waiting state and clear saved time
	 * @class Group
	 * @method stopWaiting
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 */
	stopWaiting: function() {
		this.waiting = true;
		var d = new Date();
		this.cumulWaitingTime += d.getTime() - this.waitingTime;
		this.waitingTime = null;
	}
};
var Group = new JS.Class(GroupClass);

Group.Factory = {};
/**
 * Return a new instance of Group with random values
 * @static
 * @class Group
 * @method Factory.newInstance
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 * @return Group new group instance
 */
Group.Factory.newInstance = function() {
    var indexColor = Tools.randomXToY(0, 3);
    console.debug('indexColor: ' + indexColor);
    var colorName = '';
    var i = -1;
    for (color in DINNERCONST.COLOR) {
        i++;
        if (i == indexColor) colorName = color;
    }
    //console.debug("colorName: "+ colorName);
	var numberOfPerson = Tools.randomXToY(1, 4);
	return new Group('Group', colorName, numberOfPerson);
};
