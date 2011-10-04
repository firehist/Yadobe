/**
 * Group class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var GroupClass ={
	// Includes
	include: JS.State,
    
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
	/**
	 * Current position of waiter
	 * @type Place
	 */
	position: null,
	
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
	 * @param position @TODO
	 */
	initialize: function(name, color, personNumber, position) {
		this.name = name;
		this.color = color;
		this.personNumber = personNumber;
		this.position = position;
		this.setState('QueuingUp');
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

/**
 * Group states declaration
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @since 20/09/2011
 * @module Group
 */
Group.states({
	/**
	 * QueuingUp state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 21/09/2011
	 */
	QueuingUp: {
	    runAction: function() {
	        console.log('QueuingUp State : runAction()');
	    }
	},
	/**
	 * WaitingToOrder state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	WaitingToOrder: {
		runAction: function() {
			console.log('WaitingToOrder State : runAction()');
		}
	},
	/**
	 * WaitingMeal state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	WaitingMeal: {
	    runAction: function() {
	        console.log('WaitingMeal State : runAction()');
	    }
	},
	/**
	 * Eating state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	Eating: {
	    runAction: function() {
	        console.log('Eating State : runAction()');
	    }
	},
	/**
	 * WaitingForPayment state
	 * @author Yannick Galatol <yannick.galatol@gmail.com>
	 * @since 20/09/2011
	 */
	WaitingForPayment: {
	    runAction: function() {
	        console.log('WaitingForPaymentState : runAction()');
	    }
	}
});

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
	// Choose randomly a color from the DINNERCONST.COLOR object
    var colorName = Tools.randomFromArray(Tools.arrayKeys(DINNERCONST.COLOR));
    
    // Choose randomly the number of persons contained in the group (between 1 and 4)
	var numberOfPerson = Tools.randomXToY(1, 4);
	
	return new Group('Group', colorName, numberOfPerson, DinnerGamePage.getInstance().reception.model);
};
