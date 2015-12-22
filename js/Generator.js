function Generator(descr) {
	this.setup(descr);
	this.enemiesArray = [this.straightGift, this.straightGift2, this.straightGift3, this.snakeGift, this.snakeGift2, this.snakeGift3, 
						this.bombGift, this.bombGift2, this.bombGift3, this.homingGift, this.homingGift2, this.homingGift3, 
						this.enemySnowMan, this.enemySnowMan2, this.enemySnowMan3];
	this.setFirstEnemy();
};

Generator.prototype = new Entity();

Generator.prototype.setFirstEnemy = function(){
	var list = [0,2750,4800,0,2750,5500,650,2700,5500,1350,3400,4800,0,2050,4850];
	for(var i = 0; i < this.enemiesArray.length; i++){
		this.enemiesArray[i].next = list[i];
	}
}

Generator.prototype.curFase = 0;
Generator.prototype.changeFase = [600,650,1300,1350,2000,2050,2700,2750,3400,3450,4100,4150,4800,4850,5500,5550,6200,6250,6900,7000,80000];

Generator.prototype.straightGift = {next: 0, 
									frequency: [[80,100],[2,3],[140,160],[140,160],[180,200],[180,200],[180,200],[1,2],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 0
										});
									}};
Generator.prototype.straightGift2 = {next: 0, 
									frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[180,200],[180,200],[180,200],[180,200],[180,200],[180,200],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 1
										});
									}};
Generator.prototype.straightGift3 = {next: 0, 
									frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[2,3],[180,200],[180,200],[180,200],[180,200],[180,200],[180,200],[-1]],
									generate: function(){
										entityManager.generateStraightGifts({
											cx : g_canvas.width,
											cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
											level : 2
										});
									}};
									
Generator.prototype.snakeGift = {next: 0, 
								frequency: [[120,140],[3,4],[140,160],[180,200],[180,200],[180,200],[180,200],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 0
									});
								}};
Generator.prototype.snakeGift2 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[180,200],[1,2],[180,200],[180,200],[180,200],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 1
									});
								}};
Generator.prototype.snakeGift3 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[2,2],[180,200],[180,200],[180,200],[-1]],
								generate: function(){
									entityManager.generateSnakeGifts({
										cx : util.randRange(g_canvas.width, g_canvas.width+200 ),
										level : 2
									});
								}};
								
Generator.prototype.bombGift = {next: 0, 
								frequency: [[20,40],[200,260],[150,170],[2,4],[150,170],[150,170],[150,170],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 0
									});
								}};
Generator.prototype.bombGift2 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[3,4],[200,260],[200,260],[200,260],[200,260],[200,260],[200,260],[200,260],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 1
									});
								}};
Generator.prototype.bombGift3 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[2,3],[200,260],[2,3],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateBombGifts({
										level : 2
									});
								}};
								
Generator.prototype.homingGift = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[200,260],[2,4],[200,260],[200,260],[200,260],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 0
									});
								}};
								
Generator.prototype.homingGift2 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[3,4],[200,260],[200,260],[200,260],[200,260],[200,260],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 1
									});
								}};
								
Generator.prototype.homingGift3 = {next: 0, 
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[4,5],[200,260],[200,260],[200,260],[2,3],[200,260],[200,260],[-1]],
								generate: function(){
									entityManager.generateHomingGifts({
										cx : g_canvas.width,
										cy : util.randRange(30,entityManager.GROUND_HEIGHT-30),
										level : 2
									});
								}};
								
Generator.prototype.enemySnowMan = {next: 1000,
								frequency: [[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function() {
									entityManager.generateSnowMan({
										cx : g_canvas.width,
										level : 0
									});
								}};
								
Generator.prototype.enemySnowMan2 = {next: 1000,
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[-1],[-1],[-1],[-1],[-1],[-1],[-1]],
								generate: function() {
									entityManager.generateSnowMan({
										cx : g_canvas.width,
										level : 1
									});
								}};
								
Generator.prototype.enemySnowMan3 = {next: 1000,
								frequency: [[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[-1],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[1000,1200],[500,600],[-1]],
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
	if(this.lived/100 > 70 && entityManager._enemies.length === 0) {
		entityManager.isGameWon = true;
		entityManager.killSleigh();
	}
	if(this.changeFase[this.curFase] <= this.lived) {
		this.curFase++;
	}
	if(MAP_SPEED < 5) {	
		for(var i = 0; i < this.enemiesArray.length; i++){
			var enemy = this.enemiesArray[i];
			if(enemy.next < this.lived && enemy.frequency[this.curFase] != -1) {
				if(this.lived + enemy.frequency[this.curFase][0] > this.changeFase[this.curFase]){
					enemy.next = this.changeFase[this.curFase] - enemy.frequency[this.curFase+1][0] + (util.randRange(enemy.frequency[this.curFase+1][0],enemy.frequency[this.curFase+1][1]));
				}else{
					enemy.next = this.lived + util.randRange(enemy.frequency[this.curFase][0],enemy.frequency[this.curFase][1]);
				}
				enemy.generate();
			}
		}
	}
	if(this.frontTree.next < this.lived) {
		this.frontTree.next = this.lived+Math.floor(util.randRange(500,600));
		this.frontTree.generate();
	}

	if(this.backTree.next < this.lived) {
		this.backTree.next = this.lived+Math.floor(util.randRange(600,700));
		this.backTree.generate();
	}
};

Generator.prototype.render = function(ctx) {
	ctx.fillStyle = 'white';	
	ctx.font = "24px Arial";
	ctx.fillText(Math.round(this.lived/100)+"m",g_canvas.width/2 - 20,20);
	ctx.fillStyle = "#80FF00";
	ctx.fillRect(324 + this.lived * 0.0274285,538,4,50);
};

