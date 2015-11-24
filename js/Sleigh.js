function Sleigh(descr){
	this.setup(descr);
	
	this.sprite = this.sprite || g_sprites.sleigh;
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

//Shooting
Sleigh.prototype.reloadTime = 0.2*SECS_TO_NOMINALS;
Sleigh.prototype.reloading = 0;

//Fuel
Sleigh.prototype.fuel = Player.getFuelCapacity();
Sleigh.prototype.fuelComsumption = Player.getFuelComsuption();
//Sleigh.prototype.halfHeight = g_images.sleigh.height/2;


Sleigh.prototype.update = function(du){
	this.rotation = 0;
	
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
	//Holding space stops shooting when another key is pressed...
	spatialManager.register(this);
}

Sleigh.prototype.movement = function(du){
	if(keys[this.FOWARD]){
		if(this.cx < g_canvas.width - 150){
			this.cx += this.speed * du;
			var dustVelX = -1;
		}else {this.cx = g_canvas.width-150;}
		this.rotation += 1.98;
	}
	else if(keys[this.BACKWARD]){
		if(this.cx > 50){
			this.cx -= this.speed * du;
			dustVelX = 1;
		}else {this.cx = 50;}
		this.rotation += 0.02;
	}
	if(keys[this.UP]){
		this.rotation += 1.98;
		if(this.cy > g_canvas.height - 550){
			this.cy -= this.speed * du;
			var dustVelY = 1;
		}else {this.cy = g_canvas.height - 550;}
	}
	else if(keys[this.DOWN]){
		this.rotation += 0.02;
		if(this.cy < entityManager.GROUND_HEIGHT){
			this.cy += this.speed * du;
			dustVelY = -1;
		}else {this.cy = entityManager.GROUND_HEIGHT;}
	}
	if(dustVelX && dustVelY){
		entityManager.generateStardust({
			cx  : util.randRange(this.cx-this.getRadius(),this.cx+this.getRadius()),
			cy 	: util.randRange(this.cy-this.getRadius(),this.cy+this.getRadius()),
			velX: dustVelX,
			velY: dustVelY
		})
	}else if(dustVelX){
		entityManager.generateStardust({
			cx  : util.randRange(this.cx-this.getRadius(),this.cx+this.getRadius()),
			cy 	: util.randRange(this.cy-this.getRadius(),this.cy+this.getRadius()),
			velX: dustVelX,
			velY: 0
		})
	}else if(dustVelY){
		entityManager.generateStardust({
			cx  : util.randRange(this.cx-this.getRadius(),this.cx+this.getRadius()),
			cy 	: util.randRange(this.cy-this.getRadius(),this.cy+this.getRadius()),
			velX: 0,
			velY: dustVelY
		})
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
			velX,velY,damage);
	    this.reloading = this.reloadTime;
    }
};

Sleigh.prototype.updateVars = function(){
	if(this.fuel>0){
		this.addFuel(-0.1);
	}
}

Sleigh.prototype.setPos = function(x,y){
	this.cx = x;
	this.cy = y;
}

Sleigh.prototype.getRadius = function() {
	return this.sprite.height/8;
};

Sleigh.prototype.getPos = function(){
	return {posX : this.cx, posY : this.cy};
};


//Collision function

Sleigh.prototype.takePowerUp = function(power){
	
};

Sleigh.prototype.takeGift = function(gift) {
	
};

Sleigh.prototype.render = function(ctx){
	this.renderFuelBar(ctx);
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, Math.PI*this.rotation
    );
};

Sleigh.prototype.renderFuelBar = function(ctx){
	ctx.save();
	ctx.font = "10px Arial";
	ctx.fillText("Fuel",5,12);
	ctx.restore();
	ctx.fillRect(5,18,this.fuel,6);
};

Sleigh.prototype.addFuel = function(x){
	this.fuel += x;
};
