function Stardust(descr){
	this.setup(descr);
	
	this.sprite = g_sprites.goldStardust;
	this.scale = this.scale || util.randRange(0.2,0.5);
	this.rotationSpeed = util.randRange(-2,2);
	this.lifeLength = Math.floor(util.randRange(10,30))
} 
Stardust.prototype = new Entity(); 

Stardust.prototype.color = "blue"
Stardust.prototype.rotation = 0
Stardust.prototype.difVel = 0;

Stardust.prototype.update = function(du){
	this.lived++;
	if(this.lifeLength < this.lived || this.cy > entityManager.GROUND_HEIGHT+10) return entityManager.KILL_ME_NOW;
	
	this.rotation += this.rotationSpeed;
	if(this.lived % 5 == 0){
		this.difVel = util.randRange(-0.2,0.2);
	}
	this.cx += this.velX + this.difVel;
	this.cy += this.velY + this.difVel;	
};

Stardust.prototype.render = function(ctx){
	ctx.save();
	ctx.globalAlpha = 1.2 - (this.lived / this.lifeLength);
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx,this.cx,this.cy,this.rotation);
	ctx.globalAlpha = 1;
	ctx.restore();
}
	