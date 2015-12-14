// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouseDown(evt) {    
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
	if(button == 1){
		if(entityManager._sleighs.length > 0){
			entityManager._sleighs[0].fire();
		}
	}
}

function handleMouseMove(evt){
	g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
}

function handleMouseUp(evt){
	if(entityManager._sleighs.length > 0){
		entityManager._sleighs[0].unfire();
	}else{
		var btn = spatialManager.findBtnInRange(g_mouseX,g_mouseY);
		if(btn){
			btn.clicked();
		}
	}
}


// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseup", handleMouseUp);
