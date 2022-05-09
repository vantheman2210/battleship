/* eslint-disable no-console */

// Factory function that creates ship objects
function Ship(coordinates) {
	// coordinates = {};
	let health = coordinates;
	// Functions that removes destroyed ship
	const isSunk = () => 'Ship destroyed';
	// Function that damages ship positions
	const isHit = (position) => {
		health -= position;
		if (health <= 0) {
			isSunk();
		}
		return health;
	};

	return { health, isHit, coordinates };
}

export default Ship;






























/*
  return {
		length,
		hit: 10,
		sunk: false,
		isHit: function isHit(number) {
		 return `Position hit at ${number}`;
		},
		isSunk: function isSunk(number) {
			if (length === 0) {
				 this.sunk = true;
			}
		}
	};
*/
