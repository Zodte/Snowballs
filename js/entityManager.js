/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA
_tiles		: [],
_bg 		: [],
_snowballs  : [],
_sleighs    : [],
_enemies    : [],
_animations : [],
_powerups	: [],
_foreGround : [],

_bShowRocks : true,

// "PRIVATE" METHODS
_generateForeGrounds: function() {
	this.generateForeGround();
},

_generateBgs : function() {
	this.generateBg();
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,
gameHasStarted: false,
gameIsWon: false,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bg, this._foreGround, this._sleighs, this._snowballs, this._enemies, this._animations, this._powerups];
},

init: function() {	
	this._generateForeGrounds();
	this._generateBgs();
},



//Generating---------------------------------------------------------------------------------------------------------

generateForeGround : function(descr) {
	this._foreGround.push(new foreGround(descr));
},

generateBg : function(descr) {
	this._bg.push(new backGround(descr));
},

generateRock : function(descr) {
    this._rocks.push(new Rock(descr));
},

generatePowerUp : function(descr) {
    this._powerups.push(new PowerUp(descr));
},

generateSleigh : function(descr) {
    this._sleighs.push(new Sleigh(descr));
},

generateSnowball : function(cx,cy,velX,velY,damage){
	this._snowballs.push(new Snowball({
		cx		: 	cx,
		cy		: 	cy,
		velX	: 	velX,
		velY	:	velY,
		damage	:	damage
	}));
},
/*
createGreaterExplosion : function(descr) {
	this._animations.push(new GreaterExplosion(descr));
},*/
//-------------------------------------------------------------------------------------------------------------------

//EnetyManager function----------------------------------------------------------------------------------------------
clearBullets: function() {
    this._snowballs.forEach(function(snowball){
        snowball.kill();
    });
},

isPlayerDead: function(){
	return (this._sleighs.length === 0);
},

playAgain: function(){
/*	this.clearBullets();
	this._enemies.forEach(function(enemy){
        enemy.kill();
    });
	this._ships.forEach(function(ship){
			ship.kill();
		});
	this._powerups.forEach(function(powerUp){
		powerUp.kill();
	});
	this._bg[0].reset();
	this._tiles[0].reset();
	Score.score = 0;*/
	this.generateSleigh({
        cx : 200,
        cy : 200,
		sprite : g_sprites.sleigh
    }); 
},
//-------------------------------------------------------------------------------------------------------------------


/*
resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},	
*/

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

},

renderGameLost: function(ctx){
	ctx.font = '40px sans-serif';
	ctx.fillStyle = 'white';
	ctx.fillText("You Lost", g_canvas.width/2-80, g_canvas.height/2);
	ctx.font = '20px sans-serif';
	ctx.fillText("Press 'T' to play Again", g_canvas.width/2-100, g_canvas.height/2+30);

},

//RENDER-----------------------------------------------------------------------------------------------
renderStartGame: function(ctx){
    ctx.font = '40px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText("Welcome to R-Type", g_canvas.width/2-150, g_canvas.height/2);
    ctx.font = '20px sans-serif';
    ctx.fillText("Press 'T' to start the game", g_canvas.width/2-100, g_canvas.height/2+30);
},

renderGameWon: function(ctx){
    ctx.font = '40px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText("Congratulations!!!", g_canvas.width/2-150, g_canvas.height/2);
    ctx.font = '20px sans-serif';
},

render: function(ctx) {
	
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowRocks && 
            aCategory == this._rocks)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
	
	Score.render(ctx);
	if(entityManager.isPlayerDead() && entityManager.gameHasStarted){
        entityManager.gameIsWon = false;
		this.renderGameLost(ctx);	
	}

    if(!entityManager.gameHasStarted){
        this.renderStartGame(ctx);
    }

    if(entityManager.gameIsWon){
        this.renderGameWon(ctx);
    }
}

//----------------------------------------------------------------------------------------------------------

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

