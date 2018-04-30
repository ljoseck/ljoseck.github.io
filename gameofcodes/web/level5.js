function resetLevel5(){//change to current level
	document.getElementById("ResetLevel").onclick = resetLevel5; //change to current level
	playing(false);
	
    globalpc = 0;//for running program
    globalMap = [];
    globalStack = [];
	globalMap = [];
	globalBox = [];
	globaly = 5;//size of map
	globalx = 9;
	globalX = 0;//for imaging translation and zoom (dont change)
	globalY = 0;
	man = "man";
	
	level = 5;//change to current level
	
	//put in globalMap
	var S = undefined;
	var G = "ground";
	var F = "finish";
	var M = "man";
	
	//put in globalBox
	var B = "3,box";
	var B1 = "1,box";
	var b = "0,3,button";
	var b1 = "0,1,button";
	var L = "locked";
	var l = "lock"
	var H = "ladder";
	
	globalMap = [
	[G,S,S,S,S,S,S,S,S],
	[G,S,S,S,S,S,S,S,F],
	[G,G,S,S,S,G,G,G,G],
	[G,M,S,S,S,S,G,G,G],
	[G,G,G,G,G,G,G,G]];
	globalBox = [
	[S,S,S,S,L ,S ,l,S,S],
	[S,B,S,b,L ,b1,l,S,S],
	[S,S,H,G,G ,S ,S,S,S],
	[S,S,H,l,B1,S ,S,S,S],
	[G,G,G,G,G ,G ,G,G,G]];
	invert();
	updateTutorial();
    draw();
}
