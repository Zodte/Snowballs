function backGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.foreGround;
	
};

backGround.prototype = new Entity();

backGround.prototype.cx = 0;
backGround.prototype.cy = 500;
backGround.prototype.rotation = 0;

backGround.prototype.update = function(du) {
	this.cx -= MAP_SPEED;
};

backGround.prototype.render = function(ctx) {
	
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);

};

