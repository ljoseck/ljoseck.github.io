var canvas = document.getElementById("myCanvas").getContext("2d");
var sizeX = 1000;
var sizeY = 1000;

var originX = 0;
var originY = 0;
var originZ = 0;

var defultCamaraX = 0;
var defultCamaraY = 0;
var defultCamaraZ = 3000;

var focalX = originX;
var focalY = originY;
var focalZ = originZ;

var camaraX = defultCamaraX+1;
var camaraY = defultCamaraY+1;
var camaraZ = defultCamaraZ+1;


var pointRadius = 5;

//var token = 0; // handle cancellation of dropCircleTown
var cancellationToken = 0;
main();
/* notes:

origin at 0,0,0 & 0,0

given that the full length of the canvas is about 1/3 the length to the observer and the canvas set to a width of 1000
the camera is set at 0, 0, 3000
the angle from center to far side is arctan(.5/3) = 0.165148677 rad = 9.46232221 degrees

*/



async function main(action = "dropCircleTown"){
	cancellationToken++;
	var options = document.getElementById("options");
		console.log(options.children);
	// for(var i = 0; i < options.children.length; i++){
		// options.children[i].disabled = true;
	// }
	defultCamaraX = 0;
	defultCamaraY = 0;
	defultCamaraZ = 3000;

	focalX = originX;
	focalY = originY;
	focalZ = originZ;

	camaraX = defultCamaraX+1;
	camaraY = defultCamaraY+1;
	camaraZ = defultCamaraZ+1;


	pointRadius = 5
	class LineBuilder {
		constructor() {
			this.x = undefined;
			this.y = undefined;
			this.z = undefined;
		}
		point3D(x, y, z){
			if(this.x != undefined || this.y != undefined || this.z != undefined){
				//line3D(this.x, this.y, this.z, x, y, z);
				lineBasis3D(this.x, this.y, this.z, x, y, z);
			}
			this.x = x;
			this.y = y;
			this.z = z;
		}

		doReset(){
			this.x = undefined;
			this.y = undefined;
			this.z = undefined;
		}
	}

	var lb = new LineBuilder();
	
	clearCanvas();
	if(action == "dropCircleTown"){
		await dropCircleTown(lb);
	}
	if(action == "dropTown"){
		await dropTown(lb);
	}
	if(action == "zoomTown"){
		await zoomTown(lb);
	}
	if(action == "circleTown"){
		await circleTown(lb);
	}
	if(action == "panTown"){
		await panTown(lb);
	}
	if(action == "town"){
		await town(lb);
	}
	if(action == "twoPencels"){
		await twoPencels(lb);
	}
	for(var i = 0; i < options.children.length; i++){
		options.children[i].disabled = false;
	}
	return;
	// var lastJ = 0;
	// for(var j = 0; j <= 10; j++){
		// var lastI = 0;		
		// for(var i = 0; i <= 10; i++){
			// point3D(j*50, i, i*40);
			// line3D(x1, y1, z1, x2, y2, z2)
		// }
	// }
	for(var y = 500; y >= -5000; y -= 25){
		point3D(50, y/10+400, y*10);
		point3D(-50, y/10+400, y*10);
	}
}

async function dropCircleTown(lb){
	var heldCancellationToken = cancellationToken;
	
	var dist = 1000;
	for(var theta = 0; theta <= 5.5*Math.PI && heldCancellationToken == cancellationToken; theta += Math.PI/640){
		clearCanvas();
		camaraX = dist*Math.cos(theta);
		camaraY = Math.abs(dist*Math.sin(theta));
		town(lb);
		pointBasis3D(0,0,0);
		pointBasis3D(focalX,focalY,focalZ);
		focalZ += .5;
		dist += .5;
		await sleep(1);
	}
	console.log("done");
}

async function circleTown(lb){
	var heldCancellationToken = cancellationToken;
	// camaraX = 500;
	// camaraY = 500;
	// town(lb);
	// return;
	for(var theta = 0; theta <= 40*Math.PI && heldCancellationToken == cancellationToken; theta += Math.PI/32){
		clearCanvas();
		camaraX = 1000*Math.cos(theta);
		camaraY = 1000*Math.sin(theta);
		town(lb);
		pointBasis3D(1,1,1);
		await sleep(100);
	}
	console.log("done");
}

async function dropTown(lb){
	var heldCancellationToken = cancellationToken;
	// camaraX = 500;
	camaraY = 500;
	// town(lb);
	// return;
	for( var i = 0; i <= 20 && heldCancellationToken == cancellationToken; i++){
		clearCanvas();
		town(lb);
		pointBasis3D(1,1,1);
		focalZ -= 50;
		camaraY += 100;
		await sleep(100);
		//camaraX += 50;
		//camaraZ -= 50;
	}
}

