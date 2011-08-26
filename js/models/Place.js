/**
 * Place class
 * @since 26/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module Yadobe
 **/
(function(window) {
	/**
	 * Place class
	 * @class Table
	 * @extends Place
	 * @param oCoordinates Point Represent the coordonates of the access point
	 * @param sName String Name of the table
	 **/
	function Place(oCoordinates, sName) {
		this.initialize(oCoordinates, sName);
	}
	var p = Place.prototype;
	// public properties:
	/**
	 * The coordonates of the access point
	 * @property coordinates
	 * @type Point
	 **/
	p.coordinates		= null;
	/**
	 * The name of this object
	 * @property name
	 * @type String
	 **/
	p.name				= '';
	/**
	 * The last action executed at this place
	 * @property lastAction
	 * @type String
	 **/
	p.lastAction		= null;
	/**
	 * The actions list ordered for this place
	 * @property coordinates
	 * @type Array
	 * @example actionsList : { "name1":"name2", "name0":"name1",  "name2":"name0" }
	 **/
	p.actionsList		= null;
	/**
	 * The display object of place
	 * @property placeDisplay
	 * @type PlaceDisplay
	 **/
	p.playDisplay		= null;

	// constructor:
	// separated so it can be easily addressed in subclasses:
	/** 
	 * Initialization method.
	 * @method initialize
	 * @param oCoordinates Point Represent the coordonates of the access point
	 * @param sName String Name of the table
	 * @protected
	 */
	p.initialize = function(oCoordinates, sName) {
		this.coordinates = oCoordinates;
		this.name = sName;
	}
	// public methods
	/**
	 * Get the next available action for this place
	 * @method getNextAction
	 * @return mixed Action string if its possible, false else
	 */
	p.getNextAction = function() {
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
		return "[Place (name="+  this.name +")]";
	}
	
	window.Place = Place;
	
}(window));
