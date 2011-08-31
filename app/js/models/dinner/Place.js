/**
 * Place class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var PlaceClass = {
	// Attributes
	name: '',
	// Constructor
	initialize: function(name) {
		this.name = name;
	},
	// Methods
	runAction: function() {
		throw new Error('Method runAction must be implement.');
	}
};
var Place = new JS.Class(PlaceClass);