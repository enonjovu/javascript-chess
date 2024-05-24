'use strict';

import PIECE_MOVES from './components/data/PIECE_MOVES.js';

import {getIndex, Alias, getOppenentAlias} from './boardUtil.js';

function isValidPiece(p) {
	return p > 0 && p < 13;
}

function isWhite(p) {
	return p > 0 && p < 7;
}

function isBlack(p) {
	return p > 6 && p < 13;
}

function isPawn(p) {
	return p == 6 || p == 12;
}

function isKing(p) {
	return p == 1 || p == 7;
}

function isQueen(p) {
	return p == 2 || p == 8;
}

function isKnight(p) {
	return p == 5 || p == 11;
}

function isRock(p) {
	return p == 3 || p == 9;
}

function isBishop(p) {
	return p == 4 || p == 10;
}

function pieceIsEmpty(p) {
	return p == 0;
}

function pieceIsOffboad(p) {
	return p == 13;
}

function pieceIsWhite(p) {
	return p > 0 && p < 7;
}

function pieceIsBlack(p) {
	return p > 6 && p < 13;
}

function pieceIsSliding(p) {
	return [3, 9, 2, 8, 4, 10].includes(p);
}

function getPieceAlias(p) {
	return pieceIsEmpty(p)
		? Alias.EMPTY
		: pieceIsOffboad(p)
		? Alias.OFFBOARD
		: pieceIsWhite(p)
		? Alias.WHITE
		: Alias.BLACK;
}

function pieceIsAlie(p1, p2) {
	return getPieceAlias(p1) == getPieceAlias(p2);
}

function pieceIsCapturable(p1, p2) {
	return pieceIsEmpty(p2) || !pieceIsAlie(p1, p2);
}

function generatePossiblePieceMoves(board, index) {
	const piece = board[index];
	const moves = PIECE_MOVES[piece];

	let possibleMoves = [];

	if (pieceIsEmpty(piece)) {
		return possibleMoves;
	}

	if (pieceIsOffboad(piece)) {
		return possibleMoves;
	}

	if (pieceIsSliding(piece)) {
		for (let i = 0; i < moves.length; i++) {
			let target = index;
			const currMove = moves[i];

			while (true) {
				target += currMove;

				if (target < 11 || target > 88) {
					break;
				}

				const targetPiece = board[target];

				if (pieceIsOffboad(targetPiece)) {
					break;
				}

				if (pieceIsAlie(piece, targetPiece)) {
					break;
				}

				const nextTarget = target - currMove;

				if (nextTarget > 10 && nextTarget < 89) {
					const nextPiece = board[nextTarget];

					if (!pieceIsEmpty(nextPiece) && !pieceIsAlie(piece, nextPiece)) {
						break;
					}
				}

				possibleMoves.push(target);
			}
		}
	} else {
		for (const move of moves) {
			const target = index + move;

			if (target < 11 || piece > 88) {
				continue;
			}

			const targetPiece = board[target];

			if (pieceIsOffboad(targetPiece) || pieceIsAlie(piece, targetPiece)) {
				continue;
			}

			if (piece == 6 || piece == 12) {
				if (!pieceIsEmpty(targetPiece)) {
					continue;
				}

				for (const sideTarget of [index - 1, index + 1]) {
					if (sideTarget < 11 || sideTarget > 88) {
						continue;
					}

					const sideTargetPiece = board[sideTarget];

					if (pieceIsEmpty(sideTargetPiece)) {
						continue;
					}

					if (pieceIsAlie(piece, sideTargetPiece)) {
						continue;
					}

					possibleMoves.push(sideTarget);
					possibleMoves.push(sideTarget - move * -1);
				}

				const dbPushTarget = target - move * -1;
				const pushTargetPiece = board[dbPushTarget];

				const pushIsCapturable = pieceIsCapturable(piece, pushTargetPiece);

				if (((piece == 6 && index > 70) || (piece == 12 && index < 30)) && pushIsCapturable) {
					possibleMoves.push(dbPushTarget);
				}
			}

			possibleMoves.push(target);
		}
	}

	return possibleMoves;
}

export {
	pieceIsSliding,
	getPieceAlias,
	isValidPiece,
	pieceIsBlack,
	pieceIsEmpty,
	pieceIsWhite,
	pieceIsOffboad,
	pieceIsCapturable,
	pieceIsAlie,
	generatePossiblePieceMoves,
};
