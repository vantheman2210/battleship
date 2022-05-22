/* eslint-disable no-unused-expressions */
const container = document.querySelector('.container');

const render = (board1, board2) => {
	// Creating two grids for displaying boards
	const grid1 = document.createElement('grid');
	grid1.className = 'grid1';
	const grid2 = document.createElement('grid');
	grid2.className = 'grid2';

	board1.board.forEach(() => {
		const div = document.createElement('div');
		div.className = 'cells1';
		grid1.append(div);
		container.append(grid1);
	});

	board2.board.forEach(() => {
		const div = document.createElement('div');
		div.className = 'cells2';
		grid2.append(div);
		container.append(grid2);
	});
};

const markSpots = (board1, board2) => {
	const comp = document.querySelectorAll('.cells2');
	const player = document.querySelectorAll('.cells1');

	board1.forEach((element, i) => {
		
		element === 'missed' ? (comp[i].style.background = 'gray') : null; 
		element === 'hit' ? (comp[i].style.background = 'black') : null;
	});

	board2.forEach((element, i) => {
		
		element === 'missed' ? (player[i].style.background = 'gray') : null; 
		element === 'hit' ? (player[i].style.background = 'black') : null;
	});
};

export { render, markSpots };
