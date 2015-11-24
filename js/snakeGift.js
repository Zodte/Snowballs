function snakeGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.snakeGift;
};

snakeGift.prototype = new Entity();

snakeGift.prototype.vel = 2;

snakeGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	
	this.cx -= this.vel;
	
	spatialManager.register(this);
};

snakeGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

snakeGift.prototype.render = function(ctx) {
	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
};