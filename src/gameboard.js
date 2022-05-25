import Ship from './shipFactory';
// Function that places ships on board, and receives attacks, and keeping track of missed shots
function Gameboard(cords1, cords2, cords3, cords4, cords5) {
	const board = Array.from({ length: 100 }, (_, i) => i);
	const carrier = Ship(cords1);
	const battleship = Ship(cords2);
	const cruiser = Ship(cords3);
	const submarine = Ship(cords4);
	const destroyer = Ship(cords5);

	const createShip = [
		carrier.coordinates,
		battleship.coordinates,
		cruiser.coordinates,
		submarine.coordinates,
		destroyer.coordinates
	];

	// eslint-disable-next-line no-return-assign
	createShip.flat().map((positions) => (board[positions] = 'ship'));

	// Function that determines whether attack hit a ship
	// Excluded 'missed'
	const receiveAttack = (attack) => {
		if (board[attack] === 'ship') {
			board[attack] = 'hit';
			// eslint-disable-next-line no-use-before-define
			receiveAttackHelper(attack);
		} else {
			board[attack] = 'missed';
		}
	};

	// Function that checks whether all ships have been sunk
	// Filtering board array, and checking whether 17 positions have been hit
	const allSunk = () => {
		const arr = board.filter((element) => element === 'hit');
		if (arr.length >= 17) {
			return true;
		}
		return false;
	};

	// Function that helps allocate attack to appropriate ship
	const receiveAttackHelper = (attack) => {
		const findArr = createShip.filter((cor) => cor.includes(attack)).flat();

		const checkArr = findArr.sort().toString();
		const checkCarrier = createShip[0].sort().toString();
		const checkBattleship = createShip[0].sort().toString();
		const checkCruiser = createShip[0].sort().toString();
		const checkSubmarine = createShip[0].sort().toString();
		const checkDestroyer = createShip[0].sort().toString();

		if (checkArr === checkCarrier) carrier.isHit(attack);
		else if (checkArr === checkBattleship) battleship.isHit(attack);
		else if (checkArr === checkCruiser) cruiser.isHit(attack);
		else if (checkArr === checkSubmarine) submarine.isHit(attack);
		else if (checkArr === checkDestroyer) destroyer.isHit(attack);
	};

	return {
		createShip,
		receiveAttack,
		allSunk,
		board
	};
}

export default Gameboard;
