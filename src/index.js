import Gameboard from './gameboard';
import Player from './player';
import { render, markSpots } from './domControl';

let activePlayer = 0;

// Creating player gameboards
const board1 = Gameboard([ 1, 2, 3, 4 ]);
const board2 = Gameboard([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]);

// Creating players
const player1 = Player(board2);
const player2 = Player(board1);

// Rendering boards
render(board1, board2);

// Function for player turns
const changeTurn = () => {
	activePlayer = activePlayer === 0 ? 1 : 0;
};

// Switching logic
const play = () => {  
	const playerLost = board1.allSunk();
const computerLost = board2.allSunk();
	// Function that checks whether game ended
	const computer = [ ...document.querySelectorAll('.cells2') ];

	const playerTurn = () => {
		computer.forEach((element, i) => {
			element.addEventListener('click', () => {
				player1.playerAttack(i);
				markSpots(board2.board, board1.board);
				changeTurn(); 
				play()
			});
		});
	};

	const computerTurn = () => {
		player2.computerAttack();
		markSpots(board2.board, board1.board);
		changeTurn();
	};
  
	activePlayer === 0 ? playerTurn() : computerTurn(); 
};

 play()