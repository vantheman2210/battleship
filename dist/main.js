/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domControl.js":
/*!***************************!*\
  !*** ./src/domControl.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "markSpots": () => (/* binding */ markSpots),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "restart": () => (/* binding */ restart)
/* harmony export */ });
/* eslint-disable no-unused-expressions */
var container = document.querySelector('.container');
var text = document.querySelector('p');
var modal = document.querySelector('.modal');

var render = function render(board1, board2) {
  // Creating two grids for displaying boards
  var grid1 = document.createElement('grid');
  grid1.className = 'grid1';
  var grid2 = document.createElement('grid');
  grid2.className = 'grid2';
  board1.board.forEach(function () {
    var div = document.createElement('div');
    div.className = 'cells1';
    grid1.append(div);
    container.append(grid1);
  });
  board2.board.forEach(function (__a, i) {
    var div = document.createElement('div');
    div.className = 'cells2';
    div.textContent = i;
    __a === 'ship' ? div.style.backgroundColor = 'red' : null;
    grid2.append(div);
    container.append(grid2);
  });
};

var markSpots = function markSpots(board1, board2) {
  var comp = document.querySelectorAll('.cells2');
  var player = document.querySelectorAll('.cells1');
  board1.forEach(function (element, i) {
    element === 'missed' ? comp[i].style.background = 'gray' : null;
    element === 'hit' ? comp[i].style.background = 'black' : null;
  });
  board2.forEach(function (element, i) {
    element === 'missed' ? player[i].style.background = 'gray' : null;
    element === 'hit' ? player[i].style.background = 'black' : null;
  });
};

var showModal = function showModal(input) {
  modal.classList.toggle('show-modal');
  container.classList.toggle('is-blurred');
  text.textContent = input;
};

var restart = function restart() {
  container.innerHTML = '';
  modal.classList.toggle('show-modal');
  container.classList.toggle('is-blurred');
};



/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
 // Function that places ships on board, and receives attacks, and keeping track of missed shots

