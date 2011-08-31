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
	}
};
