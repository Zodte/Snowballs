function BombGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
	this.cy = util.randRange(0, entityManager.GROUND_HEIGHT);
	this.cx = util.randRange(this.getRadius(),entityManager.GROUND_HEIGHT-this.getRadius())
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale;
	this.oriLife = util.randRange(16,20);
	this.life = this.oriLife;
	this.lifeLength = 360;
	this.damage = this.oriLife;
	this.blinkRate = (this.lifeLength/6);
	this.blinkRateIncrease = [1.23,1.28]
};

BombGift.prototype = new Entity();
BombGift.prototype.alpha = 1;
BombGift.prototype.alphaUpOrDown = 1;

BombGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	this.lived++;
	
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	if(this.lived > this.lifeLength){
		this.explode();
	}
	
	this.alpha += ((this.blinkRate/this.lifeLength)/10)*this.alphaUpOrDown;
	if(this.alpha <= 0.3){
		this.alphaUpOrDown *= -1;
		this.alpha = 0.3;
	}
	if(this.alpha >= 1){
		this.alphaUpOrDown *= -1;
		this.blinkRate *= this.blinkRateIncrease[0];
		this.alpha = 1;
	}
	
	console.log(this.alpha)
	
	
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

BombGift.prototype.explode = function(){
	this.kill();
};

BombGift.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(0.5,this.getPos());
		this.kill();
	}
};

BombGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

BombGift.prototype.createStarDust = function(){
	/*entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: this.velY,
		color: "rgba(255,0,0,0.2)"
	})*/
}

BombGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;
	ctx.globalAlpha = this.alpha;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	ctx.globalAlpha = 1;
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)	
};