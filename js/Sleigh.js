function Sleigh(descr){
	this.setup(descr);
	
	this.sprites = g_sprites.sleigh;
	this.sprite = this.sprites[0];
	this.scoreGiftSprite = g_sprites.scoreGift;
	this.scale = 0.45;

	this.speed = Player.getSpeed();
	this.mapSpeed = 0.4 + Player.getSpeed()-3 ;
	
	//Magic
	this.iniMagic = Player.getMagicCapacity();
	this.magic = Player.getMagicCapacity();
	this.magicComsumption = Player.getMagicComsuption();
	
	//Reloading
	this.craftSpeed = Player.getSnowBallCraftSpeed();
    this.snowBallsCapacity = Player.getSnowBallCapacity();
	
	this.gifts = [0,0,0,0];
	this.kills = 0;
}

Sleigh.prototype = new Entity();
/*
Sleigh.prototype.shootSound = new Audio( 
	"sounds/Laser_shoot.wav"
);*/
//Controls ============================

Sleigh.prototype.FOWARD = 'D'.charCodeAt(0);
Sleigh.prototype.BACKWARD = 'A'.charCodeAt(0);
Sleigh.prototype.UP = 'W'.charCodeAt(0);
Sleigh.prototype.DOWN = 'S'.charCodeAt(0);
Sleigh.prototype.FIRE = ' '.charCodeAt(0);
Sleigh.prototype.SUPERSPEED = '1'.charCodeAt(0);

Sleigh.prototype.bugged = true;

//Properties ==========================


Sleigh.prototype.rotation = 0;


//Shooting
Sleigh.prototype.reloadTime = 0.36*SECS_TO_NOMINALS;
Sleigh.prototype.reloading = 0;
Sleigh.prototype.pressedFire = false;

//Reloading
Sleigh.prototype.craftedBalls = 1;

Sleigh.prototype.velY = 1;



Sleigh.prototype.update = function(du){
	this.rotation = 0;
	this.lived++;
	spatialManager.unregister(this);
	
	//Set global map speed
	this.setMapSpeed();
	if((this.magic == 0 || this._isDeadNow) && this.cy+this.getRadius() > entityManager.GROUND_HEIGHT && this.lived%40 == 0) {
		var numGifts = 0;
		var giftValues = [1,5,25,175]
		for(var i = 0; i < this.gifts.length;i++){
			numGifts += this.gifts[i] * giftValues[i];
		}
		Player.addGifts(numGifts);
		Player.addTotalKills(this.kills);
		Player.addMaxDistance(entityManager.getDistance());
		Player.saveGame();
		if(!entityManager.isGameWon){
			entityManager.gameLost();
		}else{
			entityManager.gameWin();
		}
		return entityManager.KILL_ME_NOW;
	}
	
	//Craft snowballs
	if(this.lived % this.craftSpeed == 0 && this.craftedBalls < this.snowBallsCapacity) this.craftedBalls++;
	
	//Moving
	this.movement(du);
	
	this.sprite = this.sprites[0];
	
	this.updateVars();
	//Shooting
	if(this.pressedFire){this.throwSnowball();}
	if(this.reloading > 0){this.reloading -= 1 + Player.getDamage() * 0.01;}
	if(this.reloading < 0){this.reloading = 0;}
	
	spatialManager.register(this);
}

Sleigh.prototype.dustVel = 2.4;
Sleigh.prototype.movement = function(du){
	if(this.magic > 0 && !this._isDeadNow){
		if(keys[this.FOWARD]){
			if(this.cx < g_canvas.width-this.getRadius()){
				this.cx += this.speed * du;
				var dustVelX = -this.dustVel;
			}else {this.cx = g_canvas.width-this.getRadius();}
			this.rotation += 1.98;
		}
		else if(keys[this.BACKWARD]){
			if(this.cx > 0+this.getRadius()){
				this.cx -= this.speed * du;
				dustVelX = this.dustVel;
			}else {this.cx = 0+this.getRadius();}
			this.rotation += 0.02;
		}
		if(keys[this.UP]){
			this.rotation += 1.98;
			if(this.cy > 0+this.getRadius()){
				this.cy -= this.speed * du;
				var dustVelY = this.dustVel;
			}else {this.cy = 0+this.getRadius();}
		}
		else if(keys[this.DOWN]){
			this.rotation += 0.02;
			if(this.cy < entityManager.GROUND_HEIGHT - this.getRadius()/2){
				this.cy += this.speed * du;
				dustVelY = -this.dustVel;
			}else {this.cy = entityManager.GROUND_HEIGHT - this.getRadius()/2;}
		}
	}else if((this.magic == 0 || this._isDeadNow) && this.cy < entityManager.GROUND_HEIGHT - this.getRadius()/2){
		this.velY += GRAVITY;
		this.cy += this.velY;
		this.rotation += 0.05;
	}
	
	if(util.randRange(0,1) > 0.85){
		var randCx = util.randRange(this.cx-this.getRadius()*2,this.cx-this.getRadius());
		var randCy = util.randRange(this.cy-this.getRadius(),this.cy+this.getRadius());
		var scale = util.randRange(0.1,0.3);
		var color = "rgba(255,193,37,0.2)"
		if(dustVelX && dustVelY){
			entityManager.generateStardust({
				cx  : randCx,
				cy 	: randCy,
				velX: dustVelX/2,
				velY: dustVelY/2,
				scale: scale,
				color: color
			})
		}else if(dustVelY){
			entityManager.generateStardust({
				cx  : randCx,
				cy 	: randCy,
				velX: 0,
				velY: dustVelY,
				scale: scale,
				color: color
			})
		}else if(dustVelX){
			entityManager.generateStardust({
				cx  : randCx,
				cy 	: randCy,
				velX: dustVelX,
				velY: 0,
				scale: scale,
				color: color
			})
		}else{
			entityManager.generateStardust({
				cx  : randCx,
				cy 	: randCy,
				velX: -this.dustVel/2,
				velY: 0,
				scale: scale,
				color: color
			})
		}
	}
	//Shake
	if(this.cy+this.getRadius() < entityManager.GROUND_HEIGHT
		&& this.cy-this.getRadius() > 1){
		if(this.lived % 40 < 20){
			this.cy+= 0.1;
		}else{
			this.cy-= 0.1;
		}
	}
}

