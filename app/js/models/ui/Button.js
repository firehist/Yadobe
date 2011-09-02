/**
 * KitchenPlace class
 * @since 30/08/2011
 * @author Benjamin Longearet <firehist@gmail.com>
 * @module Dinner
 **/
var ButtonClass = {
	initialize: function(params) {
		this.callSuper();
        
        // Check the params
        if (!params) {
            params = {};
        }
        if (!params.color) {
            params.color = "#000000";
        }
        if (!params.background) {
            params.background = "#FFFFFF";
        }
        if (!params.x) {
            params.x = 0;
        }
        if (!params.y) {
            params.y = 0;
        }
        if (!params.width) {
            params.width = 200;
        }
        if (!params.height) {
            params.height = 100;
        }
        if (!params.text) {
            params.text = "New button";
        }
        
        // Add a label to the button
        var text = new Text(params.text, 'bold 36px Arial', params.color);
        text.maxWidth = params.width;
        text.maxHeight = params.height;
		text.x = params.x;
		text.y = params.y;
		text.textAlign = 'center';
        this.addChild(text);
        
        // Set the "onclick" event
        if (params.click) {
            this.onPress = params.click;
        }
        
        // Draw a rounded rectangle on the button
        var rect = new Shape();
        rect.graphics.beginFill(params.background).drawRoundRect(params.x - (params.width / 2), params.y - (params.height / 2) - (text.getMeasuredLineHeight() / 2), params.width, params.height, (params.width * 0.1));
        this.addChildAt(rect, 0);
	},
    onPress : function() {
        if (!this.clicked) {
            alert('Click');
        }
    },
    onMouseOver : function() {
        if (!this.clicked) {
            this.alpha = 0.8;
            $('body').css('cursor', 'pointer');
        }
    },
    onMouseOut : function() {
        if (!this.clicked) {
            this.alpha = 1;
            $('body').css('cursor', 'default');
        }
    }
    
}
var Button = new JS.Class(Container, ButtonClass);