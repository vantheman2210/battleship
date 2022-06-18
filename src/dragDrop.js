/* eslint-disable radix */
import { renderModalBoard, rotate, markShipPlacement } from './domControl';

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

const coordinates = [];

function dragDrop() {
	console.log('drop');
	const shipLastIndex = parseInt(draggedShip.lastElementChild.dataset.index);
	const shipName = draggedShip.dataset.ship;
	const shipCoords = {
		name: shipName,
		coordinates: []
	};

	if (draggedShip.classList.contains(`${shipName}Container-horizontal`)) {
		for (let i = 0; i < draggedShipLength; i += 1) {
			const coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) + i];
			shipCoords.coordinates.push(parseInt(coords.dataset.id));
			coords.style.background = 'red';
			draggedShip.classList.add('hide');
		}
	} else if (!draggedShip.classList.contains(`${shipName}Container-horizontal`)) {
		for (let i = 0; i < draggedShipLength; i += 1) {
			const coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) * 10 + 10 * i];
			shipCoords.coordinates.push(parseInt(coords.dataset.id));
			coords.style.background = 'red';
			draggedShip.classList.add('hide');
		}
	}
	coordinates.push(shipCoords);
}
console.log(coordinates);
export default coordinates;
