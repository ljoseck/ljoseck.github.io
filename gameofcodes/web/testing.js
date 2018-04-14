var testing = true;
//import org.junit.*;
//import static org.junit.Assert.*; This is not for Javascript I made my own
if(testing){
	function fail(message){
		if(message != "")
			console.log("This Test Failed");
		else
			console.log(message);
			
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
		if(x != y){
			fail(message);
		}
	}
	function assertNotSame(x, y, message = ""){
		if(x == y){
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

}