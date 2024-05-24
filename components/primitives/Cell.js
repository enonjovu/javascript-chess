//@ts-check

import Piece from './Piece.js';

export default class Cell {
	/**
	 *
	 * @param {number} row
	 * @param {number} col
	 * @param {Piece} piece
	 */
	constructor(row, col, piece) {
		this.row = row;
		this.col = col;
		this.piece = piece;
	}

	get index() {
		return this.row * 10 + this.col;
	}

	isOffboard() {
		return this.piece.isOffboard();
	}

	isEmpty() {
		return this.piece.isEmpty();
	}

	occupied() {
		return this.piece.isValid();
	}
}
