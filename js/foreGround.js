function foreGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.foreGround;
	this.UISprite = g_sprites.UI;
};

foreGround.prototype = new Entity();

foreGround.prototype.cx = 0;
foreGround.prototype.cy = g_canvas.height - 103;
foreGround.prototype.rotation = 0;

foreGround.prototype.update = function(du) {
	this.cx -= FOREGROUND_SPEED * du;
	if(this.cx < 0) {
		this.cx = g_canvas.width;
	}
};

foreGround.prototype.UIrender = function(ctx) {
	this.UISprite.drawAt(ctx, 0, g_canvas.height-93);
};

foreGround.prototype.render = function(ctx) {
	this.UIrender(ctx);
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);

};