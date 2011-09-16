/**
 * Page
 * @since 31/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var PageClass = {
	pageContainer: null,
	initialize: function() {
		// init Page Container
		this.pageContainer = new Container();
		Yadobe.getInstance().stage.addChild(this.pageContainer);
	},
	tick: function() {
		throw new Error('Method "tick" inheriting from class "Page" must be implemented.');
	},
	show: function() {
		this.pageContainer.visible = true;
	},
	hide: function() {
		this.pageContainer.visible = false;
	},
	save: function() {
		throw new Error('Method "save" inheriting from class "Page" must be implemented.');
	},
	restore: function() {
		throw new Error('Method "restore" inheriting from class "Page" must be implemented.');
	},
	create: function() {
		throw new Error('Method "create" inheriting from class "Page" must be implemented.');
	}
};
var Page = new JS.Class(PageClass);