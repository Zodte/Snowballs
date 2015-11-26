function Generator(descr) {
	this.setup(descr);
};

Generator.prototype = new Entity();

Generator.prototype.update = function(du) {
	this.lived++;
};

Generator.prototype.render = function(ctx) {

};

