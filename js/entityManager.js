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
_generator  : [],
_trees      : [],
_snowballs  : [],
_sleighs    : [],
_enemies    : [],
_gifts      : [],
_snakeGifts : [],
_powerups	: [],
_animations : [],
_stardust   : [],
_snow		: [],

_foreGround : [],


_bShowRocks : true,

// "PRIVATE" METHODS
_generateForeGrounds : function() {
	this.generateForeGround();
},

_generateBgs : function() {
	this.generateBg();
},

_generateGenerator: function(){
	this.generateGenerator();
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
GROUND_HEIGHT: g_canvas.height - 107,
gameHasStarted: false,
gameIsWon: false,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bg, this._generator, this._trees, this._sleighs, this._snowballs, this._enemies, 
						this._gifts, this._snakeGifts, this._powerups, this._animations, 
						this._stardust, this._snow, this._foreGround];
},

init: function() {	
	this._generateForeGrounds();
	this._generateBgs();
},



//Generating---------------------------------------------------------------------------------------------------------
generateBg : function(descr) {
	this._bg.push(new backGround(descr));
},

generateForeGround : function(descr) {
	this._foreGround.push(new foreGround(descr));
},

generateGenerator: function(descr){
	this._generator.push(new Generator(descr));
},

generateGifts : function(descr){
	this._gifts.push(new Gift(descr));
},

generateStraightGifts : function(descr) {
	this._enemies.push(new straightGift(descr));
},

generateSnakeGifts : function(descr) {
	this._enemies.push(new snakeGift(descr));
},

generateBombGifts: function(descr){
	this._enemies.push(new BombGift(descr));
},

generateHomingGifts: function(descr){
	this._enemies.push(new HomingGift(descr));
},

generatePowerUp : function(descr) {
    this._powerups.push(new PowerUp(descr));
},

generateSleigh : function(descr) {
    this._sleighs.push(new Sleigh(descr));
},

generateSnow : function(descr){
	this._snow.push(new Snow(descr));
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

generateStardust : function(descr){
	this._stardust.push(new Stardust(descr));
},

generateTree : function(descr) {
	this._trees.push(new Tree(descr));
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

getSleighPos: function(){
	return this._sleighs[0].getPos();
},

isPlayerDead: function(){
	return (this._sleighs.length === 0);
},

getLoot: function(lvl,pos){
	var amountArr = [0,0,0,0];
	var luck = Player.getLuck();
	var amount = Math.floor(util.randRange(1,1.999+luck+lvl))
	while(amount >= 20){
		amountArr[3] +=1;
		amount -= 20;
	}
	while(amount >= 10){
		amountArr[2] +=1;
		amount -= 10;
	}
	while(amount >= 5){
		amountArr[1] += 1;
		amount -= 5;
	}
	while(amount >= 1){
		amountArr[0] += 1;
		amount -= 1;
	}
	
	if(util.randRange(1,100) > 80-Player.getLuck()-lvl){
		this.generatePowerUp({
			cx : pos.posX,
			cy : pos.posY
		});
	}
	this.spawnEnemyGifts(amountArr,pos);
	
},

spawnEnemyGifts: function(numGifts,pos){
	for(var i = 0; i < numGifts.length; i++){
			for(var j = 0; j < numGifts[i]; j++)
			{
				entityManager.generateGifts({
					cx 	: pos.posX,
					cy 	: pos.posY,
					gift: i
				})
			}
		}
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

	this._generateGenerator();
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

