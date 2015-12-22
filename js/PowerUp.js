
"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function PowerUp(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.scale  = this.scale  || 1;
	this.rotation = this.rotation || 0;
	this.decideDirection();
	this.choosePower();
};

PowerUp.prototype = new Entity();

PowerUp.prototype.allPowers = ["milk","cookie"];
PowerUp.prototype.life = 300;

PowerUp.prototype.choosePower = function(){
	this.powerNum = Math.floor(util.randRange(0,1.999));
	this.power = this.allPowers[this.powerNum];
	this.sprites = g_sprites.powerUps[this.powerNum];
};

PowerUp.prototype.decideDirection = function() {
	var dir = util.randRange(0,2*Math.PI);
	this.velX = Math.cos(dir) * this.vel;
	this.velY = Math.sin(dir) * this.vel;
};

PowerUp.prototype.update = function (du) {
	
    spatialManager.unregister(this);
	
	this.lived ++;
	
	 var slowDownSpeed = 0.82;
	if(this.cx < -this.getRadius() || this.lived >= this.life) return entityManager.KILL_ME_NOW;
	if(Math.abs(this.velX) > 0.01){
		this.velX *= slowDownSpeed;
	}else{
		this.velX = 0;
	}
	if(Math.abs(this.velY) > 0.01){
		this.velY *= slowDownSpeed;
	}else{
		this.velY = 0;
	}
	
	if(!entityManager.isPlayerDead())
	{
		var pos = entityManager.getSleighPos();
		var dx = pos.posX - this.cx;
		var dy = pos.posY - this.cy;
		var mag = Math.sqrt(dx * dx + dy * dy);
		if(Math.abs(Math.sqrt(util.distSq(this.cx,this.cy,pos.posX,pos.posY))) < Player.getMagnetRadius()){
			var strength = 3;
			this.velX = (dx / mag) * strength;
			this.velY = (dy / mag) * strength;
		}
	}
	if(this.cx + this.velX <= g_canvas.width - this.getRadius() && this.cx + this.velX > this.getRadius()){
		this.cx += this.velX;
	}
	if(this.cy + this.velY <= entityManager.GROUND_HEIGHT + this.getRadius()/2 && this.cy + this.velY > 0+	this.getRadius()){
		this.cy += this.velY;
	}
	
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
