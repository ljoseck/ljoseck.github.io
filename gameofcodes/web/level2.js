function resetLevel2(){
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	
	globalMap = [];
	globaly = 5;//size of map
	globalx = 8;
	
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	
	level = 2;
	
	var S = undefined;
	var G = "ground";
	var F = "finish";
	var M = "man";
	
    // for(var i = 0; i < globalx; i++){
        // globalMap.push(new Array(globaly));
    // }
    // globalMap[1][globaly-2] = "man";
    // globalMap[3][globaly-2] = "finish";
    
	globalMap = [
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,G,S,S,S],
	[S,M,S,G,G,S,F,S],
	[G,G,G,G,G,G,G,G]]
	invert();
    draw();
}


function invert(){
	var tempMap = [];
	for(var i = 0; i < globalx; i++){
		var temp =[];
		for(var j = 0; j < globaly; j++){
			temp.push(globalMap[j][i]);
		}
		tempMap.push(temp);
	}
	globalMap = tempMap;
}