var globalX = 0;//for imaging translation and zoom
var globalY = 0;

var globalMap = [];
var globaly = 4;//size of map
var globalx = 5;

var globalpc = 0;//for running program
var globalStack = [];
var globalBox = [];
var man = "man";
var onFlag = false;

var level = window.location.search.substring(6);
if(level == "")
	level = "1";

function reset(){
	console.log("invalid URL input");
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	man = "man";
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
    globalBox[4][globaly-2] = "ladder";
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
	
	//addImageToGrid("test", canvas, 1,1,unit);
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
				if(map[i][j].includes("lock"))
					addLockToGrid(map[i][j], canvas, i, j, unit);
				else if(map[i][j].includes("ground"))
					addGroundToGrid(canvas, i, j, unit);
				else
					addImageToGrid(map[i][j], canvas, i, j, unit);
			}catch(e){
			};
        }
    }
      
}

function addGroundToGrid(canvas, i, j, unit){
	if(getGround(i, j - 1)){
		if(getGround(i - 1, j) && getGround(i + 1, j)){
			addImageToGrid("groundTT", canvas, i, j, unit);
		}else if(getGround(i - 1, j)){
			addImageToGrid("groundTL", canvas, i, j, unit);
		}else if(getGround(i + 1, j)){
			addImageToGrid("groundTR", canvas, i, j, unit);
		}else{
			addImageToGrid("groundT", canvas, i, j, unit);			
		}
	}else{
		if(getGround(i - 1, j) && getGround(i + 1, j)){
			addImageToGrid("groundLR", canvas, i, j, unit);
		}else if(getGround(i - 1, j)){
			addImageToGrid("groundL", canvas, i, j, unit);
		}else if(getGround(i + 1, j)){
			addImageToGrid("groundR", canvas, i, j, unit);
		}else{
			addImageToGrid("groundN", canvas, i, j, unit);			
		}
	}
	if(!getGround(i, j - 1) && !getGround(i + 1, j) && getGround(i + 1, j - 1))
		addImageToGrid("groundCR", canvas, i, j, unit);
	
	if(!getGround(i, j - 1) && !getGround(i - 1, j) && getGround(i - 1, j - 1))
		addImageToGrid("groundCL", canvas, i, j, unit);
	
}

function getGround(i, j){
	try{
		return globalMap[i][j] != "ground";
	}catch(e){
		return false;
	}
}



function addLockToGrid(lock, canvas, i, j, unit){
	if(lock == "locked"){
		try{
			if((globalMap[i - 1][j] == "ground" || globalBox[i - 1][j] == "locked") && (globalMap[i + 1][j] == "ground" || globalBox[i + 1][j] == "locked")){
				if(globalBox[i - 1][j] == "locked" && globalBox[i + 1][j] == "locked"){
					addImageToGrid("lockedLC", canvas, i, j, unit);
				}else if(globalBox[i - 1][j] == "ground" || globalBox[i - 1][j] == undefined){
					addImageToGrid("lockedLL", canvas, i, j, unit);
				}else if(globalBox[i + 1][j] == "ground" || globalBox[i + 1][j] == undefined){
					addImageToGrid("lockedLR", canvas, i, j, unit);
				}else{
					addImageToGrid("lockedL", canvas, i, j, unit);
				}
			}else{
				if((globalMap[i][j - 1] == "ground" || (globalBox[i][j - 1] == undefined && globalMap[i][j - 1] == undefined))
				&& (globalMap[i][j + 1] == "ground" || (globalBox[i][j + 1] == undefined && globalMap[i][j + 1] == undefined))){
					addImageToGrid("locked", canvas, i, j, unit);
				}else if(globalBox[i][j - 1] == "ground" || globalBox[i][j - 1] == undefined){
					addImageToGrid("lockedT", canvas, i, j, unit);
				}else if(globalBox[i][j + 1] == "ground" || globalBox[i][j + 1] == undefined){
					addImageToGrid("lockedB", canvas, i, j, unit);
				}else{
					addImageToGrid("lockedC", canvas, i, j, unit);
				}
			}
		}catch(e){
			addImageToGrid(lock, canvas, i, j, unit);
		}
	}else{
		try{
			if((globalMap[i - 1][j] == "ground" || globalBox[i - 1][j] == "lock") && (globalMap[i + 1][j] == "ground" || globalBox[i + 1][j] == "lock")){
				if(globalBox[i - 1][j] != "lock"){
					addImageToGrid("lockL", canvas, i, j, unit);
				}
				if(globalBox[i + 1][j] != "lock"){
					addImageToGrid("lockR", canvas, i, j, unit);
				}
			}else{
				if(globalBox[i][j - 1] != "lock"){
					addImageToGrid("lockT", canvas, i, j, unit);
				}
				if(globalBox[i][j + 1] != "lock"){
					addImageToGrid("lockB", canvas, i, j, unit);
				}
			}
		}catch(e){
			addImageToGrid(lock, canvas, i, j, unit);
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
				image = "B" + (image.substring(2,3) - image.substring(0,1));
			}
			else{
				var ctx = canvas.getContext('2d');
				var image1 = document.getElementById("box-button");
				ctx.drawImage(image1, x*unit, y*unit, unit, unit);
				image = "B" + (image.substring(2,3) - image.substring(0,1));
			}
		}
		var ctx = canvas.getContext('2d');
		var image1 = document.getElementById(image);
		ctx.drawImage(image1, x*unit, y*unit, unit, unit);
		if((image.includes("ladder") || image.includes("lock")) && globalMap[x][y] == man){
			addImageToGrid(man, canvas, x, y, unit)
		}
    }catch(e){};
}

