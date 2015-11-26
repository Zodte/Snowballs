
"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function PowerUp(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.scale  = this.scale  || 1;
	this.rotation = this.rotation || 0;
	this.choosePower();
};

PowerUp.prototype = new Entity();

PowerUp.prototype.allPowers = ["milk","cookie"];
PowerUp.prototype.velY = 0;

PowerUp.prototype.choosePower = function(){
	this.powerNum = Math.floor(util.randRange(0,1.999));
	this.power = this.allPowers[this.powerNum];
	this.sprites = g_sprites.powerUps[this.powerNum];
};

PowerUp.prototype.update = function (du) {
	
    spatialManager.unregister(this);
	
	this.lived ++;
	
	 if( this._isDeadNow || this.cx < -50) {
        return entityManager.KILL_ME_NOW;
    }
	
    this.cx -= MAP_SPEED;
	
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
    return this.sprites[this.spriteIndex].scale * (this.sprites[this.spriteIndex].width / 2);
};


PowerUp.prototype.getPower = function () {
	this.kill();
	return this.power;
};

PowerUp.prototype.spriteIndex = 0;
PowerUp.prototype.numImages = [3,7];
PowerUp.prototype.render = function (ctx) {
    var delay = 10
	var spriteDelay = this.lived % delay;
	if(spriteDelay == 0) this.spriteIndex = (this.spriteIndex + 1)%this.numImages[this.powerNum];
	var origScale = this.sprites[this.spriteIndex].scale;
    // pass my scale into the sprite, for drawing
    this.sprites[this.spriteIndex].scale = this.scale;
	this.sprites[this.spriteIndex].drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    
};
