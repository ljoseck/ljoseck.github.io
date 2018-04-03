var globalX = 0;
var globalY = 0;

//Used to refresh the screen and give a chance for all objects to be loaded onto the screen.
var initReload;
function rel(){
     if(!initReload){
         initReload = true;
         window.location.reload();
     }
}



function draw(){
	var canvas = document.getElementById("canvas");

	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	// var width = document.getElementById("div1").offsetWidth;
	// var height = document.getElementById("div1").offsetHeight;


	// canvas.width = width;
	// canvas.height = height;


	var ctx = canvas.getContext('2d');
	
	var x = 5;
	var y = 4;
	var unit = makeSquareGrid(canvas, x, y);
	addImageToGrid('ground', canvas, 0, 0, unit);
	for(var i = 0; i < x; i++){
		for(var j = 0; j < y; j++){
			if(j < y - 1)
				if((i*j)%4 < (i+j)%3)
					addImageToGrid('sky', canvas, i, j, unit);
				else
					addImageToGrid('sky2', canvas, i, j, unit);
					
			else
				addImageToGrid('ground', canvas, i, j, unit);
		}
	}
	//alert(unit);
	//ctx.drawImage(image, 0, 0, 100, 100);
	
	var mainCanvas = document.getElementById("mainCanvas");
	mainCtx = mainCanvas.getContext('2d');
	var width = document.getElementById("div1").offsetWidth;
	var height = document.getElementById("div1").offsetHeight;

	//alert(height);
	mainCanvas.width = width;
	mainCanvas.height = height;
	mainCtx.drawImage(canvas, globalX, globalY, canvas.width, canvas.height, 0, 0, width + globalX, height + globalY);
	
}

function makeGrid(canvas, x, y){
	var ctx = canvas.getContext('2d');
	return makeGridHelper(ctx, x, y, canvas.width, canvas.height);
}

function makeGridHelper(ctx, x, y, width, height){
	for(var i = 1; i < x; i++){
		ctx.beginPath();
		ctx.moveTo(i*width/x,0);
		ctx.lineTo(i*width/x,height);
		ctx.stroke();
	}
	for(var j = 1; j < y; j++){
		ctx.beginPath();
		ctx.moveTo(0,j*height/y);
		ctx.lineTo(width,j*height/y);
		ctx.stroke();
	}
	return[width/x, height/y];
}

function makeSquareGrid(canvas, x, y){
	var ctx = canvas.getContext('2d');
	var height, width;
	if(canvas.width/x > canvas.height/y){
		width = x*canvas.height/y;
		height = canvas.height;
	}else{
		width = canvas.width;
		height = y*canvas.width/x;
	}
	return makeGridHelper(ctx, x, y, width, height)[0];
}

function addImageToGrid(image, canvas, x, y, unit){
	var ctx = canvas.getContext('2d');
	var image1 = document.getElementById(image);
	ctx.drawImage(image1, x*unit, y*unit, unit, unit);
}


draw();
onresize = draw;