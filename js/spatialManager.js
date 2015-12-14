/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],
_buttons : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    return this._nextSpatialID++;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!
    this._entities[spatialID] = {
        posX   : pos.posX,
        posY   : pos.posY,
		width  : pos.width,
		height : pos.height,
        radius : entity.getRadius(),
        entity : entity
    };
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    delete(this._entities[spatialID]);

},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var distSq = util.distSq(posX, posY, e.posX, e.posY);
        var limitSq = Math.pow(radius + e.radius,2);
        if(distSq < limitSq) {
            return e.entity;
        }
    }
},

findAllEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
	var entities = [];
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var distSq = util.distSq(posX, posY, e.posX, e.posY);
        var limitSq = Math.pow(radius + e.radius,2);
        if(distSq < limitSq) {
            entities.push(e.entity);
        }
    }
	return entities;
},

registerBtn: function(btn){
	var pos = btn.getPos();
	var spatialID = btn.getSpatialID();
	this._buttons[spatialID] = {
		posX : pos.posX,
		posY : pos.posY,
		width  : pos.width,
		height : pos.height,
        btn : btn
	} ;
},

unregisterBtn: function(btn) {
    var spatialID = btn.getSpatialID();

    // TODO: YOUR STUFF HERE!
    delete(this._buttons[spatialID]);

},

findBtnInRange: function(posX, posY) {

    // TODO: YOUR STUFF HERE!
	for (var ID in this._buttons) {
        var b = this._buttons[ID];
		if(b.posX-b.width/2 < posX && b.posX-b.width/2+b.width > posX
		&& b.posY-b.height/2 < posY && b.posY-b.height/2+b.height > posY){
			return b.btn;   
		}
        
    }
},



render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
	
	for (var ID in this._entities) {
		var e = this._entities[ID];
		util.strokeRect(ctx, e.posX, e.posY, e.width, e.height);
	}
    ctx.strokeStyle = oldStyle;
}

}
