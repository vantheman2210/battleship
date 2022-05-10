/* eslint-disable no-console */

// Factory function that creates ship objects
function Ship(coordinates) {
	const shipCoord = [];

	coordinates.map((coordinate) => shipCoord.push(coordinate));

	// Functions that removes destroyed ship
	const isSunk = () => shipCoord.every((element) => element === 'hit');

	// Function that damages ship positions
	const isHit = (hit) => shipCoord[hit] = 'hit';

	return { shipCoord, isSunk, isHit, coordinates };
}

export default Ship;
