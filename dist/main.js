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
var text = document.querySelector('.gameOver');
var modal = document.querySelector('.modal');
var carrier = document.querySelector('.carrierContainer');
var battleship = document.querySelector('.battleshipContainer');
var cruiser = document.querySelector('.cruiserContainer');
var submarine = document.querySelector('.submarineContainer');
var destroyer = document.querySelector('.destroyerContainer');
var carrierTwo = document.querySelector('.carrier');
var battleshipTwo = document.querySelector('.battleship');
var cruiserTwo = document.querySelector('.cruiser');
var submarineTwo = document.querySelector('.submarine');
var destroyerTwo = document.querySelector('.destroyer');
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
  startScreen.style.visibility = 'visible';
  modal.classList.toggle('show-modal');
  container.classList.toggle('is-blurred');
  carrier.classList.remove('hide');
  cruiser.classList.remove('hide');
  battleship.classList.remove('hide');
  submarine.classList.remove('hide');
  destroyer.classList.remove('hide');
};

var horizontal = false;

var rotate = function rotate() {
  if (horizontal) {
    carrier.classList.toggle("carrierContainer-horizontal");
    carrierTwo.classList.toggle('carrier-horizontal');
    battleship.classList.toggle("battleshipContainer-horizontal");
    battleshipTwo.classList.toggle('battleship-horizontal');
    cruiser.classList.toggle("cruiserContainer-horizontal");
    cruiserTwo.classList.toggle('cruiser-horizontal');
    submarine.classList.toggle("submarineContainer-horizontal");
    submarineTwo.classList.toggle('submarine-horizontal');
    destroyer.classList.toggle("destroyerContainer-horizontal");
    destroyerTwo.classList.toggle('destroyer-horizontal');
    horizontal = true;
  }

  if (!horizontal) {
    carrier.classList.toggle("carrierContainer-horizontal");
    carrierTwo.classList.toggle('carrier-horizontal');
    battleship.classList.toggle("battleshipContainer-horizontal");
    battleshipTwo.classList.toggle('battleship-horizontal');
    cruiser.classList.toggle("cruiserContainer-horizontal");
    cruiserTwo.classList.toggle('cruiser-horizontal');
    submarine.classList.toggle("submarineContainer-horizontal");
    submarineTwo.classList.toggle('submarine-horizontal');
    destroyer.classList.toggle("destroyerContainer-horizontal");
    destroyerTwo.classList.toggle('destroyer-horizontal');
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
    div.className = 'cells1'; // div.textContent = i;

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
/* harmony export */   "coordinates": () => (/* binding */ coordinates),
/* harmony export */   "clear": () => (/* binding */ clear)
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

function clear() {
  coordinates = [];
  playerBoard.forEach(function (element) {
    return element.style.background = 'white';
  });
}



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
  (0,_dragDrop__WEBPACK_IMPORTED_MODULE_3__.clear)();
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.restart)();
}); // addEventListener that starts the game

