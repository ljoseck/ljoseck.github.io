class Map {
	constructor(){
		this.blockSize = 96;
		this.ActualblockSize = 48;
		this.collisionMap = [];
		this.currentMapFunction = this.testMap;
	}

	collides(x, y){
		var line = this.collisionMap[Math.floor(x / this.ActualblockSize)];
		if(line){
			return line[Math.floor(y / this.ActualblockSize)];
		}
		return true;
	}

	currentMap(){
		this.currentMapFunction();
	}


	testMap() {
		this.currentMapFunction = this.testMap;
		var x = 0;
		var y = 0;
		var width = this.blockSize;
		var height = this.blockSize;
		var sum =0;
		var sum2 =0;
		for(var i = x; i <= x + width*30; i += width/2){
			sum2++;
			var line = [];
			for(var j = y; j <= y + height*30; j += height/2){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				if((i >= this.blockSize*4 && i <= this.blockSize*6 && j >= this.blockSize*3 && j <= this.blockSize*5) || (j >= this.blockSize*12 && j <= this.blockSize*14)){
					line.push(false);
					mapContext.drawImage(water, i, j, width, height);
	
				} else {
					line.push(true);	
					mapContext.drawImage(img, i, j, width, height);
				}
				sum++;
				
			}
			this.collisionMap.push(line);
		}
	}
	testMapGrass() {
		this.currentMapFunction = this.testMapGrass;
		var x = 0;
		var y = 0;
		var width = this.blockSize;
		var height = this.blockSize;
		var sum =0;
		var sum2 =0;
		for(var i = x; i <= x + width*30; i += width/2){
			sum2++;
			for(var j = y; j <= y + height*30; j += height/2){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				mapContext.drawImage(img, i, j, width, height);
				sum++;
				
			}
		}
	}
}
