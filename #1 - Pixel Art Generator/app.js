const container = document.querySelector('.container');
const createGridButton = document.getElementById('submit-grid');
const clearGridButton = document.getElementById('clear-grid');
const gridWidth = document.getElementById('width-range');
const gridHeight = document.getElementById('height-range');
const colorButton = document.getElementById('color-input');
const eraseBtn = document.getElementById('erase-btn');
const paintBtn = document.getElementById('paint-btn');
const widthValue = document.getElementById('width-value');
const heightValue = document.getElementById('height-value');

const events = {
	down: 'mousedown',
	move: 'mousemove',
	up: 'mouseup',
	touch: {
		down: 'touchstart',
		move: 'touchmove',
		up: 'touchend',
	},
};

let deviceType = '';
let draw = false;
let erase = false;

const isTouchDevice = () => {
	try {
		document.createEvent('TouchEvent');
		deviceType = 'touch';
		return true;
	} catch {
		deviceType = 'mouse';
		return false;
	}
};

isTouchDevice();

createGridButton.addEventListener('click', () => {
	container.innerHTML = '';

	for (let i = 0; i < gridHeight.value; i++) {
		const row = document.createElement('div');
		row.classList.add('gridRow');

		for (let j = 0; j < gridWidth.value; j++) {
			const col = document.createElement('div');
			col.classList.add('gridCol');
			col.setAttribute('id', `gridCol${i}_${j}`);

			row.appendChild(col);
		}

		container.appendChild(row);
	}
});

container.addEventListener(events.down, (e) => {
	draw = true;

	const element = e.target.closest('.gridCol');
	if (!element) return;

	if (erase) {
		element.style.backgroundColor = 'transparent';
	} else {
		element.style.backgroundColor = colorButton.value;
	}
});

container.addEventListener(events.move, (e) => {
	if (!draw) return;

	const element = e.target.closest('.gridCol');
	if (!element) return;

	if (erase) {
		element.style.backgroundColor = 'transparent';
	} else {
		element.style.backgroundColor = colorButton.value;
	}
});

container.addEventListener(events.up, () => {
	draw = false;
});

clearGridButton.addEventListener('click', () => {
	container.innerHTML = '';
});

eraseBtn.addEventListener('click', () => {
	erase = true;
});

paintBtn.addEventListener('click', () => {
	erase = false;
});

gridWidth.addEventListener('input', () => {
	widthValue.textContent = gridWidth.value.padStart(2, '0');
});

gridHeight.addEventListener('input', () => {
	heightValue.textContent = gridHeight.value.padStart(2, '0');
});

window.addEventListener('load', () => {
	gridHeight.value = '00';
	gridWidth.value = '00';
});
