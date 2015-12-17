function Upgrade(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.init();
} 
Upgrade.prototype = new Entity();

Upgrade.prototype.buttons = [{upgrade : "upgradeStrength", canUp : "canUpStrength"},{upgrade : "upgradeSpeed", canUp : "canUpSpeed"}, 
							 {upgrade : "upgradeMagicFuel", canUp : "canUpMagicFuel"},{upgrade : "upgradeMagnet", canUp : "canUpMagnet"},
							 {upgrade : "upgradeLuck", canUp : "canUpLuck"},{upgrade : "upgradePiercing", canUp : "canUpPiercing"},
							 {upgrade : "upgradeSnowBallCraft", canUp : "canUpSnowBallCraft"}]; 

Upgrade.prototype.init = function(){
	for(var i = 0; i < this.buttons.length; i++){
		entityManager.generateAddButton({cx: 200, cy: 200+i*30, upCall : this.buttons[i]});
	}
}

Upgrade.prototype.update = function(du){
	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
};

Upgrade.prototype.render = function(ctx){
	ctx.fillStyle = "Brown";
	ctx.fillRect(0,0,g_canvas.width,g_canvas.height);
	ctx.fillStyle = 'white';	
	ctx.font = "32px Arial";
	ctx.fillText("Gifts "+Player.getTotalGifts() ,300,34);
}