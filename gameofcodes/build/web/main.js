var globalX = 0;//for imaging translation and zoom
var globalY = 0;

var globalMap = [];
var globaly = 4;//size of map
var globalx = 5;

var globalpc = 0;//for running program
var globalStack = [];
var globalBox = [];
var man = "man";

var level = window.location.search.substring(6);
if(level == "")
	level = "1";

function reset(){
	console.log("invalid URL input");
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	playing(false);
    for(var i = 0; i < globalx; i++){
        globalMap.push(new Array(globaly));
    }
	
	globalBox = [];
    for(var i = 0; i < globalx; i++){
        globalBox.push(new Array(globaly));
    }
	
	
	globalBox[0][2] = "3,box";
	globalBox[1][2] = "0,3,button";
    globalMap[1][globaly-2] = man;
    globalBox[3][globaly-2] = "lock";
    
    draw();
}

function draw(){
	var canvas = document.getElementById("canvas");

	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight*2;
	
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
				globalMap[i][j] = "ground";
				//addImageToGrid('ground', canvas, i, j, unit);
		}
            backgroundMap.push(temp);
	}
	drawmap(backgroundMap, canvas, x, y, unit);
	drawmap(globalMap, canvas, x, y, unit);
	drawmap(globalBox, canvas, x, y, unit);
	
	addImageToGrid("test", canvas, 1,1,unit);
	//ctx.drawImage(image, 0, 0, 100, 100);
	
	var mainCanvas = document.getElementById("mainCanvas");
	mainCtx = mainCanvas.getContext('2d');
	var width = document.getElementById("div1").offsetWidth;
	var height = document.getElementById("div1").offsetHeight;

	mainCanvas.width = width;
	mainCanvas.height = height;
	//console.log([width + globalX, (width + globalX)/canvas.width*canvas.height]);
	mainCtx.drawImage(canvas, globalX, globalY, canvas.width, canvas.height, 0, 0, width + globalX, (width + globalX)/canvas.width*canvas.height);
}


function drawmap(map, canvas, x, y, unit){
    for(var i = 0; i < x; i++){
        for(var j = 0; j < y; j++){
			try{
				addImageToGrid(map[i][j], canvas, i, j, unit);
			}catch(e){};
        }
    }
      
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
        if(image.substring(1).includes("box")){
			addImageToGrid(image.substring(1), canvas, x, y, unit)
            image = image.substring(0,1);
        }
		if(image.substring(1).includes("button")){
			if(image.substring(0,1) == "0"){//} image.substring(2,3)){
				addImageToGrid("button", canvas, x, y, unit)
				image = "" + (image.substring(2,3) - image.substring(0,1));
			}
			else{
				addImageToGrid("" + (image.substring(2,3) - image.substring(0,1)), canvas, x, y, unit)
				image = "box-button";
			}
		}
		var ctx = canvas.getContext('2d');
		var image1 = document.getElementById(image);
		ctx.drawImage(image1, x*unit, y*unit, unit, unit);
    }catch(e){};
}

function step(){
	playing(true);
    var program = document.getElementById("program").value.split("\n");
    if(run(program, globalpc))
        globalpc++;
    
    draw();
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> branch2
	
	
	// console.log("Man var is " + man);
	
    // var x,y;
    // [x, y] = findPlayer();
	// //console.log(x + " and " + y)
	// //console.log("man found is " + globalMap[x][y]);
	// console.log(globalMap);
<<<<<<< HEAD
	//console.log(globalpc, program.length);
	return (globalpc - 1 < program.length);
=======
	//console.log(globalpc, program.length);
	return (globalpc - 1 < program.length);
=======
	//console.log(globalpc, program.length);
	return globalpc < program.length; 
>>>>>>> 41ea70c89b5cffdf372a35eb731c7d022ffba568
>>>>>>> branch2
}

function run(program, pc){//returns true if line of program is used
	highlight(pc);
    if(!recalc())
        return false;
    if(program[pc] === undefined)
        return true;
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
    else if(program[pc].includes("loop"))
        return loop(program[pc].replace("loop",""), pc);
	else if(program[pc].includes("pick"))
		return pick();
	else if(program[pc].includes("put"))
		return put();
    return true;
}

function put(){
	var x,y;
	[x, y] = findPlayer();
	if(man == "man")
		return true;
	man = "man"
	globalMap[x][y] = man;
	if(!globalBox[x][y]){
		globalBox[x][y] = "1,box";
	}else{
		var box = globalBox[x][y].split(",");
		box[0]++;
		if(box[0] >= box[1])
			toggleLocks();
		globalBox[x][y] = box.join(",");
	}
	
	return true;
}

