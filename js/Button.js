function Button(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	
}

Button.prototype.update = function(du){
	
};

Button.prototype.render = function(ctx){
	
};