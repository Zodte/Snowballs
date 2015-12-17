"use strict";

var Player = {
//Private Data
_strength: {base 	: 5,
			level 	: 0,
			levels	: [1,2,4,8,16,32],
			cost	: [10,100,200,400,800,99999]
			},
_speed:    {base	: 3.00,
			level 	: 0,
			levels	: [1,1.233,1.366,1.5],
			cost	: [30,300,900,99999]
			},
_magicCapacity: {base	: 100,
				 level	: 0,
				 levels	: [1,1.2,1.4,1.6,1.8,2],
				 cost 	: [10,50,100,200,400,99999]
				},
_magicComsuption: {base 	: -0.1,
				   level 	: 0,
				   levels	: [1,0.9,0.85,0.8,0.75,0.7]
				   }, 
_magnetRadius: {base	: 30,
				level	: 0,
				levels	: [1,3,5,7,10],
				cost	: [20,200,400,800,99999]
				},
_luck: {base	: 1,
				level	: 0,
				levels	: [1,2,3,5,8,13,21],
				cost	: [6,60,120,240,480,960,99999]
				},
_piercing: {base : 1,
			level : 0,
			levels : [1,2,3,4],
			cost : [50,500,1000,99999]
			},

_snowBallCraft: {base : 46,
				level : 0,
				levels : [0,2,4,6,8,10],
				cost:	[10,100,200,400,800,99999]
				},			
_snowBallsCapacity: {base : 4,
					level : 0,
					levels : [0,2,4,6,8,10],
					cost:	[10,100,200,400,800,99999]
					},
_snowBallMagicRadius: 	{base	:50,
						 level	: 5,
						 levels : [1,2,3,4,5,6]
						},
_mojoBars: 1,


_totalGifts: 3000,


buyFor: function(x){
	this._totalGifts -= x;
},
//Upgrades-----------------------------

upgradeStrength: function(){
	this.buyFor(this._strength.cost[this._strength.level]);
	this._strength.level++;	
	console.log("Strength++")
},

upgradeSpeed: function(){
	this.buyFor(this._speed.cost[this._speed.level]);
	this._speed.level++;
	console.log(this._speed.level)
},

upgradeMagicFuel: function(){
	this.buyFor(this._magicCapacity.cost[this._magicCapacity.level]);
	this._magicCapacity.level++;
	console.log(this._magicCapacity.level)
},

upgradeMagnet: function(){
	this.buyFor(this._magnetRadius.cost[this._magnetRadius.level]);
	this._magnetRadius.level++;
	console.log(this._magnetRadius.level)
},

upgradeLuck: function(){
	this.buyFor(this._luck.cost[this._luck.level]);
	this._luck.level++;
	console.log(this._luck.level)
},

upgradePiercing: function(){
	this.buyFor(this._piercing.cost[this._piercing.level]);
	this._piercing.level++;
	console.log(this._piercing.level)
},

upgradeSnowBallCraft: function(){
	this.buyFor(this._snowBallCraft.cost[this._snowBallCraft.level]);
	this._snowBallCraft.level++;
	console.log(this._snowBallCraft.level)
},



//CanUps-------------------------------
canUpStrength: function(){
	if(this._strength.cost[this._strength.level] <= this._totalGifts && this._strength.level < this._strength.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpSpeed: function(){
	if(this._speed.cost[this._speed.level] <= this._totalGifts && this._speed.level < this._speed.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpMagicFuel: function(){
	if(this._magicCapacity.cost[this._magicCapacity.level] <= this._totalGifts && this._magicCapacity.level < this._magicCapacity.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpMagnet: function(){
	if(this._magnetRadius.cost[this._magnetRadius.level] <= this._totalGifts && this._magnetRadius.level < this._magnetRadius.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpLuck: function(){
	if(this._luck.cost[this._luck.level] <= this._totalGifts && this._luck.level < this._luck.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpPiercing: function(){
	if(this._piercing.cost[this._piercing.level] <= this._totalGifts && this._piercing.level < this._piercing.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpSnowBallCraft: function(){
	if(this._snowBallCraft.cost[this._snowBallCraft.level] <= this._totalGifts && this._snowBallCraft.level < this._snowBallCraft.levels.length-1){
		return true;
	}else{
		return false;
	}
},

//Getters------------------------------

getDamage: function(){
	return this._strength.base * this._strength.levels[this._strength.level];
},

getSnowBallVelovity(){
	return (this._strength.base * this._strength.levels[this._strength.level])/10 + 8;
},

getSpeed: function(){
	return this._speed.base * this._speed.levels[this._speed.level];
},

getMagicCapacity: function(){
	return this._magicCapacity.base * this._magicCapacity.levels[this._magicCapacity.level];
},

getMagicComsuption: function(){
	return this._magicComsuption.base * this._magicComsuption.levels[this._magicCapacity.level];
},

getMagnetRadius: function(){
	return this._magnetRadius.base * this._magnetRadius.levels[this._magnetRadius.level];
},

getLuck: function(){
	return this._luck.base * this._luck.levels[this._luck.level];
},

getPiercing: function(){
	return this._piercing.base * this._piercing.levels[this._piercing.level];
},

getMojoBars: function(){
	return this._mojoBars;
},

getSnowBallCraftSpeed: function(){
	return this._snowBallCraft.base - this._snowBallCraft.levels[this._snowBallCraft.level];
},

getSnowBallCapacity: function(){
	return this._snowBallsCapacity.base + this._snowBallsCapacity.levels[this._snowBallCraft.level];
},

getSnowBallMagicRadius: function(){
	return this._snowBallMagicRadius.base * this._snowBallMagicRadius.levels[this._snowBallMagicRadius.level];
},

getTotalGifts: function(){
	return this._totalGifts;
},

addGifts: function(gifts){
	this._totalGifts += gifts;
}


}
