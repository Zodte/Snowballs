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
    if( this._isDeadNow ) {
        return entityManager.KILL_ME_NOW;
    }
	
    if (this.cx > g_canvas.width + 50) return entityManager.KILL_ME_NOW;

	this.velY += GRAVITY;
	
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 0.2 * du;
	
    // Handle collisions
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
			canTakeHit.call(hitEntity, 1); 
			return entityManager.KILL_ME_NOW;
		}
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};


Snowball.prototype.getRadius = function () {
    return 4;
};


Snowball.prototype.render = function (ctx) {
	
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
