
"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function PowerUp(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.scale  = this.scale  || 1;
	this.rotation = this.rotation || 0;
	this.xVel = this.speed || 0;
	this.choosePower();
};

PowerUp.prototype = new Entity();

PowerUp.prototype.allPowers = ["milk","cockie"];

PowerUp.prototype.choosePower = function(){
	var num = Math.floor(util.randRange(0,3.9999));
	this.power = this.allPowers[num];
	this.sprites = g_sprites.powerUps[0];
}

PowerUp.prototype.update = function (du) {
	
    spatialManager.unregister(this);
	
	this.lived ++;
	
	 if( this._isDeadNow || this.cx < -50) {
        return entityManager.KILL_ME_NOW;
    }
    this.cx -= this.xVel;
	
	// Handle collisions
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canPowerUp = hitEntity.takePowerUp;
        if (canPowerUp) {
			canPowerUp.call(hitEntity, this.power); 
			return entityManager.KILL_ME_NOW;
		}
    }
    spatialManager.register(this);
};

PowerUp.prototype.getRadius = function () {
    //return this.scale * (this.sprite.width / 2) * 0.9;
};


PowerUp.prototype.getPower = function () {
	this.kill();
	return this.power;
};

PowerUp.prototype.spriteIndex = 0;
PowerUp.prototype.render = function (ctx) {
    var delay = 10
	var spriteDelay = this.lived % delay;
	if(spriteDelay == 0) this.spriteIndex = (this.spriteIndex + 1)%3;
	var origScale = this.sprites[this.spriteIndex].scale;
    // pass my scale into the sprite, for drawing
    this.sprites[this.spriteIndex].scale = this.scale;
	console.log(this.spriteIndex)
	this.sprites[this.spriteIndex].drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    
};