async function panTown(lb){
	var heldCancellationToken = cancellationToken;
	// camaraX = 500;
	// camaraY = 500;
	// town(lb);
	// return;
	for( var i = 0; i <= 20 && heldCancellationToken == cancellationToken; i++){
		clearCanvas();
		town(lb);
		pointBasis3D(1,1,1);
		await sleep(100);
		//camaraX += 50;
		camaraY += 50;
		//camaraZ -= 50;
	}
}

async function zoomTown(lb){
	var heldCancellationToken = cancellationToken;
	for(camaraZ = 10000; camaraZ >= 1000 && heldCancellationToken == cancellationToken; camaraZ -= 50){
		clearCanvas();
		town(lb);
		await sleep(10);
	}
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearCanvas(){
	canvas.clearRect(0, 0, sizeX, sizeY);
}

function town(lb){
	base(lb);
	boxBasis(lb, -300, -100, 0, 50, -300, 500);
	boxBasis(lb, -100, 50, 0, 200, 300, 400);
	boxBasis(lb, 75, -100, 0, 150, 0, 500);
}

function box(lb, x1, y1, z1, x2, y2, z2){
	// lb.point3D(x1, y1, z1);
	line3D(x1, y1, z1, x1, y2, z1);
	line3D(x2, y1, z1, x2, y2, z1);
	line3D(x1, y1, z1, x2, y1, z1);
	line3D(x1, y2, z1, x2, y2, z1);
	
	line3D(x1, y1, z2, x1, y2, z2);
	line3D(x2, y1, z2, x2, y2, z2);
	line3D(x1, y1, z2, x2, y1, z2);
	line3D(x1, y2, z2, x2, y2, z2);
	
	line3D(x1, y1, z1, x1, y1, z2);
	line3D(x2, y1, z1, x2, y1, z2);
	line3D(x1, y2, z1, x1, y2, z2);
	line3D(x2, y2, z1, x2, y2, z2);
}

function boxBasis(lb, x1, y1, z1, x2, y2, z2){
	// lb.point3D(x1, y1, z1);
	lineBasis3D(x1, y1, z1, x1, y2, z1);
	lineBasis3D(x2, y1, z1, x2, y2, z1);
	lineBasis3D(x1, y1, z1, x2, y1, z1);
	lineBasis3D(x1, y2, z1, x2, y2, z1);
	
	lineBasis3D(x1, y1, z2, x1, y2, z2);
	lineBasis3D(x2, y1, z2, x2, y2, z2);
	lineBasis3D(x1, y1, z2, x2, y1, z2);
	lineBasis3D(x1, y2, z2, x2, y2, z2);
	
	lineBasis3D(x1, y1, z1, x1, y1, z2);
	lineBasis3D(x2, y1, z1, x2, y1, z2);
	lineBasis3D(x1, y2, z1, x1, y2, z2);
	lineBasis3D(x2, y2, z1, x2, y2, z2);
}


function base(lb){
	lb.point3D(400,400,0);
	lb.point3D(400,-400,0);
	lb.point3D(-400,-400,0);
	lb.point3D(-400,400,0);
	lb.point3D(400,400,0);
	lb.point3D(-400,-400,0);
	lb.doReset();
	lb.point3D(-400,400,0);
	lb.point3D(400,-400,0);
	lb.doReset();
}

function twoPencels(lb){
	//var lb = new LineBuilder();
	for(var y = 500; y >= -5000; y -= 25){
		for(var theta = 0; theta <= 2*Math.PI; theta += Math.PI/16){
			lb.point3D(50*Math.cos(theta)+55, 50*Math.sin(theta) + y/5, y);
		}
		lb.doReset();
	}
	lb.doReset();
	for(var y = 500; y >= -5000; y -= 25){
		for(var theta = 0; theta <= 2*Math.PI; theta += Math.PI/16){
			lb.point3D(50*Math.cos(theta)-55, 50*Math.sin(theta) + y/5, y);
		}
		lb.doReset();
	}
}


function line(x1, y1, x2, y2){ // does not account for the curvature of perspective lines
	canvas.beginPath();
	canvas.moveTo(x1 + sizeX / 2, y1 + sizeY / 2);
	canvas.lineTo(x2 + sizeX / 2, y2 + sizeY / 2);
	canvas.stroke();
}

function point(x, y){
	canvas.beginPath();
	canvas.arc(x + sizeX / 2, y + sizeY / 2, pointRadius, 0, 2*Math.PI);
	canvas.stroke();
}


function point3DHelper(x, y, z){
	var radius = (x**2 + y**2)**.5;
	var xy = Math.atan(radius/(defultCamaraZ - z))*((defultCamaraZ/* - z*/)**2 + x**2 + y**2)**.5;
	//pointRadius = 3000/(((camaraZ - z)**2 + x**2 + y**2)**.5);
	return [xy*x/radius,xy*y/radius];
	console.log(xy*x/radius);
	// point((xy**2-y**2)**.5, (xy**2-x**2)**.5);
	// point(Math.atan(x/camaraZ)*(camaraZ**2 + x**2)**.5, 0);
}

function point3D(x, y, z){
    var [X, Y] = point3DHelper(x, y, z);
	point(X,Y);
}

function line3D(x1, y1, z1, x2, y2, z2){
    var [X1, Y1] = point3DHelper(x1, y1, z1);
	var [X2, Y2] = point3DHelper(x2, y2, z2);
	line(X1, Y1, X2, Y2);
}

function pointBasis3D(x, y, z){
    var [xF, yF, zF] = changeBasis(x, y, z);
	
	point3D(xF, yF, zF);
}

function lineBasis3D(x1, y1, z1, x2, y2, z2){
    var [X1, Y1, Z1] = changeBasis(x1, y1, z1);
	var [X2, Y2, Z2] = changeBasis(x2, y2, z2);
	
	line3D(X1, Y1, Z1, X2, Y2, Z2);
}

function changeBasis(x, y, z){
    [x, y, z] = rotate(x, y, z);
    [x, y, z] = translate(x, y, z);
	
	return [x, y, z];
}

function rotate(x, y, z){
	
    var [a1, a2, a3] = getUnitVector(defultCamaraX, defultCamaraY, defultCamaraZ, originX, originY, originZ);
    var [b1, b2, b3] = getUnitVector(camaraX, camaraY, camaraZ, focalX, focalY, focalZ);
	
	var [u, v, w] = crossProduct(a1, a2, a3, b1, b2, b3);
	[u, v, w] = unitVector(u, v, w);
	//console.log(unitVector(u, v, w))
	var theta = angleOfCameras();
	return f(x, y, z, defultCamaraX, defultCamaraY,  defultCamaraZ, u, v, w, theta);
}

function translate(x, y, z){
	x += defultCamaraX - camaraX;
	y += defultCamaraY - camaraY;
	z += defultCamaraZ - camaraZ;
	return [x, y, z];
}



function angleOfCameras(){
    var [a1, a2, a3] = getVector(defultCamaraX, defultCamaraY, defultCamaraZ, originX, originY, originZ);
    var [b1, b2, b3] = getVector(camaraX, camaraY, camaraZ, focalX, focalY, focalZ);
    return vectorAngle(a1, a2, a3, b1, b2, b3); // could be backwards
}

function getUnitVector(x1, y1, z1, x2, y2, z2){
    var [x, y, z] = getVector(x1, y1, z1, x2, y2, z2);
    return unitVector(x, y, z);
}

function getVector(x1, y1, z1, x2, y2, z2){
    return [x2 - x1, y2 - y1, z2- z1];
}

function unitVector(x, y, z){
    var dist = (x**2 + y**2 + z**2)**.5;
    return [x/dist, y/dist, z/dist];
}

function vectorAngle(x1, y1, z1, x2, y2, z2){ //returns the angle between two unit vectors in rads
    var [a1, a2, a3] = unitVector(x1, y1, z1);
    var [b1, b2, b3] = unitVector(x2, y2, z2);
    return -Math.acos(dotProduct(a1, a2, a3, b1, b2, b3));
}

function dotProduct(a1, a2, a3, b1, b2, b3){
    return a1*b1 + a2*b2 + a3*b3;
}

function crossProduct(a1, a2, a3, b1, b2, b3){
	return [a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1];
}

//rotating the point (x, y, z) about the line through (a, b, c) with direction vector <u, v, w> (where u^2 + v^2 + w^2 = 1) by the angle theta.
//https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxnbGVubm11cnJheXxneDoyMTJiZTZlNzVlMjFiZTFi
function f(x,y,z,a,b,c,u,v,w,theta) {
	return [
	(a*(v**2 + w**2) - u*(b*v + c*w - u*x - v*y - w*z))*(1 - Math.cos(theta)) + x*Math.cos(theta) + (-c*v + b*w - w*y + v*z)*Math.sin(theta),
	(b*(u**2 + w**2) - v*(a*u + c*w - u*x - v*y - w*z))*(1 - Math.cos(theta)) + y*Math.cos(theta) + (c*u - a*w + w*x - u*z)*Math.sin(theta),
	(c*(u**2 + v**2) - w*(a*u + b*v - u*x - v*y - w*z))*(1 - Math.cos(theta)) + z*Math.cos(theta) + (-b*u + a*v - v*x + u*y)*Math.sin(theta)]
}
























