class Board {
    constructor(){
        this.pieces = [];
        // this.add(new Piece("KingW", 4, 8));
        // this.add(new Piece("KingB", 4, 1));
        // this.add(new Piece("QueenW", 3, 8));
        // this.add(new Piece("QueenB", 3, 1));

        this.import('{"startX":0,"startY":0,"endX":-1,"endY":-1,"pieces":[{"name":"RookB","x":1,"y":-8},{"name":"PawnB","x":1,"y":-7},{"name":"PawnW","x":1,"y":-2},{"name":"RookW","x":1,"y":-1},{"name":"KnightB","x":2,"y":-8},{"name":"PawnB","x":2,"y":-7},{"name":"PawnW","x":2,"y":-2},{"name":"KnightW","x":2,"y":-1},{"name":"BishopB","x":3,"y":-8},{"name":"PawnB","x":3,"y":-7},{"name":"PawnW","x":3,"y":-2},{"name":"BishopW","x":3,"y":-1},{"name":"QueenB","x":4,"y":-8},{"name":"PawnB","x":4,"y":-7},{"name":"PawnW","x":4,"y":-2},{"name":"QueenW","x":4,"y":-1},{"name":"KingB","x":5,"y":-8},{"name":"PawnB","x":5,"y":-7},{"name":"PawnW","x":5,"y":-2},{"name":"KingW","x":5,"y":-1},{"name":"BishopB","x":6,"y":-8},{"name":"PawnB","x":6,"y":-7},{"name":"PawnW","x":6,"y":-2},{"name":"BishopW","x":6,"y":-1},{"name":"KnightB","x":7,"y":-8},{"name":"PawnB","x":7,"y":-7},{"name":"PawnW","x":7,"y":-2},{"name":"KnightW","x":7,"y":-1},{"name":"RookB","x":8,"y":-8},{"name":"PawnB","x":8,"y":-7},{"name":"PawnW","x":8,"y":-2},{"name":"RookW","x":8,"y":-1}]}',0 , 0)
        main.selection = {x1:undefined, y1:undefined, x2:undefined, y2:undefined};
    }

    add(newPiece, remove = true) {
        let from = 0;
        let to = this.pieces.length;
        let item;
      
        // check if the array is empty
        if (to === 0) {
          this.pieces.push(newPiece);
          return true;
        }
      
        // compare with the first item
        item = this.pieces[0];
        if (newPiece.x == item.x && newPiece.y == item.y) {
            if(item.name == newPiece.name && remove){
                // remove when adding to exsisting
                this.pieces.splice(0, 1);
                return false;
            } else {
                this.pieces[0] = newPiece;
                return true;
            }
            return 0;
        }
        if (newPiece.x < item.x || (newPiece.x == item.x && newPiece.y < item.y)) {
          this.pieces.splice(0, 0, newPiece);
          return true;
        }
      
        // compare with the last item
        item = this.pieces[to-1];
        if (newPiece.x == item.x && newPiece.y == item.y) {
            if(item.name == newPiece.name && remove){
                // remove when adding to exsisting
                this.pieces.splice(to-1, 1);
                return false
            } else {
                this.pieces[to-1] = newPiece;
                return true;
            }
        }
        if (newPiece.x > item.x || (newPiece.x == item.x && newPiece.y > item.y)) {
          this.pieces.push(newPiece);
          return true;
        }
      
        // binary search
        let where;
        for (;;) {
          where = (from + to) >> 1;
          if (from >= to) {
            break;
          }
      
          item = this.pieces[where];
          if (newPiece.x == item.x && newPiece.y == item.y) {
            if(item.name == newPiece.name && remove){
                // remove when adding to exsisting
                this.pieces.splice(where, 1);
                return false;
            } else {
                this.pieces[where] = newPiece;
                return true;
            }
          }
          if (item.x < newPiece.x || (item.x == newPiece.x && item.y < newPiece.y)) {
            from = where + 1;
          }
          else {
            to = where;
          }
        }
      
        // insert newPiece
        this.pieces.splice(where, 0, newPiece);
        return true;
      }

