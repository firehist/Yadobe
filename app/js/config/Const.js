/**
 * CONST Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
var CONST = {};
/**
 * CONST.TIME Struct
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 30/08/2011
 */
CONST.TIME = {
	createGroup: {
		timeRef: 1000,
		getRandTime: function() {
			return CONST.TIME.createGroup.timeRef;
		}
	}
};