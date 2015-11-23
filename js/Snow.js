function Snow(descr){
	this.setup(descr);
	
	this.sprite : g_sprites.snowball;
	this.sprite.scale = util.randRange(0.05,0.1)
	this.cyStart : util.randRange(0,g_canvas.height);
} 

Snow.prototype.cy = this.cyStart;
Snow.prototype.rotation = 0;
Snow.prototype.vel = 5;
Snow.prototype.update = function(du){
	this.cx -= vel;
};

Snow.prototype.render = function(ctx){
	this.sprite.drawCentredAt(ctx.this.cx,this.cy,this.rotation);
}