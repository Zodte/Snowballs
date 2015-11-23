function backGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.bgColor
	
};

backGround.prototype = new Entity();

backGround.prototype.cx = 0;
backGround.prototype.cy = 500;
backGround.prototype.rotation = 0;

backGround.prototype.update = function(du) {
	//this.cx -= MAP_SPEED;
};

backGround.prototype.render = function(ctx) {
	for(var i = 0; i < 8; i++){
		this.sprite.drawWrappedCentredAt(ctx,this.sprite.width/2 + i*this.sprite.width, this.sprite.height/2,this.rotation)
	}
	/*
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
*/
};

