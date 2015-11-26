function straightGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
	this.endCy = util.randRange(0, entityManager.GROUND_HEIGHT);
	this.decideDirection();
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale;
};

straightGift.prototype = new Entity();

straightGift.prototype.vel = 2;
straightGift.prototype.damage = this.vel*10;

straightGift.prototype.decideDirection = function() {
	var endCx = -50;
	var dx = endCx - this.cx;
	var dy = this.endCy - this.cy;
	var mag = Math.sqrt(dx*dx + dy*dy);
	this.velX = -(dx/mag)*this.vel;
	this.velY = -(dy/mag)*this.vel;
};

straightGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	
if(this.cx < -this.getRadius() || this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	this.cx -= this.velX;
	this.cy -= this.velY;
	
	//handle collision

	var hitEntity = this.findHitEntity();
	if (hitEntity) {
		var canGetEnemyHit = hitEntity.getEnemyHit;
		if (canGetEnemyHit) {
			canGetEnemyHit.call(hitEntity, this.damage); 
			return entityManager.KILL_ME_NOW;
		}
	}

	spatialManager.register(this);
};

straightGift.prototype.getSnowballHit = function(damage){
	entityManager.generateGifts({
		cx : this.cx,
		cy : this.cy
	})
	this.kill();
}

straightGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

straightGift.prototype.createStarDust = function(){
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: this.velY
	})
}

straightGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	
};