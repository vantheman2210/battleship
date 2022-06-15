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
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "renderModalBoard": () => (/* binding */ renderModalBoard)
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
    div.dataset.id = i;
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

var rotate = function rotate() {
  if (horizontal) {
    carrier.classList.toggle("carrierContainer-horizontal");
    battleship.classList.toggle("battleshipContainer-horizontal");
    cruiser.classList.toggle("cruiserContainer-horizontal");
    submarine.classList.toggle("submarineContainer-horizontal");
    destroyer.classList.toggle("destroyerContainer-horizontal");
    horizontal = true;
  }

  if (!horizontal) {
    carrier.classList.toggle("carrierContainer-horizontal");
    battleship.classList.toggle("battleshipContainer-horizontal");
    cruiser.classList.toggle("cruiserContainer-horizontal");
    submarine.classList.toggle("submarineContainer-horizontal");
    destroyer.classList.toggle("destroyerContainer-horizontal");
    horizontal = false;
  }
};

var renderModalBoard = function renderModalBoard() {
  // Creating board for placing ships
  var arr = Array.from({
    length: 100
  }, function (_, i) {
    return i;
  });
  var board = document.querySelector('.modal-Board');
  var grid = document.createElement('grid');
  grid.className = 'grid1';
  arr.forEach(function (__a, i) {
    var div = document.createElement('div');
    div.className = 'cells1';
    div.textContent = i;
    div.dataset.id = i;
    __a === 'ship' ? div.style.backgroundColor = 'red' : null;
    grid.append(div);
    board.append(grid);
  });
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

/* eslint-disable no-use-before-define */


 // Function that controls entire gameLoop

var gameLoop = function gameLoop() {
  var activePlayer = 0; // Creating player gameboards

  var board1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var board2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Creating players

  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board2);
  var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board1);
  board2.placeComputer(); // Rendering boards

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
}; // gameLoop();
// addEventListener that restarts game when restart button pressed


document.querySelector('#restart').addEventListener('click', function () {
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.restart)();
  gameLoop();
}); //////////////////////

(0,_domControl__WEBPACK_IMPORTED_MODULE_2__.renderModalBoard)();
var carrier = document.querySelector('.carrierContainer');
var battleship = document.querySelector('.battleshipContainer');
var cruiser = document.querySelector('.cruiserContainer');
var submarine = document.querySelector('.submarineContainer');
var destroyer = document.querySelector('.destroyerContainer');
var ships = document.querySelectorAll('.ships');
var playerBoard = document.querySelectorAll('.cells1');
carrier.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
battleship.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
cruiser.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
submarine.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
destroyer.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.rotate);
ships.forEach(function (ship) {
  return ship.addEventListener('dragstart', dragStart);
});
playerBoard.forEach(function (cell) {
  return cell.addEventListener('dragstart', dragStart);
});
playerBoard.forEach(function (cell) {
  return cell.addEventListener('dragover', dragOver);
});
playerBoard.forEach(function (cell) {
  return cell.addEventListener('dragenter', dragEnter);
});
playerBoard.forEach(function (cell) {
  return cell.addEventListener('dragleave', dragLeave);
});
playerBoard.forEach(function (cell) {
  return cell.addEventListener('drop', dragDrop);
});
var draggedShip;
var shipIndex;
var draggedShipLength;
ships.forEach(function (ship) {
  return ship.addEventListener('mousedown', function (e) {
    shipIndex = e.target.dataset.index;
  });
});

function dragStart() {
  draggedShip = this;
  draggedShipLength = this.children.length;
  console.log(draggedShip);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  console.log('drag leave');
}

