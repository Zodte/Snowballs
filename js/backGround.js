function backGround(descr) {
	this.setup(descr);
	
	this.sprite = g_sprites.bgColor;
	this.bgMountainsprite = g_sprites.bgMountains;
	this.underUI = g_sprites.underUI;
};

backGround.prototype = new Entity();

backGround.prototype.cx = -20;
backGround.prototype.cy = 500;
backGround.prototype.rotation = 0;
backGround.prototype.snowVel = 2;

backGround.prototype.update = function(du) {
	
	this.cx -= MAP_SPEED/20;
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	if(this.lived % 1000 == 999) SNOW_VELOCITY = util.randRange(0,8) + FOREGROUND_SPEED;
	for(var i = 0; i < Math.floor(util.randRange(0,10)); i++){
		entityManager.generateSnow({
			cx : g_canvas.width+util.randRange(0,g_canvas.width),
			cy : util.randRange(0,g_canvas.height*3)-g_canvas.height*2
		});
	}
	
	this.lived++;
};

backGround.prototype.render = function(ctx) {
	
	this.sprite.drawAt(ctx, -74, -160);

	this.bgMountainsprite.drawAt(ctx,this.cx,this.bgMountainsprite.height/2);
	this.underUI.drawWrappedCentredAt(ctx,this.cx/4, this.cy+55, this.rotation);
};

