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
	
	
	// var [[x1, y1], [x2, y2]] = [[100, 500], [1000,50]];
	// //line(x1, y1, x2, y2);
	// var [x3, y3] = triangulate(.5, [[x1, y1], [x2, y2]]);
	// canvas.beginPath();
	// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50);
	// canvas.stroke();
	// canvas.fill();
	// return;
	for(var i = 0; i <= 1; i += .0002){
		clearCanvas();
		var [[x1, y1], [x2, y2]] = [[100, 500], [1000,50]];
		//line(x1, y1, x2, y2);
		var [x3, y3] = triangulate(.5, [[x1, y1], [x2, y2]]);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.1);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.2);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.3);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.4);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.1);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.2);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.3);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.4);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 100, 100);
		// context.bezierCurveTo(x1,x2,)
		//line(x2, y2, x3, y3);
		await sleep(100);
	}
	
	
	
	//testB([[1,2],[100,200],[200,100]]);
}

function stripComplex(points, offsetX, offsetY, dist){ // two points
	BSimple(points);
	// dist = .1;
	var subdist = .5;
	var [point1, point2] = [B(dist, points), B(dist, addComplex(points, offsetX, offsetY))];
	var point3 = triangulate(subdist, [point1, point2]);
	BSimple([point1, point3, point2]);
	BSimple(addComplex(points, offsetX, offsetY));
	
}
function clearCanvas(){
	canvas.clearRect(0, 0, sizeX, sizeY);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function triangulate(dist, points){//two points
	var [[x1, y1], [x2, y2]] = points;
	var [x3, y3] = [(x1 + x2)/2, (y1 + y2)/2];
	// return [x3, y3]
	// console.log(x1, y1, x3, y3, [x3 + y3 - y1, y3 + x3 - x1]);
	return [x3 + dist*(y3 - y1), y3 - dist*(x3 - x1)];
}


function BSimple(points){ // 3 points
	canvas.beginPath();
	var [[x1, y1], [x2, y2], [x3, y3]] = points;
	canvas.moveTo(x1, y1);
	
	canvas.quadraticCurveTo(x2, y2, x3, y3);
	canvas.stroke();
}

function testB(points){
	var [x1, y1] = B(0, points);
	for(var i = .1; i <= 1.01; i += .1){
		i > .9 ? console.log(i) : "";
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
	var result = [];
	list.forEach(x => result.push(i * x));
	return result;
}

function add(list1, list2){
	var result = [];
	for(var i = 0; i < list1.length; i++){
		result.push(list1[i] + list2[i]);
	}
	return result;
}

function addComplex(list1, x, y){
	var result = [];
	for(var i = 0; i < list1.length; i++){
		result.push(add(list1[i], [x, y]));
	}
	return result;
}

main();