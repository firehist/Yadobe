/**
 * Place class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var PlaceClass = {
	
    // Attributes
    /**
     * @type {String}
     */
	name: '',
    /**
     * Position where the waiter can stop
     * @type {Point}
     */
    accessCoordinates : null,
    
    /**
     * @constructor
     * @param {String} name
     * @param {Point} coordinates Grid coordinates to access the place by the waiter
     */
	initialize: function(name, coordinates) {
		this.name = name;
		this.accessCoordinates = coordinates;
	},
	// Methods
	runAction: function() {
		throw new Error('Method runAction must be implement.');
	}
};
var Place = new JS.Class(PlaceClass);