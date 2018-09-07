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

window.onresize = function (){
	sizeX = window.innerWidth;
	sizeY = window.innerHeight;

	htmlCanvas.width = sizeX;
	htmlCanvas.height = sizeY;
};

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
	clearCanvas();
	var [[x1, y1], [x2, y2]] = [[0, sizeY], [sizeX + 100,50]];
	//line(x1, y1, x2, y2);
	var [x3, y3] = triangulate(.5, [[x1, y1], [x2, y2]]);
	
	// var [[x4, y4], [x5, y5]] = [[100,50], [1000, 500]];
	// var [x6, y6] = triangulate(.5, [[x4, y4], [x5, y5]]);
	
	// var [x4, y4] = triangulate(.5, [[x2, y2], [x1, y1]]);
	for(var i = 0; i <= 1; i += .0001){
		
		var [[x1, y1], [x2, y2]] = [[0, sizeY], [sizeX + 100,50]];
		var [x3, y3] = triangulate(.5, [[x1, y1], [x2, y2]]);
		clearCanvas();
		var number = 20;
		//stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, number, i, ["#6A1C0C", "#1D4C5E"], "#132200");
		// stripComplex(addComplex([[x2, y2], [x3, y3], [x1, y1]], 0, 0), -50, -50, number, i, ["#1D4C5E", "#6A1C0C"], "#132200", -1);
		// stripComplex(addComplex([[x1, y1], [x3, y3], [x2, y2]], -100, -100), 50, 50, number, i, ["#6A1C0C", "#1D4C5E"], "#132200");
		
		// stripComplex(addComplex([[x2, y2], [x3, y3], [x1, y1]], -100, -100), -50, -50, number, i, ["#1D4C5E", "#6A1C0C"], "#132200", -1);
		// stripComplex(addComplex([[x1, y1], [x3, y3], [x2, y2]], -200, -200), 50, 50, number, i, ["#233E00", "#1D4C5E", "#003212", "#1D4C5E"], "#132200");
		
		
		for(var x = 0; x <= 1; x++){
		stripComplex(addComplex([[x2, y2], [x3, y3], [x1, y1]], x*100, x*100), -50, -50, number, i, ["#021F2B", "#003212", "#021F2B", "#233E00"], "#132200", -1);
		// stripComplex(addComplex([[x4, y4], [x6, y6], [x5, y5]], x*-100, x*100), -50, 50, number, i, ["#233E00", "#021F2B", "#003212", "#021F2B"], "#132200");
		
		stripComplex(addComplex([[x1, y1], [x3, y3], [x2, y2]], x*100, x*100), 50, 50, number, i, ["#233E00", "#021F2B", "#003212", "#021F2B"], "#132200");
		// stripComplex(addComplex([[x5, y5], [x6, y6], [x4, y4]], x*-100, x*100), 50, -50, number, i, ["#021F2B", "#003212", "#021F2B", "#233E00"], "#132200", -1);
			
		}
		await sleep(100);
		//return;
	}
	
	return;
	for(var i = 0; i <= 1; i += .0002){
		clearCanvas();
		var [[x1, y1], [x2, y2]] = [[100, 500], [1000,50]];
		//line(x1, y1, x2, y2);
		var [x3, y3] = triangulate(.5, [[x1, y1], [x2, y2]]);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.1);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.2);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.3);
		stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, i+.4);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.1);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.2);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.3);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 50, 50, 1-i-.4);
		// stripComplex([[x1, y1], [x3, y3], [x2, y2]], 100, 100);
		// context.bezierCurveTo(x1,x2,)
		//line(x2, y2, x3, y3);
		await sleep(200);
	}
	
	
	
	//testB([[1,2],[100,200],[200,100]]);
}

function stripComplex(points, offsetX, offsetY, amount, offset, colors, lineColor, isBackwards = 1){ // two points
	var dist = 0
	var	subdist = .5;
	
	
	// var [point1, point2] = [B(dist, points), B(dist, addComplex(points, offsetX, offsetY))];
	// var point3 = triangulate(subdist, [point1, point2]);
	//BSimple(points);
	// dist = .1;
	// var subdist = .5;
	// dist = 0;
	for(var i = 0; i < amount; i++) {
		canvas.beginPath();
		canvas.fillStyle = colors[i % colors.length];
		canvas.strokeStyle = lineColor;
		canvas.lineWidth = 8;
		
		//rightside large arc
		var [point1, point2] = [B(i/amount + offset, points), B((i + 1)/amount + offset, points)];
		canvas.moveTo(point1[0], point1[1]);
		
		
		var point3 = triangulate(isBackwards * subdist/amount, [point1, point2]);
		BSimpleComplex([point1, point3, point2]);
		
		// await sleep(100);
		
		//forward facing small arc
		var [point1, point2] = [B((i + 1)/amount + offset, points), B((i + 1)/amount + offset, addComplex(points, offsetX, offsetY))];
		var point3 = triangulate(subdist, [point1, point2]);
		BSimpleComplex([point1, point3, point2]);
		
		// await sleep(100);
		
		
		//left large arc
		var [point1, point2] = [B(i/amount + offset, points), B((i + 1)/amount + offset, points)];
		var point3 = triangulate(isBackwards * subdist/amount, [point1, point2]);
		BSimpleComplex(addComplex([point2, point3, point1], offsetX, offsetY));
		
		//await sleep(100);
		
		
		
		//back end small arc
		var [point1, point2] = [B(i/amount + offset, points), B(i/amount + offset, addComplex(points, offsetX, offsetY))];
		var point3 = triangulate(subdist, [point1, point2]);
		BSimpleComplex([point2, point3, point1]);
		
		//await sleep(100);
		canvas.closePath();
		canvas.stroke();
		canvas.fill();
	}
	// dist = 1;
	// var [point1, point2] = [B(1, points), B(1, addComplex(points, offsetX, offsetY))];
	// var point3 = triangulate(subdist, [point1, point2]);
	// BSimple([point1, point3, point2]);
	
	//BSimple(addComplex(points, offsetX, offsetY));
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

function BSimpleComplex(points){ // 3 points
	var [[x1, y1], [x2, y2], [x3, y3]] = points;
	canvas.lineTo(x1, y1);
	
	canvas.quadraticCurveTo(x2, y2, x3, y3);
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
	//console.log(points);
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