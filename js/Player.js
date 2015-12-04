var Player = {
//Private Data
_Strength: 10.00,
_Speed: 3.00,
_magicCapacity: 200,
_magicComsuption: -0.1, //0.05
_magnetRadius: 300,
_luck: 10,
_piercing: 1,
_mojoBars: 1,





//Function
getStrength: function(){
	return this._Strength;
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
}


}
