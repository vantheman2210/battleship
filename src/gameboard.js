import Ship from './shipFactory';
// Function that places ships on board, and receives attacks, and keeping track of missed shots
function Gameboard() {
	const board = Array.from({ length: 100 }, (_, i) => i);

	const carrier = Ship();
	const battleship = Ship();
	const cruiser = Ship();
	const submarine = Ship();
	const destroyer = Ship();

	const createShip = [
		carrier.shipCoord,
		battleship.shipCoord,
		cruiser.shipCoord,
		submarine.shipCoord,
		destroyer.shipCoord
	];

	const populateBoard = () => {
		// eslint-disable-next-line no-return-assign
		createShip.flat().map((positions) => (board[positions] = 'ship'));
	};

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

	
	

	const generate = () => {
		const random = Math.floor(Math.random() * carr.directions.length);
		const current = carr.directions[random];
		let direction = 0;
		if (random === 0) direction = 1;
		if (random === 1) direction = 10;
		const randomStart = Math.abs(Math.floor(Math.random() * board.length - carr.directions[0].length * direction));

		current.forEach((element) => {
			board[randomStart + element] = 'ship';
			carrier.placeCoords([ randomStart + element ]);
		});
	};

	return {
		receiveAttack,
		allSunk,
		board,
		generate,
		createShip
	};
}

export default Gameboard;

/*
      const s = board.filter((slot) => slot !== 'ship');
			const one = Array.from({ length: 3 }, (__, i) => i);
			submarine.placeCoords(one);
			populateBoard(); */
