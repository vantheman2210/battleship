/* eslint-disable no-console */

// Factory function that creates ship objects
function Ship() {
	const width = 10;
  
	// Array that contains ships, and their lengths
	const shipArr = [
		{
			name: 'carrier',
			directions: [ [ 0, 1, 2, 3, 4 ], [ 0, width, width * 2, width * 3, width * 4 ] ]
		},
		{
			name: 'battleship',
			directions: [ [ 0, 1, 2, 3 ], [ 0, width, width * 2, width * 3 ] ]
		},
		{
			name: 'cruiser',
			directions: [ [ 0, 1, 2 ], [ 0, width, width * 2 ] ]
		},
		{
			name: 'submarine',
			directions: [ [ 0, 1, 2 ], [ 0, width, width * 2 ] ]
		},
		{
			name: 'destroyer',
			directions: [ [ 0, 1 ], [ 0, width ] ]
		}
	];

	const shipCoord = [];
  // Maps coords to shipCoord array. To be used for checking hits, and sunk.
	const placeCoords = (coordinates) => {
		coordinates.map((coordinate) => shipCoord.push(coordinate));
	};

	// Functions that removes destroyed ship
	const isSunk = () => shipCoord.every((element) => element === 'hit');

	// Function that damages ship positions
	// eslint-disable-next-line no-return-assign
	const isHit = (hit) => (shipCoord[hit] = 'hit');

	return { shipCoord, isSunk, isHit, placeCoords, shipArr };
}

export default Ship;
