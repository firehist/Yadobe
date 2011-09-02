/**
 * WaitingPage Game class SINGLETON
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 31/08/2011
 * @class WaitingPage
 * @requires IndexConst, DinnerConst
 */
var WaitingPageClass = {
	// Attributes
	/**
     * define progressBar size and elements
	 * @type Object
	 * @private
	 */
	progressBar: {
		shape: null,
		text: null,
		value: 0,
		width: 350,
		height: 50
	},
	/**
     * list all ressource to load
	 * @type Object
	 * @private
	 */
	toLoad: {
		images: {
			accueil: INDEXCONST.IMAGE,
			dinnerGame: DINNERCONST.IMAGE
		},
		js: {
			accueil: INDEXCONST.LOADING,
			dinnerGame: DINNERCONST.LOADING
		}
	},
	/**
     * define the number of ressource to load
	 * @type number
	 * @private
	 */
	numToLoad: 0,
	/**
     * define the number of ressource loaded
	 * @type number
	 * @private
	 */
	numLoaded: 0,
	// Constructor
	/**
	 * @constructor
	 * @class WaitingPage
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	initialize: function() {
		WaitingPage.instance = this;
		// init Page Container
		this.callSuper();
		// compute loader information
		for(var index in this.toLoad) {
			var tmp = this.toLoad[index];
			for(index in tmp) {
				this.numToLoad += Tools.ObjSize(tmp[index]);
			}
		}
		// init background
		this.create();
		Yadobe.getInstance().setUpdate();
	},
	/**
	 * Create the waiting page
	 * @class WaitingPage
	 * @method create
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 01/09/2011
	 */
	create: function() {
		// Fond gris clais
		$(Yadobe.getInstance().canvas).css('background-color','#CCC');
		// Rectangle fond
		var center = this.getPointCenterProgressBar();
		var rectGraphic = new Graphics().beginStroke("#000").beginFill("#999").setStrokeStyle(2).drawRoundRect(center.x, center.y, this.progressBar.width, this.progressBar.height, 10);
		var rectShape = new Shape(rectGraphic);
		// Text
		var t = new Text('0%', 'bold 36px Arial', '#000');
		t.x = parseInt(Yadobe.getInstance().canvas.width / 2, 10);
		t.y = parseInt(Yadobe.getInstance().canvas.height / 2, 10) + 12;
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
	 * @private
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
	 * @public
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
	 * @private
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
	},
	/**
 	 * Launch the loading of all ressources
	 * @class WaitingPage
	 * @method launchLoading
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @public
	 */
	launchLoading: function() {
		var index;
		// Bind images load
		for(index in this.toLoad.images) {
			this.loadImages(this.toLoad.images[index]);
		}
		// Bind ressources load
		for(index in this.toLoad.js) {
			this.loadJSs(this.toLoad.js[index]);
		}
	},
	/**
	 * Initialize Image object and bind callback method
	 * @class WaitingPage
	 * @method loadImages
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @param imgObject Object List of images to load (eg. {name1: '/path/to/img.jpg', name2: '/path/to/img1.png'})
	 * @private
	 */
	loadImages: function(imgObject) {
		for(var x in imgObject) {
			var src = imgObject[x].toString();
			imgObject[x] = new Image();
			imgObject[x].onload = function(){
				var wp = WaitingPage.getInstance();
				wp.loadDone.call(wp)
			};
			imgObject[x].src = src;
		}
	},
	/**
	 * Initialize JS object with JS.require and bind callback method
	 * @class WaitingPage
	 * @method loadJSs
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @param jsObject Array List of package to load (eg. ['PackageName1', 'PackageName2'])
	 * @private
	 */
	loadJSs: function(jsObject) {
		for(var i in jsObject) {
			var callback = function(){
				var wp = WaitingPage.getInstance();
				wp.loadDone.call(wp)
			};
			JS.require(jsObject[i], callback);
		}
	},
	/**
	 * Callback methode to manage loading pourcentage
	 * @class WaitingPage
	 * @method loadDone
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @public
	 */
	loadDone: function() {
		this.numLoaded++;
		this.setProgressBarValue(parseInt(this.numLoaded*100/this.numToLoad, 10));
		if(this.numLoaded == this.numToLoad) {
			Yadobe.getInstance().loadGame();
		}
	},
	/**
	 * Hide function from Page Interface
	 * @class WaitingPage
	 * @method hide
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 * @public
	 */
	hide: function() {
		this.pageContainer.visible = false;
	}
};
var WaitingPage = new JS.Class(Page, WaitingPageClass);

// Static attribute
WaitingPage.instance = null;
// Static method singleton
WaitingPage.getInstance = function() {
	if(WaitingPage.instance != null) {
		return WaitingPage.instance;
	} else {
		return new WaitingPage();
	}
};