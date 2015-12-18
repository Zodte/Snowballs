function CloudEnemy(descr) {
	this.setup(descr);
	
	this.cloudSprite = g_sprites.cloudEnemy;
	this.cloudSpriteBack = g_sprites.cloudEnemyBack;
	
	this.spriteIndex = 0;
	this.sprite = this.cloudSprite[this.spriteIndex];
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale/2;
	
	this.oriLife = util.randRange(20,24);
	this.life = this.oriLife;
	this.damage = this.oriLife;
	
	this.decideDirection();
};

CloudEnemy.prototype = new Entity();

CloudEnemy.prototype.velX = 0;
CloudEnemy.prototype.velY = 0;


CloudEnemy.prototype.decideDirection = function(){
	this.gx = util.randRange(50,g_canvas.width/2 - 50);
	this.gy = util.randRange(50,entityManager.GROUND_HEIGTH-50);
}

CloudEnemy.prototype.update = function(du) {
	this.lived++;
	spatialManager.unregister(this);
	
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	var difX = this.cx - this.gx;
	var difY = this.cy - this.gy;
	if(Math.abs(difX) <= 10 && Math.abs(difY) < 10) this.decideDirection();
	if(difX < -10){ this.velX += 0.01; }
	else if(difX > 10){ this.velX -= 0.01; }
	if(difY < -10) { this.velY += 0.01; }
	else if(difY > 10){ this.velY -= 0.01; }
	
	
	this.cx += this.velX;
	this.cy += this.velY;

	spatialManager.register(this);
};

CloudEnemy.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

CloudEnemy.prototype.render = function(ctx) {
	//this.sprite = this.sprites[this.spriteIndex];
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
};