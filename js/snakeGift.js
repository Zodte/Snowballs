function snakeGift(descr) {
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.snakeGift;
};

snakeGift.prototype = new Entity();
snakeGift.prototype.cx = 800;
snakeGift.prototype.cy = 300;
snakeGift.prototype.vel = 2;
snakeGift.prototype.update = function(du) {
	//this.cx -= this.vel;
	this.computeFloatingStep(du);
	//this.computeSubStep(du);
	spatialManager.unregister(this);
	
	spatialManager.register(this);
};

snakeGift.prototype.computeFloatingStep = function(du) {
	//var rand = util.randRange(0.1,0.5);
	var val1 = Math.sin(this.cx*Math.PI/0.1);
	//var val2 = Math.cos(this.cx*Math.PI/0.5);
	var nextX = this.cx - this.vel*du;
	var nextY = this.cy + val1/0.8*du;
	this.cx = nextX;
	this.cy = nextY;
};
/*
snakeGift.prototype.computeSubStep = function (du) {
	var values = Math.cos((this.cx % 100-50)/50*Math.PI)
	var values2 = Math.sin((this.cx % 100-50)/50*Math.PI*-1);
    var nextX = this.cx + this.vel * du;
    var nextY = this.cyStart + values * 20; 
    this.cx = nextX;
    this.cy = nextY;
	//this.rotation = (((values2-1)/4)-0.75)*Math.PI;
};
*/
snakeGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

snakeGift.prototype.render = function(ctx) {
	
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
};