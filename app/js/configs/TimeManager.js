/**
 * TimeManager class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Yadobe
 **/
var TimeManager = {
	
	timerList: {},
	/**
	 * setDinnerTimer
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 30/08/2011
	 * @param ConstTimeName DINNERCONST.TIME.xxxx (timeRef, getRandTime())
	 * @param callback
	 * @param context
	 */
	setDinnerTimer: function(ConstTimeName, callback, context) {
		console.debug("TimeManager.setDinnerTimer()");
        var constStruct = DINNERCONST.TIME[ConstTimeName];
		var key = TimeManager.getDinnerTimerKey(ConstTimeName, context);
		callback.call(context);
		TimeManager.timerList[key] = window.setTimeout(TimeManager.setDinnerTimer, constStruct.getRandTime(), ConstTimeName, callback, context);
	},
	/**
	 * Set cook timer
	 * @param time
	 * @param context
	 * @param menu
	 */
	setCookTimer: function(time, context, menu) {
		console.debug('Luigi : Il va me falloir ' + time/1000 + ' secondes pour préparer ça.');
		window.setTimeout(function(){context.setReady(menu)}, time);
	},
	/**
	 * Build and return the unique key for timer
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @param ConstTimeName String The constante index in DINNERCONST.TIME
	 * @param context Object The current object
	 * @return String The built unique key for timer
	 * @public
	 */
	getDinnerTimerKey: function(ConstTimeName, context) {
		return context.toString() + '_' + ConstTimeName
	},
	/**
	 * Clear timeout
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 31/08/2011
	 * @param ConstTimeName String The constante index in DINNERCONST.TIME
	 * @param context Object The current object
	 * @public
	 */
	stopDinnerTimer: function(ConstTimeName, context) {
		window.clearTimeout(TimeManager.timerList[TimeManager.getDinnerTimerKey(ConstTimeName, context)]);
	}
};