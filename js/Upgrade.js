function Upgrade(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.upgradeSprite = g_sprites.upgradeScreen;
	this.init();
} 
Upgrade.prototype = new Entity();

Upgrade.prototype.buttons = [
	{upgrade : "upgradeStrength", canUp : "canUpStrength", title : "Strength", text: "Strength increases damage and snowball speed"},
	{upgrade : "upgradeSpeed", canUp : "canUpSpeed", title : "Speed", text : "Speed increases sleigh's movement and map speed"}, 
	{upgrade : "upgradeMagicFuel", canUp : "canUpMagicFuel", title : "Magic", text : "Magic increases magic capacity and decreases magic consumption"},	
	{upgrade : "upgradeMagnet", canUp : "canUpMagnet", title : "Magnet", text : "Magnet increases the radius of gifts and bonuses pull"},
	{upgrade : "upgradeLuck", canUp : "canUpLuck", title : "Luck", text : "Luck increases gifts and bonuses drop rate"},
	{upgrade : "upgradePiercing", canUp : "canUpPiercing", title : "Piercing", text : "Piercing adds +1 to snowballs hit"},
	{upgrade : "upgradeSnowBallCraft", canUp : "canUpSnowBallCraft", title : "Snowball Craft", text : "Snowball Craft increases snowball creation rate and ammunition"},
	{upgrade : "upgradeSnowBallMagicRadius", canUp : "canUpSnowBallMagicRadius", title : "Snowball Magic", text : "Snowball Magic increases passive damage radius and adds 10% damage"}
]; 

Upgrade.prototype.init = function(){
	for(var i = 0; i < this.buttons.length; i++){
		entityManager.generateAddButton({cx: 220, cy: 198+i*30, upCall : this.buttons[i]});
	}
}

Upgrade.prototype.update = function(du){
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
};

Upgrade.prototype.fillTexts = function(ctx){
	var costAndLevel = Player.getCostAndLevel();
	ctx.font = "bold 12px Arial";
	for(var i = 0; i < this.buttons.length; i++){
		ctx.fillStyle = "white";
		ctx.fillText(this.buttons[i].title, 40, 202+i*30);
		ctx.fillText(costAndLevel[i][0], 240,202+i*30);	
		for(var j = 0; j < costAndLevel[i][2]; j++){
			if(costAndLevel[i][1] > j){
				ctx.fillStyle = "green"
			}else{
				ctx.fillStyle = "white"
			}
			ctx.fillRect(150 + 7*j,194+i*30,6,10);
		}
	}
};

Upgrade.prototype.render = function(ctx){
	this.upgradeSprite.drawAt(ctx, 0, 0);
	ctx.fillStyle = 'white';	
	ctx.save();
	ctx.font = "bold 16px Arial";
	ctx.fillText(Player.getCurGifts() ,100, 132);
	ctx.restore();
	ctx.font = "bold 12px Arial";
	ctx.fillText("Total Gifts", 450, 202);
	ctx.fillText(Player.getTotalGifts(), 700, 202);
	ctx.fillText("Total Knock Outs", 450, 222);
	ctx.fillText(Player.getTotalKills(), 700, 222);
	ctx.fillText("Max Distance Traveled", 450, 242);
	ctx.fillText(Player.getMaxDistance()+"m",700, 242);
	this.fillTexts(ctx);
}