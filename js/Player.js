"use strict";

var Player = {
//Private Data
_strength: {base 	: 5,
			level 	: 0,
			levels	: [1,2,4,8,16,32],
			cost	: [10,50,100,200,400,99999]
			},
_speed:    {base	: 3.00,
			level 	: 0,
			levels	: [1,1.233,1.366,1.5],
			cost	: [30,300,900,99999]
			},
_magicCapacity: {base	: 10,
				 level	: 0,
				 levels	: [1,1.2,1.4,1.6,1.8,2]
				},
_magicComsuption: {base 	: -0.0,
				   level 	: 0,
				   levels	: [1,0.9,0.8,0.7]
				   }, 
_magnetRadius: {base	: 30,
				level	: 0,
				levels	: [1,3,5,7,10]
				},
_luck: 1,
_piercing: 1,
_mojoBars: 1,
_snowBallCraft: 45,
_snowBallsCapacity: 10,
_snowBallMagicRadius: 	{base	:50,
						 level	: 5,
						 levels : [1,2,3,4,5,6]
						},
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
	return this._magicComsuption.base * this._magicComsuption.levels[this._magicComsuption.level];
},

getMagnetRadius: function(){
	return this._magnetRadius.base * this._magnetRadius.levels[this._magnetRadius.level];
},

getLuck: function(){
	return this._luck;
},

getPiercing: function(){
	return this._piercing;
},

getMojoBars: function(){
	return this._mojoBars;
},

getSnowBallCraftSpeed: function(){
	return this._snowBallCraft;
},

getSnowBallCapacity: function(){
	return this._snowBallsCapacity;
},

getSnowBallMagicRadius: function(){
	return this._snowBallMagicRadius.base * this._snowBallMagicRadius.levels[this._snowBallMagicRadius.level];
},

getTotalGifts: function(){
	return this._totalGifts;
}


}
