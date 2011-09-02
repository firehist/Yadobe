/**
 * TimeManager class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var TimeManager = {
	
	timerList: {},
	/**
	 * Set timer
	 * @param ConstTimeName DINNERCONST.TIME.xxxx (timeRef, getRandTime())
	 * @param callback
	 * @param context
	 */
	setTimer: function(ConstTimeName, callback, context) {
		var constStruct = DINNERCONST.TIME[ConstTimeName];
		var key = TimeManager.getTimerKey(ConstTimeName, context);
		callback.call(context);
		TimeManager.timerList[key] = window.setTimeout(TimeManager.setTimer, constStruct.getRandTime(), ConstTimeName, callback, context);
	},
	/**
	 * Build and return the unique key for timer
	 * @class ReceptionPlace
	 * @method getTimerKey
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @param ConstTimeName String The constante index in DINNERCONST.TIME
	 * @param context Object The current object
	 * @return String The built unique key for timer
	 */
	getTimerKey: function(ConstTimeName, context) {
		return context.toString() + '_' + ConstTimeName
	},
	/**
	 * Clear timeout
	 */
	stopTimer: function(ConstTimeName, context) {
		window.clearTimeout(TimeManager.timerList[TimeManager.getTimerKey(ConstTimeName, context)]);
	}
};