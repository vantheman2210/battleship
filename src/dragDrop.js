import { renderModalBoard, rotate } from './domControl';

renderModalBoard();

const carrier = document.querySelector('.carrierContainer');
const battleship = document.querySelector('.battleshipContainer');
const cruiser = document.querySelector('.cruiserContainer');
const submarine = document.querySelector('.submarineContainer');
const destroyer = document.querySelector('.destroyerContainer');
const ships = document.querySelectorAll('.ships');
const playerBoard = document.querySelectorAll('.cells1');

carrier.addEventListener('click', rotate);
battleship.addEventListener('click', rotate);
cruiser.addEventListener('click', rotate);
submarine.addEventListener('click', rotate);
destroyer.addEventListener('click', rotate);

ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
playerBoard.forEach((cell) => cell.addEventListener('dragstart', dragStart));
playerBoard.forEach((cell) => cell.addEventListener('dragover', dragOver));
playerBoard.forEach((cell) => cell.addEventListener('dragenter', dragEnter));
playerBoard.forEach((cell) => cell.addEventListener('dragleave', dragLeave));
playerBoard.forEach((cell) => cell.addEventListener('drop', dragDrop));

let draggedShip;
let shipIndex;
let draggedShipLength;

ships.forEach((ship) =>
	ship.addEventListener('mousedown', (e) => {
		shipIndex = e.target.dataset.index;
	})
);

function dragStart() {
	draggedShip = this;
	draggedShipLength = this.children.length;
	console.log(draggedShip);
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
}

function dragLeave() {
	console.log('drag leave');
}

function dragDrop() {
	console.log('drop');
	let shipLastIndex = parseInt(draggedShip.lastElementChild.dataset.index);
	let shipName = draggedShip.dataset.ship;

	const shipCoords = [];
	if (draggedShip.classList.contains(`${shipName}Container-horizontal`)) {
		for (let i = 0; i < draggedShipLength; i++) {
			const coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) + i];
			shipCoords.push(parseInt(coords.dataset.id));

			draggedShip.classList.add('hide');
		}
	} else if (!draggedShip.classList.contains(`${shipName}Container-horizontal`)) {
		for (let i = 0; i < draggedShipLength; i++) {
			const coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) * 10 + 10 * i];
			shipCoords.push(parseInt(coords.dataset.id));
			draggedShip.classList.add('hide');
		}
	}
	console.log(shipCoords);
}
