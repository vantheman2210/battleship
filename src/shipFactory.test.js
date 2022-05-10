/* eslint-disable no-undef */

import Ship from './shipFactory';

// test object creating

test('Ship object returned', () => { 
	const one = Ship([ 1, 2, 3, 4 ]);
	expect(one).toStrictEqual({
		shipCoord: [ 1, 2, 3, 4 ],
		coordinates: [ 1, 2, 3, 4 ],
		isHit: expect.any(Function),
		isSunk: expect.any(Function)
	});
});

// Test hit() method
test('Ship method isHit returns', () => { 
	const one = Ship([ 1, 2, 3, 4 ]); 
	expect(one.isHit(2)).toBe('hit');
});

// Test isSunk() method
test('isSunk() return false', () => { 
	const one = Ship([ 1, 2, 3, 4 ]);
	expect(one.isSunk()).toBe(false);
});

test('IsSunk() return true when all positions hit', () => { 
	const one = Ship([ 1, 2, 3, 4 ]); 
	one.isHit(0)
	one.isHit(1)
	one.isHit(2)
	one.isHit(3);
	expect(one.isSunk()).toBe(true);
});

// npm test shipFactory.test.js
