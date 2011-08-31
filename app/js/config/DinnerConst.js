/**
 * CONST Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var DINNERCONST = {};
/**
 * CONST.TIME Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
DINNERCONST.TIME = {
	createGroup: {
		timeRef: 1000,
		getRandTime: function() {
			return DINNERCONST.TIME.createGroup.timeRef;
		}
	}
};