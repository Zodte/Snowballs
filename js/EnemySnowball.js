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
function EnemySnowball(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
	this.sprite = this.sprite || g_sprites.snowball
    // Make a noise when I am created (i.e. fired)
    //if(!MUTE) this.fireSound.play();
}

EnemySnowball.prototype = new Entity();


// HACKED-IN AUDIO (no preloading)
//Bullet.prototype.fireSound = new Audio(
    //"sounds/bulletFire.ogg");
//Bullet.prototype.zappedSound = new Audio(
    //"sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
EnemySnowball.prototype.rotation = 0;
EnemySnowball.prototype.cx = 200;
EnemySnowball.prototype.cy = 200;
EnemySnowball.prototype.velX = 1;
EnemySnowball.prototype.velY = 0;

// Convert times from milliseconds to "nominal" time units.

EnemySnowball.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
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
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.getEnemyHit;
        if (canTakeHit) {
			canTakeHit.call(hitEntity, this.damage); 
			return entityManager.KILL_ME_NOW;
		}
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};


EnemySnowball.prototype.getRadius = function () {
    return 4;
};


EnemySnowball.prototype.render = function (ctx) {
	
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
