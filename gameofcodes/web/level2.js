function resetLevel2(){
	document.getElementById("ResetLevel").onclick = resetLevel2;
	playing(false);
	
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	
	globalMap = [];
	globalBox = [];
	globaly = 5;//size of map
	globalx = 8;
	
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	man = "man";
	
	level = 2;
	
	var S = undefined;
	var G = "ground";
	var F = "finish";
	var M = "man";
    
	globalMap = [
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,G,S,S,S],
	[S,M,S,G,G,S,F,S],
	[G,G,G,G,G,G,G,G]];
	globalBox = [
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[G,G,G,G,G,G,G,G]];
	invert();
	updateTutorial();
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
	try{
		var tempMap = [];
		for(var i = 0; i < globalx; i++){
			var temp =[];
			for(var j = 0; j < globaly; j++){
				temp.push(globalBox[j][i]);
			}
			tempMap.push(temp);
		}
		globalBox = tempMap;
		}catch(e){};
}