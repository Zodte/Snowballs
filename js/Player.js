var Player = {
//Private Data
_Strength: 5.00,
_Speed: 3.00,
_magicCapacity: 100,
_magicComsuption: -0.1, 
_magnetRadius: 40,
_luck: 1,
_piercing: 1,
_mojoBars: 1,
_snowBallCraft: 45,
_snowBallsCapacity: 10,
_snowBallMagicRadius: 50,
_totalGifts: 30,





//Functions
getDamage: function(){
	return this._Strength;
},

getSnowBallVelovity(){
	return this._Strength/10 + 8;
},

getSpeed: function(){
	return this._Speed;
},

getMagicCapacity: function(){
	return this._magicCapacity;
},

getMagicComsuption: function(){
	return this._magicComsuption;
},

getMagnetRadius: function(){
	return this._magnetRadius;
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
	return this._snowBallMagicRadius;
},

getTotalGifts: function(){
	return this._totalGifts;
}


}
