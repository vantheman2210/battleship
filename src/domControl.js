/* eslint-disable no-unused-expressions */ 
// Selecting elements
const container = document.querySelector('.container'); 
const text = document.querySelector('p'); 
const modal = document.querySelector('.modal');  
const carrier = document.querySelector('.carrierContainer'); 
const battleship = document.querySelector('.battleshipContainer');
const cruiser = document.querySelector('.cruiserContainer');
const submarine = document.querySelector('.submarineContainer');
const destroyer = document.querySelector('.destroyerContainer');

const render = (board1, board2) => {
	// Creating two grids for displaying boards
	const grid1 = document.createElement('grid');
	grid1.className = 'grid1';
	const grid2 = document.createElement('grid');
	grid2.className = 'grid2';

	board1.board.forEach((__a, i) => {
		const div = document.createElement('div');
		div.className = 'cells1'; 
		div.textContent = i; 
		__a === 'ship' ? div.style.backgroundColor = 'red' : null; 
		grid1.append(div);
		container.append(grid1);
	});

	board2.board.forEach((__a, i) => {
		const div = document.createElement('div');
		div.className = 'cells2';  
		div.textContent = i;
		__a === 'ship' ? div.style.backgroundColor = 'red' : null; 
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

const showModal = (input) => { 
	modal.classList.toggle('show-modal'); 
	container.classList.toggle('is-blurred'); 
	text.textContent = input;
}; 

const restart = () => { 
	container.innerHTML = ''; 
  modal.classList.toggle('show-modal'); 
	container.classList.toggle('is-blurred');
} 

const rotate = (e) => { 
	if(e.target.className === 'carrier')
	carrier.classList.toggle(`carrierContainer-horizontal`); 
	if(e.target.className === 'battleship')
	battleship.classList.toggle(`battleshipContainer-horizontal`); 
	if(e.target.className === 'cruiser')
	cruiser.classList.toggle(`cruiserContainer-horizontal`); 
	if(e.target.className === 'submarine')
	submarine.classList.toggle(`submarineContainer-horizontal`); 
	if(e.target.className === 'destroyer')
	destroyer.classList.toggle(`destroyerContainer-horizontal`);
}

export { render, markSpots, showModal, restart, rotate };
