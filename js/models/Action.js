/**
 * Action class
 * @since 26/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module Yadobe
 **/
(function(window) {
	/**
	 * Action class
	 * @class Table
	 * @extends Action
	 * @param oCoordinates Point Represent the coordonates of the access point
	 * @param sName String Name of the table
	 **/
	function Action(sName, oPlace, iLength) {
		this.initialize(sName, oPlace, iLength);
	}
	var p = Action.prototype;
	// public properties:
	/**
	 * The started time of the action
	 * @property _scheduleTime
	 * @type Number
	 **/
	p._scheduleTime		= null;
	/**
	 * The place object reference
	 * @property PlaceObject
	 * @type Place
	 **/
	p.PlaceObject		= null;
	/**
	 * The name of this object
	 * @property name
	 * @type String
	 **/
	p.name				= '';
	/**
	 * The time length of action (in ms)
	 * @property length
	 * @type Number
	 **/
	p.length			= null;

	// constructor:
	// separated so it can be easily addressed in subclasses:
	/** 
	 * Initialization method.
	 * @method initialize
	 * @param sName String The name of this object
	 * @param oPlace Place The place object reference
	 * @param iLength Number The time length of action (in ms)
	 * @protected
	 */
	p.initialize = function(sName, oPlace, iLength) {
		if(!(oPlace instanceof Place)) {
			throw new Error("L'argument oPlace n'est pas du bon type.");
		}
		this.PlaceObject = oPlace;
		this.name = sName;
		this.length = parseInt(iLength, 10);
	}
	// public methods
	/**
	 * Run the action
	 * @method getNextAction
	 * @return mixed Action string if its possible, false else
	 */
	p.run = function() {
		if(this.lastAction != null && this.actionsList != null) {
			if(this.actionsList[this.lastAction] != undefined) {
				return this.actionsList[this.lastAction];
			}
		}
		return false;
	}
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Action (name="+  this.name +")]";
	}
	
	window.Action = Action;
	
}(window));
