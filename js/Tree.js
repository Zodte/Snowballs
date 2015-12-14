function Tree(descr) {
	this.setup(descr);
	
	this.chooseTree();
	this.cx = this.sprites[this.tree].width + g_canvas.width;
	
	this.cy = entityManager.GROUND_HEIGHT - (this.scale * this.sprites[0].height/2) +14 ;
	this.speed = this.scale/1.2;
};

Tree.prototype = new Entity();

Tree.prototype.spriteIndex = 0;
Tree.prototype.speed = 1;
Tree.prototype.scale = 1;

Tree.prototype.chooseTree = function() {
	this.tree = Math.floor(util.randRange(0,2.9999));
	this.treeSprites = g_sprites.trees;
	this.sprites = this.treeSprites[this.tree];
};

Tree.prototype.update = function(du) {
	
	this.lived++;
	
	if(this.cx + this.sprites[this.tree].width < 0 || this._isDeadNow) return entityManager.KILL_ME_NOW;
	this.cx -= FOREGROUND_SPEED * this.speed * du;

};

Tree.prototype.numImages = [0,4];
Tree.prototype.render = function(ctx) {

	var spriteDelay = this.lived % this.delay;
	if(spriteDelay == 0) this.spriteIndex = (this.spriteIndex + 1) % this.numImages[1];
	this.sprites[this.spriteIndex].scale = this.scale;
	this.sprites[this.spriteIndex].drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
	);
	this.sprites[this.spriteIndex].scale = 1;

};

    