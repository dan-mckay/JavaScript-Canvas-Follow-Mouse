// This defines the request animation fram (for cross browser issues)
// The callback function is the followMouse function
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

// This returns the mouse position (called in the event listener)
function getMousePos(canvas, event) {
	var mouseX = event.pageX - canvas.offsetLeft;
	var mouseY = event.pageY - canvas.offsetTop;
	
    return {
        x: mouseX,
        y: mouseY
    };
    
}

// This is a circle object constructor
function Circle(x, y) {
	this.x = x;				// x pos
	this.y = y;				// y pos
	this.radius = 40;
}

// This creates a circle object and draws an arc with its data
// returning the circle object
function drawCircle(x, y, canvas) {
    var context = canvas.getContext('2d');
    var circ = new Circle(x, y);
    context.beginPath();
	context.arc(circ.x, circ.y, circ.radius, 0, 2 * Math.PI);
	context.fill(); 

	return circ;
}

// This is where the animation is done. The function calls itself
// acting as a frame in the animation each time it runs
function followMouse(canvas, mousePos, circ) {
	var context = canvas.getContext("2d");
	var xPos = circ.x;								// Get the coords of circle object passed as an arg
	var yPos = circ.y;
	context.clearRect(0, 0, 700, 700);				// Clear the canvas
	xPos = xPos + (mousePos.x - xPos) / 50;			// Get new coords for animation
	yPos = yPos + (mousePos.y - yPos) / 50;
	var newCirc = new Circle(xPos, yPos);			// Create a new circle to pass into this function
	drawCircle(xPos, yPos, canvas);					
	window.requestAnimFrame(function() {
	 	followMouse(canvas, mousePos, newCirc) 		// Call this function again (a new frame)
	}, canvas);
}

window.onload = function() {
	var canvas = document.getElementById("main");
	
	// Initial position for circle in the middle of the canvas
	var mousePos = {
        x: 350,
        y: 250
    };

    // Initial circle
    var circ = new Circle(mousePos.x, mousePos.y);

	// Event listener for mouse movement on the canvas 
	// (calls the getMousePos function)
	canvas.addEventListener('mousemove', function(event) {
      var pos = getMousePos(canvas, event);
      mousePos.x = pos.x;
      mousePos.y = pos.y;
    }, false);

	// Draw initial circle on the canvas
    followMouse(canvas, mousePos, circ);
}

