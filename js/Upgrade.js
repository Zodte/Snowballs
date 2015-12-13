function Upgrade(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
} 
Upgrade.prototype = new Entity(); 

Upgrade.prototype.update = function(du){
		
};

Upgrade.prototype.render = function(ctx){

}