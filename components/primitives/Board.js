import Piece from "./Piece.js";
import Cell from "./Cell.js";

export default class Board {
    
    constructor(map){
        this.boardMap = map;
    }
    
    static getIndex(row, col){
        return row * 10 + col;
    }
    
    getCells(){
        const pieces = this.getPieces();
        const cells = [];
        
        for(let row=0; row<10; row++){
            for(let col=0; col<10; col++){
                const index = Board.getIndex(row, col);
                
                const cell = new Cell(row, col, pieces[index]);
                
                cells.push(cell);
            }
        }
        
        return cells;
    }
    
    getPieces(){
        return this.boardMap.map((p,i)=> new Piece(i,p))
    }
}