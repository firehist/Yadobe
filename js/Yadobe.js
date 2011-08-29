var Yadobe = new JS.Class({
	images: new Array(),
	elements: new Array(),
	workers: new Array(),
	positions: {
		'reception' : new Point(50, 340),
		'table1' : new Point(260, 350)
	},
	paths: {
		'reception-table1' : [new Point(50,340), new Point(170,340), new Point(170,350), new Point(260, 350)]
	},
	initialize: function() {
		console.log('init');
		// Init JS.Class
		// Init canvas
		this.canvas = document.getElementById("yadobe-canvas");
		// Init stage
		this.stage = new Stage(this.canvas);
		this.stage.enableMouseOver(10);
		// Init background image
		this.images.background			= new Image();
		this.images.background.onload	= this.handleLoadImageBackground.call(this);
		this.images.background.src		= "/img/bg_800x600.png";
	},

		handleLoadImageBackground: function() {
			console.log('handleLoadImageBackground');
			this.elements.bgBitmap = new Bitmap(this.images.background);
			this.elements.bgBitmap.x = 0;
			this.elements.bgBitmap.y = 0;
			this.restart();
		},

		restart: function() {
			console.log('restart');
			this.stage.addChild(this.elements.bgBitmap);
			//start game timer
			Ticker.addListener(this);
		},

		tick: function() {
			//call sub ticks
			this.stage.update();
		}
});