function Stardust(descr){
	this.setup(descr);
	
	this.sprite = g_sprites.snowball;
	this.scale = util.randRange(0.4,2);
	this.difVel = -this.scale * 10
	this.rotationSpeed = 0;
	this.lifeLength = Math.floor(util.randRange(10,30))
} 
Stardust.prototype = new Entity(); 

Stardust.prototype.color = "blue"
Stardust.prototype.rotation = 0;

Stardust.prototype.update = function(du){
	this.lived++;
	if(this.lifeLength < this.lived || this.cy > entityManager.GROUND_HEIGHT+10) return entityManager.KILL_ME_NOW;
	
	this.rotation += 0.2;
	this.cx += this.velX;
	this.cy += this.velY;	
};

Stardust.prototype.render = function(ctx){
	ctx.save();
	ctx.translate(this.cx,this.cy);
	ctx.rotate(this.rotation);
	ctx.translate(-this.cx,-this.cy);
	var outerRadius = this.scale;
	var innerRadius = this.scale/4;
	var spikes = 5;
	var rot=Math.PI/2*3;
    var x=this.cx;
    var y=this.cy;
    var step=Math.PI/spikes;
    ctx.Style= this.color;
    ctx.beginPath();
    ctx.moveTo(this.cx,this.cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=this.cx+Math.cos(rot)*outerRadius;
      y=this.cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y)
      rot+=step
      
	  x=this.cx+Math.cos(rot)*innerRadius;
      y=this.cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(this.cx,this.cy-outerRadius)
    ctx.stroke();
	ctx.fill();
    ctx.closePath();
	ctx.restore();
}
	