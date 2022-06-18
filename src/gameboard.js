/* eslint-disable no-return-assign */
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

	// Function that marks player board ships 
	const markShips = (coord) => { 
		coord.forEach(position => board[position] = 'ship')
	}

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

	// Function that generates a single ship on board
	const generate = (ship, ship2) => {
		const random = Math.floor(Math.random() * ship.directions.length);
		const current = ship.directions[random];
		let direction = 0;
		if (random === 0) direction = 1;
		if (random === 1) direction = 10;
		const randomStart = Math.abs(Math.floor(Math.random() * board.length - ship.directions[0].length * direction));

		const left = current.some((index) => (randomStart + index) % 10 === 0);
		const right = current.some((index) => (randomStart + index) % 10 === 10 - 1);
		const notAvailable = current.some((index) => board[randomStart + index] === 'ship');

		if ((!left && !right && !notAvailable) || (left && right && !notAvailable && random === 1))
			current.forEach((element) => {
				board[randomStart + element] = 'ship';
				ship2.placeCoords([ randomStart + element ]);
			});
		else generate(ship, ship2);
	};

	// Function that places all five computer ships at once
	const placeComputer = () => {
		generate(carrier.shipArr[0], carrier);
		generate(battleship.shipArr[1], battleship);
		generate(cruiser.shipArr[2], cruiser);
		generate(submarine.shipArr[3], submarine);
		generate(destroyer.shipArr[4], destroyer);
	};  

	

	function placePlayer (ship, coord) { 
		if(ship === 'carrier') { 
			carrier.placeCoords(coord) 
			markShips(coord);
		} 
		else if(ship === 'cruiser') { 
			cruiser.placeCoords(coord) 
			markShips(coord);
		}

		else if(ship === 'battleship') { 
			battleship.placeCoords(coord) 
			markShips(coord);
		} 
		else if(ship === 'submarine') { 
			submarine.placeCoords(coord) 
			markShips(coord);
		} 
		else if(ship === 'destroyer') { 
			destroyer.placeCoords(coord) 
			markShips(coord);
		} 
	}

	return {
		receiveAttack,
		allSunk,
		board,
		placeComputer,
		placePlayer, 
		createShip
	};
}

export default Gameboard;
