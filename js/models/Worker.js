(function(window) {

	//
	function Worker() {
	  this.initialize();
	}
	Worker.prototype = new Container();

	// public properties:
	Worker.prototype.SPEED = 10;
	Worker.prototype.NAME = '';

	Worker.prototype.update = false;
	Worker.prototype.position = null;
	Worker.prototype.path = null;
	Worker.prototype.destination = null;
	Worker.prototype.currentStep = 0;
	Worker.prototype.direction = 0;

	// public properties:	
	Worker.prototype.scale = 1;
	
	Worker.prototype.vX = 0;
	Worker.prototype.vY = 0;
	
	Worker.prototype.regX = 5;
	Worker.prototype.regY = 5;
	
	Worker.prototype.bounds = 0;
	Worker.prototype.hit = 0;
	
	// constructor:
	Worker.prototype.Container_initialize = Worker.prototype.initialize;	//unique to avoid overiding base class
	
	Worker.prototype.initialize = function() {
		this.Container_initialize();
		
		this.WorkerBody = new Shape();
		this.addChild(this.WorkerBody);

		this.makeShape();
		this.timeout = 0;
		this.thrust = 0;
		this.vX = 0;
		this.vY = 0;
	}
	
	Worker.prototype.setPosition = function(name, point) {
		this.position = name;
		this.x = point.x;
		this.y = point.y;
	}
	
	Worker.prototype.moveWorker = function(name, path) {
		this.path = path;
		this.update = true;
		this.destination = name;
		this.currentStep = 0;
	}
	
	Worker.prototype.stopWorker = function() {
		this.update = false;
		this.position = this.destination;
		this.path = null;
		this.destination = null;
		this.currentStep = 0;
	}
	
	// public methods:
	Worker.prototype.makeShape = function() {
		//draw Worker body
		var g = this.WorkerBody.graphics;
		g.clear();
		g.beginFill("#333").arc(10,10,20,0,2*Math.PI, true);
		//furthest visual element
		this.bounds = 10; 
		this.hit = this.bounds;
	}
	
	Worker.prototype.tick = function() {
		if(this.update) {
			var lengthPath = this.path.length;
			// Calcul si on est à la fin du chemin
			// Détermine si déplacement X ou Y
			if(this.currentStep+1 < lengthPath) {
				if(this.path[this.currentStep].y == this.path[this.currentStep + 1].y) {
					
					if(this.path[this.currentStep].x > this.path[this.currentStep + 1].x) {
						this.direction = 180;
					} else {
						this.direction = 0;
					}
					this.vX = this.SPEED;
					this.vY = 0;
					if(this.x + this.vX >= this.path[this.currentStep + 1].x) {
						this.vX = this.path[this.currentStep + 1].x - this.x;
						this.currentStep++
					}
				} else {
					if(this.path[this.currentStep].y > this.path[this.currentStep + 1].y) {
						this.direction = 90;
					} else {
						this.direction = 270;
					}
					this.vX = 0;
					this.vY = this.SPEED;
					if(this.y + this.vY >= this.path[this.currentStep + 1].y) {
						this.vY = this.path[this.currentStep + 1].y - this.y;
						this.currentStep++;
					}
				}
			} else {
				this.stopWorker();
			}
			this.x += this.vX;
			this.y += this.vY;
		}
	}

	window.Worker = Worker;
}(window));