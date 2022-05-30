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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUJmOzs7QUFDQUwsSUFBQUEsWUFBWSxLQUFLLENBQWpCLEdBQXFCUyxVQUFVLEVBQS9CLEdBQW9DRSxZQUFZLEVBQWhEO0FBQ0E7O0FBQ0RMLEVBQUFBLEtBQUs7QUFDTCxDQTlERDs7QUFnRUFQLFFBQVEsSUFFUjs7QUFDQXBHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixFQUFtQzhHLGdCQUFuQyxDQUFvRCxPQUFwRCxFQUE2RCxZQUFNO0FBQ2xFakYsRUFBQUEsb0RBQU87QUFDUHNFLEVBQUFBLFFBQVE7QUFDUixDQUhEO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb21Db250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7IFxuY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTsgXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpOyBcblxuY29uc3QgcmVuZGVyID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdC8vIENyZWF0aW5nIHR3byBncmlkcyBmb3IgZGlzcGxheWluZyBib2FyZHNcblx0Y29uc3QgZ3JpZDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQxLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cdGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMi5jbGFzc05hbWUgPSAnZ3JpZDInO1xuXG5cdGJvYXJkMS5ib2FyZC5mb3JFYWNoKCgpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0Z3JpZDEuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMSk7XG5cdH0pO1xuXG5cdGJvYXJkMi5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMic7ICBcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnIDogbnVsbDsgXG5cdFx0Z3JpZDIuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMik7XG5cdH0pO1xufTtcblxuY29uc3QgbWFya1Nwb3RzID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdGNvbnN0IGNvbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyk7XG5cdGNvbnN0IHBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTtcblxuXHRib2FyZDEuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFxuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsOyBcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDsgXG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xufTsgXG5cbmNvbnN0IHNob3dNb2RhbCA9IChpbnB1dCkgPT4geyBcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpOyBcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTsgXG5cdHRleHQudGV4dENvbnRlbnQgPSBpbnB1dDtcbn07IFxuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4geyBcblx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnOyBcbiAgbW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpOyBcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcbn1cblxuZXhwb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSc7XG4vLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiBib2FyZCwgYW5kIHJlY2VpdmVzIGF0dGFja3MsIGFuZCBrZWVwaW5nIHRyYWNrIG9mIG1pc3NlZCBzaG90c1xuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRjb25zdCBib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cblx0Y29uc3QgY2FycmllciA9IFNoaXAoKTtcblx0Y29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoKTtcblx0Y29uc3QgY3J1aXNlciA9IFNoaXAoKTtcblx0Y29uc3Qgc3VibWFyaW5lID0gU2hpcCgpO1xuXHRjb25zdCBkZXN0cm95ZXIgPSBTaGlwKCk7XG5cblx0Y29uc3QgY3JlYXRlU2hpcCA9IFtcblx0XHRjYXJyaWVyLnNoaXBDb29yZCxcblx0XHRiYXR0bGVzaGlwLnNoaXBDb29yZCxcblx0XHRjcnVpc2VyLnNoaXBDb29yZCxcblx0XHRzdWJtYXJpbmUuc2hpcENvb3JkLFxuXHRcdGRlc3Ryb3llci5zaGlwQ29vcmRcblx0XTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciBhdHRhY2sgaGl0IGEgc2hpcFxuXHQvLyBFeGNsdWRlZCAnbWlzc2VkJ1xuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFthdHRhY2tdID09PSAnc2hpcCcpIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnaGl0Jztcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0cmVjZWl2ZUF0dGFja0hlbHBlcihhdHRhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ21pc3NlZCc7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdC8vIEZpbHRlcmluZyBib2FyZCBhcnJheSwgYW5kIGNoZWNraW5nIHdoZXRoZXIgMTcgcG9zaXRpb25zIGhhdmUgYmVlbiBoaXRcblx0Y29uc3QgYWxsU3VuayA9ICgpID0+IHtcblx0XHRjb25zdCBhcnIgPSBib2FyZC5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblx0XHRpZiAoYXJyLmxlbmd0aCA+PSAxNykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGhlbHBzIGFsbG9jYXRlIGF0dGFjayB0byBhcHByb3ByaWF0ZSBzaGlwXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2tIZWxwZXIgPSAoYXR0YWNrKSA9PiB7XG5cdFx0Y29uc3QgZmluZEFyciA9IGNyZWF0ZVNoaXAuZmlsdGVyKChjb3IpID0+IGNvci5pbmNsdWRlcyhhdHRhY2spKS5mbGF0KCk7XG5cblx0XHRjb25zdCBjaGVja0FyciA9IGZpbmRBcnIuc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDYXJyaWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0JhdHRsZXNoaXAgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ3J1aXNlciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tTdWJtYXJpbmUgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrRGVzdHJveWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjaGVja0FyciA9PT0gY2hlY2tDYXJyaWVyKSBjYXJyaWVyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQmF0dGxlc2hpcCkgYmF0dGxlc2hpcC5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0NydWlzZXIpIGNydWlzZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tTdWJtYXJpbmUpIHN1Ym1hcmluZS5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0Rlc3Ryb3llcikgZGVzdHJveWVyLmlzSGl0KGF0dGFjayk7XG5cdH07XG5cblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoaW5kZXggPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDApOyAgXG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoaW5kZXggPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDEwIC0gMSk7IFxuXHRcdGNvbnN0IG5vdEF2YWlsYWJsZSA9IGN1cnJlbnQuc29tZShpbmRleCA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmKCFsZWZ0ICYmICFyaWdodCAmJiAhbm90QXZhaWxhYmxlIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblxuXHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4geyBcblx0XHRcdGJvYXJkW3JhbmRvbVN0YXJ0ICsgZWxlbWVudF0gPSAnc2hpcCc7XG5cdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHR9KTsgXG5cdFx0ZWxzZSBcblx0XHRnZW5lcmF0ZShzaGlwLCBzaGlwMik7XG5cdH07XG5cblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdCBnZW5lcmF0ZShiYXR0bGVzaGlwLnNoaXBBcnJbMV0sIGJhdHRsZXNoaXApO1xuXHRcdCBnZW5lcmF0ZShjcnVpc2VyLnNoaXBBcnJbMl0sIGNydWlzZXIpO1xuXHRcdCBnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHQgZ2VuZXJhdGUoZGVzdHJveWVyLnNoaXBBcnJbNF0sIGRlc3Ryb3llcik7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0cGxhY2VDb21wdXRlcixcblx0XHRjcmVhdGVTaGlwXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcblxuLypcbiAgICAgIGNvbnN0IHMgPSBib2FyZC5maWx0ZXIoKHNsb3QpID0+IHNsb3QgIT09ICdzaGlwJyk7XG5cdFx0XHRjb25zdCBvbmUgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sIChfXywgaSkgPT4gaSk7XG5cdFx0XHRzdWJtYXJpbmUucGxhY2VDb29yZHMob25lKTtcblx0XHRcdHBvcHVsYXRlQm9hcmQoKTsgKi9cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChnYW1lYm9hcmQpID0+IHtcblx0Y29uc3QgYm9hcmRQbGF5ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZENvbXB1dGVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgcGxheWVyQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFBsYXllclthdHRhY2tdICE9PSAnYXR0YWNrZWQnKSB7XG5cdFx0XHRib2FyZFBsYXllclthdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRcdHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuXHRcdH1cblx0XHRyZXR1cm4gJ2lsbGVnYWwgbW92ZSc7XG5cdH07XG5cblx0Y29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYm9hcmQgPSBib2FyZENvbXB1dGVyLmZpbHRlcigoc2xvdCkgPT4gc2xvdCAhPT0gJ2F0dGFja2VkJyk7XG5cdFx0Y29uc3QgcmFuZG9tQXR0YWNrID0gYm9hcmRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoKV07XG5cdFx0Ym9hcmRDb21wdXRlcltyYW5kb21BdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuXHRcdHJldHVybiByYW5kb21BdHRhY2s7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRwbGF5ZXJBdHRhY2ssXG5cdFx0Y29tcHV0ZXJBdHRhY2ssXG5cdFx0Ym9hcmRDb21wdXRlcixcblx0XHRib2FyZFBsYXllclxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuXG4vKlxuY29uc3QgYyA9IChzaGlwKSA9PiB7XG5cdGlmIChzaGlwID09PSAnQ2FycmllcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNSB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMiB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZnkgc2hpcCcpO1xufTtcbiovXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHNoaXAgb2JqZWN0c1xuZnVuY3Rpb24gU2hpcCgpIHtcblx0Y29uc3Qgd2lkdGggPSAxMDtcblxuXHRjb25zdCBzaGlwQXJyID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdjYXJyaWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzLCA0IF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzLCB3aWR0aCAqIDQgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnYmF0dGxlc2hpcCcsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMyBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMyBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdjcnVpc2VyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdzdWJtYXJpbmUnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2Rlc3Ryb3llcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSBdLCBbIDAsIHdpZHRoIF0gXVxuXHRcdH1cblx0XTtcblxuXHRjb25zdCBzaGlwQ29vcmQgPSBbXTtcblxuXHRjb25zdCBwbGFjZUNvb3JkcyA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGNvb3JkaW5hdGVzLm1hcCgoY29vcmRpbmF0ZSkgPT4gc2hpcENvb3JkLnB1c2goY29vcmRpbmF0ZSkpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9ucyB0aGF0IHJlbW92ZXMgZGVzdHJveWVkIHNoaXBcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3JkLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkYW1hZ2VzIHNoaXAgcG9zaXRpb25zXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdGNvbnN0IGlzSGl0ID0gKGhpdCkgPT4gKHNoaXBDb29yZFtoaXRdID0gJ2hpdCcpO1xuXG5cdHJldHVybiB7IHNoaXBDb29yZCwgaXNTdW5rLCBpc0hpdCwgcGxhY2VDb29yZHMsIHNoaXBBcnIgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG5cdGxldCBhY3RpdmVQbGF5ZXIgPSAwOyBcblx0XG5cdC8vIENyZWF0aW5nIHBsYXllciBnYW1lYm9hcmRzXG5cdGNvbnN0IGJvYXJkMSA9IEdhbWVib2FyZCgpO1xuXHRjb25zdCBib2FyZDIgPSBHYW1lYm9hcmQoKTtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXJzXG5cdGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoYm9hcmQyKTtcblx0Y29uc3QgcGxheWVyMiA9IFBsYXllcihib2FyZDEpOyBcblxuXHQvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2NhcnJpZXInKTsgIFxuXHQvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2JhdHRsZXNoaXAnKTsgIFxuICAvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ2NydWlzZXInKTsgIFxuICAvLyBib2FyZDIuY29tcHV0ZXJQbGFjZW1lbnQoJ3N1Ym1hcmluZScpOyAgXG4gIC8vIGJvYXJkMi5jb21wdXRlclBsYWNlbWVudCgnZGVzdHJveWVyJyk7ICBcblx0Ym9hcmQyLnBsYWNlQ29tcHV0ZXIoKTtcblx0Y29uc29sZS5sb2coYm9hcmQyLmJvYXJkLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgPT09ICdzaGlwJykpO1xuXHRcblx0XG5cdFxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ0NvbXB1dGVyIGxvc3QuIFlvdSB3aW4hJyk7XG5cdFx0fSBlbHNlIGlmIChib2FyZDEuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBsb3N0ISBUaGUgZW5lbXkgaGFzIGRlZmVhdGVkIHlvdS4nKTtcblx0XHR9IGVsc2UgcGxheSgpO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gbG9vcCB0aGF0IHN3aXRjaGVzIHBsYXllciB0dXJuc1xuXHRmdW5jdGlvbiBwbGF5KCkge1xuXHRcdGNvbnN0IGNvbXB1dGVyID0gWyAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJykgXTtcblx0XHRjb25zdCBwbGF5ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0Y29tcHV0ZXIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHBsYXllcjEucGxheWVyQXR0YWNrKGkpO1xuXHRcdFx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcblx0XHRcdHBsYXllcjIuY29tcHV0ZXJBdHRhY2soKTtcblx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0fTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRhY3RpdmVQbGF5ZXIgPT09IDAgPyBwbGF5ZXJUdXJuKCkgOiBjb21wdXRlclR1cm4oKTtcblx0fVxuXHRjaGVjaygpO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHJlc3RhcnRzIGdhbWUgd2hlbiByZXN0YXJ0IGJ1dHRvbiBwcmVzc2VkXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRyZXN0YXJ0KCk7XG5cdGdhbWVMb29wKCk7XG59KTtcblxuLyogY29uc3QgY2VsbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpXTsgXG5cblxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwJykgXG5cbmxldCBkcmFnZ2VkU2hpcDsgXG5sZXQgZHJhZ2dlZFNoaXBJbmRleDsgXG5cbmNvbnN0IGRyYWdPdmVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZHJhZ0xlYXZlID0gKCkgPT4ge307XG4gIGNvbnN0IGRyYWdFbmQgPSAoKSA9PiB7fTsgXG5cblx0Y29uc3QgZHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICB9O1xuXG5mdW5jdGlvbiBkcmFnKGUpIHsgXG5cdGRyYWdnZWRTaGlwSW5kZXggPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCk7IFxuXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwSW5kZXgpIFxuXHRjb25zb2xlLmxvZyhkcmFnZ2VkU2hpcClcbn07ICBcblxuZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSBcblxuZnVuY3Rpb24gZHJvcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTsgIFxuICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpOyAgXG59XG5cbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZHJhZyk7IFxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpOyBcbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpO1xuXG5jZWxscy5mb3JFYWNoKGVsZW1lbnQgPT4geyAgIFxuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKTsgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTsgXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKVxufSk7IFxuXG5jb25zdCBkcmFnRHJvcCA9IChlKSA9PiB7XG5cdGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblx0Y29uc3QgcDFTaGlwID0gcDEuZ2V0RmxlZXQoKVtkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXBdO1xuXHRjb25zdCBpc0hvcml6b250YWwgPSBwMVNoaXAuZ2V0RGlyZWN0aW9uKCkgPT09ICdob3Jpem9udGFsJztcblx0Ly8gZ2V0L2FkanVzdCBjb29yZHMgYWNjb3JkaW5nIHRvIGlzSG9yaXpvbnRhbCB3L2RyYWdnZWRTaGlwSW5kZXhcblx0Y29uc3QgeSA9IE51bWJlcihjZWxsLmRhdGFzZXQueSkgLSAoaXNIb3Jpem9udGFsID8gMCA6IGRyYWdnZWRTaGlwSW5kZXgpO1xuXHRjb25zdCB4ID0gTnVtYmVyKGNlbGwuZGF0YXNldC54KSAtIChpc0hvcml6b250YWwgPyBkcmFnZ2VkU2hpcEluZGV4IDogMCk7XG5cblx0Ly8gcGxhY2Ugc2hpcCBhbmQgZ2V0IG91dGNvbWVcblx0Y29uc3Qgb3V0Y29tZSA9IHAxQm9hcmQucGxhY2VTaGlwKHAxU2hpcCwgeSwgeCk7XG5cdGlmIChvdXRjb21lKSB7XG5cdFx0Ly8gdXBkYXRlIGdyaWRcblx0XHRnYW1lYm9hcmRWaWV3LnJlbmRlckdyaWQoZWxlbWVudHMucDFHcmlkLCBwMUJvYXJkLCBwMS5nZXRUeXBlKCkpO1xuXHRcdGFkZERyYWdBbmREcm9wRXZlbkxpc3RlbmVycygpO1xuXHRcdC8vIHJlbW92ZSBzaGlwXG5cdFx0ZHJhZ2dlZFNoaXAucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkcmFnZ2VkU2hpcCk7XG5cdFx0Ly8gc2hvdyBTVEFSVCBidXR0b24vIGhpZGUgZmxlZXQtaW5mbyBpZiBhbGwgc2hpcHMgYXJlIHBsYWNlZFxuXHRcdGlmIChwMUJvYXJkLmFyZUFsbFNoaXBzUGxhY2VkKCkpIHtcblx0XHRcdGVsZW1lbnRzLnN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblx0XHRcdGVsZW1lbnRzLmZsZWV0SW5mby5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHRlbGVtZW50cy5mbGVldEluZm8uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXHRcdH1cblx0fVxufTsgKi9cbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsImRpdiIsImFwcGVuZCIsIl9fYSIsImkiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsInNob3dNb2RhbCIsImlucHV0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVzdGFydCIsImlubmVySFRNTCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiY3JlYXRlU2hpcCIsInNoaXBDb29yZCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2siLCJyZWNlaXZlQXR0YWNrSGVscGVyIiwiYWxsU3VuayIsImFyciIsImZpbHRlciIsImZpbmRBcnIiLCJjb3IiLCJpbmNsdWRlcyIsImZsYXQiLCJjaGVja0FyciIsInNvcnQiLCJ0b1N0cmluZyIsImNoZWNrQ2FycmllciIsImNoZWNrQmF0dGxlc2hpcCIsImNoZWNrQ3J1aXNlciIsImNoZWNrU3VibWFyaW5lIiwiY2hlY2tEZXN0cm95ZXIiLCJpc0hpdCIsImdlbmVyYXRlIiwic2hpcCIsInNoaXAyIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiZGlyZWN0aW9ucyIsImN1cnJlbnQiLCJkaXJlY3Rpb24iLCJyYW5kb21TdGFydCIsImFicyIsImxlZnQiLCJzb21lIiwiaW5kZXgiLCJyaWdodCIsIm5vdEF2YWlsYWJsZSIsInBsYWNlQ29vcmRzIiwicGxhY2VDb21wdXRlciIsInNoaXBBcnIiLCJQbGF5ZXIiLCJnYW1lYm9hcmQiLCJib2FyZFBsYXllciIsImJvYXJkQ29tcHV0ZXIiLCJwbGF5ZXJBdHRhY2siLCJjb21wdXRlckF0dGFjayIsInNsb3QiLCJyYW5kb21BdHRhY2siLCJ3aWR0aCIsIm5hbWUiLCJjb29yZGluYXRlcyIsIm1hcCIsImNvb3JkaW5hdGUiLCJwdXNoIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJnYW1lTG9vcCIsImFjdGl2ZVBsYXllciIsInBsYXllcjEiLCJwbGF5ZXIyIiwiY29uc29sZSIsImxvZyIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJUdXJuIl0sInNvdXJjZVJvb3QiOiIifQ==