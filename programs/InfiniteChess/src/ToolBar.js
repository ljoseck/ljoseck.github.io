class ToolBar {
    constructor(){
        this.height = 152;
        this.topLeftX = 0;
        this.whites = ["KingW", "QueenW", "RookW", "BishopW", "KnightW", "PawnW", "KnookW", "pointer", "select", "erase"];
        this.width = 64*this.whites.length + 16;
        this.blacks = ["KingB", "QueenB", "RookB", "BishopB", "KnightB", "PawnB", "KnookB", "save", "upload"];
    }


    draw(context){
        let tool;
        if (main.tool.slice(0, 3) == "put"){
            tool = main.tool.split(",")[1]
        } else {
            tool = main.tool;
        }
        
        this.topLeftX = Math.floor(main.canvas.width / 2 - this.width / 2);
        context.fillStyle = "#939393";
        context.fillRect(this.topLeftX, 0, this.width, this.height);
        for(let i in this.whites){
            let pieceName = this.whites[i]
            let img = document.getElementById(pieceName);
            let x = 8 + this.topLeftX + i * 64;
            let y = 8;
            if(tool == pieceName || main.mouseXAbsolute > x && main.mouseXAbsolute < x + 64 && main.mouseYAbsolute > y && main.mouseYAbsolute < y + 64){
                context.fillStyle = main.selectedLight;
            } else {
                context.fillStyle = main.light;
            }
            context.fillRect(x, y, 64, 64);
            context.drawImage(img, x, y, 64, 64);
        }
        for(let i in this.blacks){
            let pieceName = this.blacks[i]
            let img = document.getElementById(pieceName);
            let x = 8 + this.topLeftX + i * 64;
            let y = 16 + 64;
            if(tool == pieceName || main.mouseXAbsolute > x && main.mouseXAbsolute < x + 64 && main.mouseYAbsolute > y && main.mouseYAbsolute < y + 64){
                context.fillStyle = main.selectedLight;
            } else {
                context.fillStyle = main.light;
            }
            context.fillRect(x, y, 64, 64);
            context.drawImage(img, x, y, 64, 64);
        }

    }

    clicked(x, y){
        return x >= this.topLeftX && x < this.topLeftX + this.width && y >= 0 && y < this.height;
    }

    // return tool needed
    onPress(x, y){
        let pieceStartX = 8 + this.topLeftX;
        if(y > 8 && y < 8 + 64){
            let pieceName = this.whites[Math.floor((x - pieceStartX) / 64)];
            if(pieceName){
                if(Math.floor((x - pieceStartX) / 64) > 6){
                    // not a piece
                    return pieceName;
                }
                return "put," + pieceName;
            }
        }
        if(y > 16 + 64 && y < 16 + 128){
            let pieceName = this.blacks[Math.floor((x - pieceStartX) / 64)];
            if(pieceName){
                if(Math.floor((x - pieceStartX) / 64) > 6){
                    // not a piece
                    return pieceName;
                }
                return "put," + pieceName;
            }
        }
        return false;
    }
}