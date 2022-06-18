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
/* harmony export */   "renderModalBoard": () => (/* binding */ renderModalBoard),
/* harmony export */   "hideStartScreen": () => (/* binding */ hideStartScreen),
/* harmony export */   "hideModalPlace": () => (/* binding */ hideModalPlace)
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
var startScreen = document.querySelector('.start-modal');
var modalPlace = document.querySelector('.modal-place');

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

var hideStartScreen = function hideStartScreen() {
  startScreen.style.visibility = 'hidden';
  document.querySelector('.modal-place').classList.toggle('modal-place-show');
};

var hideModalPlace = function hideModalPlace() {
  modalPlace.classList.toggle('modal-place-show');
};



/***/ }),

/***/ "./src/dragDrop.js":
/*!*************************!*\
  !*** ./src/dragDrop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domControl */ "./src/domControl.js");
/* eslint-disable radix */

(0,_domControl__WEBPACK_IMPORTED_MODULE_0__.renderModalBoard)();
var carrier = document.querySelector('.carrierContainer');
var battleship = document.querySelector('.battleshipContainer');
var cruiser = document.querySelector('.cruiserContainer');
var submarine = document.querySelector('.submarineContainer');
var destroyer = document.querySelector('.destroyerContainer');
var ships = document.querySelectorAll('.ships');
var playerBoard = document.querySelectorAll('.cells1');
carrier.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_0__.rotate);
battleship.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_0__.rotate);
cruiser.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_0__.rotate);
submarine.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_0__.rotate);
destroyer.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_0__.rotate);
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

var coordinates = [];

function dragDrop() {
  console.log('drop');
  var shipLastIndex = parseInt(draggedShip.lastElementChild.dataset.index);
  var shipName = draggedShip.dataset.ship;
  var shipCoords = [];

  if (draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var i = 0; i < draggedShipLength; i += 1) {
      var coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) + i];
      shipCoords.push(parseInt(coords.dataset.id));
      draggedShip.classList.add('hide');
    }
  } else if (!draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var _i = 0; _i < draggedShipLength; _i += 1) {
      var _coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) * 10 + 10 * _i];

      shipCoords.push(parseInt(_coords.dataset.id));
      draggedShip.classList.add('hide');
    }
  }

  coordinates.push(shipCoords);
}

console.log(coordinates);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coordinates);

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
/* eslint-disable no-return-assign */
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
  var createShip = [carrier.shipCoord, battleship.shipCoord, cruiser.shipCoord, submarine.shipCoord, destroyer.shipCoord]; // Function that marks player board ships 

  var markShips = function markShips(coord) {
    coord.forEach(function (position) {
      return board[position] = 'ship';
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

  function placePlayer(ship, coord) {
    if (ship === 'carrier') {
      carrier.placeCoords(coord);
      markShips(coord);
    } else if (ship === 'cruiser') {
      cruiser.placeCoords(coord);
      markShips(coord);
    } else if (ship === 'battleship') {
      battleship.placeCoords(coord);
      markShips(coord);
    } else if (ship === 'submarine') {
      submarine.placeCoords(coord);
      markShips(coord);
    } else if (ship === 'destroyer') {
      destroyer.placeCoords(coord);
      markShips(coord);
    }
  }

  return {
    receiveAttack: receiveAttack,
    allSunk: allSunk,
    board: board,
    placeComputer: placeComputer,
    placePlayer: placePlayer,
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
/* harmony import */ var _dragDrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dragDrop */ "./src/dragDrop.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-use-before-define */




var start = document.querySelector('#playGame');
var playGame = document.querySelector('#start'); // Function that controls entire gameLoop

var gameLoop = function gameLoop(coords) {
  console.log(coords);
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.hideModalPlace)();
  var activePlayer = 0; // Creating player gameboards

  var board1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var board2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Creating players

  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board2);
  var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board1);
  board2.placeComputer();
  board1.placePlayer('carrier', coords[0]);
  board1.placePlayer('battleship', coords[1]);
  board1.placePlayer('cruiser', coords[2]);
  board1.placePlayer('submarine', coords[3]);
  board1.placePlayer('destroyer', coords[4]); // Rendering boards

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
}; // addEventListener that restarts game when restart button pressed


document.querySelector('#restart').addEventListener('click', function () {
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.restart)();
  gameLoop();
}); // addEventListener that starts the game

