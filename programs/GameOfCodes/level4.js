function resetLevel4(){//change to current level
	document.getElementById("ResetLevel").onclick = resetLevel4; //change to current level
	playing(false);
	
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	globalMap = [];
	globalBox = [];
	globaly = 8;//size of map
	globalx = 8;
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	man = "man";
	
	level = 4;//change to current level
	
	//put in globalMap
	var S = undefined;
	var G = "ground";
	var F = "finish";
	var M = "man";
	
	//put in globalBox
	var B = "1,box";
	var b = "0,1,button";
	var L = "locked";
	var l = "lock"
	var H = "ladder";
	
	globalMap = [
	[S,S,S,S,S,G,S,S],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,F,S],
	[G,G,G,G,S,G,G,G],
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,S,S,G],
	[S,S,M,S,S,S,S,G],
	[G,G,G,G,G,G,G,G]];
	globalBox = [
	[S,S,S,S,S,S,S,S],
	[S,S,S,S,S,L,S,S],
	[S,S,b,l,S,L,S,S],
	[S,S,S,S,H,S,S,S],
	[S,S,S,S,H,S,S,S],
	[S,S,S,S,H,S,S,S],
	[S,S,S,S,H,B,S,S],
	[G,G,G,G,G,G,G,G]];
	invert();
	updateTutorial();
    draw();
}
