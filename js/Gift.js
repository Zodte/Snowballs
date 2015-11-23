function Gift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.redGift;
};

Gift.prototype.update =function(du) {
	
};

Gift.prototype.render = function(ctx) {
	
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	
};