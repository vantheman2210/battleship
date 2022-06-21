/* eslint-disable no-unused-expressions */

// Selecting elements
const container = document.querySelector('.container');
const text = document.querySelector('.gameOver');
const modal = document.querySelector('.modal');
const carrier = document.querySelector('.carrierContainer');
const battleship = document.querySelector('.battleshipContainer');
const cruiser = document.querySelector('.cruiserContainer');
const submarine = document.querySelector('.submarineContainer');
const destroyer = document.querySelector('.destroyerContainer'); 
const carrierTwo = document.querySelector('.carrier');
const battleshipTwo = document.querySelector('.battleship');
const cruiserTwo = document.querySelector('.cruiser');
const submarineTwo = document.querySelector('.submarine');
const destroyerTwo = document.querySelector('.destroyer');
const startScreen = document.querySelector('.start-modal'); 
const modalPlace = document.querySelector('.modal-place');
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
		div.dataset.id = i;
		__a === 'ship' ? (div.style.backgroundColor = 'red') : null;
		grid1.append(div);
		container.append(grid1);
	});

	board2.board.forEach((__a, i) => {
		const div = document.createElement('div');
		div.className = 'cells2';
		div.textContent = i;
		__a === 'ship' ? (div.style.backgroundColor = 'red') : null;
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
	audioPlayOff();
};

const restart = () => {
	container.innerHTML = ''; 
	startScreen.style.visibility = 'visible'; 
	modal.classList.toggle('show-modal');
	container.classList.toggle('is-blurred'); 
	carrier.classList.remove('hide');
	cruiser.classList.remove('hide');
	battleship.classList.remove('hide');
	submarine.classList.remove('hide');
	destroyer.classList.remove('hide');    
};

let horizontal = false;
const rotate = () => {
	
	if (horizontal) {
		carrier.classList.toggle(`carrierContainer-horizontal`);
		carrierTwo.classList.toggle('carrier-horizontal');

		battleship.classList.toggle(`battleshipContainer-horizontal`);
		battleshipTwo.classList.toggle('battleship-horizontal');

		cruiser.classList.toggle(`cruiserContainer-horizontal`); 
		cruiserTwo.classList.toggle('cruiser-horizontal');

		submarine.classList.toggle(`submarineContainer-horizontal`); 
		submarineTwo.classList.toggle('submarine-horizontal');

		destroyer.classList.toggle(`destroyerContainer-horizontal`); 
		destroyerTwo.classList.toggle('destroyer-horizontal');

		horizontal = true;
	}
	if (!horizontal) {
		carrier.classList.toggle(`carrierContainer-horizontal`);
		carrierTwo.classList.toggle('carrier-horizontal');

		battleship.classList.toggle(`battleshipContainer-horizontal`);
		battleshipTwo.classList.toggle('battleship-horizontal');

		cruiser.classList.toggle(`cruiserContainer-horizontal`); 
		cruiserTwo.classList.toggle('cruiser-horizontal');

		submarine.classList.toggle(`submarineContainer-horizontal`); 
		submarineTwo.classList.toggle('submarine-horizontal');

		destroyer.classList.toggle(`destroyerContainer-horizontal`); 
		destroyerTwo.classList.toggle('destroyer-horizontal');

		horizontal = false;
	}
};

const renderModalBoard = () => {
	// Creating board for placing ships  
	const arr = Array.from({ length: 100 }, (_, i) => i);
	const board = document.querySelector('.modal-Board'); 
	
	const grid = document.createElement('grid');
	grid.className = 'grid1'; 

	arr.forEach((__a, i) => {
		const div = document.createElement('div');
		div.className = 'cells1';
		// div.textContent = i;
		div.dataset.id = i;
		__a === 'ship' ? (div.style.backgroundColor = 'red') : null;
		grid.append(div);
		board.append(grid);
	});
}; 

const hideStartScreen = () => { 
	startScreen.style.visibility = 'hidden';  
	document.querySelector('.modal-place').classList.toggle('modal-place-show');   
}   

const audioPlayOn = () => { 
	document.querySelector('.audio').src = "/src/Sounds/submarine-33709.mp3"; 
} 

const audioPlayOff = () => { 
	document.querySelector('.audio').src = ""; 
}


const hideModalPlace = () => { 
	modalPlace.classList.toggle('modal-place-show'); 
	audioPlayOn();
}; 

export { render, markSpots, showModal, restart, rotate, renderModalBoard, hideStartScreen, hideModalPlace };
