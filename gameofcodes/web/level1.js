function resetLevel1(){
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	
	globalMap = [];
	globaly = 4;//size of map
	globalx = 5;
	
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	
	level = 1;
	
    for(var i = 0; i < globalx; i++){
        globalMap.push(new Array(globaly));
    }
    globalMap[1][globaly-2] = "man";
    globalMap[3][globaly-2] = "finish";
    
    draw();
}