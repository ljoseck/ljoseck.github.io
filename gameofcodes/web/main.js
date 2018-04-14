var globalX = 0;//for imaging translation and zoom
var globalY = 0;

var globalMap = [];
var globaly = 4;//size of map
var globalx = 5;

var globalpc = 0;//for running program
var globalStack = [];

var level = 0;

function reset(){
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
    for(var i = 0; i < globalx; i++){
        globalMap.push(new Array(globaly));
    }
    globalMap[1][globaly-2] = "man";
    globalMap[3][globaly-2] = "ground";
    
    draw();
}

function draw(){
	var canvas = document.getElementById("canvas");

	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight*2;
	// var width = document.getElementById("div1").offsetWidth;
	// var height = document.getElementById("div1").offsetHeight;


	// canvas.width = width;
	// canvas.height = height;


	//var ctx = canvas.getContext('2d');
	
	var y = globaly;
	var x = globalx;
	var unit = makeSquareGrid(canvas, x, y);
	//addImageToGrid('ground', canvas, 0, 0, unit);
        var backgroundMap = [];
	for(var i = 0; i < x; i++){
            var temp =[];
		for(var j = 0; j < y; j++){
			if(j < y - 1)
				if((i*j)%4 < (i+j)%3)
                                    temp.push("sky");
					//('sky', canvas, i, j, unit);
				else
                                    temp.push("sky2");
					//addImageToGrid('sky2', canvas, i, j, unit);
					
			else
                            //temp.push("ground");
                            globalMap[i][j] = "ground";
				//addImageToGrid('ground', canvas, i, j, unit);
		}
            backgroundMap.push(temp);
	}
        
        drawmap(backgroundMap, canvas, x, y, unit);
		addImageToGrid("test", canvas, 1,1,unit);
	//alert(unit);
	//ctx.drawImage(image, 0, 0, 100, 100);
	
	var mainCanvas = document.getElementById("mainCanvas");
	mainCtx = mainCanvas.getContext('2d');
	var width = document.getElementById("div1").offsetWidth;
	var height = document.getElementById("div1").offsetHeight;

	//alert(height);
	mainCanvas.width = width;
	mainCanvas.height = height;
	//console.log([width + globalX, (width + globalX)/canvas.width*canvas.height]);
	mainCtx.drawImage(canvas, globalX, globalY, canvas.width, canvas.height, 0, 0, width + globalX, (width + globalX)/canvas.width*canvas.height);
	//mainCtx.drawImage(canvas, 0, 0);
}


function drawmap(map, canvas, x, y, unit){
    for(var i = 0; i < x; i++){
        for(var j = 0; j < y; j++){
            addImageToGrid(map[i][j], canvas, i, j, unit);
        }
    }
    //console.log(map);
      
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
	//console.log([width/x, height/y])
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
    try{
        if(globalMap[x][y]){
            image = globalMap[x][y];
        }
	var ctx = canvas.getContext('2d');
	var image1 = document.getElementById(image);
	ctx.drawImage(image1, x*unit, y*unit, unit, unit);
    }catch(e){};
}

function step(){
    var program = document.getElementById("program").value.split("\n");
    if(run(program, globalpc))
        globalpc++;
    
    draw();
	//console.log(globalpc, program.length);
	return globalpc < program.length; 
}

function run(program, pc){//returns true if line of program is used
	highlight(pc);
    if(!recalc())
        return false;
    if(program[pc] === undefined)
        return false;
    else if(program[pc].includes("moveR"))
        return moveForward();
    else if(program[pc].includes("moveL"))
        return moveBack();
    else if(program[pc].includes("jumpR"))
        return jumpFoward();
    else if(program[pc].includes("jumpL"))
        return jumpBack();
    else if(program[pc].includes("}"))
        return loopBack();
    if(program[pc].includes("loop"))
        return loop(program[pc].replace("loop",""), pc);
    return true;
}

function loopBack(){
    var num, pc;
    [num, pc] = globalStack.pop();
    if(num <= 1)
        return true;
    globalpc = pc;
    globalStack.push([num - 1, pc]);
    return true;
}

function loop(num, pc){
    num = parseInt(num);//.replace("{","");
    globalStack.push([num, pc]);
    return true;
}

function collsion(x,y){//bool
	if(x < 0 || y < 0 || x >= globalx || y >= globaly)
		return false;
	if(globalMap[x][y] == "finish")
		victory();
	else
		return !globalMap[x][y];
}

function victory(){
	alert("completed level" + level);
	window.location = "gamelaunch.html?level" + level;
}

function recalc(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y+1)){//player falls one block
        globalMap[x][y+1] = "man";
        globalMap[x][y] = undefined;
        return false;
    }
        
    return true;
}

function jumpFoward(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y-1) && collsion(x+1, y-1)){
        globalMap[x+1][y-1] = "man";
        globalMap[x][y] = undefined;
    }
    return true;
}

function jumpBack(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y-1) && collsion(x-1, y-1)){
        globalMap[x-1][y-1] = "man";
        globalMap[x][y] = undefined;
    }
    return true;
}

function moveForward(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x+1, y)){
        globalMap[x+1][y] = "man";
        globalMap[x][y] = undefined;
    }
    return true;
}

function moveBack(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x-1, y)){
        globalMap[x-1][y] = "man";
        globalMap[x][y] = undefined;
    }
    return true;
}

function findPlayer(){
    for(var i = 0; i < globalx; i++){
        for(var j = 0; j < globaly; j++){
            if(globalMap[i][j] === "man"){
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function highlight(pc){
	program = document.getElementById("program");
	var index1 = getPosition(program.value, "\n", pc);
	var index2 = getPosition(program.value, "\n", pc + 1);
	program.setSelectionRange(index1 == 0 ? 0 : index1 + 1, index2);
	program.focus();
}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play(){
	while(step()){
		await sleep(500);
	}
}


document.getElementById("play").onclick = play;
document.getElementById("step").onclick = step;
//document.getElementById("reset").onclick = reset;
document.getElementById("level1").onclick = resetLevel1;
document.getElementById("level2").onclick = resetLevel2;
onresize = draw;

reset(); //TODO run after delay