playGame.addEventListener('click', function () {
  gameLoop(_dragDrop__WEBPACK_IMPORTED_MODULE_3__.coordinates);
});
start.addEventListener('click', function () {
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.hideStartScreen)();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBa0MsWUFBTTtBQUN2QzJGLFVBQUFBLE9BQU8sQ0FBQ2QsWUFBUixDQUFxQmhILENBQXJCO0FBQ0FRLFVBQUFBLHNEQUFTLENBQUNoQixNQUFNLENBQUNLLEtBQVIsRUFBZU4sTUFBTSxDQUFDTSxLQUF0QixDQUFUO0FBQ0FtSSxVQUFBQSxVQUFVO0FBQ1ZDLFVBQUFBLEtBQUs7QUFDTCxTQUxEO0FBTUEsT0FQRDtBQVFBLEtBVEQ7O0FBV0EsUUFBTUksWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUMxQk4sTUFBQUEsT0FBTyxDQUFDZCxjQUFSO0FBQ0F6RyxNQUFBQSxzREFBUyxDQUFDaEIsTUFBTSxDQUFDSyxLQUFSLEVBQWVOLE1BQU0sQ0FBQ00sS0FBdEIsQ0FBVDtBQUNBbUksTUFBQUEsVUFBVTtBQUNWLEtBSkQsQ0FiZSxDQW1CZjs7O0FBQ0FILElBQUFBLFlBQVksS0FBSyxDQUFqQixHQUFxQk8sVUFBVSxFQUEvQixHQUFvQ0MsWUFBWSxFQUFoRDtBQUNBOztBQUNESixFQUFBQSxLQUFLO0FBQ0wsQ0E1REQsRUE4REE7OztBQUNBM0osUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DNEQsZ0JBQW5DLENBQW9ELE9BQXBELEVBQTZELFlBQU07QUFDbEU2QixFQUFBQSxnREFBSztBQUNMOUMsRUFBQUEsb0RBQU87QUFDUCxDQUhELEdBS0E7O0FBQ0F5RyxRQUFRLENBQUN4RixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFNO0FBQ3hDeUYsRUFBQUEsUUFBUSxDQUFDdkUsa0RBQUQsQ0FBUjtBQUNBLENBRkQ7QUFHQXFFLEtBQUssQ0FBQ3ZGLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFlBQU07QUFDckNKLEVBQUFBLDREQUFlO0FBQ2YsQ0FGRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb21Db250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZHJhZ0Ryb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuLy8gU2VsZWN0aW5nIGVsZW1lbnRzXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7XG5jb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVPdmVyJyk7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpOyBcbmNvbnN0IGNhcnJpZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllcicpO1xuY29uc3QgYmF0dGxlc2hpcFR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwJyk7XG5jb25zdCBjcnVpc2VyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXInKTtcbmNvbnN0IHN1Ym1hcmluZVR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmUnKTtcbmNvbnN0IGRlc3Ryb3llclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXInKTtcbmNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LW1vZGFsJyk7IFxuY29uc3QgbW9kYWxQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpO1xuY29uc3QgcmVuZGVyID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdC8vIENyZWF0aW5nIHR3byBncmlkcyBmb3IgZGlzcGxheWluZyBib2FyZHNcblx0Y29uc3QgZ3JpZDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQxLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cdGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMi5jbGFzc05hbWUgPSAnZ3JpZDInO1xuXG5cdGJvYXJkMS5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRkaXYuZGF0YXNldC5pZCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZDEuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMSk7XG5cdH0pO1xuXG5cdGJvYXJkMi5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMic7XG5cdFx0ZGl2LnRleHRDb250ZW50ID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMi5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQyKTtcblx0fSk7XG59O1xuXG5jb25zdCBtYXJrU3BvdHMgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Y29uc3QgY29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKTtcblx0Y29uc3QgcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5cdGJvYXJkMS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAoY29tcFtpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcblxuXHRib2FyZDIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyYXknKSA6IG51bGw7XG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xufTsgXG5cbmNvbnN0IHNob3dNb2RhbCA9IChpbnB1dCkgPT4ge1xuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7XG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7XG5cdHRleHQudGV4dENvbnRlbnQgPSBpbnB1dDtcbn07XG5cbmNvbnN0IHJlc3RhcnQgPSAoKSA9PiB7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgXG5cdHN0YXJ0U2NyZWVuLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7IFxuXHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJyk7XG5cdGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1ibHVycmVkJyk7IFxuXHRjYXJyaWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0Y3J1aXNlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdGJhdHRsZXNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRzdWJtYXJpbmUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRkZXN0cm95ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpOyAgICBcbn07XG5cbmxldCBob3Jpem9udGFsID0gZmFsc2U7XG5jb25zdCByb3RhdGUgPSAoKSA9PiB7XG5cdFxuXHRpZiAoaG9yaXpvbnRhbCkge1xuXHRcdGNhcnJpZXIuY2xhc3NMaXN0LnRvZ2dsZShgY2FycmllckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0Y2FycmllclR3by5jbGFzc0xpc3QudG9nZ2xlKCdjYXJyaWVyLWhvcml6b250YWwnKTtcblxuXHRcdGJhdHRsZXNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgYmF0dGxlc2hpcENvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0YmF0dGxlc2hpcFR3by5jbGFzc0xpc3QudG9nZ2xlKCdiYXR0bGVzaGlwLWhvcml6b250YWwnKTtcblxuXHRcdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdGNydWlzZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnY3J1aXNlci1ob3Jpem9udGFsJyk7XG5cblx0XHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdFx0c3VibWFyaW5lVHdvLmNsYXNzTGlzdC50b2dnbGUoJ3N1Ym1hcmluZS1ob3Jpem9udGFsJyk7XG5cblx0XHRkZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShgZGVzdHJveWVyQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdFx0ZGVzdHJveWVyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2Rlc3Ryb3llci1ob3Jpem9udGFsJyk7XG5cblx0XHRob3Jpem9udGFsID0gdHJ1ZTtcblx0fVxuXHRpZiAoIWhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGNhcnJpZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnY2Fycmllci1ob3Jpem9udGFsJyk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGJhdHRsZXNoaXBUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYmF0dGxlc2hpcC1ob3Jpem9udGFsJyk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRjcnVpc2VyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2NydWlzZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdHN1Ym1hcmluZVR3by5jbGFzc0xpc3QudG9nZ2xlKCdzdWJtYXJpbmUtaG9yaXpvbnRhbCcpO1xuXG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdGRlc3Ryb3llclR3by5jbGFzc0xpc3QudG9nZ2xlKCdkZXN0cm95ZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0aG9yaXpvbnRhbCA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCByZW5kZXJNb2RhbEJvYXJkID0gKCkgPT4ge1xuXHQvLyBDcmVhdGluZyBib2FyZCBmb3IgcGxhY2luZyBzaGlwcyAgXG5cdGNvbnN0IGFyciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLUJvYXJkJyk7IFxuXHRcblx0Y29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZC5jbGFzc05hbWUgPSAnZ3JpZDEnOyBcblxuXHRhcnIuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczEnO1xuXHRcdC8vIGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0ZGl2LmRhdGFzZXQuaWQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQuYXBwZW5kKGRpdik7XG5cdFx0Ym9hcmQuYXBwZW5kKGdyaWQpO1xuXHR9KTtcbn07IFxuXG5jb25zdCBoaWRlU3RhcnRTY3JlZW4gPSAoKSA9PiB7IFxuXHRzdGFydFNjcmVlbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7ICBcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJykuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpOyAgIFxufSAgXG5jb25zdCBoaWRlTW9kYWxQbGFjZSA9ICgpID0+IHsgXG5cdG1vZGFsUGxhY2UuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByb3RhdGUsIHJlbmRlck1vZGFsQm9hcmQsIGhpZGVTdGFydFNjcmVlbiwgaGlkZU1vZGFsUGxhY2UgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyByZW5kZXJNb2RhbEJvYXJkLCByb3RhdGUgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG5yZW5kZXJNb2RhbEJvYXJkKCk7XG5cbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXBzJyk7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTsgXG5cblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5iYXR0bGVzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmNydWlzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuc3VibWFyaW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmRlc3Ryb3llci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKSk7XG5cbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBzaGlwSW5kZXg7XG5sZXQgZHJhZ2dlZFNoaXBMZW5ndGg7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+XG5cdHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0XHRzaGlwSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHR9KVxuKTtcblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KCkge1xuXHRkcmFnZ2VkU2hpcCA9IHRoaXM7XG5cdGRyYWdnZWRTaGlwTGVuZ3RoID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0xlYXZlKCkge1xuXHRjb25zb2xlLmxvZygnZHJhZyBsZWF2ZScpO1xufVxuXG5sZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gZHJhZ0Ryb3AoKSB7XG5cdGNvbnNvbGUubG9nKCdkcm9wJyk7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRjb25zdCBzaGlwTGFzdEluZGV4ID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAubGFzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LmluZGV4KTtcblx0Y29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXA7XG5cdGNvbnN0IHNoaXBDb29yZHMgPSB7XG5cdFx0bmFtZTogc2hpcE5hbWUsXG5cdFx0Y29vcmRpbmF0ZXM6IFtdXG5cdH07XG5cblx0aWYgKGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSArIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fSBlbHNlIGlmICghZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICogMTAgKyAxMCAqIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fVxuXHRjb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZHMpO1xufSBcblxuZnVuY3Rpb24gY2xlYXIgKCkgeyBcblx0Y29vcmRpbmF0ZXMgPSBbXTsgIFxuXHRwbGF5ZXJCb2FyZC5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJyk7XG59XG5cbmV4cG9ydCAge2Nvb3JkaW5hdGVzLCBjbGVhcn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdOyBcblxuXHQvLyBGdW5jdGlvbiB0aGF0IG1hcmtzIHBsYXllciBib2FyZCBzaGlwcyBcblx0Y29uc3QgbWFya1NoaXBzID0gKGNvb3JkKSA9PiB7IFxuXHRcdGNvb3JkLmZvckVhY2gocG9zaXRpb24gPT4gYm9hcmRbcG9zaXRpb25dID0gJ3NoaXAnKVxuXHR9XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTsgIFxuXG5cdFxuXG5cdGZ1bmN0aW9uIHBsYWNlUGxheWVyIChzaGlwLCBjb29yZCkgeyBcblx0XHRpZihzaGlwID09PSAnY2FycmllcicpIHsgXG5cdFx0XHRjYXJyaWVyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdjcnVpc2VyJykgeyBcblx0XHRcdGNydWlzZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9XG5cblx0XHRlbHNlIGlmKHNoaXAgPT09ICdiYXR0bGVzaGlwJykgeyBcblx0XHRcdGJhdHRsZXNoaXAucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ3N1Ym1hcmluZScpIHsgXG5cdFx0XHRzdWJtYXJpbmUucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2Rlc3Ryb3llcicpIHsgXG5cdFx0XHRkZXN0cm95ZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0cGxhY2VDb21wdXRlcixcblx0XHRwbGFjZVBsYXllciwgXG5cdFx0Y3JlYXRlU2hpcFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cdGNvbnN0IGJvYXJkUGxheWVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmRDb21wdXRlciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IHBsYXllckF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRQbGF5ZXJbYXR0YWNrXSAhPT0gJ2F0dGFja2VkJykge1xuXHRcdFx0Ym9hcmRQbGF5ZXJbYXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0XHRyZXR1cm4gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKTtcblx0XHR9XG5cdFx0cmV0dXJuICdpbGxlZ2FsIG1vdmUnO1xuXHR9O1xuXG5cdGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xuXHRcdGNvbnN0IGJvYXJkID0gYm9hcmRDb21wdXRlci5maWx0ZXIoKHNsb3QpID0+IHNsb3QgIT09ICdhdHRhY2tlZCcpO1xuXHRcdGNvbnN0IHJhbmRvbUF0dGFjayA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCldO1xuXHRcdGJvYXJkQ29tcHV0ZXJbcmFuZG9tQXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0Z2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQXR0YWNrKTtcblx0XHRyZXR1cm4gcmFuZG9tQXR0YWNrO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cGxheWVyQXR0YWNrLFxuXHRcdGNvbXB1dGVyQXR0YWNrLFxuXHRcdGJvYXJkQ29tcHV0ZXIsXG5cdFx0Ym9hcmRQbGF5ZXJcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcblxuLypcbmNvbnN0IGMgPSAoc2hpcCkgPT4ge1xuXHRpZiAoc2hpcCA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDUgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnU3VibWFyaW5lJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnRGVzdHJveWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDIgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKCdTcGVjaWZ5IHNoaXAnKTtcbn07XG4qL1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBzaGlwIG9iamVjdHNcbmZ1bmN0aW9uIFNoaXAoKSB7XG5cdGNvbnN0IHdpZHRoID0gMTA7XG4gIFxuXHQvLyBBcnJheSB0aGF0IGNvbnRhaW5zIHNoaXBzLCBhbmQgdGhlaXIgbGVuZ3Roc1xuXHRjb25zdCBzaGlwQXJyID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdjYXJyaWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzLCA0IF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzLCB3aWR0aCAqIDQgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnYmF0dGxlc2hpcCcsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMyBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMyBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdjcnVpc2VyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdzdWJtYXJpbmUnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2Rlc3Ryb3llcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSBdLCBbIDAsIHdpZHRoIF0gXVxuXHRcdH1cblx0XTtcblxuXHRjb25zdCBzaGlwQ29vcmQgPSBbXTtcbiAgLy8gTWFwcyBjb29yZHMgdG8gc2hpcENvb3JkIGFycmF5LiBUbyBiZSB1c2VkIGZvciBjaGVja2luZyBoaXRzLCBhbmQgc3Vuay5cblx0Y29uc3QgcGxhY2VDb29yZHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcblx0XHRjb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IHNoaXBDb29yZC5wdXNoKGNvb3JkaW5hdGUpKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbnMgdGhhdCByZW1vdmVzIGRlc3Ryb3llZCBzaGlwXG5cdGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGFtYWdlcyBzaGlwIHBvc2l0aW9uc1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuXHRjb25zdCBpc0hpdCA9IChoaXQpID0+IChzaGlwQ29vcmRbaGl0XSA9ICdoaXQnKTtcblxuXHRyZXR1cm4geyBzaGlwQ29vcmQsIGlzU3VuaywgaXNIaXQsIHBsYWNlQ29vcmRzLCBzaGlwQXJyIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgaGlkZU1vZGFsUGxhY2UsIGhpZGVTdGFydFNjcmVlbiB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5pbXBvcnQge2Nvb3JkaW5hdGVzLGNsZWFyfSBmcm9tICcuL2RyYWdEcm9wJztcblxuY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheUdhbWUnKTtcbmNvbnN0IHBsYXlHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Jyk7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9IChjb29yZHMpID0+IHsgXG5cdGhpZGVNb2RhbFBsYWNlKCk7XG5cdGxldCBhY3RpdmVQbGF5ZXIgPSAwO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllciBnYW1lYm9hcmRzXG5cdGNvbnN0IGJvYXJkMSA9IEdhbWVib2FyZCgpO1xuXHRjb25zdCBib2FyZDIgPSBHYW1lYm9hcmQoKTtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXJzXG5cdGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoYm9hcmQyKTtcblx0Y29uc3QgcGxheWVyMiA9IFBsYXllcihib2FyZDEpO1xuXG5cdGJvYXJkMi5wbGFjZUNvbXB1dGVyKCk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMF0ubmFtZSwgY29vcmRzWzBdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1sxXS5uYW1lLCBjb29yZHNbMV0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzJdLm5hbWUsIGNvb3Jkc1syXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbM10ubmFtZSwgY29vcmRzWzNdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1s0XS5uYW1lLCBjb29yZHNbNF0uY29vcmRpbmF0ZXMpO1xuXG5cdC8vIFJlbmRlcmluZyBib2FyZHNcblx0cmVuZGVyKGJvYXJkMSwgYm9hcmQyKTtcblxuXHQvLyBGdW5jdGlvbiBmb3IgcGxheWVyIHR1cm5zXG5cdGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG5cdFx0YWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSAwID8gMSA6IDA7XG5cdH07XG5cblx0Ly8gQ2hlY2tpbmcgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0ZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0aWYgKGJvYXJkMi5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnQ29tcHV0ZXIgbG9zdC4gWW91IHdpbiEnKTtcblx0XHR9IGVsc2UgaWYgKGJvYXJkMS5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnWW91IGxvc3QhIFRoZSBlbmVteSBoYXMgZGVmZWF0ZWQgeW91LicpO1xuXHRcdH0gZWxzZSBwbGF5KCk7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiBsb29wIHRoYXQgc3dpdGNoZXMgcGxheWVyIHR1cm5zXG5cdGZ1bmN0aW9uIHBsYXkoKSB7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBbIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKSBdO1xuXHRcdGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRjb21wdXRlci5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0cGxheWVyMS5wbGF5ZXJBdHRhY2soaSk7XG5cdFx0XHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0cGxheWVyMi5jb21wdXRlckF0dGFjaygpO1xuXHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHR9O1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdGFjdGl2ZVBsYXllciA9PT0gMCA/IHBsYXllclR1cm4oKSA6IGNvbXB1dGVyVHVybigpO1xuXHR9XG5cdGNoZWNrKCk7XG59O1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgcmVzdGFydHMgZ2FtZSB3aGVuIHJlc3RhcnQgYnV0dG9uIHByZXNzZWRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuXHRjbGVhcigpO1xuXHRyZXN0YXJ0KCk7IFxufSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCBzdGFydHMgdGhlIGdhbWVcbnBsYXlHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcblx0Z2FtZUxvb3AoY29vcmRpbmF0ZXMpO1xufSk7XG5zdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG5cdGhpZGVTdGFydFNjcmVlbigpO1xufSk7XG4iXSwibmFtZXMiOlsiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dCIsIm1vZGFsIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiY2FycmllclR3byIsImJhdHRsZXNoaXBUd28iLCJjcnVpc2VyVHdvIiwic3VibWFyaW5lVHdvIiwiZGVzdHJveWVyVHdvIiwic3RhcnRTY3JlZW4iLCJtb2RhbFBsYWNlIiwicmVuZGVyIiwiYm9hcmQxIiwiYm9hcmQyIiwiZ3JpZDEiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZ3JpZDIiLCJib2FyZCIsImZvckVhY2giLCJfX2EiLCJpIiwiZGl2IiwidGV4dENvbnRlbnQiLCJkYXRhc2V0IiwiaWQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFwcGVuZCIsIm1hcmtTcG90cyIsImNvbXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGxheWVyIiwiZWxlbWVudCIsImJhY2tncm91bmQiLCJzaG93TW9kYWwiLCJpbnB1dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInJlc3RhcnQiLCJpbm5lckhUTUwiLCJ2aXNpYmlsaXR5IiwicmVtb3ZlIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsInJlbmRlck1vZGFsQm9hcmQiLCJhcnIiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiZ3JpZCIsImhpZGVTdGFydFNjcmVlbiIsImhpZGVNb2RhbFBsYWNlIiwic2hpcHMiLCJwbGF5ZXJCb2FyZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaGlwIiwiZHJhZ1N0YXJ0IiwiY2VsbCIsImRyYWdPdmVyIiwiZHJhZ0VudGVyIiwiZHJhZ0xlYXZlIiwiZHJhZ0Ryb3AiLCJkcmFnZ2VkU2hpcCIsInNoaXBJbmRleCIsImRyYWdnZWRTaGlwTGVuZ3RoIiwiZSIsInRhcmdldCIsImluZGV4IiwiY2hpbGRyZW4iLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJjb29yZGluYXRlcyIsInNoaXBMYXN0SW5kZXgiLCJwYXJzZUludCIsImxhc3RFbGVtZW50Q2hpbGQiLCJzaGlwTmFtZSIsInNoaXBDb29yZHMiLCJuYW1lIiwiY29udGFpbnMiLCJjb29yZHMiLCJwdXNoIiwiYWRkIiwiY2xlYXIiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY3JlYXRlU2hpcCIsInNoaXBDb29yZCIsIm1hcmtTaGlwcyIsImNvb3JkIiwicG9zaXRpb24iLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrIiwicmVjZWl2ZUF0dGFja0hlbHBlciIsImFsbFN1bmsiLCJmaWx0ZXIiLCJmaW5kQXJyIiwiY29yIiwiaW5jbHVkZXMiLCJmbGF0IiwiY2hlY2tBcnIiLCJzb3J0IiwidG9TdHJpbmciLCJjaGVja0NhcnJpZXIiLCJjaGVja0JhdHRsZXNoaXAiLCJjaGVja0NydWlzZXIiLCJjaGVja1N1Ym1hcmluZSIsImNoZWNrRGVzdHJveWVyIiwiaXNIaXQiLCJnZW5lcmF0ZSIsInNoaXAyIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiZGlyZWN0aW9ucyIsImN1cnJlbnQiLCJkaXJlY3Rpb24iLCJyYW5kb21TdGFydCIsImFicyIsImxlZnQiLCJzb21lIiwicmlnaHQiLCJub3RBdmFpbGFibGUiLCJwbGFjZUNvb3JkcyIsInBsYWNlQ29tcHV0ZXIiLCJzaGlwQXJyIiwicGxhY2VQbGF5ZXIiLCJQbGF5ZXIiLCJnYW1lYm9hcmQiLCJib2FyZFBsYXllciIsImJvYXJkQ29tcHV0ZXIiLCJwbGF5ZXJBdHRhY2siLCJjb21wdXRlckF0dGFjayIsInNsb3QiLCJyYW5kb21BdHRhY2siLCJ3aWR0aCIsIm1hcCIsImNvb3JkaW5hdGUiLCJpc1N1bmsiLCJldmVyeSIsImhpdCIsInN0YXJ0IiwicGxheUdhbWUiLCJnYW1lTG9vcCIsImFjdGl2ZVBsYXllciIsInBsYXllcjEiLCJwbGF5ZXIyIiwiY2hhbmdlVHVybiIsImNoZWNrIiwicGxheSIsImNvbXB1dGVyIiwicGxheWVyVHVybiIsImNvbXB1dGVyVHVybiJdLCJzb3VyY2VSb290IjoiIn0=