function Gift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
	this.decideDirection();
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale*0.7;
};

Gift.prototype = new Entity();

Gift.prototype.vel = 5;
Gift.prototype.rotation = 0;


Gift.prototype.decideDirection = function() {
	var dir = util.randRange(0,2*Math.PI);
	this.velX = Math.cos(dir) * this.vel;
	this.velY = Math.sin(dir) * this.vel;
	console.log(this.velX, this.velY)
};

Gift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	var slowDownSpeed = 0.82;
	if(this.cx < -this.getRadius()) return entityManager.KILL_ME_NOW;
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
		
	this.cx += this.velX;
	this.cy += this.velY;
		
	
	//handle collision
	var hitEntity = this.findHitEntity();
	if (hitEntity) {
		var canGift = hitEntity.takeGift;
		if (canGift) {
			canGift.call(hitEntity, this.gift); 
			return entityManager.KILL_ME_NOW;
		}
	}
	
	spatialManager.register(this);
};

Gift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};


Gift.prototype.render = function(ctx) {
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	
};