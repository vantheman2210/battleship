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
  console.log('drop'); // eslint-disable-next-line no-unused-vars

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFuQztBQUNBb0UsS0FBSyxDQUFDdEYsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0NMLHdEQUFoQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb21Db250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZHJhZ0Ryb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuLy8gU2VsZWN0aW5nIGVsZW1lbnRzXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7XG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncCcpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcbmNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LW1vZGFsJyk7IFxuY29uc3QgbW9kYWxQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpO1xuY29uc3QgcmVuZGVyID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdC8vIENyZWF0aW5nIHR3byBncmlkcyBmb3IgZGlzcGxheWluZyBib2FyZHNcblx0Y29uc3QgZ3JpZDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQxLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cdGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMi5jbGFzc05hbWUgPSAnZ3JpZDInO1xuXG5cdGJvYXJkMS5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRkaXYuZGF0YXNldC5pZCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZDEuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMSk7XG5cdH0pO1xuXG5cdGJvYXJkMi5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMic7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMi5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQyKTtcblx0fSk7XG59O1xuXG5jb25zdCBtYXJrU3BvdHMgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Y29uc3QgY29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKTtcblx0Y29uc3QgcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5cdGJvYXJkMS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcblxuXHRib2FyZDIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xufTsgXG5cbmNvbnN0IHNob3dNb2RhbCA9IChpbnB1dCkgPT4ge1xuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7XG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG5cdHRleHQudGV4dENvbnRlbnQgPSBpbnB1dDtcbn07XG5cbmNvbnN0IHJlc3RhcnQgPSAoKSA9PiB7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xufTtcblxubGV0IGhvcml6b250YWwgPSBmYWxzZTtcbmNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcblx0XG5cdGlmIChob3Jpem9udGFsKSB7XG5cdFx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGJhdHRsZXNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgYmF0dGxlc2hpcENvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdHN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKGBzdWJtYXJpbmVDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGhvcml6b250YWwgPSB0cnVlO1xuXHR9XG5cdGlmICghaG9yaXpvbnRhbCkge1xuXHRcdGNhcnJpZXIuY2xhc3NMaXN0LnRvZ2dsZShgY2FycmllckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0Y3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKGBjcnVpc2VyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRkZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShgZGVzdHJveWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRob3Jpem9udGFsID0gZmFsc2U7XG5cdH1cbn07XG5cbmNvbnN0IHJlbmRlck1vZGFsQm9hcmQgPSAoKSA9PiB7XG5cdC8vIENyZWF0aW5nIGJvYXJkIGZvciBwbGFjaW5nIHNoaXBzICBcblx0XG5cdGNvbnN0IGFyciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLUJvYXJkJyk7XG5cdGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQuY2xhc3NOYW1lID0gJ2dyaWQxJztcblxuXHRhcnIuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczEnO1xuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0ZGl2LmRhdGFzZXQuaWQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQuYXBwZW5kKGRpdik7XG5cdFx0Ym9hcmQuYXBwZW5kKGdyaWQpO1xuXHR9KTtcbn07IFxuXG5jb25zdCBoaWRlU3RhcnRTY3JlZW4gPSAoKSA9PiB7IFxuXHRzdGFydFNjcmVlbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7ICBcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJykuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpOyBcbn0gIFxuY29uc3QgaGlkZU1vZGFsUGxhY2UgPSAoKSA9PiB7IFxuXHRtb2RhbFBsYWNlLmNsYXNzTGlzdC50b2dnbGUoJ21vZGFsLXBsYWNlLXNob3cnKTtcbn1cblxuZXhwb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgcm90YXRlLCByZW5kZXJNb2RhbEJvYXJkLCBoaWRlU3RhcnRTY3JlZW4sIGhpZGVNb2RhbFBsYWNlIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IHsgcmVuZGVyTW9kYWxCb2FyZCwgcm90YXRlIH0gZnJvbSAnLi9kb21Db250cm9sJztcblxucmVuZGVyTW9kYWxCb2FyZCgpO1xuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXJDb250YWluZXInKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcENvbnRhaW5lcicpO1xuY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyQ29udGFpbmVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lQ29udGFpbmVyJyk7XG5jb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyQ29udGFpbmVyJyk7XG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcycpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuYmF0dGxlc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5jcnVpc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbnN1Ym1hcmluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5kZXN0cm95ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3ZlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcmFnRHJvcCkpO1xuXG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgc2hpcEluZGV4O1xubGV0IGRyYWdnZWRTaGlwTGVuZ3RoO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxuXHRzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0c2hpcEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcblx0fSlcbik7XG5cbmZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcblx0ZHJhZ2dlZFNoaXAgPSB0aGlzO1xuXHRkcmFnZ2VkU2hpcExlbmd0aCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuXHRjb25zb2xlLmxvZyhkcmFnZ2VkU2hpcCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdMZWF2ZSgpIHtcblx0Y29uc29sZS5sb2coJ2RyYWcgbGVhdmUnKTtcbn1cblxuY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gZHJhZ0Ryb3AoKSB7XG5cdGNvbnNvbGUubG9nKCdkcm9wJyk7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRjb25zdCBzaGlwTGFzdEluZGV4ID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAubGFzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LmluZGV4KTtcblx0Y29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXA7XG5cdGNvbnN0IHNoaXBDb29yZHMgPSB7XG5cdFx0bmFtZTogc2hpcE5hbWUsXG5cdFx0Y29vcmRpbmF0ZXM6IFtdXG5cdH07XG5cblx0aWYgKGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSArIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fSBlbHNlIGlmICghZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICogMTAgKyAxMCAqIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fVxuXHRjb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZHMpO1xufVxuY29uc29sZS5sb2coY29vcmRpbmF0ZXMpO1xuZXhwb3J0IGRlZmF1bHQgY29vcmRpbmF0ZXM7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdOyBcblxuXHQvLyBGdW5jdGlvbiB0aGF0IG1hcmtzIHBsYXllciBib2FyZCBzaGlwcyBcblx0Y29uc3QgbWFya1NoaXBzID0gKGNvb3JkKSA9PiB7IFxuXHRcdGNvb3JkLmZvckVhY2gocG9zaXRpb24gPT4gYm9hcmRbcG9zaXRpb25dID0gJ3NoaXAnKVxuXHR9XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTsgIFxuXG5cdFxuXG5cdGZ1bmN0aW9uIHBsYWNlUGxheWVyIChzaGlwLCBjb29yZCkgeyBcblx0XHRpZihzaGlwID09PSAnY2FycmllcicpIHsgXG5cdFx0XHRjYXJyaWVyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdjcnVpc2VyJykgeyBcblx0XHRcdGNydWlzZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9XG5cblx0XHRlbHNlIGlmKHNoaXAgPT09ICdiYXR0bGVzaGlwJykgeyBcblx0XHRcdGJhdHRsZXNoaXAucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ3N1Ym1hcmluZScpIHsgXG5cdFx0XHRzdWJtYXJpbmUucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2Rlc3Ryb3llcicpIHsgXG5cdFx0XHRkZXN0cm95ZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0cGxhY2VDb21wdXRlcixcblx0XHRwbGFjZVBsYXllciwgXG5cdFx0Y3JlYXRlU2hpcFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cdGNvbnN0IGJvYXJkUGxheWVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmRDb21wdXRlciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IHBsYXllckF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRQbGF5ZXJbYXR0YWNrXSAhPT0gJ2F0dGFja2VkJykge1xuXHRcdFx0Ym9hcmRQbGF5ZXJbYXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0XHRyZXR1cm4gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKTtcblx0XHR9XG5cdFx0cmV0dXJuICdpbGxlZ2FsIG1vdmUnO1xuXHR9O1xuXG5cdGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xuXHRcdGNvbnN0IGJvYXJkID0gYm9hcmRDb21wdXRlci5maWx0ZXIoKHNsb3QpID0+IHNsb3QgIT09ICdhdHRhY2tlZCcpO1xuXHRcdGNvbnN0IHJhbmRvbUF0dGFjayA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCldO1xuXHRcdGJvYXJkQ29tcHV0ZXJbcmFuZG9tQXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0Z2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQXR0YWNrKTtcblx0XHRyZXR1cm4gcmFuZG9tQXR0YWNrO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cGxheWVyQXR0YWNrLFxuXHRcdGNvbXB1dGVyQXR0YWNrLFxuXHRcdGJvYXJkQ29tcHV0ZXIsXG5cdFx0Ym9hcmRQbGF5ZXJcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcblxuLypcbmNvbnN0IGMgPSAoc2hpcCkgPT4ge1xuXHRpZiAoc2hpcCA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDUgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnU3VibWFyaW5lJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnRGVzdHJveWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDIgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKCdTcGVjaWZ5IHNoaXAnKTtcbn07XG4qL1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBzaGlwIG9iamVjdHNcbmZ1bmN0aW9uIFNoaXAoKSB7XG5cdGNvbnN0IHdpZHRoID0gMTA7XG4gIFxuXHQvLyBBcnJheSB0aGF0IGNvbnRhaW5zIHNoaXBzLCBhbmQgdGhlaXIgbGVuZ3Roc1xuXHRjb25zdCBzaGlwQXJyID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdjYXJyaWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzLCA0IF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzLCB3aWR0aCAqIDQgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnYmF0dGxlc2hpcCcsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMyBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMyBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdjcnVpc2VyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdzdWJtYXJpbmUnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2Rlc3Ryb3llcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSBdLCBbIDAsIHdpZHRoIF0gXVxuXHRcdH1cblx0XTtcblxuXHRjb25zdCBzaGlwQ29vcmQgPSBbXTtcbiAgLy8gTWFwcyBjb29yZHMgdG8gc2hpcENvb3JkIGFycmF5LiBUbyBiZSB1c2VkIGZvciBjaGVja2luZyBoaXRzLCBhbmQgc3Vuay5cblx0Y29uc3QgcGxhY2VDb29yZHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcblx0XHRjb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IHNoaXBDb29yZC5wdXNoKGNvb3JkaW5hdGUpKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbnMgdGhhdCByZW1vdmVzIGRlc3Ryb3llZCBzaGlwXG5cdGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGFtYWdlcyBzaGlwIHBvc2l0aW9uc1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuXHRjb25zdCBpc0hpdCA9IChoaXQpID0+IChzaGlwQ29vcmRbaGl0XSA9ICdoaXQnKTtcblxuXHRyZXR1cm4geyBzaGlwQ29vcmQsIGlzU3VuaywgaXNIaXQsIHBsYWNlQ29vcmRzLCBzaGlwQXJyIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgaGlkZU1vZGFsUGxhY2UsIGhpZGVTdGFydFNjcmVlbiB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5pbXBvcnQgY29vcmRpbmF0ZXMgZnJvbSAnLi9kcmFnRHJvcCc7XG5cbmNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXlHYW1lJyk7XG5jb25zdCBwbGF5R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoY29vcmRzKSA9PiB7IFxuXHRjb25zb2xlLmxvZyhjb29yZHMuZmxhdCgpKVxuXHRjb25zb2xlLmxvZyhjb29yZHNbMF0ubmFtZSwgY29vcmRzWzBdLmNvb3JkaW5hdGVzKTsgXG5cdGNvbnNvbGUubG9nKGNvb3Jkc1sxXS5uYW1lLCBjb29yZHNbMV0uY29vcmRpbmF0ZXMpOyBcblx0Y29uc29sZS5sb2coY29vcmRzWzJdLm5hbWUsIGNvb3Jkc1syXS5jb29yZGluYXRlcyk7IFxuXHRjb25zb2xlLmxvZyhjb29yZHNbM10ubmFtZSwgY29vcmRzWzNdLmNvb3JkaW5hdGVzKTsgXG5cdGNvbnNvbGUubG9nKGNvb3Jkc1s0XS5uYW1lLCBjb29yZHNbNF0uY29vcmRpbmF0ZXMpO1xuXHRoaWRlTW9kYWxQbGFjZSgpO1xuXHRsZXQgYWN0aXZlUGxheWVyID0gMDtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXIgZ2FtZWJvYXJkc1xuXHRjb25zdCBib2FyZDEgPSBHYW1lYm9hcmQoKTtcblx0Y29uc3QgYm9hcmQyID0gR2FtZWJvYXJkKCk7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyc1xuXHRjb25zdCBwbGF5ZXIxID0gUGxheWVyKGJvYXJkMik7XG5cdGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoYm9hcmQxKTtcblxuXHRib2FyZDIucGxhY2VDb21wdXRlcigpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzBdLm5hbWUsIGNvb3Jkc1swXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMV0ubmFtZSwgY29vcmRzWzFdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1syXS5uYW1lLCBjb29yZHNbMl0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzNdLm5hbWUsIGNvb3Jkc1szXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbNF0ubmFtZSwgY29vcmRzWzRdLmNvb3JkaW5hdGVzKTtcblxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ0NvbXB1dGVyIGxvc3QuIFlvdSB3aW4hJyk7XG5cdFx0fSBlbHNlIGlmIChib2FyZDEuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBsb3N0ISBUaGUgZW5lbXkgaGFzIGRlZmVhdGVkIHlvdS4nKTtcblx0XHR9IGVsc2UgcGxheSgpO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gbG9vcCB0aGF0IHN3aXRjaGVzIHBsYXllciB0dXJuc1xuXHRmdW5jdGlvbiBwbGF5KCkge1xuXHRcdGNvbnN0IGNvbXB1dGVyID0gWyAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJykgXTtcblx0XHRjb25zdCBwbGF5ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0Y29tcHV0ZXIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHBsYXllcjEucGxheWVyQXR0YWNrKGkpO1xuXHRcdFx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcblx0XHRcdHBsYXllcjIuY29tcHV0ZXJBdHRhY2soKTtcblx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0fTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRhY3RpdmVQbGF5ZXIgPT09IDAgPyBwbGF5ZXJUdXJuKCkgOiBjb21wdXRlclR1cm4oKTtcblx0fVxuXHRjaGVjaygpO1xufTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHJlc3RhcnRzIGdhbWUgd2hlbiByZXN0YXJ0IGJ1dHRvbiBwcmVzc2VkXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRyZXN0YXJ0KCk7XG5cdGdhbWVMb29wKCk7XG59KTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHN0YXJ0cyB0aGUgZ2FtZVxucGxheUdhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnYW1lTG9vcC5iaW5kKHRoaXMsIGNvb3JkaW5hdGVzKSk7XG5zdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVTdGFydFNjcmVlbik7XG4iXSwibmFtZXMiOlsiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dCIsIm1vZGFsIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic3RhcnRTY3JlZW4iLCJtb2RhbFBsYWNlIiwicmVuZGVyIiwiYm9hcmQxIiwiYm9hcmQyIiwiZ3JpZDEiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZ3JpZDIiLCJib2FyZCIsImZvckVhY2giLCJfX2EiLCJpIiwiZGl2IiwidGV4dENvbnRlbnQiLCJkYXRhc2V0IiwiaWQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFwcGVuZCIsIm1hcmtTcG90cyIsImNvbXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGxheWVyIiwiZWxlbWVudCIsImJhY2tncm91bmQiLCJzaG93TW9kYWwiLCJpbnB1dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInJlc3RhcnQiLCJpbm5lckhUTUwiLCJob3Jpem9udGFsIiwicm90YXRlIiwicmVuZGVyTW9kYWxCb2FyZCIsImFyciIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJncmlkIiwiaGlkZVN0YXJ0U2NyZWVuIiwidmlzaWJpbGl0eSIsImhpZGVNb2RhbFBsYWNlIiwic2hpcHMiLCJwbGF5ZXJCb2FyZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaGlwIiwiZHJhZ1N0YXJ0IiwiY2VsbCIsImRyYWdPdmVyIiwiZHJhZ0VudGVyIiwiZHJhZ0xlYXZlIiwiZHJhZ0Ryb3AiLCJkcmFnZ2VkU2hpcCIsInNoaXBJbmRleCIsImRyYWdnZWRTaGlwTGVuZ3RoIiwiZSIsInRhcmdldCIsImluZGV4IiwiY2hpbGRyZW4iLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJjb29yZGluYXRlcyIsInNoaXBMYXN0SW5kZXgiLCJwYXJzZUludCIsImxhc3RFbGVtZW50Q2hpbGQiLCJzaGlwTmFtZSIsInNoaXBDb29yZHMiLCJuYW1lIiwiY29udGFpbnMiLCJjb29yZHMiLCJwdXNoIiwiYWRkIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJtYXJrU2hpcHMiLCJjb29yZCIsInBvc2l0aW9uIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsInBsYWNlUGxheWVyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJtYXAiLCJjb29yZGluYXRlIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJzdGFydCIsInBsYXlHYW1lIiwiZ2FtZUxvb3AiLCJhY3RpdmVQbGF5ZXIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJjb21wdXRlclR1cm4iLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==