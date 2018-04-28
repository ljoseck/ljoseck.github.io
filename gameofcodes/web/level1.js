function resetLevel1(){
	document.getElementById("ResetLevel").onclick = resetLevel1;
	playing(false);
	
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	
	globalMap = [];
	globalBox = [];
	globaly = 4;//size of map
	globalx = 5;
	
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	
	level = 1;
	
    for(var i = 0; i < globalx; i++){
        globalMap.push(new Array(globaly));
    }
	for(var i = 0; i < globalx; i++){
        globalBox.push(new Array(globaly));
    }
    globalMap[1][globaly-2] = "man";
    globalMap[3][globaly-2] = "finish";

    
	updateTutorial();
    draw();
}