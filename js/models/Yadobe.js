var canvas;
var stage;

function Point(x, y) {this.x = x;this.y = y;}

var images = new Array();
var elements = new Array();
var workers = new Array();
var positions = {
	'reception' : new Point(50, 340),
	'table1' : new Point(260, 350)
};
var paths = {
	'reception-table1' : [new Point(50,340), new Point(170,340), new Point(170,350), new Point(260, 350)]
}

function init() {
	console.log('init');
	canvas = document.getElementById("yadobe-canvas");
	canvas.onmousemove = handleMouseMove;
	canvas.onmouseup = handleMouseClick;
	stage = new Stage(canvas);
	// enabled mouse over / out events
	stage.enableMouseOver(10);

	images.background = new Image();
	images.background.onload	= handleLoadImageBackground;
	images.background.src		= "img/bg_800x600.png";
}

function handleMouseClick(e) {
	var offsetWrapper = $(".yadobe-canvas-wrapper").offset();
	var p = new Point(e.pageX - offsetWrapper.left, e.pageY - offsetWrapper.top);
	console.debug(p);
}
function handleMouseMove(e) {
	
}

function handleLoadImageBackground() {
	console.log('handleLoadImageBackground');
	elements.bgBitmap = new Bitmap(images.background);
	elements.bgBitmap.x = 0;
	elements.bgBitmap.y = 0;
	restart();
}

function createWorker(i, position) {
	workers[i] = new Worker();
	workers[i].setPosition(position, positions[position]);
	stage.addChild(workers[i]);
	
	(function(target) {
		target.onPress = function(evt) {
			target.moveWorker('table1', paths[target.position + '-table1']);
			target.update = true;
		}
		target.onMouseOver = function() {
			target.scaleX = target.scaleY = target.scale*1.2;
		}
		target.onMouseOut = function() {
			target.scaleX = target.scaleY = target.scale;
		}
	})(workers[i]);
}

function moveWorker(worker, to) {
	
}

function restart() {
	console.log('restart');
	stage.addChild(elements.bgBitmap);
	// Create worker
	createWorker(0, 'reception');
	//createWorker(1, positions.table1);
	//start game timer
	Ticker.addListener(window);
}

function tick() {
	//call sub ticks
	stage.update();
}