function Gameboard() {
  var board = Array.from({
    length: 100
  }, function (_, i) {
    return i;
  });
  var carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var battleship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var cruiser = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var createShip = [carrier.shipCoord, battleship.shipCoord, cruiser.shipCoord, submarine.shipCoord, destroyer.shipCoord];

  var populateBoard = function populateBoard() {
    // eslint-disable-next-line no-return-assign
    createShip.flat().map(function (positions) {
      return board[positions] = 'ship';
    });
  }; // Function that determines whether attack hit a ship
  // Excluded 'missed'


  var receiveAttack = function receiveAttack(attack) {
    if (board[attack] === 'ship') {
      board[attack] = 'hit'; // eslint-disable-next-line no-use-before-define

      receiveAttackHelper(attack);
    } else {
      board[attack] = 'missed';
    }
  }; // Function that checks whether all ships have been sunk
  // Filtering board array, and checking whether 17 positions have been hit


  var allSunk = function allSunk() {
    var arr = board.filter(function (element) {
      return element === 'hit';
    });

    if (arr.length >= 17) {
      return true;
    }

    return false;
  }; // Function that helps allocate attack to appropriate ship


  var receiveAttackHelper = function receiveAttackHelper(attack) {
    var findArr = createShip.filter(function (cor) {
      return cor.includes(attack);
    }).flat();
    var checkArr = findArr.sort().toString();
    var checkCarrier = createShip[0].sort().toString();
    var checkBattleship = createShip[0].sort().toString();
    var checkCruiser = createShip[0].sort().toString();
    var checkSubmarine = createShip[0].sort().toString();
    var checkDestroyer = createShip[0].sort().toString();
    if (checkArr === checkCarrier) carrier.isHit(attack);else if (checkArr === checkBattleship) battleship.isHit(attack);else if (checkArr === checkCruiser) cruiser.isHit(attack);else if (checkArr === checkSubmarine) submarine.isHit(attack);else if (checkArr === checkDestroyer) destroyer.isHit(attack);
  };

  var width = 10;
  var carr = {
    name: 'carrier',
    directions: [[0, 1, 2, 3, 4], [0, width, width * 2, width * 3, width * 4]]
  };

  var generate = function generate() {
    var random = Math.floor(Math.random() * carr.directions.length);
    var current = carr.directions[random];
    var direction = 0;
    if (random === 0) direction = 1;
    if (random === 1) direction = 10;
    var randomStart = Math.abs(Math.floor(Math.random() * board.length - carr.directions[0].length * direction));
    current.forEach(function (element) {
      board[randomStart + element] = 'ship';
      carrier.placeCoords([randomStart + element]);
    });
  };

  return {
    receiveAttack: receiveAttack,
    allSunk: allSunk,
    board: board,
    generate: generate,
    createShip: createShip
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);
/*
      const s = board.filter((slot) => slot !== 'ship');
			const one = Array.from({ length: 3 }, (__, i) => i);
			submarine.placeCoords(one);
			populateBoard(); */

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


var Player = function Player(gameboard) {
  var boardPlayer = Array.from({
    length: 100
  }, function (_, i) {
    return i;
  });
  var boardComputer = Array.from({
    length: 100
  }, function (_, i) {
    return i;
  });

  var playerAttack = function playerAttack(attack) {
    if (boardPlayer[attack] !== 'attacked') {
      boardPlayer[attack] = 'attacked';
      return gameboard.receiveAttack(attack);
    }

    return 'illegal move';
  };

  var computerAttack = function computerAttack() {
    var board = boardComputer.filter(function (slot) {
      return slot !== 'attacked';
    });
    var randomAttack = board[Math.floor(Math.random() * board.length)];
    boardComputer[randomAttack] = 'attacked';
    gameboard.receiveAttack(randomAttack);
    return randomAttack;
  };

  return {
    playerAttack: playerAttack,
    computerAttack: computerAttack,
    boardComputer: boardComputer,
    boardPlayer: boardPlayer
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);
/*
const c = (ship) => {
	if (ship === 'Carrier') {
		return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Battleship') {
		return Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Submarine') {
		return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Destroyer') {
		return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
	}
	if (ship === 'Patrol Boat') {
		return Array.from({ length: 2 }, () => Math.floor(Math.random() * 100));
	}
	throw new Error('Specify ship');
};
*/

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-console */
// Factory function that creates ship objects
function Ship() {
  var shipCoord = [];

  var placeCoords = function placeCoords(coordinates) {
    coordinates.map(function (coordinate) {
      return shipCoord.push(coordinate);
    });
  }; // Functions that removes destroyed ship


  var isSunk = function isSunk() {
    return shipCoord.every(function (element) {
      return element === 'hit';
    });
  }; // Function that damages ship positions
  // eslint-disable-next-line no-return-assign


  var isHit = function isHit(hit) {
    return shipCoord[hit] = 'hit';
  };

  return {
    shipCoord: shipCoord,
    isSunk: isSunk,
    isHit: isHit,
    placeCoords: placeCoords
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _domControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domControl */ "./src/domControl.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



 // Function that controls entire gameLoop

var gameLoop = function gameLoop() {
  var activePlayer = 0; // Creating player gameboards

  var board1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var board2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Creating players

  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board2);
  var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board1); // board2.computerPlacement('carrier');  
  // board2.computerPlacement('battleship');  
  // board2.computerPlacement('cruiser');  
  // board2.computerPlacement('submarine');  
  // board2.computerPlacement('destroyer');  

  board2.generate();
  console.log(board2.board);
  console.log(board2.board.filter(function (element) {
    return element === 'ship';
  }));
  console.log(board2.createShip); // Rendering boards

  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.render)(board1, board2); // Function for player turns

  var changeTurn = function changeTurn() {
    activePlayer = activePlayer === 0 ? 1 : 0;
  }; // Checking whether all ships have been sunk


  function check() {
    if (board2.allSunk()) {
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.showModal)('Computer lost. You win!');
    } else if (board1.allSunk()) {
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.showModal)('You lost! The enemy has defeated you.');
    } else play();
  } // function loop that switches player turns


  function play() {
    var computer = _toConsumableArray(document.querySelectorAll('.cells2'));

    var playerTurn = function playerTurn() {
      computer.forEach(function (element, i) {
        element.addEventListener('click', function () {
          player1.playerAttack(i);
          (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.markSpots)(board2.board, board1.board);
          changeTurn();
          check();
        });
      });
    };

    var computerTurn = function computerTurn() {
      player2.computerAttack();
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.markSpots)(board2.board, board1.board);
      changeTurn();
    }; // eslint-disable-next-line no-unused-expressions


    activePlayer === 0 ? playerTurn() : computerTurn();
  }

  check();
};

