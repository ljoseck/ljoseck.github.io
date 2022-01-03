var context = document.getElementById("myCanvas").getContext("2d");
var sizeX = 1000;
var sizeY = sizeX;
var scale = .25;

var cancellationToken = 0;
main();

async function main(){
	var a = parseInt(document.getElementById("a").value);
	var b = parseInt(document.getElementById("b").value);
	cancellationToken++;
	runAnimation(a, b);
}

async function runAnimation(a, b){
	var heldCancellationToken = cancellationToken;
	
	var largeRadius = 1;
	var smallRadius = b/a;
	var numberOfPoints = (a - b) * b;

	for(var theta = 0; theta <= b * 2*Math.PI && heldCancellationToken == cancellationToken; theta += Math.PI/640){
		clearCanvas();

		//Draw Star
		drawStarBase(a, b);

		//Draw loading circle
		context.beginPath();
		context.arc(75, 75, 50, 0, theta / b);
		context.stroke();
		//Draw lines
		var points = [];
		for(var i = 0; i < numberOfPoints; i++){
			var adjustedTheta = theta + (b * 2*Math.PI / numberOfPoints * i);
			var x1;
			var y1;
			var x2;
			var y2;
			[x1, y1] = pointOnCircle(largeRadius, smallRadius, adjustedTheta, (largeRadius / smallRadius - 1) * -adjustedTheta);
			points.push({x:x1, y:y1});

			//Draw green lines
			[x2, y2] = pointOnCircle(largeRadius, smallRadius, adjustedTheta, (largeRadius / smallRadius - 1) * -adjustedTheta + 2 * Math.PI / b);
			context.lineWidth = 10;
			context.strokeStyle = "#94EE8C";
			line(x1, y1, x2, y2);
			
			//Draw blue Lines
			[x2, y2] = pointOnCircle(largeRadius, smallRadius, adjustedTheta + 2 * Math.PI / (a - b), (largeRadius / smallRadius - 1) * -adjustedTheta);
			context.strokeStyle = "#6985FF";
			line(x1, y1, x2, y2);
			context.strokeStyle = "#000000";
		}
		//Draw orange points
		context.fillStyle = "#FF7800";
		for(var i = 0; i < numberOfPoints; i++){
			circle(points[i].x, points[i].y, .025)
		}

		await sleep(1);
	}
}

function drawStarBase(a, b){
	context.fillStyle = "#000000";
	circle(0, 0, 1, false);
	var largeRadius = 1;
	var smallRadius = b/a;
	for(var theta = 0; theta <= b * 2*Math.PI; theta += Math.PI/120){
		var x;
		var y;
		[x, y] = pointOnCircle(largeRadius, smallRadius, theta, (largeRadius / smallRadius - 1) * -theta);
		circle(x, y, .02)
	}
}

function pointOnCircle(r1, r2, theta1, theta2){
	// returns a point on an inscribed circle
	var x = (r1 - r2)*Math.cos(theta1);
	var y = (r1 - r2)*Math.sin(theta1);

	x += (r2*.8)*Math.cos(theta2);
	y += (r2*.8)*Math.sin(theta2);
	
	return [x, y];
}

function circle(x, y, radius, fill = true){
	context.beginPath();
	context.arc(convertX(x), convertY(y), scaleValue(radius), 0, 2*Math.PI);
	if(fill){
		context.fill();
	} else {
		context.stroke();
	}
}

function line(x1, y1, x2, y2){
	context.beginPath();
	context.moveTo(convertX(x1), convertY(y1));
	context.lineTo(convertX(x2), convertY(y2));
	context.stroke();
}

function clearCanvas(){
	context.clearRect(0, 0, sizeX, sizeY);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function convertX(x){
	return scaleValue(x) + sizeX/2;
}

function convertY(y){
	return scaleValue(-y) + sizeY/2;
}

function scaleValue(s){
	return s * sizeX * scale;
}
