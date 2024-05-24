import Side from "./Side.js"

export default class Piece {
    constructor(index, piece){
        this.index = index;
        this.piece = piece;
    }
    
    static checkIfPieceIsValid(p){
        if(p instanceof Piece){
            return true;
        }
        
        const type = typeof p;
        throw new Error(`parameter type error expected p to be Piece but got ${type}`)
    }
    
    
    isOffboard(){
        return this.piece == 13;
    }
    
    isEmpty(){
        return this.piece == 0;
    }
    
    isValid(){
        return this.piece > 0 && this.piece < 13;
    }
    
    getSide(){
        return this.isEmpty() ? Side.EMPTY :
                this.isOffboard() ? Side.OFFBOARD :
                this.piece > 6 ? Side.BLACK:
                Side.WHITE;
    }
    
    isWhite(){
        return this.getSide() == Side.White;
    }

    isBlack(){
        return this.getSide() == Side.BLACK;
    }
    
    isPawn(){
        return this.piece == 6|| this.piece ==12;
    }
    
    isKing(){
        return this.piece == 1 || this.piece == 7;
    }
    
    isAllie(p){
        Piece.checkIfPieceIsValid(p);
        
        return this.getSide() == p.getSide();
    }
    
    
    canCapture(p){
        Piece.checkIfPieceIsValid(p);
        
        return !this.isAllie(p) || p.isEmpty();
    }
    
    
}