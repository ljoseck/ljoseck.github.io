class Entity {
	set positionX(x) {
		this.x = x;
		this.sprite.x = x;
	}
	set positionY(y) {
		this.y = y;
		this.sprite.y = y;
	}
	get positionX(){
		return this.x;
	}
	get positionY(){
		return this.y;
	}
	get angle(){
		//return this.angleAbsolute;
		return this.angleAbsolute;
	}
	set angle(theta){
		this.angleAbsolute = theta;
	}

	constructor(path, speed, x, y, width, height, moving = false){
		this.sprite = new Sprite(path, x, y, width, height);
		this.positionX = x;
		this.positionY = y;
		this.speed = speed;
		this.angle = Math.random() * Math.PI*2;
		this.moving = moving;
		this.adjustSpriteDirection();
	}

	correctMod(a, b){
		return ((a % b) + b) % b;
	}

	adjustSpriteDirection(){
		var angle = this.correctMod((this.angleAbsolute + game.angle)/Math.PI*180, 360) ;
		if(angle >= 315 || angle <= 45){
			this.sprite.turn("right");
		} else if(angle > 45 && angle < 135){
			this.sprite.turn("down");
		} else if(angle >= 135 && angle <= 225){
			this.sprite.turn("left");
		} else {
			this.sprite.turn("up");
		}
	}

	move(){
		if(!this.moving){
			return;
		}
		var newX = this.positionX + Math.cos(this.angle)*this.speed;
		var newY = this.positionY + Math.sin(this.angle)*this.speed;
		if(game.gameMap.collides(newX, newY)){
			this.positionX = newX
			this.positionY = newY
		} else {
			console.log("collision");
		}
	}
}
