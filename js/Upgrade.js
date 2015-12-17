function Upgrade(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.init();
} 
Upgrade.prototype = new Entity();

Upgrade.prototype.buttons = [{upgrade : "upgradeStrength", canUp : "canUpStrength", title : "Strength"},
							 {upgrade : "upgradeSpeed", canUp : "canUpSpeed", title : "Speed"}, 
							 {upgrade : "upgradeMagicFuel", canUp : "canUpMagicFuel", title : "Magic"},	
							 {upgrade : "upgradeMagnet", canUp : "canUpMagnet", title : "Magnet"},
							 {upgrade : "upgradeLuck", canUp : "canUpLuck", title : "Luck"},
							 {upgrade : "upgradePiercing", canUp : "canUpPiercing", title : "Piercing"},
							 {upgrade : "upgradeSnowBallCraft", canUp : "canUpSnowBallCraft", title : "Snowball Craft"},
							 {upgrade : "upgradeSnowBallMagicRadius", canUp : "canUpSnowBallMagicRadius", title : "Snowball Magic"}
							 ]; 

Upgrade.prototype.init = function(){
	for(var i = 0; i < this.buttons.length; i++){
		entityManager.generateAddButton({cx: 200, cy: 198+i*30, upCall : this.buttons[i]});
	}
}

Upgrade.prototype.update = function(du){
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
};

Upgrade.prototype.fillTexts = function(ctx){
	var costAndLevel = Player.getCostAndLevel();
	ctx.font = "12px Arial";
	for(var i = 0; i < this.buttons.length; i++){
		ctx.fillStyle = "white";
		ctx.fillText(this.buttons[i].title, 10, 202+i*30);
		ctx.fillText(costAndLevel[i][0], 220,202+i*30);	
		for(var j = 0; j < costAndLevel[i][2]; j++){
			if(costAndLevel[i][1] > j){
				ctx.fillStyle = "green"
			}else{
				ctx.fillStyle = "white"
			}
			ctx.fillRect(130+ 7*j,194+i*30,6,10);
		}
	}
};

Upgrade.prototype.render = function(ctx){
	ctx.fillStyle = "Brown";
	ctx.fillRect(0,0,g_canvas.width,g_canvas.height);
	ctx.fillStyle = 'white';	
	ctx.font = "32px Arial";
	ctx.fillText("Gifts "+Player.getTotalGifts() ,300,34);
	this.fillTexts(ctx);
}