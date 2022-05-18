/* eslint-disable no-undef */
import Gameboard from './gameboard';

// Testing for Gameboard function

// Test for specific ship coordinates, and all ships on gameboard
test('Place ship at coordinates', () => {
	const test = Gameboard([ 1, 2, 3, 4 ]);
	expect(test.board[1]).toEqual('ship');
	expect(test.board[2]).toEqual('ship');
	expect(test.board[3]).toEqual('ship');
	expect(test.board[4]).toEqual('ship');
});

// Test for receive attack function

test('Testing receiveAttack method', () => {
	const test = Gameboard([ 45, 46, 47 ]);
	test.receiveAttack(5);
	test.receiveAttack(46);
	expect(test.board[5]).toBe('missed');
	expect(test.board[46]).toBe('hit');
});

// Test for record of missed shots

test('Record of missed shots', () => {
	const test = Gameboard([ 1, 2, 3, 4 ]);
	test.receiveAttack(5);
	test.receiveAttack(6);
	test.receiveAttack(7);
	expect(test.board[5]).toStrictEqual('missed');
	expect(test.board[6]).toStrictEqual('missed');
	expect(test.board[7]).toStrictEqual('missed');
});

test('Record of missed shots 2', () => {
	const test = Gameboard([ 10, 12, 13 ]);
	test.receiveAttack(1);
	expect(test.board[1]).toStrictEqual('missed');
});

// Test that checks every ship has been sunk

test('Testing whether all ships have been sunk', () => {
	const test = Gameboard([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]);
	expect(test.allSunk()).toBe(false);
	for (let i = 1; i < 18; i += 1) {
		test.receiveAttack(i);
	};
	expect(test.allSunk()).toBe(true);
});

// npm test gameboard.test.js
