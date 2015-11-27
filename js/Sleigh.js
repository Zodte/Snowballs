function Sleigh(descr){
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.sleigh;
	this.scoreGiftSprite = g_sprites.scoreGift;
}

Sleigh.prototype = new Entity();
//Controls ============================

Sleigh.prototype.FOWARD = 'D'.charCodeAt(0);
Sleigh.prototype.BACKWARD = 'A'.charCodeAt(0);
Sleigh.prototype.UP = 'W'.charCodeAt(0);
Sleigh.prototype.DOWN = 'S'.charCodeAt(0);
Sleigh.prototype.FIRE = ' '.charCodeAt(0);

//Properties ==========================

Sleigh.prototype.speed = Player.getSpeed();
Sleigh.prototype.rotation = 0;
Sleigh.prototype.gifts = [0,0];

//Shooting
Sleigh.prototype.reloadTime = 0.2*SECS_TO_NOMINALS;
Sleigh.prototype.reloading = 0;

//Magic
Sleigh.prototype.magic = Player.getMagicCapacity();
Sleigh.prototype.magicComsumption = Player.getMagicComsuption();
//Sleigh.prototype.halfHeight = g_images.sleigh.height/2;

//probability testing, not for actual game
Sleigh.prototype.hits = 0;
Sleigh.prototype.velY = 1;


Sleigh.prototype.update = function(du){
	this.rotation = 0;
	this.lived++;
	if(util.randRange(1,100) > 99.99){
		this.hits +=1;
		console.log(this.lived,this.hits)
	}
	spatialManager.unregister(this);
    if( this._isDeadNow ) {
        return entityManager.KILL_ME_NOW;
    }
	//Moving
	this.movement(du);
	
	this.updateVars();
	//Shooting
	
	if(this.reloading > 0){this.reloading -= Player.getStrength()/5;}
	if(this.reloading < 0){this.reloading = 0;}
	spatialManager.register(this);
}

Sleigh.prototype.dustVel = 2.4;
Sleigh.prototype.movement = function(du){
	if(this.magic > 0){
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
			if(this.cy < entityManager.GROUND_HEIGHT){
				this.cy += this.speed * du;
				dustVelY = -this.dustVel;
			}else {this.cy = entityManager.GROUND_HEIGHT;}
		}
	}else if(this.magic <= 0 && this.cy < entityManager.GROUND_HEIGHT){
		this.velY += GRAVITY;
		this.cy += this.velY;
		this.rotation += 0.05;
	}
	
	if(util.randRange(0,1) > 0.5){
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
	if(this.cy+this.getRadius() < entityManager.GROUND_HEIGHT+15
		&& this.cy-this.getRadius() > 1){
		if(this.lived % 40 < 20){
			this.cy+= 0.1;
		}else{
			this.cy-= 0.1;
		}
	}
}

Sleigh.prototype.throwSnowball = function(){
	if (this.reloading == 0) {
		var dx = g_mouseX - this.cx;
		var dy = g_mouseY - this.cy;
		var mag = Math.sqrt(dx * dx + dy * dy);
		var strength = Player.getStrength();
		var velX = (dx / mag) * strength;
		var velY = (dy / mag) * strength;
		
		var damage = strength * 2;
		entityManager.generateSnowball(
			this.cx+10, this.cy-14,
			velX,velY,Player.getStrength()+Player.getPiercing());
	    this.reloading = this.reloadTime;
    }
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
};

Sleigh.prototype.addGifts = function(x) {
	this.gifts[x] += 1;
	this.delay = 6;
	this.scoreGiftIndex = 1;
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
	for(var i = 0; i < this.gifts.length;i++){
		numGifts += this.gifts[i];
	}
	ctx.font = '30px sans-serif';
	ctx.fillStyle = 'white';
	ctx.fillText(numGifts, 615, g_canvas.height - ((g_canvas.height - entityManager.GROUND_HEIGHT)/2)+12);
};

Sleigh.prototype.delay = 6;
Sleigh.prototype.scoreGiftIndex = 0;
Sleigh.prototype.renderGifts = function(ctx) {
	this.scoreGiftSprite[this.scoreGiftIndex].scale = 0.8;
	this.scoreGiftSprite[this.scoreGiftIndex].drawCentredAt(ctx, 580, g_canvas.height - (g_canvas.height - entityManager.GROUND_HEIGHT)/2, 0);
	if(this.delay == 0) {
		this.scoreGiftIndex = 0;
	} else {
		this.delay--;
	}
};

Sleigh.prototype.renderMagicBar = function(ctx){
	ctx.fillStyle = 'white';	
	//ctx.save();
	ctx.font = "10px Arial";
	ctx.fillText("Magic",5,12);
	//ctx.restore();
	ctx.rect(5,18,100,6);
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.fillRect(5,18,this.magic,6);

};

Sleigh.prototype.render = function(ctx){
	this.renderMagicBar(ctx);
	this.renderGifts(ctx);
	this.displayAmountGifts(ctx);
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, Math.PI*this.rotation
    );
};



