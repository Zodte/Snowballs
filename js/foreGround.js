function foreGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.foreGround;
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

foreGround.prototype.render = function(ctx) {
	
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);

};