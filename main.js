'use strict';
import PIECE_CHARACTERS from './components/data/PIECE_CHARACTERS.js';
import BOARD_MAP from './components/data/BOARD_MAP.js';
import PIECE_MOVES from './components/data/PIECE_MOVES.js';

import {getIndex, Alias, getOppenentAlias} from './boardUtil.js';

import {
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
} from './pieceUtils.js';

import {drawRect, drawCircle} from './drawUtils.js';

const canvasElement = document.querySelector('canvas');
const cw = (canvasElement.width = window.innerWidth);
const ch = (canvasElement.height = window.innerHeight * 0.8);

const g = canvasElement.getContext('2d');

g.imageSmoothingQuality = 'high';
const CELL_SIZE = 40;

const HALF_CELL = CELL_SIZE / 2;

let activePos = null;

let playingSide = Alias.WHITE;

let activePiece = 0;
let activeIndex = 0;

let activePieceTargets = [];

function animate(frame = 0) {
	requestAnimationFrame(animate);

	g.fillStyle = 'black';
	g.fillRect(0, 0, cw, ch);

	g.fillStyle = 'white';
	g.font = '10px Arial';
	g.fillText(playingSide, 20, 20);

	for (let row = 0; row < 10; row++) {
		for (let col = 0; col < 10; col++) {
			const index = getIndex(row, col);
			const cell = BOARD_MAP[index];

			if (pieceIsOffboad(cell)) {
				continue;
			}

			g.strokeStyle = 'white';

			const x = col * CELL_SIZE;
			const y = row * CELL_SIZE;

			g.fillStyle = (row + col) % 2 ? 'brown' : 'black';

			g.fillRect(x, y, CELL_SIZE, CELL_SIZE);

			const padding = 0.1;
			const marginPercentage = 0.8;

			if (!!activePos && activePos.x == col && activePos.y == row) {
				g.strokeStyle = 'gray';
				g.strokeRect(x + CELL_SIZE * 0.1, y + CELL_SIZE * 0.1, CELL_SIZE * 0.8, CELL_SIZE * 0.8);
			}

			if (!pieceIsEmpty(cell)) {
				const textWidth = CELL_SIZE * 0.8;

				g.textAlign = 'center';
				g.textBaseline = 'medium';
				g.font = `${textWidth}px Arial`;
				g.fillStyle = 'white';
				g.fillText(`${PIECE_CHARACTERS[cell]}`, x + CELL_SIZE / 2, y + CELL_SIZE * 0.8);
			}

			for (const target of activePieceTargets) {
				if (target == index) {
					const radius = CELL_SIZE * 0.08;

					if (pieceIsEmpty(cell)) {
						g.beginPath();
						g.fillStyle = 'white';
						g.arc(x + HALF_CELL, y + HALF_CELL, radius, 0, Math.PI * 2);
						g.fill();
						g.closePath();
					} else {
						const padding = CELL_SIZE * 0.05;
						g.lineWidth = 2;
						drawRect(g, x + padding, y + padding, CELL_SIZE * 0.9, 'white', false);
					}
				}
			}
		}
	}
}

function pickPiece(p, i) {
	activePiece = p;
	activeIndex = i;
	activePieceTargets = generatePossiblePieceMoves(BOARD_MAP, i);
}

function pieceIsPlayingSide(p) {
	return getPieceAlias(p) == playingSide;
}

canvasElement.addEventListener('click', (e) => {
	const x = Math.floor(e.clientX / CELL_SIZE);
	const y = Math.floor(e.clientY / CELL_SIZE);

	activePos = {x, y};
	activePieceTargets = [];

	const index = getIndex(y, x);
	const piece = BOARD_MAP[index];

	if (isValidPiece(activePiece) && pieceIsPlayingSide(activePiece)) {
	} else if (isValidPiece(activePiece) && !pieceIsPlayingSide(activePiece)) {
		return;
	} else {
	}
});

animate(0);
