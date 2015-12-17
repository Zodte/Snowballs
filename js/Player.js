"use strict";

var Player = {
	
//Private Data
_strength: {base 	: 5,
			level 	: 0,
			levels	: [1,2,4,8,16,32],
			cost	: [10,100,200,400,800,"Maxed"]
			},
_speed:    {base	: 3.00,
			level 	: 0,
			levels	: [1,1.15,1.3,1.45,1.6],
			cost	: [30,300,500,900,"Maxed"]
			},
_magicCapacity: {base	: 100,
				 level	: 0,
				 levels	: [1,1.2,1.4,1.6,1.8,2],
				 cost 	: [10,50,100,200,400,"Maxed"]
				},
_magicComsuption: {base 	: -0.1,
				   level 	: 0,
				   levels	: [1,0.9,0.85,0.8,0.75,0.7]
				   }, 
_magnetRadius: {base	: 30,
				level	: 0,
				levels	: [1,3,5,7,10],
				cost	: [20,200,400,800,"Maxed"]
				},
_luck: {base	: 1,
				level	: 0,
				levels	: [1,2,3,5,8,13,21],
				cost	: [6,60,120,240,480,960,"Maxed"]
				},
_piercing: {base : 1,
			level : 0,
			levels : [1,2,3,4],
			cost : [50,500,1000,"Maxed"]
			},

_snowBallCraft: {base : 46,
				level : 0,
				levels : [0,2,4,6,8,10],
				cost:	[10,100,200,400,800,"Maxed"]
				},			
_snowBallsCapacity: {base : 4,
					level : 0,
					levels : [0,2,4,6,8,10],
					cost:	[10,100,200,400,800,"Maxed"]
					},
_snowBallMagicRadius: 	{base	:50,
						 level	: 0,
						 levels : [1,2,3,4,5,6],
						 cost : [10,100,200,400,800,"Maxed"]
						},
_mojoBars: 1,


_totalGifts : 10000,


deferredSetup: function(){
	this._allUpgrades = [this._strength, this._speed, this._magicCapacity, this._magnetRadius, 
						 this._luck, this._piercing, this._snowBallCraft, this._snowBallMagicRadius]
},

buyFor: function(x){
	this._totalGifts -= x;
},
//Upgrades-----------------------------

upgradeStrength: function(){
	this.buyFor(this._strength.cost[this._strength.level]);
	this._strength.level++;	
},

upgradeSpeed: function(){
	this.buyFor(this._speed.cost[this._speed.level]);
	this._speed.level++;
},

upgradeMagicFuel: function(){
	this.buyFor(this._magicCapacity.cost[this._magicCapacity.level]);
	this._magicCapacity.level++;
},

upgradeMagnet: function(){
	this.buyFor(this._magnetRadius.cost[this._magnetRadius.level]);
	this._magnetRadius.level++;
},

upgradeLuck: function(){
	this.buyFor(this._luck.cost[this._luck.level]);
	this._luck.level++;
},

upgradePiercing: function(){
	this.buyFor(this._piercing.cost[this._piercing.level]);
	this._piercing.level++;
},

upgradeSnowBallCraft: function(){
	this.buyFor(this._snowBallCraft.cost[this._snowBallCraft.level]);
	this._snowBallCraft.level++;
},

upgradeSnowBallMagicRadius: function(){
	this.buyFor(this._snowBallMagicRadius.cost[this._snowBallMagicRadius.level]);
	this._snowBallMagicRadius.level++;
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

canUpSnowBallMagicRadius: function(){
	if(this._snowBallMagicRadius.cost[this._snowBallMagicRadius.level] <= this._totalGifts && this._snowBallMagicRadius.level < this._snowBallMagicRadius.levels.length-1){
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

getCostAndLevel: function(){
	var costAndLevel = [];
	for(var i = 0; i < this._allUpgrades.length; i++){
		costAndLevel.push([this._allUpgrades[i].cost[this._allUpgrades[i].level],this._allUpgrades[i].level,this._allUpgrades[i].levels.length-1])
	}
	return costAndLevel;
},

addGifts: function(gifts){
	this._totalGifts += gifts;
},


}


Player.deferredSetup();