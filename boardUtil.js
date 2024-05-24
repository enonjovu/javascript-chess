const Alias = {
    WHITE : "white",
    BLACK : "black",
    EMPTY : "empty",
    OFFBOARD : "offboard"
};

function getIndex(row, col){
    return row * 10 + col;
}

function indexIsOffboard(board, index){
    if(index < 10 || index > 88){
        return false;
    }
    
    return board[index] == 13;
}


function getOppenentAlias(curr) {
    return curr == Alias.BLACK ? Alias.WHITE : Alias.BLACK;
}


export {
    getOppenentAlias,
    getIndex,
    Alias
}