function snakeGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.snakeGift;
	this.oriScale = this.sprite.scale;
	this.scale = this.oriScale;
};

snakeGift.prototype = new Entity();

snakeGift.prototype.vel = 1;
snakeGift.prototype.damage = this.vel*10;
snakeGift.prototype.enemy = true;

snakeGift.prototype.update = function(du) {

	spatialManager.unregister(this);
	
	this.computeFloatingStep(du);
	if(this.cx < -this.getRadius()) return entityManager.KILL_ME_NOW;
	
	if(this.enemy){
		var hitEntity = this.findHitEntity();
		if (hitEntity) {
			var canGetEnemyHit = hitEntity.getEnemyHit;
			if (canGetEnemyHit) {
				canGetEnemyHit.call(hitEntity, this.damage); 
				return entityManager.KILL_ME_NOW;
			}
		}
	}else{
		var hitEntity = this.findHitEntity();
		if (hitEntity) {
			var canGift = hitEntity.takeGift;
			if (canGift) {
				canGift.call(hitEntity, this.gift); 
				return entityManager.KILL_ME_NOW;
			}
		}
	}
	spatialManager.register(this);
};

snakeGift.prototype.computeFloatingStep = function(du) {
	//var rand = util.randRange(0.1,0.5);
	var val1 = Math.sin(this.cx*Math.PI/0.1);
	//var val2 = Math.cos(this.cx*Math.PI/0.5);
	var nextX = this.cx - this.vel*du;
	var nextY = this.cy + val1/0.6*du;
	this.cx = nextX;
	this.cy = nextY;
};

snakeGift.prototype.getSnowballHit = function(damage){
	if(this.enemy){
		this.vel = MAP_SPEED/2;
		this.computeFloatingStep();
		this.scale = this.scale/1.3;
		this.enemy = !this.enemy;
	}
}

snakeGift.prototype.createStarDust = function() {
	entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: this.velY
	})
};

snakeGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

snakeGift.prototype.render = function(ctx) {
	if(this.enemy && util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
};