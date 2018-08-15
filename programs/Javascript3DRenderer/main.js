var canvas = document.getElementById("myCanvas").getContext("2d");
var sizeX = 1000;
var sizeY = 1000;

var originX = 0;
var originY = 0;
var originZ = 0;

var camaraX = 0;
var camaraY = 0;
var camaraZ = 3000;
var pointRadius = 1
main();
/* notes:

origin at 0,0,0 & 0,0

given that the full length of the canvas is about 1/3 the length to the observer and the canvas set to a width of 1000
the camera is set at 0, 0, 3000
the angle from center to far side is arctan(.5/3) = 0.165148677 rad = 9.46232221 degrees

*/



function main(){
	class LineBuilder {
		constructor() {
			this.x = undefined;
			this.y = undefined;
			this.z = undefined;
		}
		point3D(x, y, z){
			if(this.x != undefined || this.y != undefined || this.z != undefined){
				line3D(this.x, this.y, this.z, x, y, z);
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
	zoomTown(lb);
	//town(lb);
	//twoPencels(lb);
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

async function zoomTown(lb){
	for(camaraZ = 10000; camaraZ >= 1000; camaraZ -= 50){
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
	box(lb, -300, -100, 950, 50, -300, 1000);
	box(lb, -100, 50, 950, 200, 300, 800);
	box(lb, 75, -100, 950, 150, 0, 1000);
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
	var xy = Math.atan(radius/(camaraZ - z))*((camaraZ/* - z*/)**2 + x**2 + y**2)**.5;
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
	line(X1, Y1, X2, Y2)
}

function basis3DHelper(x, y, z){
	//cross product
	//[ a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1 ]
	
	point3DHelper(xF, yF, zF)
}

function crossProduct(a1, a2, a3, b1, b2, b3){
	return [a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1];
}

//rotating the point (x, y, z) about the line through (a, b, c) with direction vector <u, v, w> (where u^2 + v^2 + w^2 = 1) by the angle theta.
//https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxnbGVubm11cnJheXxneDoyMTJiZTZlNzVlMjFiZTFi
function f(x,y,z,a,b,c,u,v,w,theta) {
	return [
	(a*(v**2 + w**2) - u*(b*v + c*w - u*x - v*y - w*z))*(1 - Math.cos(theta)) + x*Math.cos(theta) + (-c*v + b*w - w*y + v*z)*Math.sin(theta),
	(b*(v**2 + w**2) - v*(a*v + c*w - u*x - v*y - w*z))*(1 - Math.cos(theta)) + y*Math.cos(theta) + (c*u - a*w + w*x - u*z)*Math.sin(theta),
	(c*(v**2 + w**2) - w*(a*v + b*w - u*x - v*y - w*z))*(1 - Math.cos(theta)) + z*Math.cos(theta) + (-b*u + a*v - v*x + u*y)*Math.sin(theta)]
}

























