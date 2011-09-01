/**
 * WaitingPage Game class
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class Waiting
 */
var WaitingPageClass = {
	// Attributes
	progressBar: {
		shape: null,
		text: null,
		value: 0,
		width: 350,
		height: 70
	},
	// Constructor
	/**
	 * @constructor
	 * @class WaitingPage
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initialize: function() {
		console.log('Dinner Game init');
		console.debug(Yadobe.getInstance());
		// init Page Container
		this.pageContainer = new Container();
		Yadobe.getInstance().stage.addChild(this.pageContainer);
		// init background
		this.createWaiting();
		Yadobe.getInstance().setUpdate();
	},
	/**
	 * Create the waiting page
	 * @class WaitingPage
	 * @method createWaiting
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	createWaiting: function() {
		// Fond gris clais
		$(Yadobe.getInstance().canvas).css('background-color','#CCC');
		// Rectangle fond
		var center = this.getPointCenterProgressBar();
		var rectGraphic = new Graphics().beginStroke("#000").beginFill("#999").setStrokeStyle(2).drawRoundRect(center.x, center.y, this.progressBar.width, this.progressBar.height, 10);
		var rectShape = new Shape(rectGraphic);
		// Text
		var t = new Text('0%', 'bold 36px Arial', '#000');
		t.x = parseInt(Yadobe.getInstance().canvas.width / 2, 10);
		t.y = parseInt(Yadobe.getInstance().canvas.height / 2, 10) - parseInt(parseInt(Yadobe.getInstance().canvas.height / 2, 10)/3, 10);
		t.textAlign = 'center';
		this.progressBar.text = t;
		// progress bar
		this.progressBar.shape = new Shape();
		// Add elements to container
		this.pageContainer.addChildAt(rectShape, 0);
		this.pageContainer.addChildAt(this.progressBar.shape, 1);
		this.pageContainer.addChildAt(this.progressBar.text, 2);
		// Progress bar
		this.drawProgressBar();
	},
	/**
	 * Compute x and y for the progress bar
	 * @class WaitingPage
	 * @method createWaiting
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 * @return Point The coordonate
	 */
	getPointCenterProgressBar: function() {
		return new Point(parseInt(Yadobe.getInstance().canvas.width / 2, 10) - parseInt(this.progressBar.width / 2, 10), parseInt(Yadobe.getInstance().canvas.height / 2, 10) - parseInt(this.progressBar.height / 2, 10));
	},
	/**
	 * Set the progress bar value to the number given in parameter
	 * @class WaitingPage
	 * @method setProgressBarValue
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	setProgressBarValue: function(number) {
		this.progressBar.value = number;
		this.drawProgressBar();
		Yadobe.getInstance().setUpdate();
	},
	/**
	 * Draw the progressBar %
	 * @class WaitingPage
	 * @method drawProgressBar
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	drawProgressBar: function() {
		// Rectangle progressBar
		var center = this.getPointCenterProgressBar();
		var widthProgressBar = parseInt(this.progressBar.width / 100 * this.progressBar.value, 10);
		this.progressBar.text.text = this.progressBar.value + '%';
		this.progressBar.shape.graphics = new Graphics()
			.beginFill("#EEE")
			.setStrokeStyle(0)
			.drawRoundRect(center.x+2, center.y+2, widthProgressBar-4, this.progressBar.height-4, 10);		
	}
};
var WaitingPage = new JS.Class(Page, WaitingPageClass);
