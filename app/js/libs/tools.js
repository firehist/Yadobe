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
    /* Returns the class name of the argument or undefined if
     * it's not a valid JavaScript object.
     */
    getObjectClass: function (obj) {
        if (obj && obj.constructor && obj.constructor.toString) {
            var arr = obj.constructor.toString().match(/function\s*(\w+)/);
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }

        return undefined;
    },
	randomXToY: function(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	},
    increaseColor : function(color, value) {
        
        // Check the given value is an hexadecimal color
        if ((color) && (color.indexOf('#') == 0)) {
            color = color.substr(1, color.length - 1);
        }
        else {
            return '#00000'
        }
        
        var red = 0;
        var green = 0;
        var blue = 0;
        
        if (color.length == 6) {
            // Separate the RGB value into three decimal values
            red = parseInt(color.substr(0, 2), 16) + value;
            green = parseInt(color.substr(2, 2), 16) + value;
            blue = parseInt(color.substr(4, 2), 16) + value;
        }
        else if (color.length == 3) {
            // Separate the RGB value into three decimal values
            red = parseInt(color.substr(0, 1), 16) + value;
            green = parseInt(color.substr(1, 1), 16) + value;
            blue = parseInt(color.substr(2, 1), 16) + value;
        }
		
		// Check the result is between 0 and 255
		red = Math.min(255, Math.max(0, red));
		green = Math.min(255, Math.max(0, green));
		blue = Math.min(255, Math.max(0, blue));

        return '#' + red.toString(16).lpad(2, '0') + green.toString(16).lpad(2, '0') + blue.toString(16).lpad(2, '0');
    },
    getOppositeColor : function(color) {
        
        // Check the given value is an hexadecimal color
        if ((color) && (color.indexOf('#') == 0)) {
            color = color.substr(1, color.length);
        }
        else {
            return '#00000'
        }
        
        var red = 0;
        var green = 0;
        var blue = 0;
        
        if (color.length == 6) {
            // Separate the RGB value into three decimal values
            red = 255 - parseInt(color.substr(0, 2), 16);
            green = 255 - parseInt(color.substr(2, 2), 16);
            blue = 255 - parseInt(color.substr(4, 2), 16);
        }
        else if (color.length == 3) {
            // Separate the RGB value into three decimal values
            red = 255 - parseInt(color.substr(0, 1), 16);
            green = 255 - parseInt(color.substr(1, 1), 16);
            blue = 255 - parseInt(color.substr(2, 1), 16);
        }
		
		// Check the result is between 0 and 255
		red = Math.min(255, Math.max(0, red));
		green = Math.min(255, Math.max(0, green));
		blue = Math.min(255, Math.max(0, blue));
		
		return '#' + red.toString(16).lpad(2, '0') + green.toString(16).lpad(2, '0') + blue.toString(16).lpad(2, '0');
    }
};

String.prototype.lpad = function (padLength, padString) {
    if (!padString) {
        padString = ' ';
    }
    var i;
    var a = this.split('');
    for (i = 0; i < padLength - this.length; i++) {
        a.unshift(padString);
    };
    return a.join('');
}
String.prototype.rpad = function (padLength, padString) {
    if (!padString) {
        padString = ' ';
    }
    var i;
    var a = this.split('');
    for (i = 0; i < padLength - this.length; i++) {
        a.push(padString);
    };
    return a.join('');
}
String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
};
String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
};
