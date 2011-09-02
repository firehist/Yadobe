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
		// Text
		var text = new Text('Accueil', 'bold 36px Arial', '#000');
		text.x = 100;
		text.y = 100;
		text.textAlign = 'center';
		// Add elements to container
		this.pageContainer.addChildAt(text, 0);
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