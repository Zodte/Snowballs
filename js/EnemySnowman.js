function EnemySnowman(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	
	this.bodySprite = g_sprites.snowManBody;
	this.headSprite = g_sprites.snowManHead;
	this.scale = this.scale || 0.6;	
	this.spriteIndex = 0;
	
	this.cy = entityManager.GROUND_HEIGHT - 46*this.scale;
	
	lives = [[26,32],[96,102],[136,142]];
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	this.reward = [5,11,17];
};

EnemySnowman.prototype = new Entity();

EnemySnowman.prototype.update = function(du) {
	this.lived++;
	this.computeSprite(du);
	spatialManager.unregister(this);
	if(this._isDeadNow || this.cx < -50) return entityManager.KILL_ME_NOW;
	
	this.cx -= MAP_SPEED;
	

	// head curve
	this.headDegree();

	// shoot
	if(this.reloadCount != this.reload) {this.reloadCount++;}
	this.fire();
	
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

EnemySnowman.prototype.headDegree = function() {
	var pos = entityManager.getSleighPos();	
	var dx = pos.posX - this.cx;
	var dy = pos.posY-(Math.abs(dx)/3) - this.cy;
	var mag = Math.sqrt(dx * dx + dy * dy);
	var xmag = -Math.asin(dy/mag);
	if(xmag <= 1){
		this.rotation = xmag;
	}
};

EnemySnowman.prototype.reloadCount = 0;
EnemySnowman.prototype.reload = 90;
EnemySnowman.prototype.fire = function() {
	var pos = entityManager.getSleighPos();
	if(this.spriteIndex == 2 && this.reloadCount == this.reload) {
		for(var i = 0; i < this.level+1; i++){
			var dx = pos.posX - this.cx;
			var dy = pos.posY-(Math.abs(dx)/7) - this.cy+util.randRange(-50*this.level,80*this.level);
			var mag = Math.sqrt(dx*dx + dy*dy);
			if(pos.posX < this.cx-50) {
				var strength = 8 + this.level;
				var velX = (dx/mag)*strength;
				var velY = (dy/mag)*strength;
			
				this.damage = strength * 2;
				entityManager.generateEnemySnowball(
					this.cx, this.cy+4,
					velX,velY,this.damage
				);
				this.reloadCount = 0;
			}
		}
	}
};

EnemySnowman.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
		this.kill();
	}
};

EnemySnowman.prototype.getRadius = function() {
	return (this.headSprite[this.spriteIndex].width/2) * this.scale;
};

EnemySnowman.prototype.delay = 40;
EnemySnowman.prototype.elapsedDelay = 0;
EnemySnowman.prototype.computeSprite = function(du) {
    this.elapsedDelay += du;
    if(this.elapsedDelay >= this.delay) {
        this.elapsedDelay = 0;
        this.spriteIndex = (this.spriteIndex + 1);
    }
	if(this.spriteIndex >= 3) {
		this.spriteIndex = 0;
	}
};

EnemySnowman.prototype.render = function(ctx) {

	this.bodySprite.scale = this.scale;
	this.bodySprite.drawCentredAt(
	ctx, this.cx-2*this.scale, this.cy+22*this.scale, 0
	);
	this.headSprite[this.spriteIndex].scale = this.scale;
	this.headSprite[this.spriteIndex].drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	ctx.fillRect(this.cx-this.getRadius(),this.cy-this.getRadius()-2,(this.getRadius()*2)*(this.life/(this.oriLife)),3)
	
};