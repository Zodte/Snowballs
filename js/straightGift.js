function straightGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
	this.decideDirection();
};

straightGift.prototype = new Entity();

straightGift.prototype.velX = 1;

straightGift.prototype.decideDirection = function() {
	this.endCx = -50;
	this.endCy = util.randRange(0, entityManager.GROUND_HEIGHT);
};

straightGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	
	if(this.cx < -this.getRadius()) return entityManager.KILL_ME_NOW;
	
	
	this.cx -= this.velX;
	
	spatialManager.register(this);
};

straightGift.prototype.getRadius = function() {
	return this.sprite.width/3.5;
};

straightGift.prototype.render = function(ctx) {
	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	
};