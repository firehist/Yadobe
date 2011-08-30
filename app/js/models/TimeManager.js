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
	 * @param ConstTimeName CONST.TIME.xxxx (timeRef, getRandTime())
	 * @param callback
	 * @param context
	 */
	setTimer: function(ConstTimeName, callback, context) {
		var constStruct = CONST.TIME[ConstTimeName];
		var hash = context.toString();
		callback.call(context);
		TimeManager.timerList[hash + '_' + ConstTimeName] = window.setTimeout(TimeManager.setTimer, constStruct.getRandTime(), ConstTimeName, callback, context);
	}
};