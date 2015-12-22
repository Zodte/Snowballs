

"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

function createInitialShips() {
	
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();

    entityManager.update(du);
};

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;


var PLAY_AGAIN = keyCode('T');
var MUTE_KEY = keyCode('M');
var CLEAR_DATA = keyCode('K');
function processDiagnostics() {

	if(eatKey(CLEAR_DATA) && !entityManager.gameHasStarted) {
		Player.clearGame();
	}
	
	if(eatKey(PLAY_AGAIN)){
		if(entityManager.gameIsWon){
			entityManager.gameLost();
		}else if(entityManager.isPlayerDead()){
			entityManager.playAgain();
			entityManager.gameHasStarted = true;
		}
	}
	
	if(eatKey(MUTE_KEY)){
		MUTE = !MUTE;
	} 

}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
	
    entityManager.render(ctx);
	
    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        sleigh  	: "./images/sleigh.gif",
		snowball	: "./images/snowball.png",
		foreGround  : "./images/foreGround.png",
		milk		: "./images/milk.gif",
		cookie		: "./images/cookie.gif",
		bgColor		: "./images/bgColor.png",
		bgMountains : "./images/bgMountains.png",
		straightGift: "./images/redGift.png",
		straightGift2: "./images/redGift2.png",
		straightGift3: "./images/redGift3.png",
		snakeGift   : "./images/blueGift.png",
		snakeGift2  : "./images/blueGift2.png",
		snakeGift3  : "./images/blueGift3.png",
		bombGift    : "./images/surpriseGift.png",
		bombGift2   : "./images/surpriseGift2.png",
		bombGift3   : "./images/surpriseGift3.png",
		scoreGift   : "./images/scoreGift.gif",
		xMasTree    : "./images/xmasTree.gif",
		oldTree1    : "./images/oldTree1.png",
		oldTree2    : "./images/oldTree2.png",
		blueStardust: "./images/stardust.png",
		goldStardust: "./images/stardust2.png",
		UI			: "./images/UI.png",
		homingGift  : "./images/homingGift.gif",
		homingGift2 : "./images/homingGift2.gif",
		homingGift3 : "./images/homingGift3.gif",
		snowManHead : "./images/snowManHead.gif",
		snowManHead2: "./images/snowManHead2.gif",
		snowManHead3: "./images/snowManHead3.gif",
		snowManBody : "./images/snowManBody.png",
		cloudEnemy  : "./images/cloudEnemy.gif",
		cloudEnemy2 : "./images/cloudEnemy2.gif",
		cloudEnemy3 : "./images/cloudEnemy3.gif",
		snowBlast 	: "./images/snowBlast.gif",
		button		: "./images/addButton.gif",
		underUI		: "./images/underUI.png",
		mainScreen  : "./images/mainScreen.png",
		upgradeScreen: "./images/upgradeScreen.png",
		finishScreen: "./images/finishScreen.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var g_animatedSprites = {};

function preloadDone() {

    createSprites(g_images, g_sprites, g_animatedSprites);


    entityManager.init();
    //createInitialShips();

    main.init();
}

// Kick it off
requestPreloads();