function Button(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.sprites = g_sprites.addButton;
	this.price = 20;
	this.decideSprites();
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this._spatialID = spatialManager.getNewSpatialID();
	this.init();
}
Button.prototype = new Entity();

Button.prototype.decideSprites = function(){
	if(Player[this.upCall.canUp]()){
		this.sprite = this.sprites[2];
	}else{
		this.sprite = this.sprites[1];
	}
};

Button.prototype.init = function(){
	spatialManager.registerBtn(this);
};

Button.prototype.clickedAnimLength = 10;
Button.prototype.clickedCounter = 1;
Button.prototype.update = function(du){
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	if(this.clickedCounter > 1) this.clickedCounter--;
	if(this.sprite != this.sprites[1])
	{
		if(this.mouseIsOver()){
			this.sprite = this.sprites[0];
		}else{
			this.sprite = this.sprites[2];
		}
	}
	
};

Button.prototype.mouseIsOver = function(){
	var mX = g_mouseX;
	var mY = g_mouseY;
	if(this.cx-this.width/2 < mX && this.cx-this.width/2 + this.width > mX 
	&& this.cy-this.height/2 < mY && this.cy-this.height/2 + this.height > mY){
		return true;
	}else{
		return false;
	}
}

Button.prototype.clicked = function(){
	this.clickedCounter = this.clickedAnimLength;
	if(Player[this.upCall.canUp]()){
		Player[this.upCall.upgrade]();
	}
	entityManager.btnsDecideColor();
};


Button.prototype.render = function(ctx){
	this.sprite.scale = 1 - this.clickedCounter/this.clickedAnimLength;
	this.sprite.drawCentredAt(ctx,this.cx,this.cy,0);
	if(this.mouseIsOver()) {
		ctx.fillStyle = 'white';
		ctx.font = 'bold 12px Arial';
		ctx.fillText(this.upCall.text, 40, 450);
	}
	ctx.save();
	ctx.beginPath();
	ctx.globalAlpha = this.clickedCounter/this.clickedAnimLength;
	ctx.arc(this.cx,this.cy,this.width/2,0,2*Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.restore();
};












