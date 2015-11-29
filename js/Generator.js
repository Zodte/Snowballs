function Generator(descr) {
	this.setup(descr);
	this.enemiesArray = [this.straightGift, this.snakeGift, this.bombGift, this.homingGift];
};

Generator.prototype = new Entity();

Generator.prototype.straightGift = {next: 0, 
									generate: function(){
										entityManager.generateStraightGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30)
										});
									}
									};
Generator.prototype.snakeGift = {next: 0, 
							generate: function(){
								entityManager.generateSnakeGifts({
								cx : g_canvas.width,
								cy : util.randRange(100,entityManager.GROUND_HEIGHT-30)
								});
							}
							};
Generator.prototype.bombGift = {next: 0, 
							generate: function(){
								entityManager.generateBombGifts({});
							}
							};
Generator.prototype.homingGift = {next: 0, 
							generate: function(){
								entityManager.generateHomingGifts({
									cx : g_canvas.width,
									cy : util.randRange(30,entityManager.GROUND_HEIGHT-30)
								});
							}
							};
Generator.prototype.frontTree = {next: 0,
								generate: function() {
									entityManager.generateTree({
										rotation : 0,
										delay : 30,
										scale : 1.2
									});
								}
								};

Generator.prototype.backTree = {
	next: 0,
	generate: function() {
		entityManager.generateTree({
			rotation : 0,
			delay : 0,
			scale : util.randRange(0.4,1)
		});
	}
};


Generator.prototype.update = function(du) {
	this.lived += MAP_SPEED;
	for(var i = 0; i < this.enemiesArray.length; i++){
		var enemy = this.enemiesArray[i];
		if(enemy.next < this.lived ) {
			enemy.next = this.lived+250;
			enemy.generate();
		}
	}
	
	if(this.frontTree.next < this.lived) {
		this.frontTree.next = this.lived+Math.floor(util.randRange(50,g_canvas.width*0.5));
	} else if (this.frontTree.next == this.lived) {
		this.frontTree.generate();
	}

	if(this.backTree.next < this.lived) {
		this.backTree.next = this.lived+Math.floor(util.randRange(50,60));
	} else if (this.backTree.next == this.lived) {
		this.backTree.generate();
	}
};

Generator.prototype.render = function(ctx) {
	ctx.fillStyle = 'white';	
	ctx.font = "24px Arial";
	ctx.fillText(Math.round(this.lived/100)+"m",g_canvas.width/2 - 20,20);
};

