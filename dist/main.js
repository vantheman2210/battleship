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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVREOztBQVdBLFFBQU1LLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDMUJULE1BQUFBLE9BQU8sQ0FBQ2YsY0FBUjtBQUNBcEUsTUFBQUEsc0RBQVMsQ0FBQ2QsTUFBTSxDQUFDSyxLQUFSLEVBQWVOLE1BQU0sQ0FBQ00sS0FBdEIsQ0FBVDtBQUNBK0YsTUFBQUEsVUFBVTtBQUNWLEtBSkQsQ0FiZSxDQW1CZjs7O0FBQ0FMLElBQUFBLFlBQVksS0FBSyxDQUFqQixHQUFxQlMsVUFBVSxFQUEvQixHQUFvQ0UsWUFBWSxFQUFoRDtBQUNBOztBQUNETCxFQUFBQSxLQUFLO0FBQ0wsQ0E5REQ7O0FBZ0VBUCxRQUFRLElBRVI7O0FBQ0FwRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUM4RyxnQkFBbkMsQ0FBb0QsT0FBcEQsRUFBNkQsWUFBTTtBQUNsRWpGLEVBQUFBLG9EQUFPO0FBQ1BzRSxFQUFBQSxRQUFRO0FBQ1IsQ0FIRDtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpOyBcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7IFxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTsgXG5cbmNvbnN0IHJlbmRlciA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHQvLyBDcmVhdGluZyB0d28gZ3JpZHMgZm9yIGRpc3BsYXlpbmcgYm9hcmRzXG5cdGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMS5jbGFzc05hbWUgPSAnZ3JpZDEnO1xuXHRjb25zdCBncmlkMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDIuY2xhc3NOYW1lID0gJ2dyaWQyJztcblxuXHRib2FyZDEuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczEnOyBcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpOyBcblx0XHRfX2EgPT09ICdzaGlwJyA/IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJyA6IG51bGw7IFxuXHRcdGdyaWQxLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDEpO1xuXHR9KTtcblxuXHRib2FyZDIuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczInOyAgXG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJyA6IG51bGw7IFxuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDsgXG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcblxuXHRib2FyZDIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFxuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7IFxuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcbn07IFxuXG5jb25zdCBzaG93TW9kYWwgPSAoaW5wdXQpID0+IHsgXG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTsgXG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7IFxuXHR0ZXh0LnRleHRDb250ZW50ID0gaW5wdXQ7XG59OyBcblxuY29uc3QgcmVzdGFydCA9ICgpID0+IHsgXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgXG4gIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTsgXG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG59XG5cbmV4cG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuLy8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gYm9hcmQsIGFuZCByZWNlaXZlcyBhdHRhY2tzLCBhbmQga2VlcGluZyB0cmFjayBvZiBtaXNzZWQgc2hvdHNcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0Y29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXG5cdGNvbnN0IGNhcnJpZXIgPSBTaGlwKCk7XG5cdGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCk7XG5cdGNvbnN0IGNydWlzZXIgPSBTaGlwKCk7XG5cdGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoKTtcblx0Y29uc3QgZGVzdHJveWVyID0gU2hpcCgpO1xuXG5cdGNvbnN0IGNyZWF0ZVNoaXAgPSBbXG5cdFx0Y2Fycmllci5zaGlwQ29vcmQsXG5cdFx0YmF0dGxlc2hpcC5zaGlwQ29vcmQsXG5cdFx0Y3J1aXNlci5zaGlwQ29vcmQsXG5cdFx0c3VibWFyaW5lLnNoaXBDb29yZCxcblx0XHRkZXN0cm95ZXIuc2hpcENvb3JkXG5cdF07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuICBcblx0Ly8gQXJyYXkgdGhhdCBjb250YWlucyBzaGlwcywgYW5kIHRoZWlyIGxlbmd0aHNcblx0Y29uc3Qgc2hpcEFyciA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMywgNCBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMywgd2lkdGggKiA0IF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2JhdHRsZXNoaXAnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnY3J1aXNlcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnc3VibWFyaW5lJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdkZXN0cm95ZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEgXSwgWyAwLCB3aWR0aCBdIF1cblx0XHR9XG5cdF07XG5cblx0Y29uc3Qgc2hpcENvb3JkID0gW107XG4gIC8vIE1hcHMgY29vcmRzIHRvIHNoaXBDb29yZCBhcnJheS4gVG8gYmUgdXNlZCBmb3IgY2hlY2tpbmcgaGl0cywgYW5kIHN1bmsuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcblx0bGV0IGFjdGl2ZVBsYXllciA9IDA7IFxuXHRcblx0Ly8gQ3JlYXRpbmcgcGxheWVyIGdhbWVib2FyZHNcblx0Y29uc3QgYm9hcmQxID0gR2FtZWJvYXJkKCk7XG5cdGNvbnN0IGJvYXJkMiA9IEdhbWVib2FyZCgpO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllcnNcblx0Y29uc3QgcGxheWVyMSA9IFBsYXllcihib2FyZDIpO1xuXHRjb25zdCBwbGF5ZXIyID0gUGxheWVyKGJvYXJkMSk7IFxuXG5cdC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnY2FycmllcicpOyAgXG5cdC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnYmF0dGxlc2hpcCcpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnY3J1aXNlcicpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnc3VibWFyaW5lJyk7ICBcbiAgLy8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdkZXN0cm95ZXInKTsgIFxuXHRib2FyZDIucGxhY2VDb21wdXRlcigpO1xuXHRjb25zb2xlLmxvZyhib2FyZDIuYm9hcmQuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gJ3NoaXAnKSk7XG5cdFxuXHRcblx0XG5cdC8vIFJlbmRlcmluZyBib2FyZHNcblx0cmVuZGVyKGJvYXJkMSwgYm9hcmQyKTtcblxuXHQvLyBGdW5jdGlvbiBmb3IgcGxheWVyIHR1cm5zXG5cdGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG5cdFx0YWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSAwID8gMSA6IDA7XG5cdH07XG5cblx0Ly8gQ2hlY2tpbmcgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0ZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0aWYgKGJvYXJkMi5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnQ29tcHV0ZXIgbG9zdC4gWW91IHdpbiEnKTtcblx0XHR9IGVsc2UgaWYgKGJvYXJkMS5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnWW91IGxvc3QhIFRoZSBlbmVteSBoYXMgZGVmZWF0ZWQgeW91LicpO1xuXHRcdH0gZWxzZSBwbGF5KCk7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiBsb29wIHRoYXQgc3dpdGNoZXMgcGxheWVyIHR1cm5zXG5cdGZ1bmN0aW9uIHBsYXkoKSB7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBbIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKSBdO1xuXHRcdGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRjb21wdXRlci5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0cGxheWVyMS5wbGF5ZXJBdHRhY2soaSk7XG5cdFx0XHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0cGxheWVyMi5jb21wdXRlckF0dGFjaygpO1xuXHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHR9O1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdGFjdGl2ZVBsYXllciA9PT0gMCA/IHBsYXllclR1cm4oKSA6IGNvbXB1dGVyVHVybigpO1xuXHR9XG5cdGNoZWNrKCk7XG59O1xuXG5nYW1lTG9vcCgpO1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgcmVzdGFydHMgZ2FtZSB3aGVuIHJlc3RhcnQgYnV0dG9uIHByZXNzZWRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHJlc3RhcnQoKTtcblx0Z2FtZUxvb3AoKTtcbn0pO1xuXG4vKiBjb25zdCBjZWxscyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyldOyBcblxuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAnKSBcblxubGV0IGRyYWdnZWRTaGlwOyBcbmxldCBkcmFnZ2VkU2hpcEluZGV4OyBcblxuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnTGVhdmUgPSAoKSA9PiB7fTtcbiAgY29uc3QgZHJhZ0VuZCA9ICgpID0+IHt9OyBcblxuXHRjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICAgIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIH07XG5cbmZ1bmN0aW9uIGRyYWcoZSkgeyBcblx0ZHJhZ2dlZFNoaXBJbmRleCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KTsgXG5cblx0Y29uc29sZS5sb2coZHJhZ2dlZFNoaXBJbmRleCkgXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKVxufTsgIFxuXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59IFxuXG5mdW5jdGlvbiBkcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXG4gIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7ICBcbn1cblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBkcmFnKTsgXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCk7IFxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCk7XG5cbmNlbGxzLmZvckVhY2goZWxlbWVudCA9PiB7ICAgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcilcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApXG59KTsgXG5cbmNvbnN0IGRyYWdEcm9wID0gKGUpID0+IHtcblx0Y29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXHRjb25zdCBwMVNoaXAgPSBwMS5nZXRGbGVldCgpW2RyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcF07XG5cdGNvbnN0IGlzSG9yaXpvbnRhbCA9IHAxU2hpcC5nZXREaXJlY3Rpb24oKSA9PT0gJ2hvcml6b250YWwnO1xuXHQvLyBnZXQvYWRqdXN0IGNvb3JkcyBhY2NvcmRpbmcgdG8gaXNIb3Jpem9udGFsIHcvZHJhZ2dlZFNoaXBJbmRleFxuXHRjb25zdCB5ID0gTnVtYmVyKGNlbGwuZGF0YXNldC55KSAtIChpc0hvcml6b250YWwgPyAwIDogZHJhZ2dlZFNoaXBJbmRleCk7XG5cdGNvbnN0IHggPSBOdW1iZXIoY2VsbC5kYXRhc2V0LngpIC0gKGlzSG9yaXpvbnRhbCA/IGRyYWdnZWRTaGlwSW5kZXggOiAwKTtcblxuXHQvLyBwbGFjZSBzaGlwIGFuZCBnZXQgb3V0Y29tZVxuXHRjb25zdCBvdXRjb21lID0gcDFCb2FyZC5wbGFjZVNoaXAocDFTaGlwLCB5LCB4KTtcblx0aWYgKG91dGNvbWUpIHtcblx0XHQvLyB1cGRhdGUgZ3JpZFxuXHRcdGdhbWVib2FyZFZpZXcucmVuZGVyR3JpZChlbGVtZW50cy5wMUdyaWQsIHAxQm9hcmQsIHAxLmdldFR5cGUoKSk7XG5cdFx0YWRkRHJhZ0FuZERyb3BFdmVuTGlzdGVuZXJzKCk7XG5cdFx0Ly8gcmVtb3ZlIHNoaXBcblx0XHRkcmFnZ2VkU2hpcC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRyYWdnZWRTaGlwKTtcblx0XHQvLyBzaG93IFNUQVJUIGJ1dHRvbi8gaGlkZSBmbGVldC1pbmZvIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG5cdFx0aWYgKHAxQm9hcmQuYXJlQWxsU2hpcHNQbGFjZWQoKSkge1xuXHRcdFx0ZWxlbWVudHMuc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0ZWxlbWVudHMuZmxlZXRJbmZvLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdGVsZW1lbnRzLmZsZWV0SW5mby5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cdFx0fVxuXHR9XG59OyAqL1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJtb2RhbCIsInJlbmRlciIsImJvYXJkMSIsImJvYXJkMiIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImdyaWQyIiwiYm9hcmQiLCJmb3JFYWNoIiwiX19hIiwiaSIsImRpdiIsInRleHRDb250ZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmQiLCJtYXJrU3BvdHMiLCJjb21wIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllciIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJjcmVhdGVTaGlwIiwic2hpcENvb3JkIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiYXJyIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwIiwic2hpcDIiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJkaXJlY3Rpb25zIiwiY3VycmVudCIsImRpcmVjdGlvbiIsInJhbmRvbVN0YXJ0IiwiYWJzIiwibGVmdCIsInNvbWUiLCJpbmRleCIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsIlBsYXllciIsImdhbWVib2FyZCIsImJvYXJkUGxheWVyIiwiYm9hcmRDb21wdXRlciIsInBsYXllckF0dGFjayIsImNvbXB1dGVyQXR0YWNrIiwic2xvdCIsInJhbmRvbUF0dGFjayIsIndpZHRoIiwibmFtZSIsImNvb3JkaW5hdGVzIiwibWFwIiwiY29vcmRpbmF0ZSIsInB1c2giLCJpc1N1bmsiLCJldmVyeSIsImhpdCIsImdhbWVMb29wIiwiYWN0aXZlUGxheWVyIiwicGxheWVyMSIsInBsYXllcjIiLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlVHVybiIsImNoZWNrIiwicGxheSIsImNvbXB1dGVyIiwicGxheWVyVHVybiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wdXRlclR1cm4iXSwic291cmNlUm9vdCI6IiJ9