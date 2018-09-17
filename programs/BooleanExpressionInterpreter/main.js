//louis joseck
var file = document.getElementById("file").value;
var output = document.getElementById("output");

var lex = {//global lex structure
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



function resetVars(){ //sets lex and file to initial values
	file = document.getElementById("file").value;
	lex.programPointer = 0;
	lex.data = "";
	lex.stack = [];
	setType(); //set type to first token in file
}


function main(){
	resetVars(); //sets lex and file to initial values
	
	if(B()){
		output.value = lex.pop();
	}
}

function B(){
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(IT()){
			if (lex.type == ".")
				return true;
			else
			{
				alert("expected . got: " + lex.type);
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("expected ~,T,F,( got: " + lex.type);
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
	if(bool == "T")
		return "F";
	else
		return "T";
}

function IT(){
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(OT()){
			if(IT_TAIL()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("expected ~,T,F,( got: " + lex.type);
		return false;
	}
}

function IT_TAIL(){
	if(lex.type == "->"){
		lex.get();
		if(IT()){
			lex.push(imply(lex.pop(),lex.pop()));//take top two on stack push (imply) of both
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set
	}
}

function OT(){
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(AT()){
			if(OT_TAIL()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("expected ~,T,F,( got: " + lex.type);
		return false;
	}
}

function OT_TAIL(){
	if(lex.type == "v"){
		lex.get();
		if(OT()){
			lex.push(or(lex.pop(),lex.pop()));//take top two on stack push (or) of both
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set
	}
}

function AT(){
	if(lex.type == "~" || lex.type == "T" || lex.type == "F" || lex.type == "("){
		if(L()){
			if(AT_TAIL()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("expected ~,T,F,( got: " + lex.type);
		return false;
	}
}

function AT_TAIL(){
	if(lex.type == "^"){
		lex.get();
		if(AT()){
			lex.push(and(lex.pop(),lex.pop())); //take top two on stack push (and) of both
			return true;
		}else{
			return false;
		}
	}else{
		return true; //empty set
	}
}



function L(){
	if(lex.type == "T" || lex.type == "F" || lex.type == "("){
		return A();
	}else if (lex.type == "~"){
		lex.get();
		if(L()){
			lex.push(not(lex.pop())); //inverts top of stack
			return true;
		}else{
			return false;
		}
	}else{
		alert("expected T,F,~,( got: " + lex.type);
	}
}

function A(){
	if(lex.type == "T" || lex.type == "F"){
		lex.get();
		lex.push(lex.data);
		return true;
	}else if(lex.type == "("){
		lex.get()
		if(IT()){
			if(lex.type == ")"){
				lex.get()
				return true;
			}else{
				alert("expected ( got: " + lex.type);
				return false;
			}
		}else{
			return false;
		}
	}else{
		alert("expected T,F,( got: " + lex.type);
		return false
	}
}