// Engine Entry Point
var WIDTH = 1024;
var HEIGHT = 640;

// FPS
var FPS = 60;

// To be defined at runtime
var RATIO = null;
var currentWidth = null;
var currentHeight = null;

var canvas;	// Canvas
var drawingSurface;	// Drawing Surface

var canvasPosX, canvasPosY = 0;

var offScreenCanvas = document.createElement("canvas");
var offScreenCanvasCtx = offScreenCanvas.getContext("2d");

// Mouse State
var MOUSE_X = 0;
var MOUSE_Y = 0;
var MOUSE_CLICKED = false;

// Touch State (multi-touch not supported here!)
var TOUCH_X = 0;
var TOUCH_Y = 0;
var TOUCH_TAP = false;

(function(){

// Load and Resize for mobile devices
function init()
{
	RATIO = WIDTH / HEIGHT;
	currentWidth = WIDTH;
	currentHeight = HEIGHT;
	
	canvas = document.getElementById("canvas");	// Canvas

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	drawingSurface = canvas.getContext("2d");	// Drawing Surface
	
	resize();
	
	// Add mouse listeners
	canvas.addEventListener("mousemove", function(event)
	{
		var rect = canvas.getBoundingClientRect();
		
		MOUSE_X = (event.pageX - canvas.offsetLeft) * (canvas.width / rect.width);
		MOUSE_Y = (event.pageY - canvas.offsetTop) * (canvas.height / rect.height);
		
		//Prevent the canvas from being selected
		event.preventDefault();
	}, false);
	
	canvas.addEventListener("mousedown", function(event)
	{
		var rect = canvas.getBoundingClientRect();
		
		MOUSE_X = (event.pageX - canvas.offsetLeft) * (canvas.width / rect.width);
		MOUSE_Y = (event.pageY - canvas.offsetTop) * (canvas.height / rect.height);
		MOUSE_CLICKED = true;
		
		//Prevent the canvas from being selected
		event.preventDefault();
	}, false);
	
	canvas.addEventListener("mouseup", function(event)
	{
		var rect = canvas.getBoundingClientRect();
		
		MOUSE_X = (event.pageX - canvas.offsetLeft) * (canvas.width / rect.width);
		MOUSE_Y = (event.pageY - canvas.offsetTop) * (canvas.height / rect.height);
		MOUSE_CLICKED = false;
		
		//Prevent the canvas from being selected
		event.preventDefault();
	}, false);
	
	// Add touch listeners (for menus, multi-touch not supported here)
	canvas.addEventListener("touchstart", function(event)
	{
		//Find the touch point's x and y position 
		var rect = canvas.getBoundingClientRect();
		
		TOUCH_X = (event.targetTouches[0].pageX - canvas.offsetLeft) / (rect.width / canvas.width); 
		TOUCH_Y = (event.targetTouches[0].pageY - canvas.offsetTop) / (rect.height / canvas.height);
		TOUCH_TAP = true;
		
		//Prevent the canvas from being selected 
		event.preventDefault(); 

	}, false); 

	canvas.addEventListener("touchmove", function(event)
	{
		//Find the touch point's x and y position
		var rect = canvas.getBoundingClientRect();
		
		TOUCH_X = (event.changedTouches[0].pageX - canvas.offsetLeft) / (rect.width / canvas.width); 
		TOUCH_Y = (event.changedTouches[0].pageY - canvas.offsetTop) / (rect.height / canvas.height);
		
		//Prevent the canvas from being selected 
		event.preventDefault(); 
	}, false);
	
	canvas.addEventListener("touchend", function(event)
	{
		//Find the touch point's x and y position
		var rect = canvas.getBoundingClientRect();
		
		TOUCH_X = (event.changedTouches[0].pageX - canvas.offsetLeft) / (rect.width / canvas.width); 
		TOUCH_Y = (event.changedTouches[0].pageY - canvas.offsetTop) / (rect.height / canvas.height);
		TOUCH_TAP = false;
		
		//Prevent the canvas from being selected 
		event.preventDefault(); 

	}, false); 
		
	// Init Game State
	ECSManager.changeState(Object.create(LoadingState));

	// Start Game Loop
	requestAnimationFrame(update);
	update(0);
}

function resize()
{
	/*currentHeight = window.innerHeight;
	// resize the width in proportion
	// to the new height
	currentWidth = currentHeight * RATIO;*/
	
	var currentRatio = window.innerWidth / window.innerHeight;
	var scale = 1;
	
	var currentX = 0;
	var currentY = 0;
	
	if (currentRatio > RATIO)
	{
		scale = window.innerHeight / HEIGHT;
		canvasPosX = (window.innerWidth - WIDTH*scale)/2;
	}
	else if (currentRatio < RATIO)
	{
		scale = window.innerWidth / WIDTH;
		canvasPosY = (window.innerHeight - HEIGHT*scale)/2;
	}
	else
	{
		scale = window.innerWidth / WIDTH;
	}

	if (scale > 1)
	{
		canvasPosX = (window.innerWidth - WIDTH)/2;
		canvasPosY = (window.innerHeight - HEIGHT)/2;
		scale = 1;
	}
	
	currentWidth = WIDTH * scale;
	currentHeight = HEIGHT * scale;

	// set the new canvas style width and height
	// note: our canvas is still 1024 x 512, but
	// we're essentially scaling it with CSS
	canvas.style.left = canvasPosX + 'px';
	canvas.style.top = canvasPosY + 'px';
	canvas.style.position = "absolute";
	canvas.style.width = currentWidth + 'px';
	canvas.style.height = currentHeight + 'px';
	
	// Off screen canvas
	offScreenCanvas.width = currentWidth;
	offScreenCanvas.height = currentHeight;

}

window.addEventListener('load', init, false);
window.addEventListener('resize', resize, false);

var interval = 1000/FPS,
	dt = 0,
	previousTs = 0;
	
var calcFps = 0;

// The Game Loop
function update(ts)
{ 
	dt = ts - previousTs;
	
	// Clear canvas
	//drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
	drawingSurface.width = drawingSurface.width;
	drawingSurface.height = drawingSurface.height;
		
	// Update ECS Manager
	if (dt > interval)
	{
		ECSManager.update(dt);
		
		calcFps = 1000/(dt);
		
		previousTs = ts - (dt % interval);
	}
	
	// Draw as much as possible
	//drawingSurface.drawImage(offScreenCanvas, WIDTH, HEIGHT);
	
	// Display FPS
	/*drawingSurface.font = 'italic 40pt Calibri';
	drawingSurface.fillStyle = "black";
	drawingSurface.fillText("FPS: " + Math.floor(calcFps), 300, 50);*/
	
	requestAnimationFrame(update);
}

}())