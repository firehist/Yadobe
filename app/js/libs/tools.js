/**
 * Color class
 * @class color
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @param RGB String RGB Value : x, x, x (x entre 0 et 255)
 * @param HEX String Hex Value : xxxxxx (x entre 0 et F)
 * @param HSV String HSV Value : x, x, x (x entre 0 et 100)
 */
var Tools = {
	Color: function(RGB, HEX, HSV) {
		this.RGB = RGB;
		this.HEX = HEX;
		this.HSV = HSV;
	},
	Sleep: function(milliSeconds) {
		var startTime = new Date().getTime(); // get the current time
		while (new Date().getTime() < startTime + milliSeconds); // hog cpu
	},
	ObjSize: function(obj) {
		var len = obj.length ? obj.length : 0;
		if(len == 0) {
			for (var k in obj)
				len++;
		}
		return len;
	},
	randomXToY: function(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	}
};