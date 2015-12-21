function createSprites(images, sprites, animatedSprites) {

	//Sprites
	
	sprites.snowball = new Sprite(images.snowball);
	sprites.snowball.scale = 0.15;
	sprites.foreGround = new Sprite(images.foreGround);
	sprites.bgColor = new Sprite(images.bgColor);
	sprites.bgMountains = new Sprite(images.bgMountains);
	sprites.bgMountains.scale = 1.5;
	
	sprites.straightGift = new Sprite(images.straightGift);
	sprites.straightGift.scale = 0.5;	
	sprites.straightGift2 = new Sprite(images.straightGift2);
	sprites.straightGift2.scale = 0.5;	
	sprites.straightGift3 = new Sprite(images.straightGift3);
	sprites.straightGift3.scale = 0.5;
	
	sprites.snakeGift = new Sprite(images.snakeGift);
	sprites.snakeGift.scale = 0.7;	
	sprites.snakeGift2 = new Sprite(images.snakeGift2);
	sprites.snakeGift2.scale = 0.7;	
	sprites.snakeGift3 = new Sprite(images.snakeGift3);
	sprites.snakeGift3.scale = 0.7;
	
	sprites.bombGift = new Sprite(images.bombGift);
	sprites.bombGift.scale = 0.5;
	sprites.bombGift2 = new Sprite(images.bombGift2);
	sprites.bombGift2.scale = 0.5;
	sprites.bombGift3 = new Sprite(images.bombGift3);
	sprites.bombGift3.scale = 0.5;
	
	sprites.snowManBody = new Sprite(images.snowManBody);
	
	sprites.blueStardust = new Sprite(images.blueStardust);
	sprites.goldStardust = new Sprite(images.goldStardust);
	
	sprites.UI = new Sprite(images.UI);
	sprites.underUI = new Sprite(images.underUI);
	sprites.mainScreen = new Sprite(images.mainScreen);
	sprites.upgradeScreen = new Sprite(images.upgradeScreen);
	sprites.finishScreen = new Sprite(images.finishScreen);
	
	//Animated Sprites
	sprites.sleigh = [];
	sprites.milk = [];
	sprites.cookie = [];
	sprites.powerUps = [];
	sprites.xMasTree = [];
	sprites.oldTree1 = [];
	sprites.oldTree2 = [];
	sprites.trees = [];
	sprites.gifts = [];
	sprites.scoreGift = [];
	sprites.homingGift = [];
	sprites.homingGift2 = [];
	sprites.homingGift3 = [];
	sprites.homingGiftBackward = [];
	sprites.homingGiftBackward2 = [];
	sprites.homingGiftBackward3 = [];
	sprites.snowManHead = [];
	sprites.snowManHead2 = [];
	sprites.snowManHead3 = [];
	sprites.cloudEnemy = [];
	sprites.cloudEnemy2 = [];
	sprites.cloudEnemy3 = [];
	sprites.cloudEnemyBack = [];
	sprites.cloudEnemyBack2 = [];
	sprites.cloudEnemyBack3 = [];
	sprites.snowBlastExplosion = [];
	sprites.addButton = [];
	
	//Images for Animated Sprites
	sprites.sleigh.push(new Sprite(images.sleigh,0,12,99,86));
	sprites.sleigh.push(new Sprite(images.sleigh,100,12,99,86));
	
	sprites.addButton.push(new Sprite(images.button,0,0,19,19));
	sprites.addButton.push(new Sprite(images.button,20,0,19,19));
	sprites.addButton.push(new Sprite(images.button,40,0,19,19));
	
	sprites.powerUps.push(sprites.milk);
	sprites.powerUps.push(sprites.cookie);
	sprites.gifts.push(sprites.straightGift);
	sprites.gifts.push(sprites.snakeGift);
	sprites.gifts.push(sprites.bombGift);
	sprites.trees.push(sprites.xMasTree);
	sprites.trees.push(sprites.oldTree1);
	sprites.trees.push(sprites.oldTree2);
	
	sprites.milk.push(new Sprite(images.milk,0,0,19,19));
	sprites.milk.push(new Sprite(images.milk,19,0,19,19));
	sprites.milk.push(new Sprite(images.milk,39,0,19,19));
	
	sprites.cookie.push(new Sprite(images.cookie,0,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,32,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,64,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,96,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,128,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,160,5,32,21));
	sprites.cookie.push(new Sprite(images.cookie,192,5,32,21));

	sprites.xMasTree.push(new Sprite(images.xMasTree, 27, 34, 70, 85));
	sprites.xMasTree.push(new Sprite(images.xMasTree, 147, 34, 70, 85));
	sprites.xMasTree.push(new Sprite(images.xMasTree, 267, 34, 70, 85));
	sprites.xMasTree.push(new Sprite(images.xMasTree, 387, 34, 70, 85));

	sprites.oldTree1.push(new Sprite(images.oldTree1));
	sprites.oldTree1.push(new Sprite(images.oldTree1));
	sprites.oldTree1.push(new Sprite(images.oldTree1));
	sprites.oldTree1.push(new Sprite(images.oldTree1));
	
	sprites.oldTree2.push(new Sprite(images.oldTree2));
	sprites.oldTree2.push(new Sprite(images.oldTree2));
	sprites.oldTree2.push(new Sprite(images.oldTree2));
	sprites.oldTree2.push(new Sprite(images.oldTree2));
	
	sprites.scoreGift.push(new Sprite(images.scoreGift, 11, 0, 64, 57));
	sprites.scoreGift.push(new Sprite(images.scoreGift, 100, 0, 64, 57));

	sprites.snowBlastExplosion.push(new Sprite(images.snowBlast, 16, 15, 17, 14));
	sprites.snowBlastExplosion.push(new Sprite(images.snowBlast, 59, 10, 30, 26));
	sprites.snowBlastExplosion.push(new Sprite(images.snowBlast, 102, 2, 46, 44));
	sprites.snowBlastExplosion.push(new Sprite(images.snowBlast, 149, 2, 50, 44));
	
	for(var i = 0; i <8; i++){
		sprites.homingGift.push(new Sprite(images.homingGift, 20*i+15+i*60,5,55,67));
	}
	for(i = 8; i<16; i++){
		sprites.homingGiftBackward.push(new Sprite(images.homingGift, 20*i+15+i*60,5,55,67));	
	}

	for(var i = 0; i <8; i++){
		sprites.homingGift2.push(new Sprite(images.homingGift2, 20*i+15+i*60,5,55,67));
	}
	for(i = 8; i<16; i++){
		sprites.homingGiftBackward2.push(new Sprite(images.homingGift2, 20*i+15+i*60,5,55,67));	
	}

	for(var i = 0; i <8; i++){
		sprites.homingGift3.push(new Sprite(images.homingGift3, 20*i+15+i*60,5,55,67));
	}
	for(i = 8; i<16; i++){
		sprites.homingGiftBackward3.push(new Sprite(images.homingGift3, 20*i+15+i*60,5,55,67));	
	}
	
	
	for(i = 0; i < 3; i++) {
		sprites.snowManHead.push(new Sprite(images.snowManHead, 40*i, 0, 39, 29));
	}
	for(i = 0; i < 3; i++) {
		sprites.snowManHead2.push(new Sprite(images.snowManHead2, 40*i, 0, 39, 29));
	}
	for(i = 0; i < 3; i++) {
		sprites.snowManHead3.push(new Sprite(images.snowManHead3, 40*i, 0, 39, 29));
	}
		

	for(i = 0; i < 4; i++) {
		sprites.cloudEnemy.push(new Sprite(images.cloudEnemy, 70*i, 3, 69, 55));
	}
	for(i = 4; i < 8; i++) {
		sprites.cloudEnemyBack.push(new Sprite(images.cloudEnemy, 70*i, 3, 69, 55));
	}
	
	for(i = 0; i < 4; i++) {
		sprites.cloudEnemy2.push(new Sprite(images.cloudEnemy2, 70*i, 3, 69, 55));
	}
	for(i = 4; i < 8; i++) {
		sprites.cloudEnemyBack2.push(new Sprite(images.cloudEnemy2, 70*i, 3, 69, 55));
	}
	
	for(i = 0; i < 4; i++) {
		sprites.cloudEnemy3.push(new Sprite(images.cloudEnemy3, 70*i, 3, 69, 55));
	}
	for(i = 4; i < 8; i++) {
		sprites.cloudEnemyBack3.push(new Sprite(images.cloudEnemy3, 70*i, 3, 69, 55));
	}
	//Animation Only Sprites

    // When ship is moving up and down
/*    sprites.ship = [];
    sprites.rock  = new Sprite(images.rock);
    sprites.laserCharge = [];
    sprites.deathExplosion = [];
    sprites.bigDeathExplosion = [];
	sprites.greaterDeathExplosion = [];
    sprites.enemy1 = [];
	sprites.enemy2 = new Sprite(images.sheet8, 6, 5, 24, 25);
    sprites.enemy3 = [];
    sprites.boss = [];
	sprites.missile = new Sprite(images.missile,0,0,2105,555);
	sprites.missile.scale = 0.015;
    sprites.enemyBullet = new Sprite(images.sheet43, 135, 5, 8, 7);
    sprites.fetusBullet = new Sprite(images.sheet30, 575, 2061, 23, 23);
    animatedSprites.laserCharge = new AnimationSprite(images.sheet1, 0, 51, 33.25, 32, 0, 8);
    animatedSprites.laser = []; 
    sprites.laser = new Sprite(images.sheet1, 200, 120, 32.5, 12);
	sprites.powerUp = new Sprite(images.sheet3, 153, 1, 17, 16);
	sprites.starField = new Sprite(images.starField);
	sprites.wall = new Sprite(images.wall, 0, 0, 64, 23);
	sprites.wall.scale = 1.6;
    sprites.bulletExplosion = [];
	
    for(var i = 100; i <= 233; i+= 33.25){
        sprites.ship.push(new Sprite(images.sheet1, i, 2, 33.25, 15));
    }

    for(var i = 0; i <= 266; i += 33.25){
        sprites.laserCharge.push(new Sprite(images.sheet1, i, 51, 33.25, 32));
    }

    for(var col = 2; col < 1915; col+= 212.666) {    
        for(var row = 27; row < 668; row+= 162){
            sprites.boss.push(new Sprite(images.sheet30, row, col, 162, 212.666));
        }
    }

	sprites.bulletExplosion.push(new Sprite(images.sheet1, 211, 278, 8, 8));
	sprites.bulletExplosion.push(new Sprite(images.sheet1, 226, 278, 9, 8));
	sprites.bulletExplosion.push(new Sprite(images.sheet1, 242, 276, 13, 12));
	sprites.bulletExplosion.push(new Sprite(images.sheet1, 259, 276, 14, 12));
	
    animatedSprites.laser.push(new AnimationSprite(images.sheet1, 200, 120, 33, 12, 10, 2));
    animatedSprites.laser.push(new AnimationSprite(images.sheet1, 168, 135, 48, 15, 10, 2 ));
    animatedSprites.laser.push(new AnimationSprite(images.sheet1, 136, 153, 64, 15, 10, 2 ));
    animatedSprites.laser.push(new AnimationSprite(images.sheet1, 104, 170, 80, 16, 10, 2 ));

    sprites.enemy1.push(new Sprite(images.sheet5, 5, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 37, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 70, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 103, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 137, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 169, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 203, 2, 21, 25));
    sprites.enemy1.push(new Sprite(images.sheet5, 236, 2, 21, 25));

    sprites.enemy3.push(new Sprite(images.sheet10, 1, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 34, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 67, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 100, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 133, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 166, 5, 31, 25));
    sprites.enemy3.push(new Sprite(images.sheet10, 167, 35, 27, 25));

    sprites.deathExplosion.push(new Sprite(images.sheet1, 267, 304, 19, 16));
    sprites.deathExplosion.push(new Sprite(images.sheet1, 217, 300, 27, 21));
    sprites.deathExplosion.push(new Sprite(images.sheet1, 182, 296, 32, 27));
    sprites.deathExplosion.push(new Sprite(images.sheet1, 146, 295, 32, 29));
    sprites.deathExplosion.push(new Sprite(images.sheet1, 108, 295, 31, 31));
    sprites.deathExplosion.push(new Sprite(images.sheet1, 71, 295, 33, 31));

    sprites.bigDeathExplosion.push(new Sprite(images.sheet16, 145, 46, 23, 22));
    sprites.bigDeathExplosion.push(new Sprite(images.sheet16, 113, 43, 27, 25));
    sprites.bigDeathExplosion.push(new Sprite(images.sheet16, 81, 41, 27, 28));
    sprites.bigDeathExplosion.push(new Sprite(images.sheet16, 43, 37, 29, 31));
	
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 0, 98, 65, 66));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 65, 98, 65, 66));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 130, 98, 65, 66));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 195, 98, 65, 66));	
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 260, 98, 65, 66));
	
	/* sprenging númer 2 í sheet44 (tók ekki inn hvítur og rauður hringur)
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 140, 46, 44, 20));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 202, 45, 53, 43));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 264, 40, 57, 54));
	*/
	
	/* sprenging númer 1 í sheet44
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 130, 2, 30, 28));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 163, 1, 30, 33));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 193, 0, 33, 34));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 227, 2, 33, 31));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 259, 1, 33, 32));
	sprites.greaterDeathExplosion.push(new Sprite(images.sheet44, 293, 1, 32, 32));

	
    sprites.bullet = new Sprite(images.sheet1, 248,88,17,6);
    sprites.bullet.scale = 1;*/
}