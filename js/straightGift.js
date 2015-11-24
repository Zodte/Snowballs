function straightGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.straightGift;
};

straightGift.prototype = new Entity();

straightGift.prototype.update =function(du) {
	
};

straightGift.prototype.render = function(ctx) {
	
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	
};