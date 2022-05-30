/* eslint-disable no-console */

// Factory function that creates ship objects
function Ship() {
	const width = 10;

	const shipArr = [
		{
			name: 'carrier',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		},
		{
			name: 'battleship',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		},
		{
			name: 'cruiser',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		},
		{
			name: 'submarine',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		},
		{
			name: 'destroyer',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		}
	];

	const shipCoord = [];

	const placeCoords = (coordinates) => {
		coordinates.map((coordinate) => shipCoord.push(coordinate));
	};

	// Functions that removes destroyed ship
	const isSunk = () => shipCoord.every((element) => element === 'hit');

	// Function that damages ship positions
	// eslint-disable-next-line no-return-assign
	const isHit = (hit) => (shipCoord[hit] = 'hit');

	return { shipCoord, isSunk, isHit, placeCoords };
}

export default Ship;
