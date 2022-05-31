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
  };

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
  };

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
  var width = 10;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsU0FBZkEsWUFBZSxHQUFNO0FBQzFCVCxNQUFBQSxPQUFPLENBQUNmLGNBQVI7QUFDQXBFLE1BQUFBLHNEQUFTLENBQUNkLE1BQU0sQ0FBQ0ssS0FBUixFQUFlTixNQUFNLENBQUNNLEtBQXRCLENBQVQ7QUFDQStGLE1BQUFBLFVBQVU7QUFDVixLQUpELENBYmUsQ0FtQmY7OztBQUNBTCxJQUFBQSxZQUFZLEtBQUssQ0FBakIsR0FBcUJTLFVBQVUsRUFBL0IsR0FBb0NFLFlBQVksRUFBaEQ7QUFDQTs7QUFDREwsRUFBQUEsS0FBSztBQUNMLENBOUREOztBQWdFQVAsUUFBUSxJQUVSOztBQUNBcEcsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DOEcsZ0JBQW5DLENBQW9ELE9BQXBELEVBQTZELFlBQU07QUFDbEVqRixFQUFBQSxvREFBTztBQUNQc0UsRUFBQUEsUUFBUTtBQUNSLENBSEQ7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTsgXG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpOyBcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7IFxuXG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJzsgXG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTsgXG5cdFx0X19hID09PSAnc2hpcCcgPyBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcgOiBudWxsOyBcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJzsgIFxuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcgOiBudWxsOyBcblx0XHRncmlkMi5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQyKTtcblx0fSk7XG59O1xuXG5jb25zdCBtYXJrU3BvdHMgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Y29uc3QgY29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKTtcblx0Y29uc3QgcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5cdGJvYXJkMS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7IFxuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG5cblx0Ym9hcmQyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsOyBcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59OyBcblxuY29uc3Qgc2hvd01vZGFsID0gKGlucHV0KSA9PiB7IFxuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7IFxuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpOyBcblx0dGV4dC50ZXh0Q29udGVudCA9IGlucHV0O1xufTsgXG5cbmNvbnN0IHJlc3RhcnQgPSAoKSA9PiB7IFxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IFxuICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7IFxuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0IH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdO1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIGF0dGFjayBoaXQgYSBzaGlwXG5cdC8vIEV4Y2x1ZGVkICdtaXNzZWQnXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkW2F0dGFja10gPT09ICdzaGlwJykge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdoaXQnO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG5cdFx0XHRyZWNlaXZlQXR0YWNrSGVscGVyKGF0dGFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnbWlzc2VkJztcblx0XHR9XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0Ly8gRmlsdGVyaW5nIGJvYXJkIGFycmF5LCBhbmQgY2hlY2tpbmcgd2hldGhlciAxNyBwb3NpdGlvbnMgaGF2ZSBiZWVuIGhpdFxuXHRjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuXHRcdGNvbnN0IGFyciA9IGJvYXJkLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXHRcdGlmIChhcnIubGVuZ3RoID49IDE3KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgaGVscHMgYWxsb2NhdGUgYXR0YWNrIHRvIGFwcHJvcHJpYXRlIHNoaXBcblx0Y29uc3QgcmVjZWl2ZUF0dGFja0hlbHBlciA9IChhdHRhY2spID0+IHtcblx0XHRjb25zdCBmaW5kQXJyID0gY3JlYXRlU2hpcC5maWx0ZXIoKGNvcikgPT4gY29yLmluY2x1ZGVzKGF0dGFjaykpLmZsYXQoKTtcblxuXHRcdGNvbnN0IGNoZWNrQXJyID0gZmluZEFyci5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NhcnJpZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDcnVpc2VyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja1N1Ym1hcmluZSA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tEZXN0cm95ZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXG5cdFx0aWYgKGNoZWNrQXJyID09PSBjaGVja0NhcnJpZXIpIGNhcnJpZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tCYXR0bGVzaGlwKSBiYXR0bGVzaGlwLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ3J1aXNlcikgY3J1aXNlci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja1N1Ym1hcmluZSkgc3VibWFyaW5lLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrRGVzdHJveWVyKSBkZXN0cm95ZXIuaXNIaXQoYXR0YWNrKTtcblx0fTtcblxuXHRjb25zdCBnZW5lcmF0ZSA9IChzaGlwLCBzaGlwMikgPT4ge1xuXHRcdGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXAuZGlyZWN0aW9ucy5sZW5ndGgpO1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBzaGlwLmRpcmVjdGlvbnNbcmFuZG9tXTtcblx0XHRsZXQgZGlyZWN0aW9uID0gMDtcblx0XHRpZiAocmFuZG9tID09PSAwKSBkaXJlY3Rpb24gPSAxO1xuXHRcdGlmIChyYW5kb20gPT09IDEpIGRpcmVjdGlvbiA9IDEwO1xuXHRcdGNvbnN0IHJhbmRvbVN0YXJ0ID0gTWF0aC5hYnMoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoIC0gc2hpcC5kaXJlY3Rpb25zWzBdLmxlbmd0aCAqIGRpcmVjdGlvbikpO1xuXG5cdFx0Y29uc3QgbGVmdCA9IGN1cnJlbnQuc29tZShpbmRleCA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7ICBcblx0XHRjb25zdCByaWdodCA9IGN1cnJlbnQuc29tZShpbmRleCA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTsgXG5cdFx0Y29uc3Qgbm90QXZhaWxhYmxlID0gY3VycmVudC5zb21lKGluZGV4ID0+IGJvYXJkW3JhbmRvbVN0YXJ0ICsgaW5kZXhdID09PSAnc2hpcCcpO1xuXG5cdFx0aWYoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUgfHwgKGxlZnQgJiYgcmlnaHQgJiYgIW5vdEF2YWlsYWJsZSAmJiByYW5kb20gPT09IDEpKVxuXG5cdFx0Y3VycmVudC5mb3JFYWNoKChlbGVtZW50KSA9PiB7IFxuXHRcdFx0Ym9hcmRbcmFuZG9tU3RhcnQgKyBlbGVtZW50XSA9ICdzaGlwJztcblx0XHRcdHNoaXAyLnBsYWNlQ29vcmRzKFsgcmFuZG9tU3RhcnQgKyBlbGVtZW50IF0pO1xuXHRcdH0pOyBcblx0XHRlbHNlIFxuXHRcdGdlbmVyYXRlKHNoaXAsIHNoaXAyKTtcblx0fTtcblxuXHRjb25zdCBwbGFjZUNvbXB1dGVyID0gKCkgPT4ge1xuXHRcdGdlbmVyYXRlKGNhcnJpZXIuc2hpcEFyclswXSwgY2Fycmllcik7XG5cdFx0IGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0IGdlbmVyYXRlKGNydWlzZXIuc2hpcEFyclsyXSwgY3J1aXNlcik7XG5cdFx0IGdlbmVyYXRlKHN1Ym1hcmluZS5zaGlwQXJyWzNdLCBzdWJtYXJpbmUpO1xuXHRcdCBnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuXG4vKlxuICAgICAgY29uc3QgcyA9IGJvYXJkLmZpbHRlcigoc2xvdCkgPT4gc2xvdCAhPT0gJ3NoaXAnKTtcblx0XHRcdGNvbnN0IG9uZSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKF9fLCBpKSA9PiBpKTtcblx0XHRcdHN1Ym1hcmluZS5wbGFjZUNvb3JkcyhvbmUpO1xuXHRcdFx0cG9wdWxhdGVCb2FyZCgpOyAqL1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuXG5cdGNvbnN0IHNoaXBBcnIgPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NhcnJpZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMsIDQgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMsIHdpZHRoICogNCBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdiYXR0bGVzaGlwJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NydWlzZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3N1Ym1hcmluZScsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnZGVzdHJveWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxIF0sIFsgMCwgd2lkdGggXSBdXG5cdFx0fVxuXHRdO1xuXG5cdGNvbnN0IHNoaXBDb29yZCA9IFtdO1xuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcblx0bGV0IGFjdGl2ZVBsYXllciA9IDA7IFxuXHRcblx0Ly8gQ3JlYXRpbmcgcGxheWVyIGdhbWVib2FyZHNcblx0Y29uc3QgYm9hcmQxID0gR2FtZWJvYXJkKCk7XG5cdGNvbnN0IGJvYXJkMiA9IEdhbWVib2FyZCgpO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllcnNcblx0Y29uc3QgcGxheWVyMSA9IFBsYXllcihib2FyZDIpO1xuXHRjb25zdCBwbGF5ZXIyID0gUGxheWVyKGJvYXJkMSk7IFxuXG5cdC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnY2FycmllcicpOyAgXG5cdC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnYmF0dGxlc2hpcCcpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnY3J1aXNlcicpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnc3VibWFyaW5lJyk7ICBcbiAgLy8gYm9hcmQyLmNvbXB1dGVyUGxhY2VtZW50KCdkZXN0cm95ZXInKTsgIFxuXHRib2FyZDIucGxhY2VDb21wdXRlcigpO1xuXHRjb25zb2xlLmxvZyhib2FyZDIuYm9hcmQuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gJ3NoaXAnKSk7XG5cdFxuXHRcblx0XG5cdC8vIFJlbmRlcmluZyBib2FyZHNcblx0cmVuZGVyKGJvYXJkMSwgYm9hcmQyKTtcblxuXHQvLyBGdW5jdGlvbiBmb3IgcGxheWVyIHR1cm5zXG5cdGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG5cdFx0YWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSAwID8gMSA6IDA7XG5cdH07XG5cblx0Ly8gQ2hlY2tpbmcgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0ZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0aWYgKGJvYXJkMi5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnQ29tcHV0ZXIgbG9zdC4gWW91IHdpbiEnKTtcblx0XHR9IGVsc2UgaWYgKGJvYXJkMS5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnWW91IGxvc3QhIFRoZSBlbmVteSBoYXMgZGVmZWF0ZWQgeW91LicpO1xuXHRcdH0gZWxzZSBwbGF5KCk7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiBsb29wIHRoYXQgc3dpdGNoZXMgcGxheWVyIHR1cm5zXG5cdGZ1bmN0aW9uIHBsYXkoKSB7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBbIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKSBdO1xuXHRcdGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRjb21wdXRlci5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0cGxheWVyMS5wbGF5ZXJBdHRhY2soaSk7XG5cdFx0XHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0cGxheWVyMi5jb21wdXRlckF0dGFjaygpO1xuXHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHR9O1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdGFjdGl2ZVBsYXllciA9PT0gMCA/IHBsYXllclR1cm4oKSA6IGNvbXB1dGVyVHVybigpO1xuXHR9XG5cdGNoZWNrKCk7XG59O1xuXG5nYW1lTG9vcCgpO1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgcmVzdGFydHMgZ2FtZSB3aGVuIHJlc3RhcnQgYnV0dG9uIHByZXNzZWRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHJlc3RhcnQoKTtcblx0Z2FtZUxvb3AoKTtcbn0pO1xuXG4vKiBjb25zdCBjZWxscyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyldOyBcblxuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAnKSBcblxubGV0IGRyYWdnZWRTaGlwOyBcbmxldCBkcmFnZ2VkU2hpcEluZGV4OyBcblxuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnTGVhdmUgPSAoKSA9PiB7fTtcbiAgY29uc3QgZHJhZ0VuZCA9ICgpID0+IHt9OyBcblxuXHRjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICAgIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIH07XG5cbmZ1bmN0aW9uIGRyYWcoZSkgeyBcblx0ZHJhZ2dlZFNoaXBJbmRleCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KTsgXG5cblx0Y29uc29sZS5sb2coZHJhZ2dlZFNoaXBJbmRleCkgXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKVxufTsgIFxuXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59IFxuXG5mdW5jdGlvbiBkcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXG4gIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7ICBcbn1cblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBkcmFnKTsgXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCk7IFxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCk7XG5cbmNlbGxzLmZvckVhY2goZWxlbWVudCA9PiB7ICAgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcilcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpOyBcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApXG59KTsgXG5cbmNvbnN0IGRyYWdEcm9wID0gKGUpID0+IHtcblx0Y29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXHRjb25zdCBwMVNoaXAgPSBwMS5nZXRGbGVldCgpW2RyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcF07XG5cdGNvbnN0IGlzSG9yaXpvbnRhbCA9IHAxU2hpcC5nZXREaXJlY3Rpb24oKSA9PT0gJ2hvcml6b250YWwnO1xuXHQvLyBnZXQvYWRqdXN0IGNvb3JkcyBhY2NvcmRpbmcgdG8gaXNIb3Jpem9udGFsIHcvZHJhZ2dlZFNoaXBJbmRleFxuXHRjb25zdCB5ID0gTnVtYmVyKGNlbGwuZGF0YXNldC55KSAtIChpc0hvcml6b250YWwgPyAwIDogZHJhZ2dlZFNoaXBJbmRleCk7XG5cdGNvbnN0IHggPSBOdW1iZXIoY2VsbC5kYXRhc2V0LngpIC0gKGlzSG9yaXpvbnRhbCA/IGRyYWdnZWRTaGlwSW5kZXggOiAwKTtcblxuXHQvLyBwbGFjZSBzaGlwIGFuZCBnZXQgb3V0Y29tZVxuXHRjb25zdCBvdXRjb21lID0gcDFCb2FyZC5wbGFjZVNoaXAocDFTaGlwLCB5LCB4KTtcblx0aWYgKG91dGNvbWUpIHtcblx0XHQvLyB1cGRhdGUgZ3JpZFxuXHRcdGdhbWVib2FyZFZpZXcucmVuZGVyR3JpZChlbGVtZW50cy5wMUdyaWQsIHAxQm9hcmQsIHAxLmdldFR5cGUoKSk7XG5cdFx0YWRkRHJhZ0FuZERyb3BFdmVuTGlzdGVuZXJzKCk7XG5cdFx0Ly8gcmVtb3ZlIHNoaXBcblx0XHRkcmFnZ2VkU2hpcC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRyYWdnZWRTaGlwKTtcblx0XHQvLyBzaG93IFNUQVJUIGJ1dHRvbi8gaGlkZSBmbGVldC1pbmZvIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG5cdFx0aWYgKHAxQm9hcmQuYXJlQWxsU2hpcHNQbGFjZWQoKSkge1xuXHRcdFx0ZWxlbWVudHMuc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0ZWxlbWVudHMuZmxlZXRJbmZvLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdGVsZW1lbnRzLmZsZWV0SW5mby5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cdFx0fVxuXHR9XG59OyAqL1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJtb2RhbCIsInJlbmRlciIsImJvYXJkMSIsImJvYXJkMiIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImdyaWQyIiwiYm9hcmQiLCJmb3JFYWNoIiwiX19hIiwiaSIsImRpdiIsInRleHRDb250ZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmQiLCJtYXJrU3BvdHMiLCJjb21wIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllciIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJjcmVhdGVTaGlwIiwic2hpcENvb3JkIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiYXJyIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwIiwic2hpcDIiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJkaXJlY3Rpb25zIiwiY3VycmVudCIsImRpcmVjdGlvbiIsInJhbmRvbVN0YXJ0IiwiYWJzIiwibGVmdCIsInNvbWUiLCJpbmRleCIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsIlBsYXllciIsImdhbWVib2FyZCIsImJvYXJkUGxheWVyIiwiYm9hcmRDb21wdXRlciIsInBsYXllckF0dGFjayIsImNvbXB1dGVyQXR0YWNrIiwic2xvdCIsInJhbmRvbUF0dGFjayIsIndpZHRoIiwibmFtZSIsImNvb3JkaW5hdGVzIiwibWFwIiwiY29vcmRpbmF0ZSIsInB1c2giLCJpc1N1bmsiLCJldmVyeSIsImhpdCIsImdhbWVMb29wIiwiYWN0aXZlUGxheWVyIiwicGxheWVyMSIsInBsYXllcjIiLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlVHVybiIsImNoZWNrIiwicGxheSIsImNvbXB1dGVyIiwicGxheWVyVHVybiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wdXRlclR1cm4iXSwic291cmNlUm9vdCI6IiJ9