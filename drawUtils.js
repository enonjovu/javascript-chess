'use strict';

function drawRect(ctx, x, y, length = 40, color = 'white', fill = false) {
	ctx.fillStyle = color;
	ctx.strokeStyle = color;

	if (fill) {
		ctx.fillRect(x, y, length, length);
	} else {
		ctx.strokeRect(x, y, length, length);
	}
}

function drawCircle(x, y, radius, color = 'white', fill = false) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);

	if (fill) {
		ctx.fillStyle = color;
		ctx.fill();
	} else {
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	ctx.closePath();
}

export {drawRect, drawCircle};
