/**
 * Group class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var Group = new JS.Class({
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
	// Constructor
	initialize: function(name, color, personNumber) {
		this.name = name;
		this.color = color;
		this.personNumber = personNumber;
	},
	// Methods
	/**
	 * Decrease the group mood of value
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param int value The value to decrease mood's group
	 */
	setMoodDown: function(value) {
		if(this.waiting === true) {
			this.mood -= value;
		}
	}
});

Group.Factory = {};
Group.Factory.newInstance = function() {
	return new Group('Group', 'red', 3);
};