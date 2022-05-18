import Ship from './shipFactory';
// Function that places ships on board, and receives attacks, and keeping track of missed shots
function Gameboard(player) {
	const board = Array.from({ length: 100 }, (_, i) => i);
	const createShip = Ship(player);

	createShip.coordinates.map((positions) => (board[positions] = 'ship'))

	// Function that determines whether attack hit a ship
	// Excluded 'missed'
	const receiveAttack = (attack) => {
		if (board[attack] === 'ship') {
			board[attack] = 'hit';
			createShip.isHit(attack);
		} else {
			board[attack] = 'missed';
		}
	}

	// Function that checks whether all ships have been sunk
	// Filtering board array, and checking whether 17 positions have been hit
	const allSunk = () => {
		const arr = board.filter((element) => element === 'hit');
		if (arr.length >= 17) {
			return true;
		}
		return false;
	}

	return {
		createShip,
		receiveAttack,
		allSunk,
		board
	};
}

export default Gameboard;
