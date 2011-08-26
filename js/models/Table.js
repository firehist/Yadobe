(function(window) {

	// Class Place
	function Place(oCoordinates, sName) {
		this.initialize(size);
		this.coordinates = oCoordinates;
		this.name = sName;
	}
	// public attributes
	Place.prototype.coordinates = null;
	Place.prototype.name		= '';
	Place.prototype.lastAction	= null;
	/* @var array actionsList : { "name1":"name2", "name0":"name1",  "name2":"name0" } */
	Place.prototype.actionsList = null;
	Place.prototype.sprite		= null;

	// public methods
	Place.prototype.getNextAction = function() {
		if(this.lastAction != null && this.actionsList != null) {
			if(this.actionsList[this.lastAction] != undefined) {
				return this.actionsList[this.lastAction];
			}
		}
		return false;
	}

	window.Place = Place;
	
}(window));
