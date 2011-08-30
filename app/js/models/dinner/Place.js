/**
 * Place class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var Place = new JS.Class({
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
});