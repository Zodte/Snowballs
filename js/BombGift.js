function BombGift(descr) {
	this.setup(descr);
	
	this.level = this.level || 0;
	
	this.sprite = this.sprite || g_sprites.bombGift;
	
	this.decideC();
	
	this.oriScale = this.sprite.scale
	this.scale = this.oriScale;
	
	var lives = [[16,20],[45,59],[75,79]]
	this.oriLife = util.randRange(lives[this.level][0],lives[this.level][1]);
	this.life = this.oriLife;
	
	var lifeLenghts = [360,340,320]
	this.lifeLength = lifeLenghts[this.level];
	this.damage = this.oriLife;
	this.blinkRate = (this.lifeLength/6);
	var blinkRates = [1.23,1.26,1.29];
	this.blinkRateIncrease = blinkRates[this.level];
	
	this.reward = [3,9,15];
};

BombGift.prototype = new Entity();
/*
BombGift.prototype.eplodeSound = new Audio(
	"sounds/explosion.wav"
);
*/
BombGift.prototype.alpha = 1;
BombGift.prototype.alphaUpOrDown = 1;

BombGift.prototype.decideC = function(){
	var sPos = entityManager.getSleighPos();
	if(util.randRange(this.getRadius(),g_canvas.width-this.getRadius()) < sPos.posX){
		this.cx = util.randRange(50,sPos.posX-50)
	}else{
		
		this.cx = util.randRange(sPos.posX + 50,g_canvas.width-50)
	}
	if(util.randRange(this.getRadius(),entityManager.GROUND_HEIGHT-this.getRadius()) < sPos.posY){
		this.cy = util.randRange(50, sPos.posY-50);
	}else{
		this.cy = util.randRange(sPos.posY + 50, entityManager.GROUND_HEIGHT-50);
	}
	
	if(this.cx < this.getRadius() || this.cx > g_canvas.width-this.getRadius()
		|| this.cy < this.getRadius() || this.cy > entityManager.GROUND_HEIGHT-this.getRadius()){
			this.decideC();
		}
};

BombGift.prototype.update = function(du) {
	
	spatialManager.unregister(this);
	this.lived++;
	
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	if(this.lived > this.lifeLength){
		this.explode();
	}
	
	this.alpha += ((this.blinkRate/this.lifeLength)/10)*this.alphaUpOrDown;
	if(this.alpha <= 0.3){
		this.alphaUpOrDown *= -1;
		this.alpha = 0.3;
	}
	if(this.alpha >= 1){
		this.alphaUpOrDown *= -1;
		this.blinkRate *= this.blinkRateIncrease;
		this.alpha = 1;
	}	
	
	//handle collision

	var hitEntity = this.findHitEntity();
	if (hitEntity) {
		var canGetEnemyHit = hitEntity.getEnemyHit;
		if (canGetEnemyHit) {
			canGetEnemyHit.call(hitEntity, this.damage); 
			return entityManager.KILL_ME_NOW;
		}
	}

	spatialManager.register(this);
};

BombGift.prototype.explode = function(){
	//this.eplodeSound.play();
	this.kill();
	var bombShells = (this.level+1)*5;
	var dist = 2*Math.PI / bombShells;
	for(var i = 0; i < bombShells; i++){
		var dir = util.randRange(i*dist,(i+1) * dist);
		var velX = Math.cos(dir) * 5;
		var velY = Math.sin(dir) * 5;
		entityManager.generateEnemySnowball(
			this.cx, this.cy,
			velX,velY,this.damage
		);
	}
	entityManager.createExplosion({
		cx : this.cx, 
		cy : this.cy,
		scale : this.scale*5,
		sprites : g_sprites.snowBlastExplosion
	});
};

BombGift.prototype.getSnowballHit = function(damage){
	this.life -= damage;
	if(this.life <= 0){
		this.life = 0;
		numGifts = entityManager.getLoot(this.reward[this.level],this.getPos());
		this.kill();
	}
};

BombGift.prototype.getRadius = function() {
	return this.sprite.scale * (this.sprite.width/2);
};

BombGift.prototype.createStarDust = function(){
	/*entityManager.generateStardust({
		cx 	: this.cx,
		cy 	: util.randRange(this.cy - this.getRadius(), this.cy+this.getRadius()),
		velX: this.velX,
		velY: this.velY,
		color: "rgba(255,0,0,0.2)"
	})*/
}

BombGift.prototype.render = function(ctx) {
	if(util.randRange(0,1) > 0.7)	this.createStarDust();
	this.sprite.scale = this.scale;
	ctx.globalAlpha = this.alpha;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	ctx.globalAlpha = 1;
	this.sprite.scale = this.oriScale;
	ctx.fillRect(this.cx-this.getRadius(),this.cy+this.getRadius(),(this.getRadius()*2)*(this.life/(this.oriLife)),3)	
};