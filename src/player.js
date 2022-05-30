import Gameboard from "./gameboard";

const Player = (gameboard) => {
	const boardPlayer = Array.from({ length: 100 }, (_, i) => i);
	const boardComputer = Array.from({ length: 100 }, (_, i) => i);
	const playerAttack = (attack) => {
		if (boardPlayer[attack] !== 'attacked') {
			boardPlayer[attack] = 'attacked';
			return gameboard.receiveAttack(attack);
		}
		return 'illegal move';
	};

	const computerAttack = () => {
		const board = boardComputer.filter((slot) => slot !== 'attacked');
		const randomAttack = board[Math.floor(Math.random() * board.length)];
		boardComputer[randomAttack] = 'attacked';
		gameboard.receiveAttack(randomAttack);
		return randomAttack;
	};

	return {
		playerAttack,
		computerAttack,
		boardComputer,
		boardPlayer
	};
};

export default Player;

/*
const c = (ship) => {
	if (ship === 'Carrier') {
		return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Battleship') {
		return Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Submarine') {
		return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Destroyer') {
		return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Patrol Boat') {
		return Array.from({ length: 2 }, () => Math.floor(Math.random() * 100));
	}
	throw new Error('Specify ship');
};
*/
