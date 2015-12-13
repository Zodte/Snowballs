function Button(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.sprites = g_sprites.addButton;
	this.price = 20;
	this.decideSprites();
	
}
Button.prototype = new Entity();
Button.prototype.mouseOver = false;

Button.prototype.decideSprites = function(){
	if(this.price <= Player.getTotalGifts()){
		this.sprite = this.sprites[2];
	}else{
		this.sprite = this.sprites[1];
	}
};

Button.prototype.update = function(du){
	spatialManager.unregisterBtn(this);
	
	if(this.sprite != this.sprites[1])
	{
		if(this.mouseOver){
			this.sprite = this.sprites[0];
		}else{
			this.sprite = this.sprites[2];
		}
	}
	
	spatialManager.registerBtn(this);
};

Button.prototype.mouseIsOver = function(){
	this.mouseOver = true;
}


Button.prototype.render = function(ctx){
	this.sprite.drawCentredAt(ctx,this.cx,this.cy,0);
};