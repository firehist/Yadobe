/**
 * IndexPage Game class SINGLETON
 * @author Benjamin Longearet <firehist@gmail.com>
 * @since 02/09/2011
 * @class IndexPage
 * @requires IndexConst
 */
var IndexPageClass = {
	// Attributes
	// Constructor
	/**
	 * @constructor
	 * @class IndexPage
	 * @method initialize
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 */
	initialize: function() {
		IndexPage.instance = this;
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
	 * @class IndexPage
	 * @method create
	 * @author Benjamin Longearet <firehist@gmail.com>
	 * @since 02/09/2011
	 */
	create: function() {
        
        // Play button
        var playButton = new Button({
            text : Translation.getTranslation('Play'),
            x : 140,
            y : 170,
            height : 120,
            width : 200,
            background : "#971A1D",
            color : "#000000",
            click : function() {
                // Display the DinnerGame page
                Yadobe.getInstance().setCurrentPage(DinnerGamePage.getInstance());
            }
        });
        this.pageContainer.addChild(playButton);
        
        // Options button
        var optionsButton = new Button({
            text : Translation.getTranslation('Options'),
            x : 570,
            y : 300,
            height : 60,
            width : 200,
            background : "#971A1D",
            color : "#000000",
            click : function() {
                // Display the Options page
                alert('Options');
            }
        });
        this.pageContainer.addChild(optionsButton);
        
        // Exit button
        var exitButton = new Button({
            text : Translation.getTranslation('Exit'),
            x : 450,
            y : 380,
            height : 60,
            width : 200,
            background : "#971A1D",
            color : "#000000",
            click : function() {
                // Display the Options page
                alert('Exit');
            }
        });
        this.pageContainer.addChild(exitButton);
        
        // Help button
        var helpButton = new Button({
            text : Translation.getTranslation('Help'),
            x : 300,
            y : 460,
            height : 60,
            width : 200,
            background : "#971A1D",
            color : "#000000",
            click : function() {
                // Display the Options page
                alert('Exit');
            }
        });
        this.pageContainer.addChild(helpButton);
        
		Yadobe.getInstance().setUpdate();
	}
};
var IndexPage = new JS.Class(Page, IndexPageClass);

// Static attribute
IndexPage.instance = null;
// Static method singleton
IndexPage.getInstance = function() {
	if(IndexPage.instance != null) {
		return IndexPage.instance;
	} else {
		return new IndexPage();
	}
};