function dragDrop() {
  console.log('drop');
  var shipLastIndex = parseInt(draggedShip.lastElementChild.dataset.index);
  var shipName = draggedShip.dataset.ship;
  var shipCoords = [];

  if (draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var i = 0; i < draggedShipLength; i++) {
      var coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) + i];
      shipCoords.push(parseInt(coords.dataset.id));
      draggedShip.classList.add('hide');
    }
  } else if (!draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var _i = 0; _i < draggedShipLength; _i++) {
      var _coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) * 10 + 10 * _i];

      shipCoords.push(parseInt(_coords.dataset.id));
      draggedShip.classList.add('hide');
    }
  }

  console.log(shipCoords);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVgsQ0FBZ0JpQyxRQUFRLENBQUNLLE1BQU0sQ0FBQ3RILE9BQVAsQ0FBZUMsRUFBaEIsQ0FBeEI7QUFFQXNHLE1BQUFBLFdBQVcsQ0FBQzFGLFNBQVosQ0FBc0IwRyxHQUF0QixDQUEwQixNQUExQjtBQUNBO0FBQ0QsR0FQRCxNQU9PLElBQUksQ0FBQ2hCLFdBQVcsQ0FBQzFGLFNBQVosQ0FBc0J3RyxRQUF0QixXQUFrQ0YsUUFBbEMsMEJBQUwsRUFBd0U7QUFDOUUsU0FBSyxJQUFJdEgsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRzRHLGlCQUFwQixFQUF1QzVHLEVBQUMsRUFBeEMsRUFBNEM7QUFDM0MsVUFBTXlILE9BQU0sR0FBR3RCLFdBQVcsQ0FBQ2lCLFFBQVEsQ0FBQyxLQUFLakgsT0FBTCxDQUFhQyxFQUFkLENBQVIsR0FBNEJnSCxRQUFRLENBQUNULFNBQUQsQ0FBUixHQUFzQixFQUFsRCxHQUF1RCxLQUFLM0csRUFBN0QsQ0FBMUI7O0FBQ0F1SCxNQUFBQSxVQUFVLENBQUNwQyxJQUFYLENBQWdCaUMsUUFBUSxDQUFDSyxPQUFNLENBQUN0SCxPQUFQLENBQWVDLEVBQWhCLENBQXhCO0FBQ0FzRyxNQUFBQSxXQUFXLENBQUMxRixTQUFaLENBQXNCMEcsR0FBdEIsQ0FBMEIsTUFBMUI7QUFDQTtBQUNEOztBQUNEVixFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWU0sVUFBWjtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuLy8gU2VsZWN0aW5nIGVsZW1lbnRzXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7XG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcblxuY29uc3QgcmVuZGVyID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdC8vIENyZWF0aW5nIHR3byBncmlkcyBmb3IgZGlzcGxheWluZyBib2FyZHNcblx0Y29uc3QgZ3JpZDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQxLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cdGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMi5jbGFzc05hbWUgPSAnZ3JpZDInO1xuXG5cdGJvYXJkMS5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRkaXYuZGF0YXNldC5pZCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZDEuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMSk7XG5cdH0pO1xuXG5cdGJvYXJkMi5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMic7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMi5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQyKTtcblx0fSk7XG59O1xuXG5jb25zdCBtYXJrU3BvdHMgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Y29uc3QgY29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKTtcblx0Y29uc3QgcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5cdGJvYXJkMS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcblxuXHRib2FyZDIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xufTtcblxuY29uc3Qgc2hvd01vZGFsID0gKGlucHV0KSA9PiB7XG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTtcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcblx0dGV4dC50ZXh0Q29udGVudCA9IGlucHV0O1xufTtcblxuY29uc3QgcmVzdGFydCA9ICgpID0+IHtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7XG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG59O1xuXG5sZXQgaG9yaXpvbnRhbCA9IGZhbHNlO1xuY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuXHRcblx0aWYgKGhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0aG9yaXpvbnRhbCA9IHRydWU7XG5cdH1cblx0aWYgKCFob3Jpem9udGFsKSB7XG5cdFx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGJhdHRsZXNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgYmF0dGxlc2hpcENvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdHN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKGBzdWJtYXJpbmVDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGhvcml6b250YWwgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgcmVuZGVyTW9kYWxCb2FyZCA9ICgpID0+IHtcblx0Ly8gQ3JlYXRpbmcgYm9hcmQgZm9yIHBsYWNpbmcgc2hpcHNcblx0Y29uc3QgYXJyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtQm9hcmQnKTtcblx0Y29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZC5jbGFzc05hbWUgPSAnZ3JpZDEnO1xuXG5cdGFyci5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRkaXYuZGF0YXNldC5pZCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZC5hcHBlbmQoZGl2KTtcblx0XHRib2FyZC5hcHBlbmQoZ3JpZCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgcm90YXRlLCByZW5kZXJNb2RhbEJvYXJkIH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdO1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIGF0dGFjayBoaXQgYSBzaGlwXG5cdC8vIEV4Y2x1ZGVkICdtaXNzZWQnXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkW2F0dGFja10gPT09ICdzaGlwJykge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdoaXQnO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG5cdFx0XHRyZWNlaXZlQXR0YWNrSGVscGVyKGF0dGFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnbWlzc2VkJztcblx0XHR9XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0Ly8gRmlsdGVyaW5nIGJvYXJkIGFycmF5LCBhbmQgY2hlY2tpbmcgd2hldGhlciAxNyBwb3NpdGlvbnMgaGF2ZSBiZWVuIGhpdFxuXHRjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuXHRcdGNvbnN0IGFyciA9IGJvYXJkLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXHRcdGlmIChhcnIubGVuZ3RoID49IDE3KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgaGVscHMgYWxsb2NhdGUgYXR0YWNrIHRvIGFwcHJvcHJpYXRlIHNoaXBcblx0Y29uc3QgcmVjZWl2ZUF0dGFja0hlbHBlciA9IChhdHRhY2spID0+IHtcblx0XHRjb25zdCBmaW5kQXJyID0gY3JlYXRlU2hpcC5maWx0ZXIoKGNvcikgPT4gY29yLmluY2x1ZGVzKGF0dGFjaykpLmZsYXQoKTtcblxuXHRcdGNvbnN0IGNoZWNrQXJyID0gZmluZEFyci5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NhcnJpZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDcnVpc2VyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja1N1Ym1hcmluZSA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tEZXN0cm95ZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXG5cdFx0aWYgKGNoZWNrQXJyID09PSBjaGVja0NhcnJpZXIpIGNhcnJpZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tCYXR0bGVzaGlwKSBiYXR0bGVzaGlwLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ3J1aXNlcikgY3J1aXNlci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja1N1Ym1hcmluZSkgc3VibWFyaW5lLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrRGVzdHJveWVyKSBkZXN0cm95ZXIuaXNIaXQoYXR0YWNrKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIHNpbmdsZSBzaGlwIG9uIGJvYXJkXG5cdGNvbnN0IGdlbmVyYXRlID0gKHNoaXAsIHNoaXAyKSA9PiB7XG5cdFx0Y29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcC5kaXJlY3Rpb25zLmxlbmd0aCk7XG5cdFx0Y29uc3QgY3VycmVudCA9IHNoaXAuZGlyZWN0aW9uc1tyYW5kb21dO1xuXHRcdGxldCBkaXJlY3Rpb24gPSAwO1xuXHRcdGlmIChyYW5kb20gPT09IDApIGRpcmVjdGlvbiA9IDE7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMSkgZGlyZWN0aW9uID0gMTA7XG5cdFx0Y29uc3QgcmFuZG9tU3RhcnQgPSBNYXRoLmFicyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGggLSBzaGlwLmRpcmVjdGlvbnNbMF0ubGVuZ3RoICogZGlyZWN0aW9uKSk7XG5cblx0XHRjb25zdCBsZWZ0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDApO1xuXHRcdGNvbnN0IHJpZ2h0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDEwIC0gMSk7XG5cdFx0Y29uc3Qgbm90QXZhaWxhYmxlID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gYm9hcmRbcmFuZG9tU3RhcnQgKyBpbmRleF0gPT09ICdzaGlwJyk7XG5cblx0XHRpZiAoKCFsZWZ0ICYmICFyaWdodCAmJiAhbm90QXZhaWxhYmxlKSB8fCAobGVmdCAmJiByaWdodCAmJiAhbm90QXZhaWxhYmxlICYmIHJhbmRvbSA9PT0gMSkpXG5cdFx0XHRjdXJyZW50LmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0Ym9hcmRbcmFuZG9tU3RhcnQgKyBlbGVtZW50XSA9ICdzaGlwJztcblx0XHRcdFx0c2hpcDIucGxhY2VDb29yZHMoWyByYW5kb21TdGFydCArIGVsZW1lbnQgXSk7XG5cdFx0XHR9KTtcblx0XHRlbHNlIGdlbmVyYXRlKHNoaXAsIHNoaXAyKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBhbGwgZml2ZSBjb21wdXRlciBzaGlwcyBhdCBvbmNlXG5cdGNvbnN0IHBsYWNlQ29tcHV0ZXIgPSAoKSA9PiB7XG5cdFx0Z2VuZXJhdGUoY2Fycmllci5zaGlwQXJyWzBdLCBjYXJyaWVyKTtcblx0XHRnZW5lcmF0ZShiYXR0bGVzaGlwLnNoaXBBcnJbMV0sIGJhdHRsZXNoaXApO1xuXHRcdGdlbmVyYXRlKGNydWlzZXIuc2hpcEFyclsyXSwgY3J1aXNlcik7XG5cdFx0Z2VuZXJhdGUoc3VibWFyaW5lLnNoaXBBcnJbM10sIHN1Ym1hcmluZSk7XG5cdFx0Z2VuZXJhdGUoZGVzdHJveWVyLnNoaXBBcnJbNF0sIGRlc3Ryb3llcik7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0cGxhY2VDb21wdXRlcixcblx0XHRjcmVhdGVTaGlwXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChnYW1lYm9hcmQpID0+IHtcblx0Y29uc3QgYm9hcmRQbGF5ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZENvbXB1dGVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgcGxheWVyQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFBsYXllclthdHRhY2tdICE9PSAnYXR0YWNrZWQnKSB7XG5cdFx0XHRib2FyZFBsYXllclthdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRcdHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuXHRcdH1cblx0XHRyZXR1cm4gJ2lsbGVnYWwgbW92ZSc7XG5cdH07XG5cblx0Y29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYm9hcmQgPSBib2FyZENvbXB1dGVyLmZpbHRlcigoc2xvdCkgPT4gc2xvdCAhPT0gJ2F0dGFja2VkJyk7XG5cdFx0Y29uc3QgcmFuZG9tQXR0YWNrID0gYm9hcmRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoKV07XG5cdFx0Ym9hcmRDb21wdXRlcltyYW5kb21BdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuXHRcdHJldHVybiByYW5kb21BdHRhY2s7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRwbGF5ZXJBdHRhY2ssXG5cdFx0Y29tcHV0ZXJBdHRhY2ssXG5cdFx0Ym9hcmRDb21wdXRlcixcblx0XHRib2FyZFBsYXllclxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuXG4vKlxuY29uc3QgYyA9IChzaGlwKSA9PiB7XG5cdGlmIChzaGlwID09PSAnQ2FycmllcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNSB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMiB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZnkgc2hpcCcpO1xufTtcbiovXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHNoaXAgb2JqZWN0c1xuZnVuY3Rpb24gU2hpcCgpIHtcblx0Y29uc3Qgd2lkdGggPSAxMDtcbiAgXG5cdC8vIEFycmF5IHRoYXQgY29udGFpbnMgc2hpcHMsIGFuZCB0aGVpciBsZW5ndGhzXG5cdGNvbnN0IHNoaXBBcnIgPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NhcnJpZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMsIDQgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMsIHdpZHRoICogNCBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdiYXR0bGVzaGlwJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NydWlzZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3N1Ym1hcmluZScsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnZGVzdHJveWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxIF0sIFsgMCwgd2lkdGggXSBdXG5cdFx0fVxuXHRdO1xuXG5cdGNvbnN0IHNoaXBDb29yZCA9IFtdO1xuICAvLyBNYXBzIGNvb3JkcyB0byBzaGlwQ29vcmQgYXJyYXkuIFRvIGJlIHVzZWQgZm9yIGNoZWNraW5nIGhpdHMsIGFuZCBzdW5rLlxuXHRjb25zdCBwbGFjZUNvb3JkcyA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGNvb3JkaW5hdGVzLm1hcCgoY29vcmRpbmF0ZSkgPT4gc2hpcENvb3JkLnB1c2goY29vcmRpbmF0ZSkpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9ucyB0aGF0IHJlbW92ZXMgZGVzdHJveWVkIHNoaXBcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3JkLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkYW1hZ2VzIHNoaXAgcG9zaXRpb25zXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdGNvbnN0IGlzSGl0ID0gKGhpdCkgPT4gKHNoaXBDb29yZFtoaXRdID0gJ2hpdCcpO1xuXG5cdHJldHVybiB7IHNoaXBDb29yZCwgaXNTdW5rLCBpc0hpdCwgcGxhY2VDb29yZHMsIHNoaXBBcnIgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByZW5kZXJNb2RhbEJvYXJkLCByb3RhdGUgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG5cdGxldCBhY3RpdmVQbGF5ZXIgPSAwO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllciBnYW1lYm9hcmRzXG5cdGNvbnN0IGJvYXJkMSA9IEdhbWVib2FyZCgpO1xuXHRjb25zdCBib2FyZDIgPSBHYW1lYm9hcmQoKTtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXJzXG5cdGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoYm9hcmQyKTtcblx0Y29uc3QgcGxheWVyMiA9IFBsYXllcihib2FyZDEpO1xuXG5cdGJvYXJkMi5wbGFjZUNvbXB1dGVyKCk7XG5cblx0Ly8gUmVuZGVyaW5nIGJvYXJkc1xuXHRyZW5kZXIoYm9hcmQxLCBib2FyZDIpO1xuXG5cdC8vIEZ1bmN0aW9uIGZvciBwbGF5ZXIgdHVybnNcblx0Y29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcblx0XHRhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcblx0fTtcblxuXHQvLyBDaGVja2luZyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHRmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRpZiAoYm9hcmQyLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdDb21wdXRlciBsb3N0LiBZb3Ugd2luIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdZb3UgbG9zdCEgVGhlIGVuZW15IGhhcyBkZWZlYXRlZCB5b3UuJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHRwbGF5ZXIxLnBsYXllckF0dGFjayhpKTtcblx0XHRcdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCk7XG5cdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdH07XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0YWN0aXZlUGxheWVyID09PSAwID8gcGxheWVyVHVybigpIDogY29tcHV0ZXJUdXJuKCk7XG5cdH1cblx0Y2hlY2soKTtcbn07XG5cbi8vIGdhbWVMb29wKCk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCByZXN0YXJ0cyBnYW1lIHdoZW4gcmVzdGFydCBidXR0b24gcHJlc3NlZFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cmVzdGFydCgpO1xuXHRnYW1lTG9vcCgpO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxucmVuZGVyTW9kYWxCb2FyZCgpO1xuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXJDb250YWluZXInKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcENvbnRhaW5lcicpO1xuY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyQ29udGFpbmVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lQ29udGFpbmVyJyk7XG5jb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyQ29udGFpbmVyJyk7XG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcycpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuYmF0dGxlc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5jcnVpc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbnN1Ym1hcmluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5kZXN0cm95ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3ZlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcmFnRHJvcCkpO1xuXG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgc2hpcEluZGV4O1xubGV0IGRyYWdnZWRTaGlwTGVuZ3RoO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxuXHRzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0c2hpcEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcblx0fSlcbik7XG5cbmZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcblx0ZHJhZ2dlZFNoaXAgPSB0aGlzO1xuXHRkcmFnZ2VkU2hpcExlbmd0aCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuXHRjb25zb2xlLmxvZyhkcmFnZ2VkU2hpcCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdMZWF2ZSgpIHtcblx0Y29uc29sZS5sb2coJ2RyYWcgbGVhdmUnKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0Ryb3AoKSB7XG5cdGNvbnNvbGUubG9nKCdkcm9wJyk7XG5cdGxldCBzaGlwTGFzdEluZGV4ID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAubGFzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LmluZGV4KTtcblx0bGV0IHNoaXBOYW1lID0gZHJhZ2dlZFNoaXAuZGF0YXNldC5zaGlwO1xuXG5cdGNvbnN0IHNoaXBDb29yZHMgPSBbXTtcblx0aWYgKGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSArIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cblx0XHRcdGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIWRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSAqIDEwICsgMTAgKiBpXTtcblx0XHRcdHNoaXBDb29yZHMucHVzaChwYXJzZUludChjb29yZHMuZGF0YXNldC5pZCkpO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fVxuXHRjb25zb2xlLmxvZyhzaGlwQ29vcmRzKTtcbn1cbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsIl9fYSIsImkiLCJkaXYiLCJ0ZXh0Q29udGVudCIsImRhdGFzZXQiLCJpZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsInNob3dNb2RhbCIsImlucHV0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVzdGFydCIsImlubmVySFRNTCIsImhvcml6b250YWwiLCJyb3RhdGUiLCJyZW5kZXJNb2RhbEJvYXJkIiwiYXJyIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImdyaWQiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY3JlYXRlU2hpcCIsInNoaXBDb29yZCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2siLCJyZWNlaXZlQXR0YWNrSGVscGVyIiwiYWxsU3VuayIsImZpbHRlciIsImZpbmRBcnIiLCJjb3IiLCJpbmNsdWRlcyIsImZsYXQiLCJjaGVja0FyciIsInNvcnQiLCJ0b1N0cmluZyIsImNoZWNrQ2FycmllciIsImNoZWNrQmF0dGxlc2hpcCIsImNoZWNrQ3J1aXNlciIsImNoZWNrU3VibWFyaW5lIiwiY2hlY2tEZXN0cm95ZXIiLCJpc0hpdCIsImdlbmVyYXRlIiwic2hpcCIsInNoaXAyIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiZGlyZWN0aW9ucyIsImN1cnJlbnQiLCJkaXJlY3Rpb24iLCJyYW5kb21TdGFydCIsImFicyIsImxlZnQiLCJzb21lIiwiaW5kZXgiLCJyaWdodCIsIm5vdEF2YWlsYWJsZSIsInBsYWNlQ29vcmRzIiwicGxhY2VDb21wdXRlciIsInNoaXBBcnIiLCJQbGF5ZXIiLCJnYW1lYm9hcmQiLCJib2FyZFBsYXllciIsImJvYXJkQ29tcHV0ZXIiLCJwbGF5ZXJBdHRhY2siLCJjb21wdXRlckF0dGFjayIsInNsb3QiLCJyYW5kb21BdHRhY2siLCJ3aWR0aCIsIm5hbWUiLCJjb29yZGluYXRlcyIsIm1hcCIsImNvb3JkaW5hdGUiLCJwdXNoIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJnYW1lTG9vcCIsImFjdGl2ZVBsYXllciIsInBsYXllcjEiLCJwbGF5ZXIyIiwiY2hhbmdlVHVybiIsImNoZWNrIiwicGxheSIsImNvbXB1dGVyIiwicGxheWVyVHVybiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wdXRlclR1cm4iLCJzaGlwcyIsInBsYXllckJvYXJkIiwiZHJhZ1N0YXJ0IiwiY2VsbCIsImRyYWdPdmVyIiwiZHJhZ0VudGVyIiwiZHJhZ0xlYXZlIiwiZHJhZ0Ryb3AiLCJkcmFnZ2VkU2hpcCIsInNoaXBJbmRleCIsImRyYWdnZWRTaGlwTGVuZ3RoIiwiZSIsInRhcmdldCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0Iiwic2hpcExhc3RJbmRleCIsInBhcnNlSW50IiwibGFzdEVsZW1lbnRDaGlsZCIsInNoaXBOYW1lIiwic2hpcENvb3JkcyIsImNvbnRhaW5zIiwiY29vcmRzIiwiYWRkIl0sInNvdXJjZVJvb3QiOiIifQ==