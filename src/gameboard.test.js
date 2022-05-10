/* eslint-disable no-undef */
import Gameboard from './gameboard';

// Testing for Gameboard function

test('Place ship at coordinates', () => {
	expect(Gameboard()).toStrictEqual({"shipPosition": [1, 2, 3, 4]});
});


// npm test gameboard.test.js