function resetLevel3(){//change to current level
	document.getElementById("ResetLevel").onclick = resetLevel3; //change to current level
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
	
	level = 3;//change to current level
	
	//put in globalMap
	var S = undefined;
	var G = "ground";
	var F = "finish";
	var M = "man";
	
	//put in globalBox
	var B = "1,box";
	var b = "0,1,button";
	var L = "locked";
	
	globalMap = [
	[S,S,S,S,S,S,S,G],
	[S,S,S,S,S,S,G,G],
	[S,S,S,S,S,G,G,G],
	[S,S,M,S,S,S,F,G],
	[G,G,G,G,G,G,G,G]];
	globalBox = [
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,S],
	[S,B,S,S,b,L,S,S],
	[G,G,G,G,G,G,G,G]];
	invert();
	updateTutorial();
    draw();
}
