function EnemySnowman(descr) {
	this.setup(descr);
	
	this.bodySprite = g_sprites.snowManBody;
	this.headSprite = g_sprites.snowManHead;
	//this.oriScale = this.sprite.scale;
	this.scale = this.scale || 0.6;	
	this.spriteIndex = 0;
	this.cy = entityManager.GROUND_HEIGHT - 46*this.scale;
	this.oriLife = util.randRange(26,32);
	this.life = this.oriLife;
	this.damage = this.oriLife;
};

EnemySnowman.prototype = new Entity();

EnemySnowman.prototype.update = function(du) {
	this.lived++;
	spatialManager.unregister(this);
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	this.cx -= MAP_SPEED;
	

	// head curve
	this.headDegree();
	
	// shoot
	if(this.spriteIndex == 2) {
		this.fire();
	}

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
	if(xmag <= 0.8){
		this.rotation = xmag;
	}
};

EnemySnowman.prototype.fire = function (){
	var pos = entityManager.getSleighPos();
	var dx = pos.posX - this.cx;
	var dy = pos.posY-(Math.abs(dx)/4) - this.cy;
	var mag = Math.sqrt(dx*dx + dy*dy);
	var strength = this.oriLife;
	var velX = (dx/mag)*strength;
	var velY = (dy/mag)*strength;
	
	this.damage = strength * 2;
	entityManager.generateEnemySnowball(
		this.cx, this.cy+4,
		velX,velY,this.damage
	);
};

EnemySnowman.prototype.getSnowballHit = function(damage){
	this.life -= this.damage;
	if(this.life <= 0){
		this.life = 0;
		this.kill();
	}
};

EnemySnowman.prototype.getRadius = function() {
	return (this.headSprite[this.spriteIndex].width/2)*this.scale;
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