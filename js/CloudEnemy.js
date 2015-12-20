function CloudEnemy(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	this.cloudSprite = g_sprites.cloudEnemy;
	this.cloudSpriteBack = g_sprites.cloudEnemyBack;
	
	this.spriteIndex = 0;
	this.sprites = this.cloudSprite;
	this.sprite = this.cloudSprite[this.spriteIndex];
	
	this.oriScale = this.sprite.scale
	this.scale = 0.6;
	
	lives = [[20,24],[90,94],[128,132]];
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	var vel = [0.04,0.06,0.08]
	this.vel = vel[this.level];
	var velocities = [2,2.2,2.4]
	this.maxVel = velocities[this.level];
	
	this.reloadTime = 50;
	this.reloading = 0;
	
	this.decideDirection();
	
	this.reward = [6,12,18];
};

CloudEnemy.prototype = new Entity();

CloudEnemy.prototype.velX = 0;
CloudEnemy.prototype.velY = 0;



CloudEnemy.prototype.decideDirection = function(){
	this.gx = util.randRange(50,g_canvas.width - 50);
	this.gy = util.randRange(50,entityManager.GROUND_HEIGHT-50);
}

CloudEnemy.prototype.update = function(du) {
	this.lived++;
	spatialManager.unregister(this);
	
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	if(this.reloadTime > this.reloading) this.reloading++;
	
	var difX = this.cx - this.gx;
	var difY = this.cy - this.gy;
	if(Math.abs(difX) <= 50 && Math.abs(difY) < 50) this.decideDirection();
		
	if(difX < 0 && this.velX < this.maxVel){ this.velX += this.vel; }
	else if(difX > 0 && this.velX > -this.maxVel){ this.velX -= this.vel; }
	
	if(difY < 0 && this.velY < this.maxVel) { this.velY += this.vel; }
	else if(difY > 0 && this.velY > -this.maxVel){ this.velY -= this.vel; }
	
	this.cx += this.velX;
	this.cy += this.velY;
	
	this.maybeShoot();
	
	var pos = entityManager.getSleighPos();
	if(this.cx < pos.posX){
		this.sprites = this.cloudSpriteBack;
	}else{
		this.sprites = this.cloudSprite;
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

CloudEnemy.prototype.maybeShoot = function(){
	if(this.reloadTime === this.reloading){
		this.spriteIndex++;
		if(this.spriteIndex === 2){
			
		}
		if(this.spriteIndex === 3){
			this.reloading = 0;
			this.spriteIndex = 0;
		}
	}
};

CloudEnemy.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
		this.kill();
	}
};

CloudEnemy.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2) * 0.6;
};

CloudEnemy.prototype.createStarDust = function(){
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: -this.velX,
		velY: this.velY,
		color: "rgba(248,248,255,0.2)"
	})
}

CloudEnemy.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite = this.sprites[this.spriteIndex];
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)
};