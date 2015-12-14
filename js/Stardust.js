function Stardust(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	
	this.sprite = g_sprites.goldStardust;
	this.scale = this.scale || util.randRange(0.1,0.3);
	this.rotationSpeed = util.randRange(-2,2);
	this.lifeLength = Math.floor(util.randRange(10,30));
	this.color = this.color || "rgba(255,255,255,0.1)"
} 

Stardust.prototype.rotation = 0;
Stardust.prototype.difVel = 0;
Stardust.prototype.lived = 0;
Stardust.prototype._isDeadNow = false;

Stardust.prototype.update = function(du){
	this.lived++;
	if(this.lifeLength < this.lived || this.cy > entityManager.GROUND_HEIGHT+10 || this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	this.rotation += this.rotationSpeed;
	if(this.lived % 5 == 0){
		this.difVel = util.randRange(-0.2,0.2);
	}
	this.cx += this.velX + this.difVel;
	this.cy += this.velY + this.difVel;	
};

Stardust.prototype.getRadius = function(){
	return this.sprite.scale * this.sprite.width/2;
};

Stardust.prototype.kill = function(){
	this._isDeadNow = true;
}

Stardust.prototype.render = function(ctx){
	ctx.save();
	ctx.globalAlpha = 1.2 - (this.lived / this.lifeLength);
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx,this.cx,this.cy,this.rotation);
	ctx.globalAlpha = 1;
	ctx.restore();
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.cx,this.cy,this.getRadius(),0,2*Math.PI);
	ctx.fill();
}
	