function EnemySnowman(descr) {
	this.setup(descr);
	
	this.bodySprite = g_sprites.snowManBody;
	//this.headSprite = g_sprites.snowManHead;
	//this.oriScale = this.sprite.scale;
	//this.scale = this.oriScale;	
	//this.oriLife = util.randRange(26,32);
	//this.life = this.oriLife;
	//this.damage = this.oriLife;
};

EnemySnowman.prototype = new Entity();

EnemySnowman.prototype.update = function(du) {
	this.lived++;
	
	this.cx -= 1;
};

EnemySnowman.prototype.render = function(ctx) {

	//this.bodySprite.scale = this.scale;
	this.bodySprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	//this.bodySprite.scale = this.oriScale;

	
};