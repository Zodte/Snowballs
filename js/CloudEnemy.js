function CloudEnemy(descr) {
	this.setup(descr);
	
	this.cloudSprite = g_sprites.cloudEnemy;
	this.cloudSpriteBack = g_sprites.cloudEnemyBack;

	this.sprites = this.cloudSprite;
	this.spriteIndex = 0;
	this.sprite = this.sprites[this.spriteIndex];
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale/2;
	
	this.oriLife = util.randRange(20,24);
	this.life = this.oriLife;
	this.damage = this.oriLife;
};

CloudEnemy.prototype = new Entity();

CloudEnemy.prototype.velX = 0;
CloudEnemy.prototype.velY = 0;

CloudEnemy.prototype.update = function(du) {
	this.lived++;
	//this.computeSprite(du);
	
	spatialManager.unregister(this);
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	this.cx -= MAP_SPEED;
	
	spatialManager.register(this);
};

CloudEnemy.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2) * 0.7;
};

CloudEnemy.prototype.render = function(ctx) {
	//this.sprite = this.sprites[this.spriteIndex];
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy-this.getRadius()-2,(this.getRadius()*2)*(this.life/(this.oriLife)),3)
};