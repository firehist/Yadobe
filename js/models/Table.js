/**
 * Table class
 * @since 26/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @author Yannick Galatol <yannick.galatol@gmail.com>
 * @author Dominique Jeannin <jeannin.dominique@gmail.com>
 * @module Yadobe
 **/
(function(window) {
	/**
	 *  Table class
	 * @class Table
	 * @extends Place
	 * @param oCoordinates Point Represent the coordonates of the access point
	 * @param sName String Name of the table
	 **/
	function Table(oCoordinates, sName) {
		this.initialize(oCoordinates, sName);
	}
	var p = Table.prototype = new Place();
	// public properties:
	
	// constructor
	// separated so it can be easily addressed in subclasses:
	// unique to avoid overiding base class
	p.Place_initialize = p.initialize;	
	/** 
	 * Initialization method.
	 * @method initialize
	 * @param oCoordinates Point Represent the coordonates of the access point
	 * @param sName String Name of the table
	 * @protected
	 */
	p.initialize = function(oCoordinates, sName) {
		this.Place_initialize(oCoordinates, sName); // super call
	}

	// public methods
	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Table (name="+  this.name +")]";
	}
	
	window.Table = Table;
	
}(window));
