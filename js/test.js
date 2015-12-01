var test = {
	render : function(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillRect(81,524,Player._magicCapacity*2+5,9);
		ctx.fill();
		ctx.closePath();
	}
}