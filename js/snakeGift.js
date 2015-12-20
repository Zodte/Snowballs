function snakeGift(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	
	var sprites = [g_sprites.snakeGift,g_sprites.snakeGift2,g_sprites.snakeGift3];
	this.sprite = sprites[this.level];	
	
	this.oriScale = this.sprite.scale;
	this.scale = this.oriScale;
	
	var lives = [[13,17],[50,54],[100,104]]
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	this.vel = 1;
	this.waveLength = [1,2,3];
	
	this.cy = util.randRange(30,entityManager.GROUND_HEIGHT - 100 * (this.waveLength[this.level]/3) - 30)
	
	this.reward = [2,8,14];

};

snakeGift.prototype = new Entity();


snakeGift.prototype.velX = 0;
snakeGift.prototype.velY = 0;

snakeGift.prototype.update = function(du) {

	spatialManager.unregister(this);
	this.lived++;
	
	this.computeFloatingStep(du);
	if(this.cx < -this.getRadius() || this._isDeadNow) {
		if(!entityManager.isPlayerDead()) entityManager.addEnemyKill();
		return entityManager.KILL_ME_NOW;
	}

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
	var val1 = Math.sin((this.lived % 200 * (this.waveLength[this.level]+1))/(200 * (this.waveLength[this.level]+1)) * (2*Math.PI));
	this.velX = this.vel * du;
	this.velY = val1 * (this.waveLength[this.level]+1) /3 * du;
	var nextX = this.cx - this.velX;
	var nextY = this.cy + this.velY;
	this.cx = nextX;
	this.cy = nextY;
};

snakeGift.prototype.getSnowballHit = function(damage){
	this.life -= damage
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
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