function pick(){
	try{
		if(man === "manb")
			return true;
		var x,y;
		[x, y] = findPlayer();
		var box = globalBox[x][y].split(",");
		if(parseInt(box[0]) > 0){
			man = "manb";
			if(parseInt(box[1]) >= 0 && box[0] == box[1]){
				toggleLocks();
			}
			box[0]--;
			if(box[0] > 0 || parseInt(box[1]) >= 0)
				globalBox[x][y] = box.join(",");
			else
				globalBox[x][y] = undefined;
			globalMap[x][y] = man;
		}
	}catch(e){};
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

function collsion(x,y){//bool true if no collsion at x,y
	if(x < 0 || y < 0 || x >= globalx || y >= globaly)
		return false;
	if(globalMap[x][y] == "finish"){
		draw();
		victory();
	}
	else if(globalBox[x][y] == "locked"){
		return false;
	}
	else{
		return !globalMap[x][y];
	}
}

function victory(){
	alert("completed level " + level);
	window.location = "gamelaunch.html?level" + (parseInt(level) + 1);
}

function recalc(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y+1)){//player falls one block
        globalMap[x][y+1] = man;
        globalMap[x][y] = undefined;
        return false;
    }
        
    return true;
}

function jumpFoward(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y-1) && collsion(x+1, y-1)){
        globalMap[x+1][y-1] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function jumpBack(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y-1) && collsion(x-1, y-1)){
        globalMap[x-1][y-1] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function moveForward(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x+1, y)){
        globalMap[x+1][y] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function moveBack(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x-1, y)){
        globalMap[x-1][y] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function findPlayer(){
    for(var i = 0; i < globalx; i++){
        for(var j = 0; j < globaly; j++){
            if(globalMap[i][j] == man){
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

function playing(bool){
	if(bool){
		document.getElementById("playing").value = "1";	
		//document.getElementById("program").disabled = true;	
		
	}
	else{
		document.getElementById("playing").value = "";
		document.getElementById("program").disabled = false;
		document.getElementById("play").disabled = false;
		console.log("hidding");
		hideSpeed();
	}
}

function speed(){
	if(!document.getElementById("fast").hidden)
		return 500;
	if(!document.getElementById("faster").hidden)
		return 200;
	if(!document.getElementById("fastest").hidden)
		return 70;
	return 500;
}

function fast(){
	document.getElementById("fast").hidden = true;
	document.getElementById("faster").hidden = false;
	document.getElementById("fastest").hidden = true;
}

function faster(){
	document.getElementById("fast").hidden = true;
	document.getElementById("faster").hidden = true;
	document.getElementById("fastest").hidden = false;
}

function fastest(){
	document.getElementById("fast").hidden = false;
	document.getElementById("faster").hidden = true;
	document.getElementById("fastest").hidden = true;
}

function hideSpeed(){
	document.getElementById("fast").hidden = true;
	document.getElementById("faster").hidden = true;
	document.getElementById("fastest").hidden = true;
	
}

async function play(){
	document.getElementById("ResetLevel").onclick();
	document.getElementById("play").disabled = true;
	fastest();
	playing(true);
	await sleep(200);
	while(isPlaying() && step()){
		await sleep(speed());
	}
	playing(false);
}

function toggleLocks(){
	for(var i = 0; i < globalx; i++){
        for(var j = 0; j < globaly; j++){
            if(globalBox[i][j] == "locked"){
                globalBox[i][j] = "lock";
            }else if(globalBox[i][j] == "lock"){
				globalBox[i][j] = "locked"
			}
        }
    }
}

function updateTutorial(){
	for(var i = 1; i <= 9; i++){
		try{
			var div = document.getElementById("tutorial" + i);
			if(i == level)
				div.style = "display: show";
			else
				div.style = "display: none";
		}catch(e){
			return;
		}
			
	}
}

function isPlaying(){
	return document.getElementById("playing").value;
}



updateTutorial();
document.getElementById("play").onclick = play;
document.getElementById("step").onclick = step;
//document.getElementById("reset").onclick = reset;

//document.getElementById("go").onclick = go;
//document.getElementById("stop").onclick = stop;
document.getElementById("fast").onclick = fast;
document.getElementById("faster").onclick = faster;
document.getElementById("fastest").onclick = fastest;





try{
	document.getElementById("LevelSelect").onclick = function(){window.location.href='./main_menu.html'};
	document.getElementById("ResetLevel").onclick = reset;
	document.getElementById("level1").onclick = resetLevel1;
	document.getElementById("level2").onclick = resetLevel2;
	document.getElementById("level3").onclick = resetLevel3;
	document.getElementById("level4").onclick = resetLevel4;
	document.getElementById("level5").onclick = resetLevel5;
	document.getElementById("level6").onclick = resetLevel6;
	document.getElementById("level7").onclick = resetLevel7;
	document.getElementById("level8").onclick = resetLevel8;
	document.getElementById("level9").onclick = resetLevel9;
}catch(e){};
onresize = draw;


//var reset = resetLevel1;
try{
	reset = document.getElementById("level" + level).onclick;
}catch(e){
	//reset = resetLevel1;
};
reset();
setTimeout(draw, 500);
setTimeout(draw, 5000);
