function Tree(descr) {
	this.setup(descr);
	

	this.chooseTree();
};

Tree.prototype = new Entity();

Tree.prototype.spriteIndex = 0;

Tree.prototype.chooseTree = function() {
	this.sprites = this.sprites || g_sprites.xMasTree;
};

Tree.prototype.update = function(du) {
	spatialManager.unregister(this);
	this.lived++;

	spatialManager.register(this);
};

Tree.prototype.numImages = [0,4];
Tree.prototype.render = function(ctx) {
    var delay = 30;
	var spriteDelay = this.lived % delay;
	if(spriteDelay == 0) this.spriteIndex = (this.spriteIndex + 1) % this.numImages[1];
	this.sprites[this.spriteIndex].drawCentredAt(
       ctx, this.cx, this.cy, this.rotation
    );

};

    