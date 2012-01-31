var canvas;
var stage;

var images = new Array();
var elements = new Array();

var circles = new Array();
var paths = new Array();
var currentPath = new Array();

var gridPas = 30;
var update = true;

function Point(x, y) {this.x = x;this.y = y;}

function log(sz_Text) {
	$(".information").prepend(sz_Text + "<br />\n");
}
function logCurrentPath(sz_Name) {
	var sz_Text = "'" + sz_Name + "': [";
	for(index in currentPath) {
		if(index > 0) sz_Text = sz_Text + ", ";
		sz_Text = sz_Text + "new Point(" + currentPath[index].x + ", " + currentPath[index].y + ")";
	}
	sz_Text = sz_Text + "]";
	log(sz_Text);
}

function init() {
	canvas = document.getElementById("yadobe-canvas");
	canvas.onmousemove = handleMouseMove;
	canvas.onmouseup = handleMouseClick;
	stage = new Stage(canvas);

	// enabled mouse over / out events
	stage.enableMouseOver(25);
	
	images.background = new Image();
	images.background.onload	= handleLoadImageBackground;
	images.background.src		= "../../img/bg_800x600.png";
}

function handleMouseClick(e) {
	var offsetWrapper = $(".yadobe-canvas-wrapper").offset();
	var p = new Point(e.pageX - offsetWrapper.left, e.pageY - offsetWrapper.top);
}
function handleMouseMove(e) {
	var offsetWrapper = $(".yadobe-canvas-wrapper").offset();
	var p = new Point(e.pageX - offsetWrapper.left, e.pageY - offsetWrapper.top);
}

function handleLoadImageBackground() {
	elements.bgBitmap = new Bitmap(images.background);
	elements.bgBitmap.x = 0;
	elements.bgBitmap.y = 0;
	elements.bgBitmap.alpha = 0.8;
	restart();
}

function restart() {
	
	stage.removeAllChildren();
	stage.clear();
	update = true;
	
	currentPath = new Array();
	circles = new Array();
	stage.addChild(elements.bgBitmap);
	
	// Quadrillage
	var quadrillage = new Container();
	var i;
	var shape;
	for(i=0;i<canvas.width;i+=gridPas) {
		console.debug(i);
		shape = new Shape();
		shape.graphics.setStrokeStyle(1).beginStroke("#000").moveTo(i, 0).lineTo(i, canvas.height);
		quadrillage.addChild(shape);
	}
	for(i=0;i<canvas.height;i+=gridPas) {
		shape = new Shape();
		shape.graphics.setStrokeStyle(1).beginStroke("#000").moveTo(0, i).lineTo(canvas.width, i);
		quadrillage.addChild(shape);
	}
	stage.addChild(quadrillage);
	
	// Point d'intersection
	var points = new Container();
	for(i=0;i<canvas.width;i+=gridPas) {
		for(var j=0;j<canvas.height;j+=gridPas) {
			var circle = new Shape();
			circle.graphics.beginFill(Graphics.getRGB(255, 0, 0, 1)).drawCircle(0,0,10);
			circle.regX = 0;
			circle.regY = 0;
			circle.x = i;
			circle.y = j;
			circle.scale = 1;
			circle.alpha = 0.1;
			circle.clicked = false;
			circle.mouseEnabled = true;
			
			(function(target) {
				circle.onPress = function(e) {
					if(!target.clicked) {
						currentPath.push(new Point(target.x, target.y));
						target.alpha = 1;
						target.clicked = true;
						update = true;
					}
				};
				circle.onMouseOver = function() {
					if(!target.clicked) {
						target.alpha = 1;
						$('body').css('cursor', 'pointer');
						update = true;
					}
				};
				circle.onMouseOut = function() {
					if(!target.clicked) {
						target.alpha = 0.1;
						$('body').css('cursor', 'default');
						update = true;
					}
				};
			})(circle);

			var length = circles.length;
			circles[length] = circle;
			points.addChild(circle);
			
		}
	}
	stage.addChild(points);
	
	//createWorker(1, positions.table1);
	//start game timer
	Ticker.addListener(window);
}

function tick() {
	//call sub ticks
	if(update) {
		update = false; // only update once
		stage.update();
	}
}

/**
 * JQUERY STUFF
 */
$().ready(function() {	
	$("#restartCanvas").click(function() {
		gridPas = parseInt($("#pasValue").val(), 10);
		restart();
	});
	$("#closePath").click(function() {
		gridPas = parseInt($("#pasValue").val(), 10);
		logCurrentPath($("#namePath").val());
		paths[$("#namePath").val()] = currentPath;
		restart();
	});
});