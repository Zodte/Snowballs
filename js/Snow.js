function Snow(descr){
	this.setup(descr);
	
	this.sprite = g_sprites.snowball;
	this.scale = util.randRange(0.05,0.1);
	this.cyStart = this.cy;	
} 
Snow.prototype = new Entity(); 
Snow.prototype.rotation = 0;
Snow.prototype.vel = 5;

Snow.prototype.update = function(du){
	if(this.cx < -10) return entityManager.KILL_ME_NOW;
	var amount = 200;
	var values = Math.cos((this.cx % amount-amount/2)/amount/2*Math.PI);
	var values2 = Math.sin((this.cx % 200-100)/50*Math.PI*-1);
    var nextY = this.cyStart + values * 10; 
    this.cx -= this.vel* Math.cos((this.cx % amount-amount/2)/amount/2) * du ;
    this.cy = nextY;
	
	
};

Snow.prototype.render = function(ctx){
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(ctx, this.cx,this.cy,this.rotation);
	this.sprite.scale = 1;
}