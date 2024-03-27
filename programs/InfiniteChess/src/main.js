class Main {
    constructor(){
		main = this;
		this.canvas = document.getElementById("mainCanvas");
		this.canvasDiv = document.getElementById("mainCanvasDiv")
		this.context = this.canvas.getContext("2d");

        this.dimension = 8;
        this.dark = "#B58863";
        this.light = "#F0D9B5";
        
		this.selectedDark = "#5670D8";
		this.selectedLight = "#6684FF";

        this.zoomLevel = 64; // Width of squares; High zoom level is zoomed in

        this.translateX = -7.5; // in fractions of squares
        this.translateY = -10.5;

        this.action = -1;
        this.tool = "put,PawnW";
        this.tool = "pointer";

        this.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};

        this.selected = null;

        this.panX = 0;
        this.panY = 0;

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseXAbsolute = 0;
        this.mouseYAbsolute = 0;

	    this.flipped = false;
		this.fps = 0;

        this.board = new Board();
        this.toolBar = new ToolBar();
        this.HelperRandom = new HelperRandom();

        window.onload = startUp;

        function startUp(){
        
            // window.addEventListener("resize", function(){main.resize()});
            window.addEventListener("mousedown", main.handelMouseDown);
            window.addEventListener("mouseup", main.handelMouseUp);
            window.addEventListener("mousemove", main.handelMouseMove);
            window.addEventListener("mousewheel", main.handelMouseWheel);
            window.addEventListener("keydown", main.handleKeyDown);
            document.addEventListener("paste", main.handlePaste);
            main.resize();
            main.main();
        }

    }
    
	resize(){
        this.canvas.width = this.canvasDiv.offsetWidth;
        this.canvas.height = this.canvasDiv.offsetHeight;
    }

	async main(){
        let frameTimes = [];
        let frameTime = 0;
        let drawTimeMax = 0;

        // game.init();

        while(true){
            let fast = false;
            let start = performance.now();

            this.gameLoop();
            await this.sleepForAnimation();
            frameTime = performance.now() - start;
            if(frameTime > drawTimeMax){
                drawTimeMax = frameTime;
            }
            frameTimes.push(frameTime);
            if(frameTimes.length > 60){
                frameTimes.shift()
            }
            this.fps = frameTimes.length/frameTimes.reduce((a, b) =>  a + b)*1000;
        }
	}

    gameLoop(){
        this.clearCanvas();
        this.draw();
    }

	clearCanvas(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

    draw(){
        this.resize();
        this.drawBoardBackGround();
        this.drawBoard();
        this.toolBar.draw(this.context);
    }

    drawBoardBackGround(){

        let startX = Math.floor(this.translateX);
        let startY = Math.floor(this.translateY);
        let endX = startX + Math.ceil(this.canvas.width / this.zoomLevel);
        let endY = startY + Math.ceil(this.canvas.height / this.zoomLevel);
        let lightSquare = false;
        let selected = false;
        for(let i = startX; i <= endX; i++){
            for(let j = startY; j <= endY; j++){
                lightSquare = (i + j)% 2 != this.flipped;
                selected = this.inSelection(i, j) || this.selected && this.selected.x == i && this.selected.y == j;
                if(lightSquare){
                    if(selected){
						this.context.fillStyle = this.selectedLight;
                    } else {
						this.context.fillStyle = this.light;
                    }
                } else {
                    if(selected){
						this.context.fillStyle = this.selectedDark
                    } else {
						this.context.fillStyle = this.dark;
                    }
                }
                this.context.fillRect((i - this.translateX) * this.zoomLevel, (j - this.translateY) * this.zoomLevel, this.zoomLevel, this.zoomLevel);
                if(this.zoomLevel >= 30){

                    

                    let fontHeight = Math.max(14, Math.ceil(this.zoomLevel / 6));

                    this.context.font = fontHeight + "px Arial";
                    if(i == 1 || (startX > 1 && i == startX + 1) || (endX < 1 && i == endX - 2)){
                        if(lightSquare){
                            if(this.mouseY == j){
                                this.context.fillStyle = this.selectedDark
                            } else {
                                this.context.fillStyle = this.dark;
                            }
                        } else {
                            if(this.mouseY == j){
                                this.context.fillStyle = this.selectedLight;
                            } else {
                                this.context.fillStyle = this.light;
                            }
                        }
                        this.context.fillText(-j, Math.floor((i - this.translateX + 0) * this.zoomLevel), (j - this.translateY) * this.zoomLevel + fontHeight);
                    }
                    if(j == -1 || (startY > -1 && j == startY + 1) || (endY < 0 && j == endY - 2)){
                        if(lightSquare){
                            if(this.mouseX == i){
                                this.context.fillStyle = this.selectedDark
                            } else {
                                this.context.fillStyle = this.dark;
                            }
                        } else {
                            if(this.mouseX == i){
                                this.context.fillStyle = this.selectedLight;
                            } else {
                                this.context.fillStyle = this.light;
                            }
                        }
                        this.context.fillText(this.translate(i), (i - this.translateX) * this.zoomLevel, Math.floor((j - this.translateY + .95) * this.zoomLevel));
                    }
                }
            }
        }
    }

    translate(i){
        if(i == 0){
            return "0";
        }
        if(i < 0){
            return "-" + this.translate(-i);
        }
        if(Math.floor((i - 1)/26) >= 1){
            return this.translate(Math.floor((i - 1)/26)) + String.fromCharCode(97 + ((i - 1) % 26));
        } else {
            return String.fromCharCode(97 + ((i - 1) % 26));
        }
        
    }

    inSelection(x, y){
        let startX = Math.min(this.selection.x1, this.selection.x2);
        let endX = Math.max(this.selection.x1, this.selection.x2);
        let startY = Math.min(this.selection.y1, this.selection.y2);
        let endY = Math.max(this.selection.y1, this.selection.y2);

        return x >= startX && x <= endX && y >= startY && y <= endY;
    }

    drawBoard(){
        let startX = Math.floor(this.translateX);
        let startY = Math.floor(this.translateY);
        let endX = startX + Math.ceil(this.canvas.width / this.zoomLevel);
        let endY = startY + Math.ceil(this.canvas.height / this.zoomLevel);
		for(let i in this.board.pieces){
            let p = this.board.pieces[i];
            if(p.x >= this.translateX - 1 && p.y >= this.translateY - 1 && p.x <= endX && p.y <= endY){
                let img = document.getElementById(p.name);
                this.context.drawImage(img, (p.x - this.translateX) * this.zoomLevel, (p.y - this.translateY) * this.zoomLevel, this.zoomLevel, this.zoomLevel);
            }
        }
        // for(let i = startX; i <= endX; i++){
        //     for(let j = startY; j <= endY; j++){
        //         let pieces = ["BishopB", "KingB", "KnightB", "PawnB", "QueenB", "RookB", "BishopW", "KingW", "KnightW", "PawnW", "QueenW", "RookW"]
                
        //         let img = document.getElementById(pieces[Math.floor(this.HelperRandom.randomHash(i, j) * pieces.length)]);
        //         this.context.drawImage(img, (i - this.translateX) * this.zoomLevel, (j - this.translateY) * this.zoomLevel, this.zoomLevel, this.zoomLevel);

        //     }
        // }

    }

	sleepForAnimation(){ 
        return new Promise(requestAnimationFrame); 
    }

	correctMod(a, b){
		return ((a % b) + b) % b;
	}

    handelMouseDown(event){
        main.action = event.button;
        if(main.action == 1){
            main.panX = (event.clientX - main.canvas.offsetLeft);
            main.panY = (event.clientY - main.canvas.offsetTop);
        } else if(main.action == 0){
            if(main.toolBar.clicked((event.clientX - main.canvas.offsetLeft), (event.clientY - main.canvas.offsetTop))){
                main.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};
                main.selected = null;
                let newTool = main.toolBar.onPress((event.clientX - main.canvas.offsetLeft), (event.clientY - main.canvas.offsetTop));
                if(newTool == "save"){
                    main.saveBoard();
                    if(main.tool == "select"){
                        main.tool = "pointer";
                    }
                } else if(newTool == "upload") {
                    main.loadBoard();
                    main.tool = "pointer";
                } else if(newTool){
                    main.tool = newTool;
                }
            } else {
                let clickedX = Math.floor((event.clientX - main.canvas.offsetLeft) / main.zoomLevel + main.translateX);
                let clickedY = Math.floor((event.clientY - main.canvas.offsetTop) / main.zoomLevel + main.translateY);
                main.onClickDownBoard(clickedX, clickedY);
            }
        }
    }

    onClickDownBoard(x, y){
        if(this.tool.slice(0, 3) == "put"){
            this.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};
            // put,PawnW
            this.adding = this.board.add(new Piece(this.tool.split(",")[1], x, y));
        } else if(this.tool == "erase") {
            this.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};
            this.board.remove(x, y);
        } else if(this.tool == "select"){
            this.selected = null;
            this.selection.x1 = x;
            this.selection.y1 = y;
            this.selection.x2 = x;
            this.selection.y2 = y;
        } else if(this.tool == "pointer"){
            this.selected = this.board.getPiece(x, y);
        }
    }

    onMouseMove(x, y){
        if(this.tool.slice(0, 3) == "put" && this.adding){
            // put,PawnW
            this.adding = this.board.add(new Piece(this.tool.split(",")[1], x, y), false);
        } else if((this.tool.slice(0, 3) == "put" && !this.adding) || this.tool == "erase") {
            this.board.remove(x, y);
        } else if(this.tool == "select"){
            this.selection.x2 = x;
            this.selection.y2 = y;
        }
    }

    onMouseUp(x, y){
        if(this.tool == "select"){
            this.selection.x2 = x;
            this.selection.y2 = y;
            console.log(this.printSelection())
        }
    }

    printSelection(){
        return this.board.print(this.selection.x1, this.selection.y1, this.selection.x2, this.selection.y2);
    }

    clearSelection(){
        this.board.clearSelection(this.selection.x1, this.selection.y1, this.selection.x2, this.selection.y2)
    }

    onPaste(pastedText, x, y){
        this.board.import(pastedText, x, y)
    }

    handelMouseUp(event){
        main.action = event.button;
        if(main.action == 0){
            main.mouseX = Math.floor((event.clientX - main.canvas.offsetLeft) / main.zoomLevel + main.translateX);
            main.mouseY = Math.floor((event.clientY - main.canvas.offsetTop) / main.zoomLevel + main.translateY);
            main.onMouseUp(main.mouseX, main.mouseY);
        }
        main.action = -1;
        
    }
    
    handelMouseMove(event){
        if(main.toolBar.clicked((event.clientX - main.canvas.offsetLeft), (event.clientY - main.canvas.offsetTop))){
            // do nothing on toolbar
            return;
        }
        main.mouseXAbsolute = (event.clientX - main.canvas.offsetLeft);
        main.mouseYAbsolute = (event.clientY - main.canvas.offsetTop);
        main.mouseX = Math.floor((event.clientX - main.canvas.offsetLeft) / main.zoomLevel + main.translateX);
        main.mouseY = Math.floor((event.clientY - main.canvas.offsetTop) / main.zoomLevel + main.translateY);
        if(main.action == 1 && ((event.clientX - main.canvas.offsetLeft) || (event.clientY - main.canvas.offsetTop))){
            // Pan board

            let deltaX = main.panX - (event.clientX - main.canvas.offsetLeft);
            let deltaY = main.panY - (event.clientY - main.canvas.offsetTop);

            main.translateX += deltaX / main.zoomLevel;
            main.translateY += deltaY / main.zoomLevel;

            main.panX = (event.clientX - main.canvas.offsetLeft);
            main.panY = (event.clientY - main.canvas.offsetTop);
        } else if(main.action == 0){
            main.onMouseMove(main.mouseX, main.mouseY);
        }
    }

    handelMouseWheel(event){
        let scrollFactor = 1+1/16;
        let startX = (event.clientX - main.canvas.offsetLeft) / main.zoomLevel;
        let startY = (event.clientY - main.canvas.offsetTop) / main.zoomLevel;
        if(event.deltaY > 0){
            main.zoomLevel = Math.max(Math.floor(main.zoomLevel / scrollFactor), 10);
        } else if(event.deltaY < 0){
            main.zoomLevel = Math.min(Math.ceil(main.zoomLevel * scrollFactor), 316);
        }
        let endX = (event.clientX - main.canvas.offsetLeft) / main.zoomLevel;
        let endY = (event.clientY - main.canvas.offsetTop) / main.zoomLevel;
        
        main.translateX += startX - endX;
        main.translateY += startY - endY;
    }

    handleKeyDown(event){
        if(event.key == 'c' && event.ctrlKey) {
            navigator.clipboard.writeText(main.printSelection());
            event.preventDefault(); // prevent from copying
        } else if(event.key == 'v' && event.ctrlKey) {
            console.log("here");
            // main.handlePaste(event);
            // event.preventDefault(); // prevent from pasting
        } else if(event.key == 's' && event.ctrlKey) {
            event.preventDefault(); // prevent from saving html
            main.saveBoard();
        } else if(event.key == 's') {
            main.tool = "select"
        } else if(event.key == 'e') {
            main.tool = "erase"
        } else if(event.key == '!' && event.shiftKey) {
            main.tool = "put,KingB"
        } else if(event.key == '@' && event.shiftKey) {
            main.tool = "put,QueenB"
        } else if(event.key == '#' && event.shiftKey) {
            main.tool = "put,RookB"
        } else if(event.key == '$' && event.shiftKey) {
            main.tool = "put,BishopB"
        } else if(event.key == '%' && event.shiftKey) {
            main.tool = "put,KnightB"
        } else if(event.key == '^' && event.shiftKey) {
            main.tool = "put,PawnB"
        } else if(event.key == '1') {
            main.tool = "put,KingW"
        } else if(event.key == '2') {
            main.tool = "put,QueenW"
        } else if(event.key == '3') {
            main.tool = "put,RookW"
        } else if(event.key == '4') {
            main.tool = "put,BishopW"
        } else if(event.key == '5') {
            main.tool = "put,KnightW"
        } else if(event.key == '6') {
            main.tool = "put,PawnW"
        } else if(event.key == "Backspace" || event.key == "Delete"){
            main.clearSelection();
        } else if(event.key == "Escape"){
            main.tool = "pointer";
        }
    }

    saveBoard(){
        let text = this.board.printAll();
        let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "infinite_chess.txt");
    }

    loadBoard(){
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.onchange = (e => { 
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
    
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                let content = readerEvent.target.result; // this is the content!
                main.board.clear();
                main.board.import(content, 0, 0);
                main.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};
            }
        })
        input.click();
    }

    handlePaste(event){
        console.log("here")
        // main.mouseX = Math.floor((event.clientX - main.canvas.offsetLeft) / main.zoomLevel + main.translateX);
        // main.mouseY = Math.floor((event.clientY - main.canvas.offsetTop) / main.zoomLevel + main.translateY);
        let pastedText = undefined;
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else if (event.clipboardData && event.clipboardData.getData) {
            pastedText = event.clipboardData.getData('text/plain');
        }
        // alert(pastedText);
		if(Number.isInteger(main.mouseX) && Number.isInteger(main.mouseY)){
            main.onPaste(pastedText, main.mouseX, main.mouseY);
        } else {
            console.log("failed");
        }
    }
}


var main = new Main();