function Generator(descr) {
	this.setup(descr);
	this.enemiesArray = [this.straightGift, this.straightGift2, this.straightGift3, this.snakeGift, this.snakeGift2, this.snakeGift3, 
						this.bombGift, this.bombGift2, this.bombGift3, this.homingGift, this.homingGift2, this.homingGift3, 
						this.enemySnowMan, this.enemySnowMan2, this.enemySnowMan3];
	this.setFirstEnemy();
};

Generator.prototype = new Entity();

Generator.prototype.setFirstEnemy = function(){
	var list = [0,1000,2000,30,4000,5000,60,7000,8000,90,10000,1100,120,13000,14000];
	for(var i = 0; i < this.enemiesArray.length; i++){
		this.enemiesArray[i].next = list[i];
	}
}

Generator.prototype.curFase = 0;
Generator.prototype.changeFase = [10000,15000];

Generator.prototype.straightGift = {next: 0, 
									frequency: [[100,120],[180,240],[180,240]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 0
										});
									}};
Generator.prototype.straightGift2 = {next: 0, 
									frequency: [[100,120],[180,240],[180,240]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 1
										});
									}};
Generator.prototype.straightGift3 = {next: 0, 
									frequency: [[100,120],[180,240],[180,240]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 2
										});
									}};
									
Generator.prototype.snakeGift = {next: 0, 
								frequency: [[400,500],[500,800],[500,800]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 0
									});
								}};
Generator.prototype.snakeGift2 = {next: 0, 
								frequency: [[400,500],[500,800],[500,800]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 1
									});
								}};
Generator.prototype.snakeGift3 = {next: 0, 
								frequency: [[400,500],[500,800],[500,800]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 2
									});
								}};
								
Generator.prototype.bombGift = {next: 0, 
								frequency: [[20,40],[200,260],[2000,3000]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 0
									});
								}};
Generator.prototype.bombGift2 = {next: 0, 
								frequency: [[20,40],[200,260],[2000,3000]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 1
									});
								}};
Generator.prototype.bombGift3 = {next: 0, 
								frequency: [[20,40],[200,260],[2000,3000]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 2
									});
								}};
								
Generator.prototype.homingGift = {next: 0, 
								frequency: [[100,120],[6000,10000],[4000,6000]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 0
									});
								}};
								
Generator.prototype.homingGift2 = {next: 0, 
								frequency: [[100,120],[6000,10000],[4000,6000]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 1
									});
								}};
								
Generator.prototype.homingGift3 = {next: 0, 
								frequency: [[100,120],[6000,10000],[4000,6000]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 2
									});
								}};
								
Generator.prototype.enemySnowMan = {next: 1000,
								frequency: [[200,260],[200,250],[180,240]],
								generate: function() {
									entityManager.generateSnowMan({
										cx : g_canvas.width,
										level : 0
									});
								}};
								
Generator.prototype.enemySnowMan2 = {next: 1000,
								frequency: [[200,260],[200,250],[180,240]],
								generate: function() {
									entityManager.generateSnowMan({
										cx : g_canvas.width,
										level : 1
									});
								}};
								
Generator.prototype.enemySnowMan3 = {next: 1000,
								frequency: [[200,260],[200,250],[180,240]],
								generate: function() {
									entityManager.generateSnowMan({
										cx : g_canvas.width,
										level : 2
									});
								}};
				
Generator.prototype.cloudEnemy = {next: 200,
								frequency: [[200,260],[200,250],[180,240]],
								generate: function() {
									entityManager.generateCloudEnemy({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30)
									});
								}};								
												
Generator.prototype.frontTree = {next: 0,
								generate: function() {
									entityManager.generateTree({
										rotation : 0,
										delay : 30,
										scale : 1.2
									});
								}
								};

Generator.prototype.backTree = {next: 0,
								generate: function() {
									entityManager.generateTree({
										rotation : 0,
										delay : 0,
										scale : util.randRange(0.4,1)
									});
								}
};

Generator.prototype.getDistance = function() {
	return Math.round(this.lived/100);
};

Generator.prototype.update = function(du) {
	
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
	
	this.lived += MAP_SPEED;
	if(this.lived/100 > 70) entityManager.gameIsWon = true;
	if(this.changeFase[this.curFase] <= this.lived) {
		console.log("Fase increse, now: ",this.curFase)
		this.curFase++;
	}
	if(MAP_SPEED < 5) {	
		for(var i = 0; i < this.enemiesArray.length; i++){
			var enemy = this.enemiesArray[i];
			if(enemy.next < this.lived && enemy.frequency[this.curFase] != -1) {
				enemy.next = this.lived + util.randRange(enemy.frequency[this.curFase][0],enemy.frequency[this.curFase][1]);
				enemy.generate();
			}
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