function step(){
	playing(true);
	onFlag = false;
    var program = document.getElementById("program").value.split("\n");
	if(globalpc > program.length)
		return false;
	
	var fell = false;
	if(run(program, globalpc)){
        globalpc++;
	}else{
		globalpc++; //if the player is falling down still highlight the next command
		fell = true;
	}
	
    draw();
	if(fell)
		globalpc--; //if the player is falling down still highlight the next command
	if(onFlag){
		draw();
		victory();
	}
	
	return (globalpc - 1 < program.length);
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
        return (loopBack() && run(program, ++globalpc));
    else if(program[pc].includes("loop"))
        return loop(program[pc].replace("loop",""), pc);
	else if(program[pc].includes("pick"))
		return pick();
	else if(program[pc].includes("put"))
		return put();
	else if(program[pc].includes("climbUp"))
		return climb();
	else if(program[pc].includes("climbDown"))
		return climbDown();
    return true;
}

function climbDown(){
	var x,y;
	[x, y] = findPlayer();
    if(collsion(x, y+1)){
        globalMap[x][y+1] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function climb(){
	var x,y;
	[x, y] = findPlayer();
    if(collsion(x, y-1)){
        globalMap[x][y-1] = man;
        globalMap[x][y] = undefined;
    }
    return true;
}

function put(){
	var x,y;
	[x, y] = findPlayer();
	if(man == "man")
		return true;
	if(!globalBox[x][y]){
		globalBox[x][y] = "1,box";
		
		man = "man"
		globalMap[x][y] = man;
	}else if(!globalBox[x][y].includes("lock")){
		man = "man"
		globalMap[x][y] = man;
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
		onFlag = true;
		return true;
	}
	else if(globalBox[x][y] == "locked"){
		return false;
	}
	else{
		return !globalMap[x][y];
	}
}

async function victory(){
	await sleep(speed());
	alert("completed level " + level);
	window.location = "gamelaunch.html?level" + (parseInt(level) + 1);
}

function recalc(){
    var x,y;
    [x, y] = findPlayer();
    if(collsion(x, y + 1) && globalBox[x][y + 1] != "ladder"){//player falls one block
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
	console.log("cant find player");
    return [-1, -1];
}

// function highlight(pc){
	// program = document.getElementById("program");
	// var index1 = getPosition(program.value, "\n", pc);
	// var index2 = getPosition(program.value, "\n", pc + 1);
	// program.setSelectionRange(index1 == 0 ? 0 : index1 + 1, index2);
	// program.focus();
// }

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playing(bool){
	if(bool){
		document.getElementById("playing").value = "1";	
		document.getElementById("highlight").hidden = false;
		document.getElementById("program").disabled = true;	
		
	}
	else{
		document.getElementById("playing").value = "";
		document.getElementById("program").disabled = false;
		document.getElementById("play").disabled = false;
		document.getElementById("highlight").hidden = true;
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
	document.getElementById("stop").hidden = true;
	document.getElementById("go").hidden = true;
}

async function play(){
	doReset();
	document.getElementById("play").disabled = true;
	document.getElementById("stop").hidden = false;
	highlight(0);
	fastest();
	playing(true);
	await sleep(200);
	if(await playHelper())
		playing(false);
}

async function playHelper(){
	while(isPlaying() && step()){
		if(stoped())
			return false;
		await sleep(speed());
	}
	return true;
}

function stoped(){
	return document.getElementById("stop").hidden;
}

function go(){
	document.getElementById("stop").hidden = false;
	document.getElementById("go").hidden = true;
	playHelper();
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

function stop(){
	document.getElementById("stop").hidden = true;
	document.getElementById("go").hidden = false;
}

function applyHighlights(text, pc){
	text = text.replace(/\n$/g, '\n\n').split("\n");
	//text = text.replace(/[A-Z].*?\b/g, '<mark class="mark">$&</mark>');
	//console.log(text.split("\n"));
	if(text[pc]){
		text[pc] = "<mark class='mark'>" + text[pc] + "</mark>";
	}else{
		text[pc] = "<mark class='mark'> </mark>";
	}
	text.push("")
	return text.join("\n");
}

function highlight(pc){
	var text = document.getElementById("program").value;
	var highlightedText = applyHighlights(text, pc);
	document.getElementById("highlight").innerHTML = highlightedText;
	handleScroll()
}

function handleScroll(){
  var scrollTop = document.getElementById("program").scrollTop;
  document.getElementById("highlight").scrollTop = scrollTop;
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
document.getElementById("go").onclick = go;
document.getElementById("stop").onclick = stop;

document.getElementById("program").onscroll = handleScroll;
document.getElementById("highlight").ondblclick = doReset;

function doReset(){
	document.getElementById("ResetLevel").onclick();
}


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
