var testing = false;
//import org.junit.*;
//import static org.junit.Assert.*; This is not for Javascript I made my own
if(testing){
	function Equals(x,y){
		if(typeof(x) != typeof([])){
			return x == y;
		}
		for(var i = 0; i < x.length; i++){
			if(!Equals(x[i],y[i]))
				return false;
		}
		return true;
	}
	function fail(message){
		if(message != "")
			console.log(message);
		else
			console.log("This Test Failed");
			
	}
	function assertTrue(x, message = ""){
		if(!x){
			fail(message);
		}
	}
	function assertFalse(x, message = ""){
		if(x){
			fail(message);
		}
	}
	function assertEquals(x, y, message = ""){
		if(!Equals(x,y)){
			fail(message);
		}
	}
	function assertNotSame(x, y, message = ""){
		if(Equals(x,y)){
			fail(message);
		}
            }

	function assertNull(x, message = ""){
		if(x == undefined){
			fail(message);
		}
	}
	function assertNotNull(x, message = ""){
		if(x != undefined){
			fail(message);
		}
	}
	//end of Javascript implementation of JUnit
<<<<<<< HEAD

=======
>>>>>>> 41ea70c89b5cffdf372a35eb731c7d022ffba568
	
	//@test
	function testMapGeneration1(){
		globalMap = [[0,1],[2,3]];
		globalx = 2;
		globaly = 2;
		invert();
		assertEquals(globalMap, [[0,2],[1,3]], "Inverting map doea not work for 2x2")
	}
	//@test
	function testMapGeneration2(){
		globalMap = [[0,1,2],[3,4,5],[6,7,8]];
		globalx = 3;
		globaly = 3;
		invert();
		assertEquals(globalMap, [[0,3,6],[1,4,7],[2,5,8]], "Inverting map doea not work for 2x2")
	}
	
	//@helper
	function makeTestMap1(){
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		globalx = 3;
		globaly = 3;
		globalMap = [
		[S,S,S],
		[S,M,S],
		[G,G,G]]
		invert();
	}
	function makeTestMap2(){
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		globalx = 3;
		globaly = 3;
		globalMap = [
		[S,S,S],
		[S,S,M],
		[G,G,G]]
		invert();
	}
	function makeTestMap3(){
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		globalx = 3;
		globaly = 3;
		globalMap = [
		[S,S,S],
		[M,S,S],
		[G,G,G]]
		invert();
	}
	
	//@test
	function testMoveRight1(){
		makeTestMap1();
		moveForward();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,S,G],
		[S,M,G]],"MoveR does not work on test map 1");
		
	}
	
	//@test
	function testMoveRight2(){
		makeTestMap2();
		moveForward();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,S,G],
		[S,M,G]],"MoveR does not work on test map 2");
	}
	
	//@test
	function testMoveLeft1(){
		makeTestMap1();
		moveBack();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,M,G],
		[S,S,G],
		[S,S,G]],"MoveL does not work on test map 1");
	}
	
	//@test
	function testMoveLeft2(){
		makeTestMap3();
		moveBack();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,M,G],
		[S,S,G],
		[S,S,G]],"MoveL does not work on test map 3");
	}
	
	//@test
	function testJumpRight1(){
		makeTestMap1();
		jumpFoward();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,S,G],
		[M,S,G]],"jumpR does not work on test map 1");
	}
	
	//@test
	function testJumpRight2(){
		makeTestMap2();
		jumpFoward();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,S,G],
		[S,M,G]],"jumpR does not work on test map 2");
	}
	
	//@test
	function testJumpLeft1(){
		makeTestMap1();
		jumpBack();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[M,S,G],
		[S,S,G],
		[S,S,G]],"jumpL does not work on test map 1");
	}
	
	//@test
	function testJumpLeft2(){
		makeTestMap3();
		jumpBack();
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,M,G],
		[S,S,G],
		[S,S,G]],"jumpL does not work on test map 3");
	}
	
	//@helper
	function makeTestMap4(){
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		globalx = 3;
		globaly = 3;
		globalMap = [
		[S,M,S],
		[S,S,S],
		[G,G,G]]
		invert();
	}
	
	//@helper
	function makeTestProgram1(){
		document.getElementById("program").value = "";
		globalpc = 0;
	}
	
	//@test
	function testStep1(){
		makeTestMap4();
		makeTestProgram1();
		assertTrue(step(), "Step incorrectly thinks it is on end of program on test map4");
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,M,G],
		[S,S,G]],"Step does fall correctly on test map 4");
	}
	
	//@test
	function testStep2(){
		makeTestMap4();
		makeTestProgram1();
		assertTrue(step(), "Step incorrectly thinks it is on end of program on test map4");
		assertFalse(step(), "Step incorrectly thinks it is not on end of program on test map4");
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,M,G],
		[S,S,G]],"Step does fall correctly on test map 4");
	}
	
	//@helper
	function makeTestProgram2(){
		document.getElementById("program").value = "moveR";
		globalpc = 0;
	}
	
	//@test
	function testStep2(){
		makeTestMap1();
		makeTestProgram2();
		assertFalse(step(), "Step incorrectly thinks it is not on end of program on test map4");
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,S,G],
		[S,M,G]],"MoveR does not work on test map 1");
	}
	
	
	//@test
	function testRun1(){
		makeTestMap4();
		assertFalse(run([],0), "run incorrectly took an action on test map4");
		var S = undefined;
		var G = "ground";
		var F = "finish";
		var M = "man";
		assertEquals(globalMap,[
		[S,S,G],
		[S,M,G],
		[S,S,G]],"Step does fall correctly on test map 4");
	}
	
	
	
	
	
	testMapGeneration1();
	console.log("test 1 complete");
	testMapGeneration2();
	console.log("test 2 complete end of map generation");
	
	testMoveRight1();
	console.log("test 3 complete");
	testMoveRight2();
	console.log("test 4 complete");
	testMoveLeft1();
	console.log("test 5 complete");
	testMoveLeft2();
	console.log("test 6 complete");
	testJumpRight1();
	console.log("test 7 complete");
	testJumpRight2();
	console.log("test 8 complete");
	testJumpLeft1();
	console.log("test 9 complete");
	testJumpLeft2();
	console.log("test 10 complete end of movement testing");
	
	testRun1();
	console.log("test 11 complete");
	testStep1();
	console.log("test 12 complete");
	testStep2();
	console.log("test 12 complete finished program testing");
	
}