Sleigh.prototype.throwSnowball = function(){
	
	if (this.reloading == 0 && this.craftedBalls > 0 && this.magic > 0) {
		this.sprite = this.sprites[1];
		var dx = g_mouseX - this.cx+10;
		var dy = g_mouseY - this.cy-14;
		var mag = Math.sqrt(dx * dx + dy * dy);
		var strength = Player.getSnowBallVelovity();
		var velX = (dx / mag) * strength;
		var velY = (dy / mag) * strength;
		
		var damage = Player.getDamage();
		entityManager.generateSnowball(
			this.cx+10, this.cy-14,
			velX,velY,damage);
		this.reloading = this.reloadTime;
		this.craftedBalls--;
		//this.shootSound.play();
    }
};

Sleigh.prototype.setMapSpeed = function(){
	if(Math.abs(MAP_SPEED - this.mapSpeed) <= 0.01){
		MAP_SPEED = this.mapSpeed;
	}else if(MAP_SPEED < this.mapSpeed){
		MAP_SPEED += 0.01;
	}else{
		MAP_SPEED -= 0.01;
	}
};

Sleigh.prototype.fire = function(){
	this.pressedFire = true;
};

Sleigh.prototype.unfire = function(){
	this.pressedFire = false;
};

Sleigh.prototype.updateVars = function(){
	if(this.magic>0){
		this.addMagic(Player.getMagicComsuption());
	}else this.magic = 0;
}

Sleigh.prototype.setPos = function(x,y){
	this.cx = x;
	this.cy = y;
}

Sleigh.prototype.getRadius = function() {
	return this.sprite.scale * this.sprite.height/1.8;
};

Sleigh.prototype.getPos = function(){
	return {posX : this.cx, posY : this.cy};
};


Sleigh.prototype.addMagic = function(x){
	this.magic += x;
	if(this.magic < 0) this.magic = 0;
	if(this.magic > this.iniMagic) this.magic = this.iniMagic;
};

Sleigh.prototype.addGifts = function(x) {
	this.gifts[x] += 1;
	this.delay = 6;
	this.scoreGiftIndex = 1;
};

Sleigh.prototype.addKills = function() {
	this.kills += 1;
};

//Collision function

Sleigh.prototype.takePowerUp = function(power){
	this.addMagic(20);
};

Sleigh.prototype.takeGift = function(gift) {
	this.addGifts(gift);
};

Sleigh.prototype.getEnemyHit = function(damage){
	this.addMagic(-damage);
};

Sleigh.prototype.pullGift = function(){
	
};

//Render functions
Sleigh.prototype.displayAmountGifts = function(ctx) {
	var numGifts = 0;
	var giftValues = [1,5,25,175]
	for(var i = 0; i < this.gifts.length;i++){
		numGifts += this.gifts[i] * giftValues[i];
	}
	ctx.font = '30px sans-serif';
	ctx.fillStyle = 'white';
	ctx.fillText(numGifts, 630, g_canvas.height - ((g_canvas.height - entityManager.GROUND_HEIGHT)/2)+20);
};

Sleigh.prototype.delay = 6;
Sleigh.prototype.scoreGiftIndex = 0;
Sleigh.prototype.renderGifts = function(ctx) {
	this.scoreGiftSprite[this.scoreGiftIndex].scale = 0.8;
	this.scoreGiftSprite[this.scoreGiftIndex].drawCentredAt(ctx, g_canvas.width-202, (g_canvas.height - (g_canvas.height - entityManager.GROUND_HEIGHT)/2)+10, 0);
	if(this.delay == 0) {
		this.scoreGiftIndex = 0;
	} else {
		this.delay--;
	}
};

Sleigh.prototype.renderMagicBar = function(ctx){
	var color = ["#80FF00","#FF8000","#FF0000"]; // green, yellow, red
	for(var i = 0; i < color.length; i++) {
		if(this.magic >= this.iniMagic * 0.5) {
			ctx.fillStyle = color[0];
		} else if(this.magic > this.iniMagic * 0.25 && this.magic < this.iniMagic * 0.5) {
			ctx.fillStyle = color[1];
			} if(this.magic <= this.iniMagic * 0.25) {
				ctx.fillStyle = color[2];
			}
	}
	ctx.fillRect(81, 550, (this.magic/this.iniMagic)*200, 9);
};

Sleigh.prototype.displayCraftedSnowBalls = function(ctx){
	for(var i = 0; i < this.craftedBalls; i++){
		g_sprites.snowball.drawCentredAt(ctx,10+i*4,10)
	}
};

Sleigh.prototype.render = function(ctx){
	this.renderMagicBar(ctx);
	this.renderGifts(ctx);
	this.displayAmountGifts(ctx);
	this.displayCraftedSnowBalls(ctx);
	this.sprite.scale = this.scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, Math.PI*this.rotation
    );
};



