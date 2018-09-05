/* colors
main-red
#6A1C0C
#440C00
#260700

main-blue
#1D4C5E
#0A3342
#021F2B
#011118

backgrounds
#001B0A
#011118
#132200

highlights
#003212
#021F2B
#233E00

B(P0) = P0;

B(P0,P1,P2,P3,t) = (1-t)*B(P1,P2,P3,t)+t*B(P0,P1,P2,t)


*/
var htmlCanvas = document.getElementById("canvas");
var canvas = htmlCanvas.getContext("2d");
var sizeX = window.innerWidth;
var sizeY = window.innerHeight;

htmlCanvas.width = sizeX;
htmlCanvas.height = sizeY;

async function main() {
	
	
	// canvas.beginPath();
	// canvas.strokeStyle ="#001B0A";
	// canvas.fillStyle = "#001B0A	";
	// canvas.moveTo(0, 0);
	// canvas.lineTo(500, 500);
	
	// canvas.lineTo(0, 500);
	// canvas.fill();
	// canvas.stroke();
	//console.log(B(2,[[1,2]]));
	for(var i = 100; i <= 1000; i++){
		clearCanvas();
		var [[x1, y1], [x2, y2]] = [[100,50], [i,200]];
		line(x1, y1, x2, y2);
		var [x3, y3] = rename(1, [[x1, y1], [x2, y2]]);
		line(x2, y2, x3, y3);
		await sleep(1);
	}
	
	
	
	//testB([[1,2],[100,200],[200,100]]);
}


function clearCanvas(){
	canvas.clearRect(0, 0, sizeX, sizeY);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rename(dist, points){//two points
	var [[x1, y1], [x2, y2]] = points;
	return [(x1 + x2)/2 + ((y2 - y1)/(x2 - x1))*dist, (y1 + y2)/2 + ((y2 - y1)/(x2 - x1))*dist];
}


function testB(points){
	var [x1, y1] = B(0, points);
	for(var i = .05; i <= 1; i += .05){
		var [x2, y2] = B(i, points);
		line(x1, y1, x2, y2);
		[x1, y1] = [x2, y2];
	}
}
function BComplex(points){
	var [x1, y1] = B(0, points);
	for(var i = .05; i <= 1; i += .05){
		var [x2, y2] = B(i, points);
		lineComplex(x1, y1, x2, y2);
		[x1, y1] = [x2, y2];
	}
}

function lineComplex(x1, y1, x2, y2){
	// canvas.beginPath();
	canvas.moveTo(x1, y1);
	canvas.lineTo(x2, y2);
	// canvas.stroke();
}

function line(x1, y1, x2, y2){
	canvas.beginPath();
	canvas.moveTo(x1, y1);
	canvas.lineTo(x2, y2);
	canvas.stroke();
}

function B(t, points){
	console.log(points);
	if(points.length <= 1){
		return points[0];
	}
	//B(P0,P1,P2,P3,t) = (1-t)*B(P1,P2,P3,t)+t*B(P0,P1,P2,t)
	return add(multiply(1 - t, B(t, points.slice(0, points.length-1))), multiply(t, B(t, points.slice(1))));
}

function multiply(i, list){
	result = [];
	list.forEach(x => result.push(i * x));
	return result;
}

function add(list1, list2){
	result = [];
	for(var i = 0; i < list1.length; i++){
		result.push(list1[i] + list2[i]);
	}
	return result;
}

main();