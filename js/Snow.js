function Snow(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.sprite = g_sprites.snowball;
	this.scale = util.randRange(0.008,0.05);
	this.difVel = -this.scale * 10
	this.cyStart = this.cy;	
} 
//Snow.prototype = new Entity(); 
Snow.prototype.rotation = 0;
Snow.prototype.vel = SNOW_VELOCITY;
Snow.prototype.lived = 0;
Snow.prototype._isDeadNow = false;

Snow.prototype.update = function(du){
	this.lived++;
	if(this.cx < -10 || this.cy > entityManager.GROUND_HEIGHT+10 || this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	var velDif = this.vel - SNOW_VELOCITY
	if(Math.abs(velDif) > 0.3){
		if(velDif < 0){
			this.vel += 0.05;
		}else if(velDif  > 0){
			this.vel -= 0.05;
		}
	}
	
	var amount = 400;
	var amount2 = 100;
	var values = Math.cos(((this.lived % amount-amount/2)/(amount/2))*Math.PI);
	var values2 = Math.cos(((this.lived % amount2-amount2/2)/(amount2/2))*Math.PI);
	var nextX = this.vel + values2 + this.difVel;
	var nextY = this.cyStart + values * 2; 
    this.cx -= nextX * du;
    this.cy = nextY;
	this.cyStart += GRAVITY*20;
	
	
};

Snow.prototype.kill = function(){
	this._isDeadNow = true;
};

Snow.prototype.render = function(ctx){
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx, this.cx,this.cy,this.rotation);
	this.sprite.scale = 0.22;
}