playGame.addEventListener('click', gameLoop.bind(undefined, _dragDrop__WEBPACK_IMPORTED_MODULE_3__["default"]));
start.addEventListener('click', _domControl__WEBPACK_IMPORTED_MODULE_2__.hideStartScreen);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF2QixFQUFnQ0wsd0RBQWhDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG4vLyBTZWxlY3RpbmcgZWxlbWVudHNcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtbW9kYWwnKTsgXG5jb25zdCBtb2RhbFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJyk7XG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59O1xuXG5jb25zdCBzaG93TW9kYWwgPSAoaW5wdXQpID0+IHtcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xuXHR0ZXh0LnRleHRDb250ZW50ID0gaW5wdXQ7XG59O1xuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4ge1xuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTtcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcbn07XG5cbmxldCBob3Jpem9udGFsID0gZmFsc2U7XG5jb25zdCByb3RhdGUgPSAoKSA9PiB7XG5cdFxuXHRpZiAoaG9yaXpvbnRhbCkge1xuXHRcdGNhcnJpZXIuY2xhc3NMaXN0LnRvZ2dsZShgY2FycmllckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0Y3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKGBjcnVpc2VyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRkZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShgZGVzdHJveWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRob3Jpem9udGFsID0gdHJ1ZTtcblx0fVxuXHRpZiAoIWhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0aG9yaXpvbnRhbCA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCByZW5kZXJNb2RhbEJvYXJkID0gKCkgPT4ge1xuXHQvLyBDcmVhdGluZyBib2FyZCBmb3IgcGxhY2luZyBzaGlwcyAgXG5cdFxuXHRjb25zdCBhcnIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1Cb2FyZCcpO1xuXHRjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cblx0YXJyLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkLmFwcGVuZChkaXYpO1xuXHRcdGJvYXJkLmFwcGVuZChncmlkKTtcblx0fSk7XG59OyBcblxuY29uc3QgaGlkZVN0YXJ0U2NyZWVuID0gKCkgPT4geyBcblx0c3RhcnRTY3JlZW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nOyAgXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpLmNsYXNzTGlzdC50b2dnbGUoJ21vZGFsLXBsYWNlLXNob3cnKTsgXG59ICBcbmNvbnN0IGhpZGVNb2RhbFBsYWNlID0gKCkgPT4geyBcblx0bW9kYWxQbGFjZS5jbGFzc0xpc3QudG9nZ2xlKCdtb2RhbC1wbGFjZS1zaG93Jyk7XG59XG5cbmV4cG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQsIHJvdGF0ZSwgcmVuZGVyTW9kYWxCb2FyZCwgaGlkZVN0YXJ0U2NyZWVuLCBoaWRlTW9kYWxQbGFjZSB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IHJlbmRlck1vZGFsQm9hcmQsIHJvdGF0ZSB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5cbnJlbmRlck1vZGFsQm9hcmQoKTtcblxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcHMnKTtcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmJhdHRsZXNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuY3J1aXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5zdWJtYXJpbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuZGVzdHJveWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApKTtcblxubGV0IGRyYWdnZWRTaGlwO1xubGV0IHNoaXBJbmRleDtcbmxldCBkcmFnZ2VkU2hpcExlbmd0aDtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cblx0c2hpcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuXHRcdHNoaXBJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cdH0pXG4pO1xuXG5mdW5jdGlvbiBkcmFnU3RhcnQoKSB7XG5cdGRyYWdnZWRTaGlwID0gdGhpcztcblx0ZHJhZ2dlZFNoaXBMZW5ndGggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcblx0Y29uc29sZS5sb2coZHJhZ2dlZFNoaXApO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0VudGVyKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnTGVhdmUoKSB7XG5cdGNvbnNvbGUubG9nKCdkcmFnIGxlYXZlJyk7XG59XG5cbmNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbmZ1bmN0aW9uIGRyYWdEcm9wKCkge1xuXHRjb25zb2xlLmxvZygnZHJvcCcpO1xuXHRjb25zdCBzaGlwTGFzdEluZGV4ID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAubGFzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LmluZGV4KTtcblx0Y29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXA7XG5cdGNvbnN0IHNoaXBDb29yZHMgPSBbXTtcblxuXHRpZiAoZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICsgaV07XG5cdFx0XHRzaGlwQ29vcmRzLnB1c2gocGFyc2VJbnQoY29vcmRzLmRhdGFzZXQuaWQpKTtcblxuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fSBlbHNlIGlmICghZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICogMTAgKyAxMCAqIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cdGNvb3JkaW5hdGVzLnB1c2goc2hpcENvb3Jkcyk7XG59XG5jb25zb2xlLmxvZyhjb29yZGluYXRlcyk7XG5leHBvcnQgZGVmYXVsdCBjb29yZGluYXRlcztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuLy8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gYm9hcmQsIGFuZCByZWNlaXZlcyBhdHRhY2tzLCBhbmQga2VlcGluZyB0cmFjayBvZiBtaXNzZWQgc2hvdHNcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0Y29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXG5cdGNvbnN0IGNhcnJpZXIgPSBTaGlwKCk7XG5cdGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCk7XG5cdGNvbnN0IGNydWlzZXIgPSBTaGlwKCk7XG5cdGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoKTtcblx0Y29uc3QgZGVzdHJveWVyID0gU2hpcCgpO1xuXG5cdGNvbnN0IGNyZWF0ZVNoaXAgPSBbXG5cdFx0Y2Fycmllci5zaGlwQ29vcmQsXG5cdFx0YmF0dGxlc2hpcC5zaGlwQ29vcmQsXG5cdFx0Y3J1aXNlci5zaGlwQ29vcmQsXG5cdFx0c3VibWFyaW5lLnNoaXBDb29yZCxcblx0XHRkZXN0cm95ZXIuc2hpcENvb3JkXG5cdF07IFxuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgbWFya3MgcGxheWVyIGJvYXJkIHNoaXBzIFxuXHRjb25zdCBtYXJrU2hpcHMgPSAoY29vcmQpID0+IHsgXG5cdFx0Y29vcmQuZm9yRWFjaChwb3NpdGlvbiA9PiBib2FyZFtwb3NpdGlvbl0gPSAnc2hpcCcpXG5cdH1cblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciBhdHRhY2sgaGl0IGEgc2hpcFxuXHQvLyBFeGNsdWRlZCAnbWlzc2VkJ1xuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFthdHRhY2tdID09PSAnc2hpcCcpIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnaGl0Jztcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0cmVjZWl2ZUF0dGFja0hlbHBlcihhdHRhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ21pc3NlZCc7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdC8vIEZpbHRlcmluZyBib2FyZCBhcnJheSwgYW5kIGNoZWNraW5nIHdoZXRoZXIgMTcgcG9zaXRpb25zIGhhdmUgYmVlbiBoaXRcblx0Y29uc3QgYWxsU3VuayA9ICgpID0+IHtcblx0XHRjb25zdCBhcnIgPSBib2FyZC5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblx0XHRpZiAoYXJyLmxlbmd0aCA+PSAxNykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGhlbHBzIGFsbG9jYXRlIGF0dGFjayB0byBhcHByb3ByaWF0ZSBzaGlwXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2tIZWxwZXIgPSAoYXR0YWNrKSA9PiB7XG5cdFx0Y29uc3QgZmluZEFyciA9IGNyZWF0ZVNoaXAuZmlsdGVyKChjb3IpID0+IGNvci5pbmNsdWRlcyhhdHRhY2spKS5mbGF0KCk7XG5cblx0XHRjb25zdCBjaGVja0FyciA9IGZpbmRBcnIuc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDYXJyaWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0JhdHRsZXNoaXAgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ3J1aXNlciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tTdWJtYXJpbmUgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrRGVzdHJveWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjaGVja0FyciA9PT0gY2hlY2tDYXJyaWVyKSBjYXJyaWVyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQmF0dGxlc2hpcCkgYmF0dGxlc2hpcC5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0NydWlzZXIpIGNydWlzZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tTdWJtYXJpbmUpIHN1Ym1hcmluZS5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0Rlc3Ryb3llcikgZGVzdHJveWVyLmlzSGl0KGF0dGFjayk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBzaW5nbGUgc2hpcCBvbiBib2FyZFxuXHRjb25zdCBnZW5lcmF0ZSA9IChzaGlwLCBzaGlwMikgPT4ge1xuXHRcdGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXAuZGlyZWN0aW9ucy5sZW5ndGgpO1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBzaGlwLmRpcmVjdGlvbnNbcmFuZG9tXTtcblx0XHRsZXQgZGlyZWN0aW9uID0gMDtcblx0XHRpZiAocmFuZG9tID09PSAwKSBkaXJlY3Rpb24gPSAxO1xuXHRcdGlmIChyYW5kb20gPT09IDEpIGRpcmVjdGlvbiA9IDEwO1xuXHRcdGNvbnN0IHJhbmRvbVN0YXJ0ID0gTWF0aC5hYnMoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoIC0gc2hpcC5kaXJlY3Rpb25zWzBdLmxlbmd0aCAqIGRpcmVjdGlvbikpO1xuXG5cdFx0Y29uc3QgbGVmdCA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAwKTtcblx0XHRjb25zdCByaWdodCA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAxMCAtIDEpO1xuXHRcdGNvbnN0IG5vdEF2YWlsYWJsZSA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IGJvYXJkW3JhbmRvbVN0YXJ0ICsgaW5kZXhdID09PSAnc2hpcCcpO1xuXG5cdFx0aWYgKCghbGVmdCAmJiAhcmlnaHQgJiYgIW5vdEF2YWlsYWJsZSkgfHwgKGxlZnQgJiYgcmlnaHQgJiYgIW5vdEF2YWlsYWJsZSAmJiByYW5kb20gPT09IDEpKVxuXHRcdFx0Y3VycmVudC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdGJvYXJkW3JhbmRvbVN0YXJ0ICsgZWxlbWVudF0gPSAnc2hpcCc7XG5cdFx0XHRcdHNoaXAyLnBsYWNlQ29vcmRzKFsgcmFuZG9tU3RhcnQgKyBlbGVtZW50IF0pO1xuXHRcdFx0fSk7XG5cdFx0ZWxzZSBnZW5lcmF0ZShzaGlwLCBzaGlwMik7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgYWxsIGZpdmUgY29tcHV0ZXIgc2hpcHMgYXQgb25jZVxuXHRjb25zdCBwbGFjZUNvbXB1dGVyID0gKCkgPT4ge1xuXHRcdGdlbmVyYXRlKGNhcnJpZXIuc2hpcEFyclswXSwgY2Fycmllcik7XG5cdFx0Z2VuZXJhdGUoYmF0dGxlc2hpcC5zaGlwQXJyWzFdLCBiYXR0bGVzaGlwKTtcblx0XHRnZW5lcmF0ZShjcnVpc2VyLnNoaXBBcnJbMl0sIGNydWlzZXIpO1xuXHRcdGdlbmVyYXRlKHN1Ym1hcmluZS5zaGlwQXJyWzNdLCBzdWJtYXJpbmUpO1xuXHRcdGdlbmVyYXRlKGRlc3Ryb3llci5zaGlwQXJyWzRdLCBkZXN0cm95ZXIpO1xuXHR9OyAgXG5cblx0XG5cblx0ZnVuY3Rpb24gcGxhY2VQbGF5ZXIgKHNoaXAsIGNvb3JkKSB7IFxuXHRcdGlmKHNoaXAgPT09ICdjYXJyaWVyJykgeyBcblx0XHRcdGNhcnJpZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2NydWlzZXInKSB7IFxuXHRcdFx0Y3J1aXNlci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2JhdHRsZXNoaXAnKSB7IFxuXHRcdFx0YmF0dGxlc2hpcC5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnc3VibWFyaW5lJykgeyBcblx0XHRcdHN1Ym1hcmluZS5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnZGVzdHJveWVyJykgeyBcblx0XHRcdGRlc3Ryb3llci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdHBsYWNlUGxheWVyLCBcblx0XHRjcmVhdGVTaGlwXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChnYW1lYm9hcmQpID0+IHtcblx0Y29uc3QgYm9hcmRQbGF5ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZENvbXB1dGVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgcGxheWVyQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFBsYXllclthdHRhY2tdICE9PSAnYXR0YWNrZWQnKSB7XG5cdFx0XHRib2FyZFBsYXllclthdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRcdHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuXHRcdH1cblx0XHRyZXR1cm4gJ2lsbGVnYWwgbW92ZSc7XG5cdH07XG5cblx0Y29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYm9hcmQgPSBib2FyZENvbXB1dGVyLmZpbHRlcigoc2xvdCkgPT4gc2xvdCAhPT0gJ2F0dGFja2VkJyk7XG5cdFx0Y29uc3QgcmFuZG9tQXR0YWNrID0gYm9hcmRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoKV07XG5cdFx0Ym9hcmRDb21wdXRlcltyYW5kb21BdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuXHRcdHJldHVybiByYW5kb21BdHRhY2s7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRwbGF5ZXJBdHRhY2ssXG5cdFx0Y29tcHV0ZXJBdHRhY2ssXG5cdFx0Ym9hcmRDb21wdXRlcixcblx0XHRib2FyZFBsYXllclxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuXG4vKlxuY29uc3QgYyA9IChzaGlwKSA9PiB7XG5cdGlmIChzaGlwID09PSAnQ2FycmllcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNSB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMiB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZnkgc2hpcCcpO1xufTtcbiovXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHNoaXAgb2JqZWN0c1xuZnVuY3Rpb24gU2hpcCgpIHtcblx0Y29uc3Qgd2lkdGggPSAxMDtcbiAgXG5cdC8vIEFycmF5IHRoYXQgY29udGFpbnMgc2hpcHMsIGFuZCB0aGVpciBsZW5ndGhzXG5cdGNvbnN0IHNoaXBBcnIgPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NhcnJpZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMsIDQgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMsIHdpZHRoICogNCBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdiYXR0bGVzaGlwJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NydWlzZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3N1Ym1hcmluZScsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnZGVzdHJveWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxIF0sIFsgMCwgd2lkdGggXSBdXG5cdFx0fVxuXHRdO1xuXG5cdGNvbnN0IHNoaXBDb29yZCA9IFtdO1xuICAvLyBNYXBzIGNvb3JkcyB0byBzaGlwQ29vcmQgYXJyYXkuIFRvIGJlIHVzZWQgZm9yIGNoZWNraW5nIGhpdHMsIGFuZCBzdW5rLlxuXHRjb25zdCBwbGFjZUNvb3JkcyA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGNvb3JkaW5hdGVzLm1hcCgoY29vcmRpbmF0ZSkgPT4gc2hpcENvb3JkLnB1c2goY29vcmRpbmF0ZSkpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9ucyB0aGF0IHJlbW92ZXMgZGVzdHJveWVkIHNoaXBcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3JkLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkYW1hZ2VzIHNoaXAgcG9zaXRpb25zXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdGNvbnN0IGlzSGl0ID0gKGhpdCkgPT4gKHNoaXBDb29yZFtoaXRdID0gJ2hpdCcpO1xuXG5cdHJldHVybiB7IHNoaXBDb29yZCwgaXNTdW5rLCBpc0hpdCwgcGxhY2VDb29yZHMsIHNoaXBBcnIgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCBoaWRlTW9kYWxQbGFjZSwgaGlkZVN0YXJ0U2NyZWVuIH0gZnJvbSAnLi9kb21Db250cm9sJztcbmltcG9ydCBjb29yZGluYXRlcyBmcm9tICcuL2RyYWdEcm9wJztcblxuY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheUdhbWUnKTtcbmNvbnN0IHBsYXlHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Jyk7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9IChjb29yZHMpID0+IHtcblx0Y29uc29sZS5sb2coY29vcmRzKTtcblx0aGlkZU1vZGFsUGxhY2UoKTtcblx0bGV0IGFjdGl2ZVBsYXllciA9IDA7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyIGdhbWVib2FyZHNcblx0Y29uc3QgYm9hcmQxID0gR2FtZWJvYXJkKCk7XG5cdGNvbnN0IGJvYXJkMiA9IEdhbWVib2FyZCgpO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllcnNcblx0Y29uc3QgcGxheWVyMSA9IFBsYXllcihib2FyZDIpO1xuXHRjb25zdCBwbGF5ZXIyID0gUGxheWVyKGJvYXJkMSk7XG5cblx0Ym9hcmQyLnBsYWNlQ29tcHV0ZXIoKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKCdjYXJyaWVyJywgY29vcmRzWzBdKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKCdiYXR0bGVzaGlwJywgY29vcmRzWzFdKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKCdjcnVpc2VyJywgY29vcmRzWzJdKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKCdzdWJtYXJpbmUnLCBjb29yZHNbM10pO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoJ2Rlc3Ryb3llcicsIGNvb3Jkc1s0XSk7XG5cblx0Ly8gUmVuZGVyaW5nIGJvYXJkc1xuXHRyZW5kZXIoYm9hcmQxLCBib2FyZDIpO1xuXG5cdC8vIEZ1bmN0aW9uIGZvciBwbGF5ZXIgdHVybnNcblx0Y29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcblx0XHRhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcblx0fTtcblxuXHQvLyBDaGVja2luZyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHRmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRpZiAoYm9hcmQyLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdDb21wdXRlciBsb3N0LiBZb3Ugd2luIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdZb3UgbG9zdCEgVGhlIGVuZW15IGhhcyBkZWZlYXRlZCB5b3UuJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHRwbGF5ZXIxLnBsYXllckF0dGFjayhpKTtcblx0XHRcdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCk7XG5cdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdH07XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0YWN0aXZlUGxheWVyID09PSAwID8gcGxheWVyVHVybigpIDogY29tcHV0ZXJUdXJuKCk7XG5cdH1cblx0Y2hlY2soKTtcbn07XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCByZXN0YXJ0cyBnYW1lIHdoZW4gcmVzdGFydCBidXR0b24gcHJlc3NlZFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cmVzdGFydCgpO1xuXHRnYW1lTG9vcCgpO1xufSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCBzdGFydHMgdGhlIGdhbWVcbnBsYXlHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2FtZUxvb3AuYmluZCh0aGlzLCBjb29yZGluYXRlcykpO1xuc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlU3RhcnRTY3JlZW4pO1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJtb2RhbCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInN0YXJ0U2NyZWVuIiwibW9kYWxQbGFjZSIsInJlbmRlciIsImJvYXJkMSIsImJvYXJkMiIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImdyaWQyIiwiYm9hcmQiLCJmb3JFYWNoIiwiX19hIiwiaSIsImRpdiIsInRleHRDb250ZW50IiwiZGF0YXNldCIsImlkIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmQiLCJtYXJrU3BvdHMiLCJjb21wIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllciIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsInJlbmRlck1vZGFsQm9hcmQiLCJhcnIiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiZ3JpZCIsImhpZGVTdGFydFNjcmVlbiIsInZpc2liaWxpdHkiLCJoaWRlTW9kYWxQbGFjZSIsInNoaXBzIiwicGxheWVyQm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImUiLCJ0YXJnZXQiLCJpbmRleCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJzaGlwTGFzdEluZGV4IiwicGFyc2VJbnQiLCJsYXN0RWxlbWVudENoaWxkIiwic2hpcE5hbWUiLCJzaGlwQ29vcmRzIiwiY29udGFpbnMiLCJjb29yZHMiLCJwdXNoIiwiYWRkIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJtYXJrU2hpcHMiLCJjb29yZCIsInBvc2l0aW9uIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsInBsYWNlUGxheWVyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJuYW1lIiwibWFwIiwiY29vcmRpbmF0ZSIsImlzU3VuayIsImV2ZXJ5IiwiaGl0Iiwic3RhcnQiLCJwbGF5R2FtZSIsImdhbWVMb29wIiwiYWN0aXZlUGxheWVyIiwicGxheWVyMSIsInBsYXllcjIiLCJjaGFuZ2VUdXJuIiwiY2hlY2siLCJwbGF5IiwiY29tcHV0ZXIiLCJwbGF5ZXJUdXJuIiwiY29tcHV0ZXJUdXJuIiwiYmluZCJdLCJzb3VyY2VSb290IjoiIn0=