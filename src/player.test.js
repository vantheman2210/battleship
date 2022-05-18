/* eslint-disable no-undef */
import Gameboard from './gameboard';
import Player from './player';

// Testing whether attacks work by missing
test('Attack enemy gameboard (missed)', () => {
	const test = Gameboard([ 10, 11, 12, 13 ]);
	const testPlayer = Player(test);
	testPlayer.playerAttack(9);
	expect(test.board[9]).toBe('missed');
	testPlayer.playerAttack(50);
	expect(test.board[50]).toBe('missed');
});

// Testing whether attack work by hitting boat
test('Attack enemy gameboard (hit)', () => {
	const test = Gameboard([ 10, 11, 12, 13 ]);
	const testPlayer = Player(test);
	testPlayer.playerAttack(11);
	expect(test.board[11]).toBe('hit');
	testPlayer.playerAttack(13);
	expect(test.board[13]).toBe('hit');
}); 

// Testing whether positions 'missed' and 'hit' are illegal 
test('Checks for illegal moves', () => {
	const test = Gameboard([ 35, 36, 37, 38 ]);
	const testPlayer = Player(test);  
  testPlayer.playerAttack(25)
  expect(test.board[25]).toBe('missed');   
  expect(testPlayer.playerAttack(25)).toBe('illegal move')
  
});  

// Testing for computer moves 
test('Computer attacks', () => {
	const test = Gameboard([ 20, 21, 22, 23 ]);
	const testComputer = Player(test);  
  expect(testComputer.computerAttack()).toBe('attacked')   
});  

// npm test player.test.js
