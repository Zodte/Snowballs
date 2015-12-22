// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Snowball(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
	this.sprite = this.sprite || g_sprites.snowball
	this.piercing = Player.getPiercing();
	this.magicRadius = Player.getSnowBallMagicRadius();
    // Make a noise when I am created (i.e. fired)
    //if(!MUTE) this.fireSound.play();
}

Snowball.prototype = new Entity();


// HACKED-IN AUDIO (no preloading)
//Bullet.prototype.fireSound = new Audio(
    //"sounds/bulletFire.ogg");
//Bullet.prototype.zappedSound = new Audio(
    //"sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Snowball.prototype.rotation = 0;
Snowball.prototype.cx = 200;
Snowball.prototype.cy = 200;
Snowball.prototype.velX = 1;
Snowball.prototype.velY = 0;

// Convert times from milliseconds to "nominal" time units.

Snowball.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
	this.lived++;
    if( this._isDeadNow ) {
        return entityManager.KILL_ME_NOW;
    }
	
    if (this.cx > g_canvas.width + this.getRadius() 
		|| this.cx < - this.getRadius()
		|| this.cy > entityManager.GROUND_HEIGHT + this.getRadius()) return entityManager.KILL_ME_NOW;

	this.velY += GRAVITY;
	if(this.vel > 0){
		this.velX -= GRAVITY;
	}else if(this.vel < 0){
		this.velX += GRAVITY;
	}
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 0.2 * du;
	
    // Handle collisions
	//MainHit
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.getSnowballHit;
        if (canTakeHit) {
			canTakeHit.call(hitEntity, this.damage); 
			if(this.piercing < 2){
				return entityManager.KILL_ME_NOW;
			}else{
				this.piercing--;
			}
		}
    }
	//MagicHit
	var pos = this.getPos();
    var hitEntity = spatialManager.findAllEntityInRange(
        pos.posX-this.magicRadius, pos.posY, this.magicRadius
    );
    if (hitEntity[0]) {
		for(var i = 0; i < hitEntity.length; i++){
			var canTakeHit = hitEntity[i].getSnowballHit;
			if (canTakeHit) {
				canTakeHit.call(hitEntity[i], (Player.getSnowBallMagicDamage()/4) * this.damage); 
			}
		}
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};


Snowball.prototype.getRadius = function () {
    return 4;
};

Snowball.prototype.drawMagicRadiues = function(){
	ctx.globalAlpha = 0.2
	ctx.strokeStyle = "#97FFFF"
	var radiuses = this.magicRadius/5;
	var radSize = this.magicRadius/radiuses;
	for(var i = 0; i<radiuses; i++){
		ctx.beginPath()
		ctx.arc(this.cx,this.cy,i*radSize + (this.lived%20)/5,0,2*Math.PI);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
};

Snowball.prototype.render = function (ctx) {
	
	ctx.beginPath();
	this.drawMagicRadiues(ctx);
	
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