    remove(x, y){
        console.log("removing at " + x + " " + y);
		for(let i in this.pieces){
            let p = this.pieces[i];
            if(p.x == x && p.y == y){
                this.pieces.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    print(x1, y1, x2, y2){
        let startY = Math.min(y1, y2);
        let endY = Math.max(y1, y2);
        let startX = Math.min(x1, x2);
        let endX = Math.max(x1, x2);

        let clipboard = {startX:startX, startY:startY, endX:endX, endY:endY, pieces:[]};

		for(let i in this.pieces){
            let p = this.pieces[i];
            if(p.x <= endX && p.x >= startX && p.y <= endY && p.y >= startY){
                clipboard.pieces.push(this.pieces[i]);
            }
        }
        return JSON.stringify(clipboard);
    }

    printAll(){
        let clipboard = {startX:0, startY:0, endX:-1, endY:-1, pieces:[]};

		for(let i in this.pieces){
            let p = this.pieces[i];
            clipboard.pieces.push(this.pieces[i]);
        }
        return JSON.stringify(clipboard);
    }

    import(clipboardString, x, y){
        let clipboard = JSON.parse(clipboardString);
        this.clearSelection(x, y, x + clipboard.endX - clipboard.startX, y + clipboard.endY - clipboard.startY);

		for(let i in clipboard.pieces){
            let p = clipboard.pieces[i];
            p.x += x - clipboard.startX;
            p.y += y - clipboard.startY;
            this.add(p);
        }
        main.selection.x1 = x;
        main.selection.x2 = x + clipboard.endX - clipboard.startX;
        main.selection.y1 = y;
        main.selection.y2 = y + clipboard.endY - clipboard.startY;
    }

    clear(){
        this.pieces = [];
    }

    clearSelection(x1, y1, x2, y2){
        let startY = Math.min(y1, y2);
        let endY = Math.max(y1, y2);
        let startX = Math.min(x1, x2);
        let endX = Math.max(x1, x2);
        for(let j = startY; j <= endY; j++){
            for(let i = startX; i <= endX; i++){
                this.remove(i, j);
            }
        }
    }

    getPiece(x, y, start = 0, end = this.pieces.length - 1){
        if (start > end) return null;

        let mid=Math.floor((start + end)/2);

        // Compare mid with given key x
        if (this.pieces[mid].x == x && this.pieces[mid].y == y) return this.pieces[mid];
            
        // If element at mid is greater than x,
        // search in the left half of mid
        if(this.pieces[mid].x > x || (this.pieces[mid].x == x && this.pieces[mid].y > y))
            return this.getPiece(x, y, start, mid-1);
        else
 
        // If element at mid is smaller than x,
        // search in the right half of mid
        return this.getPiece(x, y, mid+1, end);
    }

    getPiecesHorizontal(x){
        let pieces = [];
        let found = false;
		for(let i in this.pieces){
            let p = this.pieces[i];
            if(p.x == x){
                pieces.push(p);
                found = true;
            } else if (found){
                break;
            }
        }
        return pieces;
    }

    getPiecesVertical(y){
        let pieces = [];
		for(let i in this.pieces){
            let p = this.pieces[i];
            if(p.y == y){
                pieces.push(p);
            }
        }
        return pieces;
    }

    getPiecesRisingDiagonal(x, y){
        let pieces = [];
		for(let i in this.pieces){
            let p = this.pieces[i];
            if(p.y == y){
                pieces.push(p);
            }
        }
        return pieces;
    }

    // returns list of all valid moves of a piece in a set region
    validMoves(pieceX, pieceY, x1, y1, x2, y2){
        let p = this.getPiece(pieceX, pieceY);
        console.log(p);
    }
}

class Piece {
    //Json object -- no functions
    constructor(name, x, y){
        this.name = name;
        this.x = x;
        this.y = y;
    }
}