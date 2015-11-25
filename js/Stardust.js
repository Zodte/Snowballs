function Stardust(descr){
	this.setup(descr);
	
	this.sprite = g_sprites.blueStardust;
	this.scale = util.randRange(0.12,0.2);
	this.difVel = -this.scale * 10
	this.rotationSpeed = 0;
	this.lifeLength = Math.floor(util.randRange(10,30))
} 
Stardust.prototype = new Entity(); 

Stardust.prototype.color = "blue"
Stardust.prototype.rotation = 0;

Stardust.prototype.update = function(du){
	this.lived++;
	if(this.lifeLength < this.lived || this.cy > entityManager.GROUND_HEIGHT+10) return entityManager.KILL_ME_NOW;
	
	this.rotation += 0.2;
	this.cx += this.velX;
	this.cy += this.velY;	
};

Stardust.prototype.render = function(ctx){
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx,this.cx,this.cy,this.rotation);
}
	