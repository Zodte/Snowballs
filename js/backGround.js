function backGround(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.bgColor;
	this.bgMountainsprite = g_sprites.bgMountains;
	this.oldTreeSprite1 = g_sprites.oldTree1;
	this.oldTreeSprite2 = g_sprites.oldTree2;
};

backGround.prototype = new Entity();

backGround.prototype.cx = -20;
backGround.prototype.cy = 500;
backGround.prototype.rotation = 0;
backGround.prototype.snowVel = 2;

backGround.prototype.update = function(du) {
	
	this.cx -= MAP_SPEED/20;
	if(this.lived % 1000 == 999) SNOW_VELOCITY = util.randRange(0,8) + FOREGROUND_SPEED;
	for(var i = 0; i < Math.floor(util.randRange(0,200)); i++){
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
	this.bgMountainsprite.drawAt(ctx,this.cx,this.sprite.height/2);
	this.oldTreeSprite1.drawAt(ctx, this.cx + 520, entityManager.GROUND_HEIGHT-39);
	this.oldTreeSprite2.drawAt(ctx, this.cx + 700, entityManager.GROUND_HEIGHT-74);
};

