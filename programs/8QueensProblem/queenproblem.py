
def main():
    for x in range(90):
        print(str(x) + " by " + str(x) + " board")
        printqueen(x,x)

def printqueen(size = 8,queens = 8):
    tuple = queen([],size,queens)
    if tuple[1]:
        temp = ""
        for x in tuple[0]:
            for y in x:
                if y == 1:
                    temp += "Q "
                else:
                    temp += ". "
            temp += "\n"
        print(temp)
    else:
        print("No soulution?")


def queen(board = [],size = 8,queens = 8): #returns tuple of (board, solution)
    #print(queens)
    if queens <= 0:
        return (board,True)
    
    if board == []:
        for x in range(size):
            temp = []
            for y in range(size):
                temp.append(0)
                
            board.append(temp)

            
    tuple = (board, False)
    
    for x in range(size):
        for y in range(size):
            if board[x][y] == 0:
                newboard = setnewboard(board,x,y)
                newtuple = queen(newboard,size,queens-1)
                if queens >= 6 and False:
                    print("tryed on: " + str(x) + " " + str(y) + " for "
                          + str(queens) + " queens " + str(newtuple[1]))
                if newtuple[1]:
                    return newtuple
        if size == queens + x:
            return tuple



    
    return tuple

def setnewboard(board,x,y): #returns new board
    newboard = []
    for xcopy in board:
        newrow = []
        for ycopy in xcopy:
            newrow.append(ycopy)
        newboard.append(newrow)

    for new in range(len(board)):
        newboard[x][new] = -1
        newboard[new][y] = -1
    temp = len(board) * -1
    #print(temp)
    while temp <= len(board): 
        if temp + y < len(board) and temp + x < len(board) and temp + y >= 0 and temp + x >= 0:
            
            newboard[temp+x][temp+y] = -1#downright
        if y - temp < len(board) and temp + x < len(board) and y - temp >= 0 and temp + x >= 0:
            #print((temp+x,y - temp))
            newboard[temp+x][y - temp] = -1
        temp += 1
        
    newboard[x][y] = 1
    
    return newboard


if __name__ == "__main__":
    main()
