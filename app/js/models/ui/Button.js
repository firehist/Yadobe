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

        // Set the "onclick" event
        if (params.click) {
            var onPress = this.onPress;
            this.onPress = function() {
                onPress.call(this);
                params.click();
            }
        }
        
        // Draw a rounded rectangle on the button
        var rect = new Shape();
        rect.graphics.beginFill(params.background).drawRoundRect(params.x - (params.width / 2), params.y - (params.height / 2), params.width, params.height, (params.width * 0.05));

        // Add a shadow to the rectangle
        rect.shadow = new Shadow(Tools.increaseColor(params.background, -60), 5, 5, 0);
        
        this.addChildAt(rect, 0);
        
        // Add a label to the button
        var text = new Text(params.text.toUpperCase(), '36px fantasy', params.color);
        text.maxWidth = params.width;
        text.maxHeight = params.height;
		text.x = params.x;
		text.y = params.y;
		text.textAlign = 'center';
        text.textBaseline = 'middle';
        this.addChildAt(text, 1);
        
	},
    onPress : function() {
        
        if (!this.clicked) {
            
        }
    },
    onMouseOver : function() {
        
        if (!this.clicked) {
            //this.alpha = 0.8;
            
            // Add a shadow to the rectangle
            var text = this.getChildAt(1);
            text.color = Tools.getOppositeColor(text.color);

            $('body').css('cursor', 'pointer');
            
            Yadobe.getInstance().setUpdate();
        }
    },
    onMouseOut : function() {
        if (!this.clicked) {
            
            // Add a shadow to the rectangle
            var text = this.getChildAt(1);
            text.color = Tools.getOppositeColor(text.color);
            
            $('body').css('cursor', 'default');
            
            Yadobe.getInstance().setUpdate();
        }
    }
    
}
var Button = new JS.Class(Container, ButtonClass);