function HomingGift(descr) {
	this.setup(descr);
	
	this.spritesFowards = g_sprites.homingGift;
	this.spritesBackwards = g_sprites.homingGiftBackward;
	this.sprites = this.spritesFowards;
	this.spriteIndex = 0;
	this.sprite = this.sprites[this.spriteIndex];
	this.vel = 2.4;
	this.follow = 140;
	this.pause = 70
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale/2;
	this.oriLife = util.randRange(20,24);
	this.life = this.oriLife;
	this.damage = this.oriLife;
};

HomingGift.prototype = new Entity();

HomingGift.prototype.velX = 0;
HomingGift.prototype.velY = 0;

HomingGift.prototype.update = function(du) {
	this.lived++;
	spatialManager.unregister(this);
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	var sPos = entityManager.getSleighPos();
	var dx = sPos.posX - this.cx;
	
	if(dx <= 0){
		this.sprites = this.spritesFowards;
	}else{
		this.sprites = this.spritesBackwards;
	}
	if(this.lived % this.follow < this.pause){
		
		var dy = sPos.posY - this.cy;
		var mag = Math.sqrt(dx * dx + dy * dy);
		this.velX = (dx / (mag + util.randRange(-20,20))) * this.vel;
		this.velY = (dy / (mag + util.randRange(-20,20))) * this.vel;
		
		this.spriteIndex = 0;
	}else{
		if(Math.abs(this.velX) < this.vel) this.velX = 0;
		if(Math.abs(this.velY) < this.vel) this.velY = 0;
		if(this.velX > 0) this.velX -= this.vel;
		if(this.velX < 0) this.velX += this.vel;
		if(this.velY > 0) this.velY -= this.vel;
		if(this.velY < 0) this.velY += this.vel;

		if((this.lived-6) % Math.floor((this.follow-this.pause)/7) == 0){
			if(this.spriteIndex < 7){
				this.spriteIndex++;
			}else{
				this.spriteIndex = 0;
			}
		}
		//console.log(this.lived % Math.floor((this.follow-this.pause)/7),this.spriteIndex)
	}
	
	this.cx += this.velX;
	this.cy += this.velY;
	
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

HomingGift.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(2,this.getPos());
		this.kill();
	}
};

HomingGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2) * 0.7;
};

HomingGift.prototype.createStarDust = function(){
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: -this.velX,
		velY: this.velY,
		color: "rgba(255,0,0,0.2)"
	})
}

HomingGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite = this.sprites[this.spriteIndex];
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)
	
};