/**
 * Page Interface
 * @since 31/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var PageClass = {
	pageContainer: null,
	show: function() {
		throw new Error('show() must be implemented.')
	},
	hide: function() {
		throw new Error('hide() must be implemented.')
	},
	save: function() {
		throw new Error('save() must be implemented.')
	},
	restore: function() {
		throw new Error('restore() must be implemented.')
	}
};
var Page = new JS.Class(PageClass);