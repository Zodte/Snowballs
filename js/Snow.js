function Snow(descr){
	this.setup(descr);
	
	this.sprite = g_sprites.snowball;
	this.scale = util.randRange(0.05,0.14);
	this.cyStart = this.cy;	
} 
Snow.prototype = new Entity(); 
Snow.prototype.rotation = 0;
Snow.prototype.vel = SNOW_VELOCITY;

Snow.prototype.update = function(du){
	this.lived++;
	if(this.cx < -10 || this.cy > entityManager.GROUND_HEIGHT+10) return entityManager.KILL_ME_NOW;
	
	var velDif = this.vel - SNOW_VELOCITY
	if(Math.abs(velDif) > 0.3){
		if(velDif < 0){
			this.vel += 0.05;
		}else if(velDif  > 0){
			this.vel -= 0.05;
		}
	}
	
	var amount = 800;
	var values = Math.cos(((this.lived % amount-amount/2)/(amount/2))*Math.PI);
	var values2 = Math.cos(((this.lived % amount-amount/2)/(amount/2))*Math.PI);
	var nextX = this.vel + values2;
	var nextY = this.cyStart + values * 2; 
    this.cx -= nextX * du ;
    this.cy = nextY;
	this.cyStart += GRAVITY*20;
	
	
};

Snow.prototype.render = function(ctx){
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx, this.cx,this.cy,this.rotation);
	this.sprite.scale = 0.2;
}