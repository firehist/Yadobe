(function(window) {

	// Class Table
	function Table(oCoordinates, sName) {
		this.initialize(oCoordinates, sName);
	}
	
	Table.prototype = new Place();
	// public attributes
	Table.prototype.coordinates = null;
	Table.prototype.name		= '';
	Table.prototype.lastAction	= null;
	/* @var array actionsList : { "name1":"name2", "name0":"name1",  "name2":"name0" } */
	Table.prototype.actionsList = null;
	Table.prototype.sprite		= null;

	// constructor:
	Table.prototype.Place_initialize = Table.prototype.initialize;	//unique to avoid overiding base class
	
	Table.prototype.initialize = function(size) {
		this.Shape_initialize(); // super call
		
		this.activate(size);
	}

	// public methods
	Table.prototype.getNextAction = function() {
		if(this.lastAction != null && this.actionsList != null) {
			if(this.actionsList[this.lastAction] != undefined) {
				return this.actionsList[this.lastAction];
			}
		}
		return false;
	}

	window.Table = Table;
	
}(window));
