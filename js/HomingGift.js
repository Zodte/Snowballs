function HomingGift(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	
	this.spritesFowards = g_sprites.homingGift;
	this.spritesBackwards = g_sprites.homingGiftBackward;
	this.sprites = this.spritesFowards;
	this.spriteIndex = 0;
	this.sprite = this.sprites[this.spriteIndex];
	
	var velocities = [2.4,2.8,3.2];
	this.vel = velocities[this.level];
	this.follow = 140;
	this.pause = 70
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale/2;
	
	var lives = [[20,24],[80,84],[120,124]]
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	this.reward = [4,10,16];
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
				if(this.spriteIndex == 4) this.fire();
			}else{
				this.spriteIndex = 0;
			}
		}
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

HomingGift.prototype.fire = function (){
	var pos = entityManager.getSleighPos();
	var dx = pos.posX - this.cx;
	var dy = pos.posY - this.cy;
	var mag = Math.sqrt(dx * dx + dy * dy);
	var strength = 9 + this.level;
	var velX = (dx / mag) * strength;
	var velY = (dy / mag) * strength;
	
	var damage = strength * 2;
	entityManager.generateEnemySnowball(
		this.cx+10, this.cy-14,
		velX,velY,this.damage
	);
};

HomingGift.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
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