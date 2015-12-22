"use strict";

var Player = {
	
//Private Data
_strength: {base 	: 5,
			level 	: 0,
			levels	: [1,2,4,6,10,14],
			cost	: [10,100,200,400,1000,"Maxed"]
			},
_speed:    {base	: 3.00,
			level 	: 0,
			levels	: [1,1.1,1.2,1.3,1.4],
			cost	: [30,300,500,900,"Maxed"]
			},
_magicCapacity: {base	: 60,
				 level	: 0,
				 levels	: [1,1.2,1.4,1.6,1.8,2],
				 cost 	: [10,100,200,400,1000,"Maxed"]
				},
_magicComsuption: {base 	: -0.06,
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
				levels	: [1,2,3,4,5,6],
				cost	: [6,60,120,240,480,"Maxed"]
				},
_piercing: {base : 1,
			level : 0,
			levels : [1,2,3,4],
			cost : [50,500,1000,"Maxed"]
			},

_snowBallCraft: {base : 46,
				level : 0,
				levels : [0,2,4,6,8,10],
				cost:	[10,100,200,400,1000,"Maxed"]
				},			
_snowBallsCapacity: {base : 4,
					level : 0,
					levels : [0,2,4,6,8,10],
					cost:	[10,100,200,400,1000,"Maxed"]
					},
_snowBallMagicRadius: 	{base	:26,
						 level	: 0,
						 levels : [1,2,3,4,5],
						 cost : [20,200,400,1200,"Maxed"]
						},
_snowBallMagicDamage: 	{base	:0.1,
						 level	: 0,
						 levels : [1,2,3,4,5,6]
						},
_mojoBars: {base : 1,
			level : 0,
			levels : [1,2,3,],
			cost : [400,960,"Maxed"]
			},

_curGifts : 0,
_totalGifts : 0,
_maxDistance: 0,
_totalKills: 0,

deferredSetup: function(){
	this._allUpgrades = [this._strength, this._speed, this._magicCapacity, this._magnetRadius, 
						 this._luck, this._piercing, this._snowBallCraft, this._snowBallMagicRadius]
	if(typeof(Storage) !== "undefined") {
		this._totalGifts = parseInt(localStorage.totalGifts,10) || 0;
		this._maxDistance = parseInt(localStorage.maxDistance,10) || 0;
		this._totalKills = parseInt(localStorage.totalKills, 10) || 0;
		this._curGifts = parseInt(localStorage.curGifts,10) || 0;
		for(var i = 0; i < this._allUpgrades.length; i++){
			this._allUpgrades[i].level = parseInt(localStorage[i],10) || 0;
		}
	} else {
		// Sorry! No Web Storage support..
	}					 
},

buyFor: function(x){
	this._curGifts -= x;
},

saveGame: function(){
	if(typeof(Storage) !== "undefined") {
		localStorage.totalGifts = this._totalGifts;
		localStorage.maxDistance = this._maxDistance;
		localStorage.totalKills = this._totalKills;
		localStorage.curGifts = this._curGifts;
		for(var i = 0; i < this._allUpgrades.length; i++){
			localStorage[i] = this._allUpgrades[i].level;
		}
	} else {
		// Sorry! No Web Storage support..
	}
},

clearGame: function(){
	if(typeof(Storage) !== "undefined") {
		localStorage.clear();
		this._totalGifts = 0;
		this._maxDistance = 0;
		this._totalKills = 0;
		this._curGifts = 0;
		for(var i = 0; i < this._allUpgrades.length; i++){
			this._allUpgrades[i].level = 0;
		}
	} else {
		// Sorry! No Web Storage support..
	}
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
	if(this._strength.cost[this._strength.level] <= this._curGifts && this._strength.level < this._strength.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpSpeed: function(){
	if(this._speed.cost[this._speed.level] <= this._curGifts && this._speed.level < this._speed.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpMagicFuel: function(){
	if(this._magicCapacity.cost[this._magicCapacity.level] <= this._curGifts && this._magicCapacity.level < this._magicCapacity.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpMagnet: function(){
	if(this._magnetRadius.cost[this._magnetRadius.level] <= this._curGifts && this._magnetRadius.level < this._magnetRadius.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpLuck: function(){
	if(this._luck.cost[this._luck.level] <= this._curGifts && this._luck.level < this._luck.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpPiercing: function(){
	if(this._piercing.cost[this._piercing.level] <= this._curGifts && this._piercing.level < this._piercing.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpSnowBallCraft: function(){
	if(this._snowBallCraft.cost[this._snowBallCraft.level] <= this._curGifts && this._snowBallCraft.level < this._snowBallCraft.levels.length-1){
		return true;
	}else{
		return false;
	}
},

canUpSnowBallMagicRadius: function(){
	if(this._snowBallMagicRadius.cost[this._snowBallMagicRadius.level] <= this._curGifts && this._snowBallMagicRadius.level < this._snowBallMagicRadius.levels.length-1){
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
	return this._mojoBars.base * this._mojoBars.levels[this._mojoBars.level];
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

getSnowBallMagicDamage: function(){
	return this._snowBallMagicDamage.base * this._snowBallMagicDamage.levels[this._snowBallMagicRadius.level];
},

getTotalGifts: function(){
	return this._totalGifts;
},

getCurGifts: function() {
	return this._curGifts;
},

getMaxDistance: function() {
	return this._maxDistance;
},

getTotalKills: function() {
	return this._totalKills;
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
	this._curGifts += gifts;
},

addMaxDistance: function(distance) {
	if(this._maxDistance < distance)
		this._maxDistance = distance;
},

addTotalKills: function(kill) {
	this._totalKills += kill;
},

}


Player.deferredSetup();