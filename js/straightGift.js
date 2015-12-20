function straightGift(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	
	var sprites = [g_sprites.straightGift,g_sprites.straightGift2,g_sprites.straightGift3];
	this.sprite = sprites[this.level];
	
	
	
	var velocities = [[1.5,2],[2,2.5],[2.5,3]];
	this.vel = util.randRange(velocities[this.level][0],velocities[this.level][1]);
	this.endCy = util.randRange(0, entityManager.GROUND_HEIGHT);
	this.decideDirection();
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale;
	
	var lives = [[8,12],[40,44],[90,94]]
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	this.reward = [1,7,13];
};

straightGift.prototype = new Entity();

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
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
		this.kill();
	}
}

straightGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

straightGift.prototype.createStarDust = function(){
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: this.velY,
		color: "rgba(255,0,0,0.2)"
	})
}

straightGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)
	
};