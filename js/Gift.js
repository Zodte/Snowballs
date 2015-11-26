function Gift(descr) {
	this.setup(descr);
	
	this.gift = this.gift || 0;
	this.giftSprite = g_sprites.gifts;
	this.sprite = this.giftSprite[this.gift] || g_sprites.straightGift;
	this.decideDirection();
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale*0.7;

};

Gift.prototype = new Entity();

Gift.prototype.vel = 5;
Gift.prototype.rotation = 0;


Gift.prototype.decideDirection = function() {
	var dir = util.randRange(0,2*Math.PI);
	this.velX = Math.cos(dir) * this.vel;
	this.velY = Math.sin(dir) * this.vel;
};

Gift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	this.lived++;
	
	var slowDownSpeed = 0.82;
	if(this.cx < -this.getRadius()) return entityManager.KILL_ME_NOW;
	if(Math.abs(this.velX) > 0.01){
		this.velX *= slowDownSpeed;
	}else{
		this.velX = 0;
	}
	if(Math.abs(this.velY) > 0.01){
		this.velY *= slowDownSpeed;
	}else{
		this.velY = 0;
	}
	
	var inMagnetRange = spatialManager.findEntityInRange(
						this.cx,this.cy, Player.getMagnetRadius()
						);
	if(inMagnetRange && this.lived > 14){
		var canPullGift = inMagnetRange.pullGift;
		if(canPullGift){
			var pos = inMagnetRange.getPos();
			var dx = pos.posX - this.cx;
			var dy = pos.posY - this.cy;
			var mag = Math.sqrt(dx * dx + dy * dy);
			var strength = 3;
			this.velX = (dx / mag) * strength;
			this.velY = (dy / mag) * strength;
		}
	}
	if(this.cx + this.velX <= g_canvas.width - this.getRadius() && this.cx + this.velX > this.getRadius()){
		this.cx += this.velX;
	}
	if(this.cy + this.velY <= entityManager.GROUND_HEIGHT + this.getRadius()/2 && this.cy + this.velY > 0+	this.getRadius()){
		this.cy += this.velY;
	}
		
	
	//handle collision
	var hitEntity = this.findHitEntity();
	if (hitEntity) {
		var canGift = hitEntity.takeGift;
		if (canGift) {
			canGift.call(hitEntity, this.gift); 
			return entityManager.KILL_ME_NOW;
		}
	}
	
	spatialManager.register(this);
};

Gift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};


Gift.prototype.render = function(ctx) {
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprite.scale = this.oriScale;
	
};