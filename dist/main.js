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
  var shipCoords = {
    name: shipName,
    coordinates: []
  };

  if (draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var i = 0; i < draggedShipLength; i += 1) {
      var coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) + i];
      shipCoords.coordinates.push(parseInt(coords.dataset.id));
      coords.style.background = 'red';
      draggedShip.classList.add('hide');
    }
  } else if (!draggedShip.classList.contains("".concat(shipName, "Container-horizontal"))) {
    for (var _i = 0; _i < draggedShipLength; _i += 1) {
      var _coords = playerBoard[parseInt(this.dataset.id) - parseInt(shipIndex) * 10 + 10 * _i];

      shipCoords.coordinates.push(parseInt(_coords.dataset.id));
      _coords.style.background = 'red';
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
  console.log(coords.flat());
  console.log(coords[0].name, coords[0].coordinates);
  console.log(coords[1].name, coords[1].coordinates);
  console.log(coords[2].name, coords[2].coordinates);
  console.log(coords[3].name, coords[3].coordinates);
  console.log(coords[4].name, coords[4].coordinates);
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.hideModalPlace)();
  var activePlayer = 0; // Creating player gameboards

  var board1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var board2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Creating players

  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board2);
  var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(board1);
  board2.placeComputer();
  board1.placePlayer(coords[0].name, coords[0].coordinates);
  board1.placePlayer(coords[1].name, coords[1].coordinates);
  board1.placePlayer(coords[2].name, coords[2].coordinates);
  board1.placePlayer(coords[3].name, coords[3].coordinates);
  board1.placePlayer(coords[4].name, coords[4].coordinates); // Rendering boards

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxLQUFLLENBQUN0RixnQkFBTixDQUF1QixPQUF2QixFQUFnQ0wsd0RBQWhDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG4vLyBTZWxlY3RpbmcgZWxlbWVudHNcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtbW9kYWwnKTsgXG5jb25zdCBtb2RhbFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJyk7XG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59OyBcblxuY29uc3Qgc2hvd01vZGFsID0gKGlucHV0KSA9PiB7XG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTtcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcblx0dGV4dC50ZXh0Q29udGVudCA9IGlucHV0O1xufTtcblxuY29uc3QgcmVzdGFydCA9ICgpID0+IHtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7XG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG59O1xuXG5sZXQgaG9yaXpvbnRhbCA9IGZhbHNlO1xuY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuXHRcblx0aWYgKGhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0aG9yaXpvbnRhbCA9IHRydWU7XG5cdH1cblx0aWYgKCFob3Jpem9udGFsKSB7XG5cdFx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGJhdHRsZXNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgYmF0dGxlc2hpcENvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdHN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKGBzdWJtYXJpbmVDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGhvcml6b250YWwgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgcmVuZGVyTW9kYWxCb2FyZCA9ICgpID0+IHtcblx0Ly8gQ3JlYXRpbmcgYm9hcmQgZm9yIHBsYWNpbmcgc2hpcHMgIFxuXHRcblx0Y29uc3QgYXJyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtQm9hcmQnKTtcblx0Y29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZC5jbGFzc05hbWUgPSAnZ3JpZDEnO1xuXG5cdGFyci5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRkaXYuZGF0YXNldC5pZCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZC5hcHBlbmQoZGl2KTtcblx0XHRib2FyZC5hcHBlbmQoZ3JpZCk7XG5cdH0pO1xufTsgXG5cbmNvbnN0IGhpZGVTdGFydFNjcmVlbiA9ICgpID0+IHsgXG5cdHN0YXJ0U2NyZWVuLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJzsgIFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtcGxhY2UnKS5jbGFzc0xpc3QudG9nZ2xlKCdtb2RhbC1wbGFjZS1zaG93Jyk7IFxufSAgXG5jb25zdCBoaWRlTW9kYWxQbGFjZSA9ICgpID0+IHsgXG5cdG1vZGFsUGxhY2UuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByb3RhdGUsIHJlbmRlck1vZGFsQm9hcmQsIGhpZGVTdGFydFNjcmVlbiwgaGlkZU1vZGFsUGxhY2UgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyByZW5kZXJNb2RhbEJvYXJkLCByb3RhdGUgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG5yZW5kZXJNb2RhbEJvYXJkKCk7XG5cbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXBzJyk7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTtcblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5iYXR0bGVzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmNydWlzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuc3VibWFyaW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmRlc3Ryb3llci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKSk7XG5cbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBzaGlwSW5kZXg7XG5sZXQgZHJhZ2dlZFNoaXBMZW5ndGg7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+XG5cdHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0XHRzaGlwSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHR9KVxuKTtcblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KCkge1xuXHRkcmFnZ2VkU2hpcCA9IHRoaXM7XG5cdGRyYWdnZWRTaGlwTGVuZ3RoID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0xlYXZlKCkge1xuXHRjb25zb2xlLmxvZygnZHJhZyBsZWF2ZScpO1xufVxuXG5jb25zdCBjb29yZGluYXRlcyA9IFtdO1xuXG5mdW5jdGlvbiBkcmFnRHJvcCgpIHtcblx0Y29uc29sZS5sb2coJ2Ryb3AnKTtcblx0Y29uc3Qgc2hpcExhc3RJbmRleCA9IHBhcnNlSW50KGRyYWdnZWRTaGlwLmxhc3RFbGVtZW50Q2hpbGQuZGF0YXNldC5pbmRleCk7XG5cdGNvbnN0IHNoaXBOYW1lID0gZHJhZ2dlZFNoaXAuZGF0YXNldC5zaGlwO1xuXHRjb25zdCBzaGlwQ29vcmRzID0ge1xuXHRcdG5hbWU6IHNoaXBOYW1lLFxuXHRcdGNvb3JkaW5hdGVzOiBbXVxuXHR9O1xuXG5cdGlmIChkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuY29udGFpbnMoYCR7c2hpcE5hbWV9Q29udGFpbmVyLWhvcml6b250YWxgKSkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0Y29uc3QgY29vcmRzID0gcGxheWVyQm9hcmRbcGFyc2VJbnQodGhpcy5kYXRhc2V0LmlkKSAtIHBhcnNlSW50KHNoaXBJbmRleCkgKyBpXTtcblx0XHRcdHNoaXBDb29yZHMuY29vcmRpbmF0ZXMucHVzaChwYXJzZUludChjb29yZHMuZGF0YXNldC5pZCkpO1xuXHRcdFx0Y29vcmRzLnN0eWxlLmJhY2tncm91bmQgPSAncmVkJztcblx0XHRcdGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIWRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSAqIDEwICsgMTAgKiBpXTtcblx0XHRcdHNoaXBDb29yZHMuY29vcmRpbmF0ZXMucHVzaChwYXJzZUludChjb29yZHMuZGF0YXNldC5pZCkpO1xuXHRcdFx0Y29vcmRzLnN0eWxlLmJhY2tncm91bmQgPSAncmVkJztcblx0XHRcdGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHR9XG5cdH1cblx0Y29vcmRpbmF0ZXMucHVzaChzaGlwQ29vcmRzKTtcbn1cbmNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKTtcbmV4cG9ydCBkZWZhdWx0IGNvb3JkaW5hdGVzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSc7XG4vLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiBib2FyZCwgYW5kIHJlY2VpdmVzIGF0dGFja3MsIGFuZCBrZWVwaW5nIHRyYWNrIG9mIG1pc3NlZCBzaG90c1xuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRjb25zdCBib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cblx0Y29uc3QgY2FycmllciA9IFNoaXAoKTtcblx0Y29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoKTtcblx0Y29uc3QgY3J1aXNlciA9IFNoaXAoKTtcblx0Y29uc3Qgc3VibWFyaW5lID0gU2hpcCgpO1xuXHRjb25zdCBkZXN0cm95ZXIgPSBTaGlwKCk7XG5cblx0Y29uc3QgY3JlYXRlU2hpcCA9IFtcblx0XHRjYXJyaWVyLnNoaXBDb29yZCxcblx0XHRiYXR0bGVzaGlwLnNoaXBDb29yZCxcblx0XHRjcnVpc2VyLnNoaXBDb29yZCxcblx0XHRzdWJtYXJpbmUuc2hpcENvb3JkLFxuXHRcdGRlc3Ryb3llci5zaGlwQ29vcmRcblx0XTsgXG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBtYXJrcyBwbGF5ZXIgYm9hcmQgc2hpcHMgXG5cdGNvbnN0IG1hcmtTaGlwcyA9IChjb29yZCkgPT4geyBcblx0XHRjb29yZC5mb3JFYWNoKHBvc2l0aW9uID0+IGJvYXJkW3Bvc2l0aW9uXSA9ICdzaGlwJylcblx0fVxuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIGF0dGFjayBoaXQgYSBzaGlwXG5cdC8vIEV4Y2x1ZGVkICdtaXNzZWQnXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkW2F0dGFja10gPT09ICdzaGlwJykge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdoaXQnO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG5cdFx0XHRyZWNlaXZlQXR0YWNrSGVscGVyKGF0dGFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnbWlzc2VkJztcblx0XHR9XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0Ly8gRmlsdGVyaW5nIGJvYXJkIGFycmF5LCBhbmQgY2hlY2tpbmcgd2hldGhlciAxNyBwb3NpdGlvbnMgaGF2ZSBiZWVuIGhpdFxuXHRjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuXHRcdGNvbnN0IGFyciA9IGJvYXJkLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXHRcdGlmIChhcnIubGVuZ3RoID49IDE3KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgaGVscHMgYWxsb2NhdGUgYXR0YWNrIHRvIGFwcHJvcHJpYXRlIHNoaXBcblx0Y29uc3QgcmVjZWl2ZUF0dGFja0hlbHBlciA9IChhdHRhY2spID0+IHtcblx0XHRjb25zdCBmaW5kQXJyID0gY3JlYXRlU2hpcC5maWx0ZXIoKGNvcikgPT4gY29yLmluY2x1ZGVzKGF0dGFjaykpLmZsYXQoKTtcblxuXHRcdGNvbnN0IGNoZWNrQXJyID0gZmluZEFyci5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NhcnJpZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDcnVpc2VyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja1N1Ym1hcmluZSA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tEZXN0cm95ZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXG5cdFx0aWYgKGNoZWNrQXJyID09PSBjaGVja0NhcnJpZXIpIGNhcnJpZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tCYXR0bGVzaGlwKSBiYXR0bGVzaGlwLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ3J1aXNlcikgY3J1aXNlci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja1N1Ym1hcmluZSkgc3VibWFyaW5lLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrRGVzdHJveWVyKSBkZXN0cm95ZXIuaXNIaXQoYXR0YWNrKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIHNpbmdsZSBzaGlwIG9uIGJvYXJkXG5cdGNvbnN0IGdlbmVyYXRlID0gKHNoaXAsIHNoaXAyKSA9PiB7XG5cdFx0Y29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcC5kaXJlY3Rpb25zLmxlbmd0aCk7XG5cdFx0Y29uc3QgY3VycmVudCA9IHNoaXAuZGlyZWN0aW9uc1tyYW5kb21dO1xuXHRcdGxldCBkaXJlY3Rpb24gPSAwO1xuXHRcdGlmIChyYW5kb20gPT09IDApIGRpcmVjdGlvbiA9IDE7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMSkgZGlyZWN0aW9uID0gMTA7XG5cdFx0Y29uc3QgcmFuZG9tU3RhcnQgPSBNYXRoLmFicyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGggLSBzaGlwLmRpcmVjdGlvbnNbMF0ubGVuZ3RoICogZGlyZWN0aW9uKSk7XG5cblx0XHRjb25zdCBsZWZ0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDApO1xuXHRcdGNvbnN0IHJpZ2h0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDEwIC0gMSk7XG5cdFx0Y29uc3Qgbm90QXZhaWxhYmxlID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gYm9hcmRbcmFuZG9tU3RhcnQgKyBpbmRleF0gPT09ICdzaGlwJyk7XG5cblx0XHRpZiAoKCFsZWZ0ICYmICFyaWdodCAmJiAhbm90QXZhaWxhYmxlKSB8fCAobGVmdCAmJiByaWdodCAmJiAhbm90QXZhaWxhYmxlICYmIHJhbmRvbSA9PT0gMSkpXG5cdFx0XHRjdXJyZW50LmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0Ym9hcmRbcmFuZG9tU3RhcnQgKyBlbGVtZW50XSA9ICdzaGlwJztcblx0XHRcdFx0c2hpcDIucGxhY2VDb29yZHMoWyByYW5kb21TdGFydCArIGVsZW1lbnQgXSk7XG5cdFx0XHR9KTtcblx0XHRlbHNlIGdlbmVyYXRlKHNoaXAsIHNoaXAyKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBhbGwgZml2ZSBjb21wdXRlciBzaGlwcyBhdCBvbmNlXG5cdGNvbnN0IHBsYWNlQ29tcHV0ZXIgPSAoKSA9PiB7XG5cdFx0Z2VuZXJhdGUoY2Fycmllci5zaGlwQXJyWzBdLCBjYXJyaWVyKTtcblx0XHRnZW5lcmF0ZShiYXR0bGVzaGlwLnNoaXBBcnJbMV0sIGJhdHRsZXNoaXApO1xuXHRcdGdlbmVyYXRlKGNydWlzZXIuc2hpcEFyclsyXSwgY3J1aXNlcik7XG5cdFx0Z2VuZXJhdGUoc3VibWFyaW5lLnNoaXBBcnJbM10sIHN1Ym1hcmluZSk7XG5cdFx0Z2VuZXJhdGUoZGVzdHJveWVyLnNoaXBBcnJbNF0sIGRlc3Ryb3llcik7XG5cdH07ICBcblxuXHRcblxuXHRmdW5jdGlvbiBwbGFjZVBsYXllciAoc2hpcCwgY29vcmQpIHsgXG5cdFx0aWYoc2hpcCA9PT0gJ2NhcnJpZXInKSB7IFxuXHRcdFx0Y2Fycmllci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnY3J1aXNlcicpIHsgXG5cdFx0XHRjcnVpc2VyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnYmF0dGxlc2hpcCcpIHsgXG5cdFx0XHRiYXR0bGVzaGlwLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdzdWJtYXJpbmUnKSB7IFxuXHRcdFx0c3VibWFyaW5lLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdkZXN0cm95ZXInKSB7IFxuXHRcdFx0ZGVzdHJveWVyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVjZWl2ZUF0dGFjayxcblx0XHRhbGxTdW5rLFxuXHRcdGJvYXJkLFxuXHRcdHBsYWNlQ29tcHV0ZXIsXG5cdFx0cGxhY2VQbGF5ZXIsIFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuICBcblx0Ly8gQXJyYXkgdGhhdCBjb250YWlucyBzaGlwcywgYW5kIHRoZWlyIGxlbmd0aHNcblx0Y29uc3Qgc2hpcEFyciA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMywgNCBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMywgd2lkdGggKiA0IF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2JhdHRsZXNoaXAnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnY3J1aXNlcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnc3VibWFyaW5lJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdkZXN0cm95ZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEgXSwgWyAwLCB3aWR0aCBdIF1cblx0XHR9XG5cdF07XG5cblx0Y29uc3Qgc2hpcENvb3JkID0gW107XG4gIC8vIE1hcHMgY29vcmRzIHRvIHNoaXBDb29yZCBhcnJheS4gVG8gYmUgdXNlZCBmb3IgY2hlY2tpbmcgaGl0cywgYW5kIHN1bmsuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQsIGhpZGVNb2RhbFBsYWNlLCBoaWRlU3RhcnRTY3JlZW4gfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuaW1wb3J0IGNvb3JkaW5hdGVzIGZyb20gJy4vZHJhZ0Ryb3AnO1xuXG5jb25zdCBzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5R2FtZScpO1xuY29uc3QgcGxheUdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKTtcblxuLy8gRnVuY3Rpb24gdGhhdCBjb250cm9scyBlbnRpcmUgZ2FtZUxvb3BcbmNvbnN0IGdhbWVMb29wID0gKGNvb3JkcykgPT4geyBcblx0Y29uc29sZS5sb2coY29vcmRzLmZsYXQoKSlcblx0Y29uc29sZS5sb2coY29vcmRzWzBdLm5hbWUsIGNvb3Jkc1swXS5jb29yZGluYXRlcyk7IFxuXHRjb25zb2xlLmxvZyhjb29yZHNbMV0ubmFtZSwgY29vcmRzWzFdLmNvb3JkaW5hdGVzKTsgXG5cdGNvbnNvbGUubG9nKGNvb3Jkc1syXS5uYW1lLCBjb29yZHNbMl0uY29vcmRpbmF0ZXMpOyBcblx0Y29uc29sZS5sb2coY29vcmRzWzNdLm5hbWUsIGNvb3Jkc1szXS5jb29yZGluYXRlcyk7IFxuXHRjb25zb2xlLmxvZyhjb29yZHNbNF0ubmFtZSwgY29vcmRzWzRdLmNvb3JkaW5hdGVzKTtcblx0aGlkZU1vZGFsUGxhY2UoKTtcblx0bGV0IGFjdGl2ZVBsYXllciA9IDA7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyIGdhbWVib2FyZHNcblx0Y29uc3QgYm9hcmQxID0gR2FtZWJvYXJkKCk7XG5cdGNvbnN0IGJvYXJkMiA9IEdhbWVib2FyZCgpO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllcnNcblx0Y29uc3QgcGxheWVyMSA9IFBsYXllcihib2FyZDIpO1xuXHRjb25zdCBwbGF5ZXIyID0gUGxheWVyKGJvYXJkMSk7XG5cblx0Ym9hcmQyLnBsYWNlQ29tcHV0ZXIoKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1swXS5uYW1lLCBjb29yZHNbMF0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzFdLm5hbWUsIGNvb3Jkc1sxXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMl0ubmFtZSwgY29vcmRzWzJdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1szXS5uYW1lLCBjb29yZHNbM10uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzRdLm5hbWUsIGNvb3Jkc1s0XS5jb29yZGluYXRlcyk7XG5cblx0Ly8gUmVuZGVyaW5nIGJvYXJkc1xuXHRyZW5kZXIoYm9hcmQxLCBib2FyZDIpO1xuXG5cdC8vIEZ1bmN0aW9uIGZvciBwbGF5ZXIgdHVybnNcblx0Y29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcblx0XHRhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcblx0fTtcblxuXHQvLyBDaGVja2luZyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHRmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRpZiAoYm9hcmQyLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdDb21wdXRlciBsb3N0LiBZb3Ugd2luIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdZb3UgbG9zdCEgVGhlIGVuZW15IGhhcyBkZWZlYXRlZCB5b3UuJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHRwbGF5ZXIxLnBsYXllckF0dGFjayhpKTtcblx0XHRcdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCk7XG5cdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdH07XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0YWN0aXZlUGxheWVyID09PSAwID8gcGxheWVyVHVybigpIDogY29tcHV0ZXJUdXJuKCk7XG5cdH1cblx0Y2hlY2soKTtcbn07XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCByZXN0YXJ0cyBnYW1lIHdoZW4gcmVzdGFydCBidXR0b24gcHJlc3NlZFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cmVzdGFydCgpO1xuXHRnYW1lTG9vcCgpO1xufSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCBzdGFydHMgdGhlIGdhbWVcbnBsYXlHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2FtZUxvb3AuYmluZCh0aGlzLCBjb29yZGluYXRlcykpO1xuc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlU3RhcnRTY3JlZW4pO1xuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHQiLCJtb2RhbCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInN0YXJ0U2NyZWVuIiwibW9kYWxQbGFjZSIsInJlbmRlciIsImJvYXJkMSIsImJvYXJkMiIsImdyaWQxIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImdyaWQyIiwiYm9hcmQiLCJmb3JFYWNoIiwiX19hIiwiaSIsImRpdiIsInRleHRDb250ZW50IiwiZGF0YXNldCIsImlkIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmQiLCJtYXJrU3BvdHMiLCJjb21wIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllciIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsInJlbmRlck1vZGFsQm9hcmQiLCJhcnIiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiZ3JpZCIsImhpZGVTdGFydFNjcmVlbiIsInZpc2liaWxpdHkiLCJoaWRlTW9kYWxQbGFjZSIsInNoaXBzIiwicGxheWVyQm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImUiLCJ0YXJnZXQiLCJpbmRleCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJzaGlwTGFzdEluZGV4IiwicGFyc2VJbnQiLCJsYXN0RWxlbWVudENoaWxkIiwic2hpcE5hbWUiLCJzaGlwQ29vcmRzIiwibmFtZSIsImNvbnRhaW5zIiwiY29vcmRzIiwicHVzaCIsImFkZCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjcmVhdGVTaGlwIiwic2hpcENvb3JkIiwibWFya1NoaXBzIiwiY29vcmQiLCJwb3NpdGlvbiIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2siLCJyZWNlaXZlQXR0YWNrSGVscGVyIiwiYWxsU3VuayIsImZpbHRlciIsImZpbmRBcnIiLCJjb3IiLCJpbmNsdWRlcyIsImZsYXQiLCJjaGVja0FyciIsInNvcnQiLCJ0b1N0cmluZyIsImNoZWNrQ2FycmllciIsImNoZWNrQmF0dGxlc2hpcCIsImNoZWNrQ3J1aXNlciIsImNoZWNrU3VibWFyaW5lIiwiY2hlY2tEZXN0cm95ZXIiLCJpc0hpdCIsImdlbmVyYXRlIiwic2hpcDIiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJkaXJlY3Rpb25zIiwiY3VycmVudCIsImRpcmVjdGlvbiIsInJhbmRvbVN0YXJ0IiwiYWJzIiwibGVmdCIsInNvbWUiLCJyaWdodCIsIm5vdEF2YWlsYWJsZSIsInBsYWNlQ29vcmRzIiwicGxhY2VDb21wdXRlciIsInNoaXBBcnIiLCJwbGFjZVBsYXllciIsIlBsYXllciIsImdhbWVib2FyZCIsImJvYXJkUGxheWVyIiwiYm9hcmRDb21wdXRlciIsInBsYXllckF0dGFjayIsImNvbXB1dGVyQXR0YWNrIiwic2xvdCIsInJhbmRvbUF0dGFjayIsIndpZHRoIiwibWFwIiwiY29vcmRpbmF0ZSIsImlzU3VuayIsImV2ZXJ5IiwiaGl0Iiwic3RhcnQiLCJwbGF5R2FtZSIsImdhbWVMb29wIiwiYWN0aXZlUGxheWVyIiwicGxheWVyMSIsInBsYXllcjIiLCJjaGFuZ2VUdXJuIiwiY2hlY2siLCJwbGF5IiwiY29tcHV0ZXIiLCJwbGF5ZXJUdXJuIiwiY29tcHV0ZXJUdXJuIiwiYmluZCJdLCJzb3VyY2VSb290IjoiIn0=