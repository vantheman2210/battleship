/* eslint-disable no-undef */

import Ship from './shipFactory';

// test object creating
const one = Ship(5);
test('Ship object returned', () => { 
	expect(one).toStrictEqual({
	  coordinates: 5, 
		health: 5,
		isHit: expect.any(Function),
	});
});

// Test hit() method
 test('Ship method isHit returns', () => {
 	expect(one.isHit(3)).toBe(2);
 }); 


 // npm test shipFactory.test.js
