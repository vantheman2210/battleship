
import Gameboard from './gameboard';
import Player from './player';
import { render, markSpots, showModal, restart } from './domControl';

// Function that controls entire gameLoop
const gameLoop = () => {
	let activePlayer = 0;

	// Creating player gameboards
	const board1 = Gameboard([0, 1, 2, 3], [10, 11, 12], [20, 21, 22, 23, 24], [52,53], [1, 2, 3, 4]);
	const board2 = Gameboard([1, 2, 3, 4, 5], [8, 9, 10, 11], [14, 15, 16], [20, 21, 22], [24, 25]); 
	
	// Creating players
	const player1 = Player(board2);
	const player2 = Player(board1);

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

gameLoop();

// addEventListener that restarts game when restart button pressed
document.querySelector('#restart').addEventListener('click', () => {
	restart();
	gameLoop();
});
