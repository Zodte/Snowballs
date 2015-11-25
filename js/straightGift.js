function straightGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
	this.decideDirection();
};

straightGift.prototype = new Entity();

straightGift.prototype.vel = 2;
straightGift.prototype.damage = this.vel*10;
straightGift.prototype.enemy = true;

straightGift.prototype.decideDirection = function() {
	var endCx = -50;
	var endCy = util.randRange(0, entityManager.GROUND_HEIGHT);
	var dx = endCx - this.cx;
	var dy = endCy - this.cy;
	var mag = Math.sqrt(dx*dx + dy*dy);
	this.velX = -(dx/mag)*this.vel;
	this.velY = -(dy/mag)*this.vel;
};

straightGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	
	if(this.cx < -this.getRadius()) return entityManager.KILL_ME_NOW;
	
	this.cx -= this.velX;
	this.cy -= this.velY;
	
	//handle collision
	if(this.enemy){
		var hitEntity = this.findHitEntity();
		if (hitEntity) {
			var canGetEnemyHit = hitEntity.getEnemyHit;
			if (canGetEnemyHit) {
				canGetEnemyHit.call(hitEntity, this.damage); 
				return entityManager.KILL_ME_NOW;
			}
		}
	}else{
		var hitEntity = this.findHitEntity();
		if (hitEntity) {
			var canGift = hitEntity.takeGift;
			if (canGift) {
				canGift.call(hitEntity, this.gift); 
				return entityManager.KILL_ME_NOW;
			}
		}
	}
	spatialManager.register(this);
};

straightGift.prototype.getSnowballHit = function(damage){
	if(this.enemy){
		this.enemy = !this.enemy;
	}
}

straightGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

straightGift.prototype.render = function(ctx) {
	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	
};