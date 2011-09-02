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
        
        var playButton = new Button({
            text : Translation.getTranslation('Play'),
            x : 400,
            y : 200,
            height : 80,
            width : 300,
            background : "#C49A70",
            color : "#FFFFED",
            click : function() {
                // Display the DinnerGame page
                Yadobe.getInstance().setCurrentPage(DinnerGamePage.getInstance());
            }
        });
        this.pageContainer.addChild(playButton);
        
        var optionsButton = new Button({
            text : Translation.getTranslation('Options'),
            x : 400,
            y : 300,
            height : 80,
            width : 300,
            background : "#C49A70",
            color : "#FFFFED",
            click : function() {
                // Display the Options page
                alert('Options');
            }
        });
        this.pageContainer.addChild(optionsButton);
        
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