gameLoop(); // addEventListener that restarts game when restart button pressed

document.querySelector('#restart').addEventListener('click', function () {
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.restart)();
  gameLoop();
});
/* const cells = [...document.querySelectorAll('.cells2')]; 


const carrier = document.querySelector('.ship') 

let draggedShip; 
let draggedShipIndex; 

const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = () => {};
  const dragEnd = () => {}; 

	const dragStart = (e) => {
    draggedShip = e.target;
  };

function drag(e) { 
	draggedShipIndex = Number(e.target.dataset.index); 

	console.log(draggedShipIndex) 
	console.log(draggedShip)
};  

function allowDrop(e) {
  e.preventDefault();
} 

function drop(e) {
  e.preventDefault();  
  const data = e.dataTransfer.getData('text');  
}

carrier.addEventListener('mousedown', drag); 
carrier.addEventListener('dragstart', dragStart); 
carrier.addEventListener('dragend', dragEnd);

cells.forEach(element => {   
	element.addEventListener('dragover', dragOver)
	element.addEventListener('dragenter', dragEnter); 
	element.addEventListener('dragleave', dragLeave); 
	element.addEventListener('drop', dragDrop)
}); 

const dragDrop = (e) => {
	const cell = e.target;
	const p1Ship = p1.getFleet()[draggedShip.dataset.ship];
	const isHorizontal = p1Ship.getDirection() === 'horizontal';
	// get/adjust coords according to isHorizontal w/draggedShipIndex
	const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
	const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

	// place ship and get outcome
	const outcome = p1Board.placeShip(p1Ship, y, x);
	if (outcome) {
		// update grid
		gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
		addDragAndDropEvenListeners();
		// remove ship
		draggedShip.parentElement.removeChild(draggedShip);
		// show START button/ hide fleet-info if all ships are placed
		if (p1Board.areAllShipsPlaced()) {
			elements.startBtn.classList.add('show');
			elements.fleetInfo.classList.add('hide');
			elements.fleetInfo.classList.remove('show');
		}
	}
}; */
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTsgXG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpOyBcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7IFxuXG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKCkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJzsgIFxuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcgOiBudWxsOyBcblx0XHRncmlkMi5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQyKTtcblx0fSk7XG59O1xuXG5jb25zdCBtYXJrU3BvdHMgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Y29uc3QgY29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKTtcblx0Y29uc3QgcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5cdGJvYXJkMS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7IFxuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG5cblx0Ym9hcmQyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsOyBcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59OyBcblxuY29uc3Qgc2hvd01vZGFsID0gKGlucHV0KSA9PiB7IFxuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7IFxuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpOyBcblx0dGV4dC50ZXh0Q29udGVudCA9IGlucHV0O1xufTsgXG5cbmNvbnN0IHJlc3RhcnQgPSAoKSA9PiB7IFxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IFxuICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7IFxuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0IH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdO1xuXG5cdGNvbnN0IHBvcHVsYXRlQm9hcmQgPSAoKSA9PiB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0XHRjcmVhdGVTaGlwLmZsYXQoKS5tYXAoKHBvc2l0aW9ucykgPT4gKGJvYXJkW3Bvc2l0aW9uc10gPSAnc2hpcCcpKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciBhdHRhY2sgaGl0IGEgc2hpcFxuXHQvLyBFeGNsdWRlZCAnbWlzc2VkJ1xuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFthdHRhY2tdID09PSAnc2hpcCcpIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnaGl0Jztcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0cmVjZWl2ZUF0dGFja0hlbHBlcihhdHRhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ21pc3NlZCc7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdC8vIEZpbHRlcmluZyBib2FyZCBhcnJheSwgYW5kIGNoZWNraW5nIHdoZXRoZXIgMTcgcG9zaXRpb25zIGhhdmUgYmVlbiBoaXRcblx0Y29uc3QgYWxsU3VuayA9ICgpID0+IHtcblx0XHRjb25zdCBhcnIgPSBib2FyZC5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblx0XHRpZiAoYXJyLmxlbmd0aCA+PSAxNykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGhlbHBzIGFsbG9jYXRlIGF0dGFjayB0byBhcHByb3ByaWF0ZSBzaGlwXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2tIZWxwZXIgPSAoYXR0YWNrKSA9PiB7XG5cdFx0Y29uc3QgZmluZEFyciA9IGNyZWF0ZVNoaXAuZmlsdGVyKChjb3IpID0+IGNvci5pbmNsdWRlcyhhdHRhY2spKS5mbGF0KCk7XG5cblx0XHRjb25zdCBjaGVja0FyciA9IGZpbmRBcnIuc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDYXJyaWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0JhdHRsZXNoaXAgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ3J1aXNlciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tTdWJtYXJpbmUgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrRGVzdHJveWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjaGVja0FyciA9PT0gY2hlY2tDYXJyaWVyKSBjYXJyaWVyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQmF0dGxlc2hpcCkgYmF0dGxlc2hpcC5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0NydWlzZXIpIGNydWlzZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tTdWJtYXJpbmUpIHN1Ym1hcmluZS5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0Rlc3Ryb3llcikgZGVzdHJveWVyLmlzSGl0KGF0dGFjayk7XG5cdH07XG5cblx0Y29uc3Qgd2lkdGggPSAxMDtcblx0Y29uc3QgY2FyciA9IHtcblx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMsIDQgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMsIHdpZHRoICogNCBdIF1cblx0fTtcblxuXHRjb25zdCBnZW5lcmF0ZSA9ICgpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYXJyLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gY2Fyci5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIGNhcnIuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0Ym9hcmRbcmFuZG9tU3RhcnQgKyBlbGVtZW50XSA9ICdzaGlwJztcblx0XHRcdGNhcnJpZXIucGxhY2VDb29yZHMoWyByYW5kb21TdGFydCArIGVsZW1lbnQgXSk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0Z2VuZXJhdGUsXG5cdFx0Y3JlYXRlU2hpcFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG5cbi8qXG4gICAgICBjb25zdCBzID0gYm9hcmQuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnc2hpcCcpO1xuXHRcdFx0Y29uc3Qgb25lID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoX18sIGkpID0+IGkpO1xuXHRcdFx0c3VibWFyaW5lLnBsYWNlQ29vcmRzKG9uZSk7XG5cdFx0XHRwb3B1bGF0ZUJvYXJkKCk7ICovXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cdGNvbnN0IGJvYXJkUGxheWVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmRDb21wdXRlciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IHBsYXllckF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRQbGF5ZXJbYXR0YWNrXSAhPT0gJ2F0dGFja2VkJykge1xuXHRcdFx0Ym9hcmRQbGF5ZXJbYXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0XHRyZXR1cm4gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKTtcblx0XHR9XG5cdFx0cmV0dXJuICdpbGxlZ2FsIG1vdmUnO1xuXHR9O1xuXG5cdGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xuXHRcdGNvbnN0IGJvYXJkID0gYm9hcmRDb21wdXRlci5maWx0ZXIoKHNsb3QpID0+IHNsb3QgIT09ICdhdHRhY2tlZCcpO1xuXHRcdGNvbnN0IHJhbmRvbUF0dGFjayA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCldO1xuXHRcdGJvYXJkQ29tcHV0ZXJbcmFuZG9tQXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0Z2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQXR0YWNrKTtcblx0XHRyZXR1cm4gcmFuZG9tQXR0YWNrO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cGxheWVyQXR0YWNrLFxuXHRcdGNvbXB1dGVyQXR0YWNrLFxuXHRcdGJvYXJkQ29tcHV0ZXIsXG5cdFx0Ym9hcmRQbGF5ZXJcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcblxuLypcbmNvbnN0IGMgPSAoc2hpcCkgPT4ge1xuXHRpZiAoc2hpcCA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDUgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnU3VibWFyaW5lJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnRGVzdHJveWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDIgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKCdTcGVjaWZ5IHNoaXAnKTtcbn07XG4qL1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBzaGlwIG9iamVjdHNcbmZ1bmN0aW9uIFNoaXAoKSB7XG5cdGNvbnN0IHNoaXBDb29yZCA9IFtdO1xuICBcblx0Y29uc3QgcGxhY2VDb29yZHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcblx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7ICBcblx0fVxuXG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiBzaGlwQ29vcmRbaGl0XSA9ICdoaXQnO1xuXG5cdHJldHVybiB7IHNoaXBDb29yZCwgaXNTdW5rLCBpc0hpdCwgcGxhY2VDb29yZHMgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG5cdGxldCBhY3RpdmVQbGF5ZXIgPSAwOyBcblx0XG5cdC8vIENyZWF0aW5nIHBsYXllciBnYW1lYm9hcmRzXG5cdGNvbnN0IGJvYXJkMSA9IEdhbWVib2FyZCgpO1xuXHRjb25zdCBib2FyZDIgPSBHYW1lYm9hcmQoKTtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXJzXG5cdGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoYm9hcmQyKTtcblx0Y29uc3QgcGxheWVyMiA9IFBsYXllcihib2FyZDEpOyBcblxuXHQvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2NhcnJpZXInKTsgIFxuXHQvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2JhdHRsZXNoaXAnKTsgIFxuICAvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2NydWlzZXInKTsgIFxuICAvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ3N1Ym1hcmluZScpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnZGVzdHJveWVyJyk7ICBcblx0Ym9hcmQyLmdlbmVyYXRlKCk7XG5cdGNvbnNvbGUubG9nKGJvYXJkMi5ib2FyZCk7ICBcblx0Y29uc29sZS5sb2coYm9hcmQyLmJvYXJkLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgPT09ICdzaGlwJykpOyAgXG5cdGNvbnNvbGUubG9nKGJvYXJkMi5jcmVhdGVTaGlwKVxuXHRcblx0XG5cdFxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ0NvbXB1dGVyIGxvc3QuIFlvdSB3aW4hJyk7XG5cdFx0fSBlbHNlIGlmIChib2FyZDEuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBsb3N0ISBUaGUgZW5lbXkgaGFzIGRlZmVhdGVkIHlvdS4nKTtcblx0XHR9IGVsc2UgcGxheSgpO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gbG9vcCB0aGF0IHN3aXRjaGVzIHBsYXllciB0dXJuc1xuXHRmdW5jdGlvbiBwbGF5KCkge1xuXHRcdGNvbnN0IGNvbXB1dGVyID0gWyAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJykgXTtcblx0XHRjb25zdCBwbGF5ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0Y29tcHV0ZXIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHBsYXllcjEucGxheWVyQXR0YWNrKGkpO1xuXHRcdFx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcblx0XHRcdHBsYXllcjIuY29tcHV0ZXJBdHRhY2soKTtcblx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0fTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRhY3RpdmVQbGF5ZXIgPT09IDAgPyBwbGF5ZXJUdXJuKCkgOiBjb21wdXRlclR1cm4oKTtcblx0fVxuXHRjaGVjaygpO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHJlc3RhcnRzIGdhbWUgd2hlbiByZXN0YXJ0IGJ1dHRvbiBwcmVzc2VkXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRyZXN0YXJ0KCk7XG5cdGdhbWVMb29wKCk7XG59KTtcblxuLyogY29uc3QgY2VsbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpXTsgXG5cblxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwJykgXG5cbmxldCBkcmFnZ2VkU2hpcDsgXG5sZXQgZHJhZ2dlZFNoaXBJbmRleDsgXG5cbmNvbnN0IGRyYWdPdmVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZHJhZ0xlYXZlID0gKCkgPT4ge307XG4gIGNvbnN0IGRyYWdFbmQgPSAoKSA9PiB7fTsgXG5cblx0Y29uc3QgZHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICB9O1xuXG5mdW5jdGlvbiBkcmFnKGUpIHsgXG5cdGRyYWdnZWRTaGlwSW5kZXggPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCk7IFxuXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwSW5kZXgpIFxuXHRjb25zb2xlLmxvZyhkcmFnZ2VkU2hpcClcbn07ICBcblxuZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSBcblxuZnVuY3Rpb24gZHJvcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTsgIFxuICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpOyAgXG59XG5cbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZyk7IFxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpOyBcbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpO1xuXG5jZWxscy5mb3JFYWNoKGVsZW1lbnQgPT4geyAgIFxuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKTsgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTsgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKVxufSk7IFxuXG5jb25zdCBkcmFnRHJvcCA9IChlKSA9PiB7XG5cdGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblx0Y29uc3QgcDFTaGlwID0gcDEuZ2V0RmxlZXQoKVtkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXBdO1xuXHRjb25zdCBpc0hvcml6b250YWwgPSBwMVNoaXAuZ2V0RGlyZWN0aW9uKCkgPT09ICdob3Jpem9udGFsJztcblx0Ly8gZ2V0L2FkanVzdCBjb29yZHMgYWNjb3JkaW5nIHRvIGlzSG9yaXpvbnRhbCB3L2RyYWdnZWRTaGlwSW5kZXhcblx0Y29uc3QgeSA9IE51bWJlcihjZWxsLmRhdGFzZXQueSkgLSAoaXNIb3Jpem9udGFsID8gMCA6IGRyYWdnZWRTaGlwSW5kZXgpO1xuXHRjb25zdCB4ID0gTnVtYmVyKGNlbGwuZGF0YXNldC54KSAtIChpc0hvcml6b250YWwgPyBkcmFnZ2VkU2hpcEluZGV4IDogMCk7XG5cblx0Ly8gcGxhY2Ugc2hpcCBhbmQgZ2V0IG91dGNvbWVcblx0Y29uc3Qgb3V0Y29tZSA9IHAxQm9hcmQucGxhY2VTaGlwKHAxU2hpcCwgeSwgeCk7XG5cdGlmIChvdXRjb21lKSB7XG5cdFx0Ly8gdXBkYXRlIGdyaWRcblx0XHRnYW1lYm9hcmRWaWV3LnJlbmRlckdyaWQoZWxlbWVudHMucDFHcmlkLCBwMUJvYXJkLCBwMS5nZXRUeXBlKCkpO1xuXHRcdGFkZERyYWdBbmREcm9wRXZlbkxpc3RlbmVycygpO1xuXHRcdC8vIHJlbW92ZSBzaGlwXG5cdFx0ZHJhZ2dlZFNoaXAucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkcmFnZ2VkU2hpcCk7XG5cdFx0Ly8gc2hvdyBTVEFSVCBidXR0b24vIGhpZGUgZmxlZXQtaW5mbyBpZiBhbGwgc2hpcHMgYXJlIHBsYWNlZFxuXHRcdGlmIChwMUJvYXJkLmFyZUFsbFNoaXBzUGxhY2VkKCkpIHtcblx0XHRcdGVsZW1lbnRzLnN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblx0XHRcdGVsZW1lbnRzLmZsZWV0SW5mby5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHRlbGVtZW50cy5mbGVldEluZm8uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXHRcdH1cblx0fVxufTsgKi9cbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsImRpdiIsImFwcGVuZCIsIl9fYSIsImkiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsInNob3dNb2RhbCIsImlucHV0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVzdGFydCIsImlubmVySFRNTCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiY3JlYXRlU2hpcCIsInNoaXBDb29yZCIsInBvcHVsYXRlQm9hcmQiLCJmbGF0IiwibWFwIiwicG9zaXRpb25zIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiYXJyIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiY2hlY2tBcnIiLCJzb3J0IiwidG9TdHJpbmciLCJjaGVja0NhcnJpZXIiLCJjaGVja0JhdHRsZXNoaXAiLCJjaGVja0NydWlzZXIiLCJjaGVja1N1Ym1hcmluZSIsImNoZWNrRGVzdHJveWVyIiwiaXNIaXQiLCJ3aWR0aCIsImNhcnIiLCJuYW1lIiwiZGlyZWN0aW9ucyIsImdlbmVyYXRlIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiY3VycmVudCIsImRpcmVjdGlvbiIsInJhbmRvbVN0YXJ0IiwiYWJzIiwicGxhY2VDb29yZHMiLCJQbGF5ZXIiLCJnYW1lYm9hcmQiLCJib2FyZFBsYXllciIsImJvYXJkQ29tcHV0ZXIiLCJwbGF5ZXJBdHRhY2siLCJjb21wdXRlckF0dGFjayIsInNsb3QiLCJyYW5kb21BdHRhY2siLCJjb29yZGluYXRlcyIsImNvb3JkaW5hdGUiLCJwdXNoIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJnYW1lTG9vcCIsImFjdGl2ZVBsYXllciIsInBsYXllcjEiLCJwbGF5ZXIyIiwiY29uc29sZSIsImxvZyIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJUdXJuIl0sInNvdXJjZVJvb3QiOiIifQ==