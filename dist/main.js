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
/* harmony export */   "restart": () => (/* binding */ restart),
/* harmony export */   "rotate": () => (/* binding */ rotate)
/* harmony export */ });
/* eslint-disable no-unused-expressions */
// Selecting elements
var container = document.querySelector('.container');
var text = document.querySelector('p');
var modal = document.querySelector('.modal');
var carrier = document.querySelector('.carrierContainer');
var battleship = document.querySelector('.battleshipContainer');
var cruiser = document.querySelector('.cruiserContainer');
var submarine = document.querySelector('.submarineContainer');
var destroyer = document.querySelector('.destroyerContainer');

var render = function render(board1, board2) {
  // Creating two grids for displaying boards
  var grid1 = document.createElement('grid');
  grid1.className = 'grid1';
  var grid2 = document.createElement('grid');
  grid2.className = 'grid2';
  board1.board.forEach(function (__a, i) {
    var div = document.createElement('div');
    div.className = 'cells1';
    div.textContent = i;
    __a === 'ship' ? div.style.backgroundColor = 'red' : null;
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

var horizontal = false;

var rotate = function rotate(e) {
  if (e.target.className === 'carrier') carrier.classList.toggle("carrierContainer-horizontal");
  if (e.target.className === 'battleship') battleship.classList.toggle("battleshipContainer-horizontal");
  if (e.target.className === 'cruiser') cruiser.classList.toggle("cruiserContainer-horizontal");
  if (e.target.className === 'submarine') submarine.classList.toggle("submarineContainer-horizontal");
  if (e.target.className === 'destroyer') destroyer.classList.toggle("destroyerContainer-horizontal");
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
  var createShip = [carrier.shipCoord, battleship.shipCoord, cruiser.shipCoord, submarine.shipCoord, destroyer.shipCoord]; // Function that determines whether attack hit a ship
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
  }; // Function that generates a single ship on board


  var generate = function generate(ship, ship2) {
    var random = Math.floor(Math.random() * ship.directions.length);
    var current = ship.directions[random];
    var direction = 0;
    if (random === 0) direction = 1;
    if (random === 1) direction = 10;
    var randomStart = Math.abs(Math.floor(Math.random() * board.length - ship.directions[0].length * direction));
    var left = current.some(function (index) {
      return (randomStart + index) % 10 === 0;
    });
    var right = current.some(function (index) {
      return (randomStart + index) % 10 === 10 - 1;
    });
    var notAvailable = current.some(function (index) {
      return board[randomStart + index] === 'ship';
    });
    if (!left && !right && !notAvailable || left && right && !notAvailable && random === 1) current.forEach(function (element) {
      board[randomStart + element] = 'ship';
      ship2.placeCoords([randomStart + element]);
    });else generate(ship, ship2);
  }; // Function that places all five computer ships at once


  var placeComputer = function placeComputer() {
    generate(carrier.shipArr[0], carrier);
    generate(battleship.shipArr[1], battleship);
    generate(cruiser.shipArr[2], cruiser);
    generate(submarine.shipArr[3], submarine);
    generate(destroyer.shipArr[4], destroyer);
  };

  return {
    receiveAttack: receiveAttack,
    allSunk: allSunk,
    board: board,
    placeComputer: placeComputer,
    createShip: createShip
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

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
  var width = 10; // Array that contains ships, and their lengths

  var shipArr = [{
    name: 'carrier',
    directions: [[0, 1, 2, 3, 4], [0, width, width * 2, width * 3, width * 4]]
  }, {
    name: 'battleship',
    directions: [[0, 1, 2, 3], [0, width, width * 2, width * 3]]
  }, {
    name: 'cruiser',
    directions: [[0, 1, 2], [0, width, width * 2]]
  }, {
    name: 'submarine',
    directions: [[0, 1, 2], [0, width, width * 2]]
  }, {
    name: 'destroyer',
    directions: [[0, 1], [0, width]]
  }];
  var shipCoord = []; // Maps coords to shipCoord array. To be used for checking hits, and sunk.

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
    placeCoords: placeCoords,
    shipArr: shipArr
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

  board2.placeComputer();
  console.log(board2.board.filter(function (element) {
    return element === 'ship';
  })); // Rendering boards

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
var carrier = document.querySelector('.carrierContainer');
var battleship = document.querySelector('.battleshipContainer');
var cruiser = document.querySelector('.cruiserContainer');
var submarine = document.querySelector('.submarineContainer');
var destroyer = document.querySelector('.destroyerContainer');
carrier.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
battleship.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
cruiser.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
submarine.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
destroyer.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi8gXG4vLyBTZWxlY3RpbmcgZWxlbWVudHNcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTsgXG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpOyBcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7ICBcbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpOyBcbmNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcENvbnRhaW5lcicpO1xuY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyQ29udGFpbmVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lQ29udGFpbmVyJyk7XG5jb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyQ29udGFpbmVyJyk7XG5cbmNvbnN0IHJlbmRlciA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHQvLyBDcmVhdGluZyB0d28gZ3JpZHMgZm9yIGRpc3BsYXlpbmcgYm9hcmRzXG5cdGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMS5jbGFzc05hbWUgPSAnZ3JpZDEnO1xuXHRjb25zdCBncmlkMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDIuY2xhc3NOYW1lID0gJ2dyaWQyJztcblxuXHRib2FyZDEuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczEnOyBcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpOyBcblx0XHRfX2EgPT09ICdzaGlwJyA/IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJyA6IG51bGw7IFxuXHRcdGdyaWQxLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDEpO1xuXHR9KTtcblxuXHRib2FyZDIuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczInOyAgXG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJyA6IG51bGw7IFxuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDsgXG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcblxuXHRib2FyZDIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFxuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7IFxuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcbn07IFxuXG5jb25zdCBzaG93TW9kYWwgPSAoaW5wdXQpID0+IHsgXG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTsgXG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7IFxuXHR0ZXh0LnRleHRDb250ZW50ID0gaW5wdXQ7XG59OyBcblxuY29uc3QgcmVzdGFydCA9ICgpID0+IHsgXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgXG4gIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTsgXG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG59IFxubGV0IGhvcml6b250YWwgPSBmYWxzZTtcbmNvbnN0IHJvdGF0ZSA9IChlKSA9PiB7IFxuXHRpZihlLnRhcmdldC5jbGFzc05hbWUgPT09ICdjYXJyaWVyJylcblx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2JhdHRsZXNoaXAnKVxuXHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0aWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSAnY3J1aXNlcicpXG5cdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRpZihlLnRhcmdldC5jbGFzc05hbWUgPT09ICdzdWJtYXJpbmUnKVxuXHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2Rlc3Ryb3llcicpXG5cdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByb3RhdGUgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuLy8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gYm9hcmQsIGFuZCByZWNlaXZlcyBhdHRhY2tzLCBhbmQga2VlcGluZyB0cmFjayBvZiBtaXNzZWQgc2hvdHNcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0Y29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXG5cdGNvbnN0IGNhcnJpZXIgPSBTaGlwKCk7XG5cdGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCk7XG5cdGNvbnN0IGNydWlzZXIgPSBTaGlwKCk7XG5cdGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoKTtcblx0Y29uc3QgZGVzdHJveWVyID0gU2hpcCgpO1xuXG5cdGNvbnN0IGNyZWF0ZVNoaXAgPSBbXG5cdFx0Y2Fycmllci5zaGlwQ29vcmQsXG5cdFx0YmF0dGxlc2hpcC5zaGlwQ29vcmQsXG5cdFx0Y3J1aXNlci5zaGlwQ29vcmQsXG5cdFx0c3VibWFyaW5lLnNoaXBDb29yZCxcblx0XHRkZXN0cm95ZXIuc2hpcENvb3JkXG5cdF07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuICBcblx0Ly8gQXJyYXkgdGhhdCBjb250YWlucyBzaGlwcywgYW5kIHRoZWlyIGxlbmd0aHNcblx0Y29uc3Qgc2hpcEFyciA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMywgNCBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMywgd2lkdGggKiA0IF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2JhdHRsZXNoaXAnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnY3J1aXNlcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnc3VibWFyaW5lJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdkZXN0cm95ZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEgXSwgWyAwLCB3aWR0aCBdIF1cblx0XHR9XG5cdF07XG5cblx0Y29uc3Qgc2hpcENvb3JkID0gW107XG4gIC8vIE1hcHMgY29vcmRzIHRvIHNoaXBDb29yZCBhcnJheS4gVG8gYmUgdXNlZCBmb3IgY2hlY2tpbmcgaGl0cywgYW5kIHN1bmsuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgcm90YXRlIH0gZnJvbSAnLi9kb21Db250cm9sJztcblxuLy8gRnVuY3Rpb24gdGhhdCBjb250cm9scyBlbnRpcmUgZ2FtZUxvb3BcbmNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xuXHRsZXQgYWN0aXZlUGxheWVyID0gMDsgXG5cdFxuXHQvLyBDcmVhdGluZyBwbGF5ZXIgZ2FtZWJvYXJkc1xuXHRjb25zdCBib2FyZDEgPSBHYW1lYm9hcmQoKTtcblx0Y29uc3QgYm9hcmQyID0gR2FtZWJvYXJkKCk7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyc1xuXHRjb25zdCBwbGF5ZXIxID0gUGxheWVyKGJvYXJkMik7XG5cdGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoYm9hcmQxKTsgXG5cblx0Ly8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdjYXJyaWVyJyk7ICBcblx0Ly8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdiYXR0bGVzaGlwJyk7ICBcbiAgLy8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdjcnVpc2VyJyk7ICBcbiAgLy8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdzdWJtYXJpbmUnKTsgIFxuICAvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2Rlc3Ryb3llcicpOyAgXG5cdGJvYXJkMi5wbGFjZUNvbXB1dGVyKCk7XG5cdGNvbnNvbGUubG9nKGJvYXJkMi5ib2FyZC5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50ID09PSAnc2hpcCcpKTtcblx0XG5cdFxuXHRcblx0Ly8gUmVuZGVyaW5nIGJvYXJkc1xuXHRyZW5kZXIoYm9hcmQxLCBib2FyZDIpO1xuXG5cdC8vIEZ1bmN0aW9uIGZvciBwbGF5ZXIgdHVybnNcblx0Y29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcblx0XHRhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcblx0fTtcblxuXHQvLyBDaGVja2luZyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHRmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRpZiAoYm9hcmQyLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdDb21wdXRlciBsb3N0LiBZb3Ugd2luIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdZb3UgbG9zdCEgVGhlIGVuZW15IGhhcyBkZWZlYXRlZCB5b3UuJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHRwbGF5ZXIxLnBsYXllckF0dGFjayhpKTtcblx0XHRcdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCk7XG5cdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdH07XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0YWN0aXZlUGxheWVyID09PSAwID8gcGxheWVyVHVybigpIDogY29tcHV0ZXJUdXJuKCk7XG5cdH1cblx0Y2hlY2soKTtcbn07XG5cbmdhbWVMb29wKCk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCByZXN0YXJ0cyBnYW1lIHdoZW4gcmVzdGFydCBidXR0b24gcHJlc3NlZFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cmVzdGFydCgpO1xuXHRnYW1lTG9vcCgpO1xufSk7IFxuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXJDb250YWluZXInKTsgIFxuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5iYXR0bGVzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmNydWlzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuc3VibWFyaW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmRlc3Ryb3llci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG4vKiBjb25zdCBjZWxscyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyldOyBcblxuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAnKSBcblxubGV0IGRyYWdnZWRTaGlwOyBcbmxldCBkcmFnZ2VkU2hpcEluZGV4OyBcblxuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnTGVhdmUgPSAoKSA9PiB7fTtcbiAgY29uc3QgZHJhZ0VuZCA9ICgpID0+IHt9OyBcblxuXHRjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICAgIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIH07XG5cbmZ1bmN0aW9uIGRyYWcoZSkgeyBcblx0ZHJhZ2dlZFNoaXBJbmRleCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KTsgXG5cblx0Y29uc29sZS5sb2coZHJhZ2dlZFNoaXBJbmRleCkgXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKVxufTsgIFxuXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59IFxuXG5mdW5jdGlvbiBkcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXG4gIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7ICBcbn1cblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBkcmFnKTsgXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCk7IFxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCk7XG5cbmNlbGxzLmZvckVhY2goZWxlbWVudCA9PiB7ICAgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcilcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApXG59KTsgXG5cbmNvbnN0IGRyYWdEcm9wID0gKGUpID0+IHtcblx0Y29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXHRjb25zdCBwMVNoaXAgPSBwMS5nZXRGbGVldCgpW2RyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcF07XG5cdGNvbnN0IGlzSG9yaXpvbnRhbCA9IHAxU2hpcC5nZXREaXJlY3Rpb24oKSA9PT0gJ2hvcml6b250YWwnO1xuXHQvLyBnZXQvYWRqdXN0IGNvb3JkcyBhY2NvcmRpbmcgdG8gaXNIb3Jpem9udGFsIHcvZHJhZ2dlZFNoaXBJbmRleFxuXHRjb25zdCB5ID0gTnVtYmVyKGNlbGwuZGF0YXNldC55KSAtIChpc0hvcml6b250YWwgPyAwIDogZHJhZ2dlZFNoaXBJbmRleCk7XG5cdGNvbnN0IHggPSBOdW1iZXIoY2VsbC5kYXRhc2V0LngpIC0gKGlzSG9yaXpvbnRhbCA/IGRyYWdnZWRTaGlwSW5kZXggOiAwKTtcblxuXHQvLyBwbGFjZSBzaGlwIGFuZCBnZXQgb3V0Y29tZVxuXHRjb25zdCBvdXRjb21lID0gcDFCb2FyZC5wbGFjZVNoaXAocDFTaGlwLCB5LCB4KTtcblx0aWYgKG91dGNvbWUpIHtcblx0XHQvLyB1cGRhdGUgZ3JpZFxuXHRcdGdhbWVib2FyZFZpZXcucmVuZGVyR3JpZChlbGVtZW50cy5wMUdyaWQsIHAxQm9hcmQsIHAxLmdldFR5cGUoKSk7XG5cdFx0YWRkRHJhZ0FuZERyb3BFdmVuTGlzdGVuZXJzKCk7XG5cdFx0Ly8gcmVtb3ZlIHNoaXBcblx0XHRkcmFnZ2VkU2hpcC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRyYWdnZWRTaGlwKTtcblx0XHQvLyBzaG93IFNUQVJUIGJ1dHRvbi8gaGlkZSBmbGVldC1pbmZvIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG5cdFx0aWYgKHAxQm9hcmQuYXJlQWxsU2hpcHNQbGFjZWQoKSkge1xuXHRcdFx0ZWxlbWVudHMuc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0ZWxlbWVudHMuZmxlZXRJbmZvLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdGVsZW1lbnRzLmZsZWV0SW5mby5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cdFx0fVxuXHR9XG59OyAqL1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJtb2RhbCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInJlbmRlciIsImJvYXJkMSIsImJvYXJkMiIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImdyaWQyIiwiYm9hcmQiLCJmb3JFYWNoIiwiX19hIiwiaSIsImRpdiIsInRleHRDb250ZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmQiLCJtYXJrU3BvdHMiLCJjb21wIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllciIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsImUiLCJ0YXJnZXQiLCJTaGlwIiwiR2FtZWJvYXJkIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrIiwicmVjZWl2ZUF0dGFja0hlbHBlciIsImFsbFN1bmsiLCJhcnIiLCJmaWx0ZXIiLCJmaW5kQXJyIiwiY29yIiwiaW5jbHVkZXMiLCJmbGF0IiwiY2hlY2tBcnIiLCJzb3J0IiwidG9TdHJpbmciLCJjaGVja0NhcnJpZXIiLCJjaGVja0JhdHRsZXNoaXAiLCJjaGVja0NydWlzZXIiLCJjaGVja1N1Ym1hcmluZSIsImNoZWNrRGVzdHJveWVyIiwiaXNIaXQiLCJnZW5lcmF0ZSIsInNoaXAiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsImluZGV4IiwicmlnaHQiLCJub3RBdmFpbGFibGUiLCJwbGFjZUNvb3JkcyIsInBsYWNlQ29tcHV0ZXIiLCJzaGlwQXJyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJuYW1lIiwiY29vcmRpbmF0ZXMiLCJtYXAiLCJjb29yZGluYXRlIiwicHVzaCIsImlzU3VuayIsImV2ZXJ5IiwiaGl0IiwiZ2FtZUxvb3AiLCJhY3RpdmVQbGF5ZXIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNvbnNvbGUiLCJsb2ciLCJjaGFuZ2VUdXJuIiwiY2hlY2siLCJwbGF5IiwiY29tcHV0ZXIiLCJwbGF5ZXJUdXJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXB1dGVyVHVybiJdLCJzb3VyY2VSb290IjoiIn0=