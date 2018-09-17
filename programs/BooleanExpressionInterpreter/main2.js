function main2(){
var file = document.getElementById("file").value;
var output = document.getElementById("output");

var functionStack = [];

var lex = {
	type: "",
	data: "",
	stack: [],
	
	programPointer: 0,
	get: function(){},
	pop: function(){},
	push: function(){},
};

lex.pop = function(){
	return lex.stack.pop();
}

lex.push = function(data){
	lex.stack.push(data);
	//javascript...
}

lex.get = function(){
	//update file data
	file = document.getElementById("file").value;
	
	setData();
	setType();
};

function setData(){
	//data becomes old type
	lex.data = lex.type;
}

function setType(){
	if (lex.programPointer >= file.length){
		lex.type = "$";
	}else{
		if(file[lex.programPointer] == "-"){ //cheak if start of a -> token
			if(file[lex.programPointer + 1] == ">"){ //cheak end of -> token
				lex.type = "->";
			}else{
				alert("expected > at character: " + (lex.programPointer + 1) + " found: " + file[lex.programPointer + 1]);
				lex.type = "error";
			}
			lex.programPointer += 2; //because this token is two chars long
		}else if("TF^v~().".includes(file[lex.programPointer])){//trys to find if char is in language
			lex.type = file[lex.programPointer];
			lex.programPointer += 1;
		}else{
			//found char that is not in language, recursively trys again on next char in file
			lex.programPointer += 1;
			setType();
		}
	}
}



function resetVars(){
	document.getElementById("output").value = "output";
	file = document.getElementById("file").value;
	lex.programPointer = 0;
	lex.data = "";
	lex.stack = [];
	setType(); //set type to first token in file
	
	functionStack = [];
}


async function main(){
	await resetVars();
	
	var i = ""; //temp
	
	//render();
	if(await B()){
		await render("-1");
		output.value = lex.pop();
	}
}

async function B(){
	
	alert("start");
	await render("B");
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(await IT()){
			await render("-1");
			if (lex.type == ".")
				return true;
			else
			{
				alert("expected end of file got: " + lex.type);
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("in B expected {~,T,F,(} got: " + lex.type);
		return false;
	}
}

function imply(bool1,bool2){
	if(bool1 == "F" && bool2 == "T")
		return "F";
	else
		return "T";
}

function or(bool1,bool2){
	if(bool1 == "T" || bool2 == "T")
		return "T";
	else
		return "F";
}

function and(bool1,bool2){
	if(bool1 == "T" && bool2 == "T")
		return "T";
	else
		return "F";
}

function not(bool){
	//alert(bool);	 
	if(bool == "T")
		return "F";
	else
		return "T";
}

async function IT(){
	await render("IT");
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(await OT()){
			await render("-1");
			if(await IT_TAIL()){
				await render("-1");
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("in it expected {~,T,F,(} got: " + lex.type);
		return false;
	}
}

async function IT_TAIL(){
	await render("IT_TAIL");
	if(lex.type == "->"){
		await lex.get();
		if(await IT()){
			await lex.push(imply(lex.pop(),lex.pop()));
			await render("-1");
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set?
	}
}

async function OT(){
	await render("OT");
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(await AT()){
			await render("-1");
			if(await OT_TAIL()){
				await render("-1");
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("in ot expected {~,T,F,(} got: " + lex.type);
		return false;
	}
}

async function OT_TAIL(){
	await render("OT_TAIL");
	if(lex.type == "v"){
		await lex.get();
		if(await OT()){
			await lex.push(or(lex.pop(),lex.pop()));
			await render("-1");
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set?
	}
}

async function AT(){
	await render("AT");
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(await L()){
			await render("-1");
			if(await AT_TAIL()){
				await render("-1");
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("in at expected {~,T,F,(} got: " + lex.type);
		return false;
	}
}

async function AT_TAIL(){
	await render("AT_TAIL");
	if(lex.type == "^"){
		await lex.get();
		if(await AT()){
			await lex.push(and(lex.pop(),lex.pop()));
			await render("-1");
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set?
	}
}



async function L(){
	await render("L");
	if(lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(await A()){
			await render("-1");
			return true;
		}else
			return false;
	}else if (lex.type == "~"){
		await lex.get();
		if(await L()){
			await lex.push(not(lex.pop())); //inverts top of stack
			await render("-1");
			return true;
		}else{
			return false;
		}
	}else{
		alert("in L expected {T,F,~,(} got: " + lex.type);
	}
}

async function A(){
	await render("A");
	if(lex.type == "T" || lex.type == "F"){
		await lex.get();
		await lex.push(lex.data);
		return true;
	}else if(lex.type == "("){
		await lex.get()
		if(await IT()){
			await render("-1");
			if(lex.type == ")"){
				await lex.get()
				return true;
			}else{
				alert("expected {(} got: " + lex.type);
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("in A expected {T,F,(} got: " + lex.type);
		return false;
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function render(locations){
	if(locations == "-1")
		functionStack.pop();
	else
		functionStack.push(locations);
	
	i = "";
	input = document.getElementById("file");
	input.setSelectionRange(lex.programPointer - 1, lex.programPointer);
	input.focus();
	
	for (var x = 0; x < lex.stack.length; x++){
		i += lex.stack[x] + ", ";
	}
	
	
	document.getElementById("stack").innerHTML = "Function Stack:<br/>" + stack(0) + "<br/>Stack:<br/>" +  i;
	await sleep(600);
}


function stack(i){
	if(i >= functionStack.length)
		return "";
	return functionStack[i] + "(" + stack(i + 1) + ")";
}
main();
}