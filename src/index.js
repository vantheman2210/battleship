/* eslint-disable no-use-before-define */
import Gameboard from './gameboard';
import Player from './player';
import { render, markSpots, showModal, restart, renderModalBoard, rotate } from './domControl';

// Function that controls entire gameLoop
const gameLoop = () => {
	let activePlayer = 0;

	// Creating player gameboards
	const board1 = Gameboard();
	const board2 = Gameboard();

	// Creating players
	const player1 = Player(board2);
	const player2 = Player(board1);

	board2.placeComputer();

	// Rendering boards
	render(board1, board2);

	// Function for player turns
	const changeTurn = () => {
		activePlayer = activePlayer === 0 ? 1 : 0;
	};

	// Checking whether all ships have been sunk
	function check() {
		if (board2.allSunk()) {
			showModal('Computer lost. You win!');
		} else if (board1.allSunk()) {
			showModal('You lost! The enemy has defeated you.');
		} else play();
	}

	// function loop that switches player turns
	function play() {
		const computer = [ ...document.querySelectorAll('.cells2') ];
		const playerTurn = () => {
			computer.forEach((element, i) => {
				element.addEventListener('click', () => {
					player1.playerAttack(i);
					markSpots(board2.board, board1.board);
					changeTurn();
					check();
				});
			});
		};

		const computerTurn = () => {
			player2.computerAttack();
			markSpots(board2.board, board1.board);
			changeTurn();
		};

		// eslint-disable-next-line no-unused-expressions
		activePlayer === 0 ? playerTurn() : computerTurn();
	}
	check();
};

// gameLoop();

// addEventListener that restarts game when restart button pressed
document.querySelector('#restart').addEventListener('click', () => {
	restart();
	gameLoop();
});

//////////////////////

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
