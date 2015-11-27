function snakeGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.snakeGift;
	this.oriScale = this.sprite.scale;
	this.scale = this.oriScale;
	this.life = this.oriLife;
	this.damage = this.oriLife;
};

snakeGift.prototype = new Entity();

snakeGift.prototype.vel = 1;
snakeGift.prototype.damage = this.vel*10;
snakeGift.prototype.velX = 0;
snakeGift.prototype.velY = 0;
snakeGift.prototype.oriLife = 30;

snakeGift.prototype.update = function(du) {

	spatialManager.unregister(this);
	
	this.computeFloatingStep(du);
	if(this.cx < -this.getRadius() || this._isDeadNow) return entityManager.KILL_ME_NOW;

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

snakeGift.prototype.computeFloatingStep = function(du) {
	var val1 = Math.sin(this.cx*Math.PI/0.1);
	this.velX = this.vel * du;
	this.velY = val1/0.9 * du;
	var nextX = this.cx - this.velX;
	var nextY = this.cy + this.velY;
	this.cx = nextX;
	this.cy = nextY;
};

snakeGift.prototype.getSnowballHit = function(damage){
	this.life -= damage
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getGifts(0.8);
		for(var i = 0; i < numGifts.length; i++){
			for(var j = 0; j < numGifts[i]; j++)
			{
				entityManager.generateGifts({
					cx 	: this.cx,
					cy 	: this.cy,
					gift: i
				})
			}
		}
		this.kill();
	}
}

snakeGift.prototype.createStarDust = function() {
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: -this.velY,
		color: "rgba(0,0,255,0.2)"
	})
};

snakeGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

snakeGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)

};