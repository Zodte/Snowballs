function foreGround(descr) {
	this.setup(descr);
	
	this.foreGroundSprite = g_sprites.foreGround;
	this.UISprite = g_sprites.UI;

};

foreGround.prototype = new Entity();

foreGround.prototype.cx = 0;
foreGround.prototype.cy = g_canvas.height - 103;
foreGround.prototype.rotation = 0;

foreGround.prototype.update = function(du) {
	if( this._isDeadNow ) {
        return entityManager.KILL_ME_NOW;
    }
	this.cx -= MAP_SPEED * du;
	if(this.cx < 0) {
		this.cx = g_canvas.width;
	}
	this.lived++;
};

foreGround.prototype.UIrender = function(ctx) {
	this.UISprite.drawAt(ctx, 0, g_canvas.height-93);
};

foreGround.prototype.render = function(ctx) {
	
	this.UIrender(ctx);
	this.foreGroundSprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = " bold 16px Arial";
	ctx.fillText("Magic", 90, 545);
	ctx.restore();
};