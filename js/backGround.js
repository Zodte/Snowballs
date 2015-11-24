function backGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.bgColor;
	
};

backGround.prototype = new Entity();

backGround.prototype.cx = 0;
backGround.prototype.cy = 500;
backGround.prototype.rotation = 0;
backGround.prototype.snowVel = 2;

backGround.prototype.update = function(du) {
	//this.cx -= MAP_SPEED;
	if(this.lived % 1000 == 999) SNOW_VELOCITY = util.randRange(0,8) + FOREGROUND_SPEED;
	for(var i = 0; i < Math.floor(util.randRange(0,5)); i++){
		entityManager.generateSnow({
			cx : g_canvas.width+util.randRange(0,g_canvas.width),
			cy : util.randRange(0,g_canvas.height*2)-g_canvas.height
		});
	}
	this.lived++;
};

backGround.prototype.render = function(ctx) {
	for(var i = 0; i < 8; i++){
		this.sprite.drawWrappedCentredAt(ctx,this.sprite.width/2 + i*this.sprite.width, this.sprite.height/2,this.rotation);
	}
	/*
	this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
*/
};

