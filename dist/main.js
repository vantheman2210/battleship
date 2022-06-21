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
  audioPlayOff();
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

var audioPlayOn = function audioPlayOn() {
  document.querySelector('.audio').src = "/src/Sounds/submarine-33709.mp3";
};

var audioPlayOff = function audioPlayOff() {
  document.querySelector('.audio').src = "";
};

var hideModalPlace = function hideModalPlace() {
  modalPlace.classList.toggle('modal-place-show');
  audioPlayOn();
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
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.showModal)('You sunk enemy fleet. You won!');
    } else if (board1.allSunk()) {
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.showModal)('The enemy has sunk your fleet. You lost!');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTBCLE9BQTFCLEVBQW1DLFlBQU07QUFDeEN5RixFQUFBQSxRQUFRLENBQUN2RSxrREFBRCxDQUFSO0FBQ0EsQ0FGRDtBQUdBcUUsS0FBSyxDQUFDdkYsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBTTtBQUNyQ04sRUFBQUEsNERBQWU7QUFDZixDQUZELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG4vLyBTZWxlY3RpbmcgZWxlbWVudHNcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZU92ZXInKTtcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXJDb250YWluZXInKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcENvbnRhaW5lcicpO1xuY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyQ29udGFpbmVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lQ29udGFpbmVyJyk7XG5jb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyQ29udGFpbmVyJyk7IFxuY29uc3QgY2FycmllclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyJyk7XG5jb25zdCBiYXR0bGVzaGlwVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXAnKTtcbmNvbnN0IGNydWlzZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlcicpO1xuY29uc3Qgc3VibWFyaW5lVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZScpO1xuY29uc3QgZGVzdHJveWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llcicpO1xuY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtbW9kYWwnKTsgXG5jb25zdCBtb2RhbFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJyk7XG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59OyBcblxuY29uc3Qgc2hvd01vZGFsID0gKGlucHV0KSA9PiB7XG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTtcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcblx0dGV4dC50ZXh0Q29udGVudCA9IGlucHV0OyBcblx0YXVkaW9QbGF5T2ZmKCk7XG59O1xuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4ge1xuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IFxuXHRzdGFydFNjcmVlbi5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnOyBcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpOyBcblx0Y2Fycmllci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdGNydWlzZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRiYXR0bGVzaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0c3VibWFyaW5lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0ZGVzdHJveWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTsgICAgXG59O1xuXG5sZXQgaG9yaXpvbnRhbCA9IGZhbHNlO1xuY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuXHRcblx0aWYgKGhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGNhcnJpZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnY2Fycmllci1ob3Jpem9udGFsJyk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGJhdHRsZXNoaXBUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYmF0dGxlc2hpcC1ob3Jpem9udGFsJyk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRjcnVpc2VyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2NydWlzZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdHN1Ym1hcmluZVR3by5jbGFzc0xpc3QudG9nZ2xlKCdzdWJtYXJpbmUtaG9yaXpvbnRhbCcpO1xuXG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdGRlc3Ryb3llclR3by5jbGFzc0xpc3QudG9nZ2xlKCdkZXN0cm95ZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0aG9yaXpvbnRhbCA9IHRydWU7XG5cdH1cblx0aWYgKCFob3Jpem9udGFsKSB7XG5cdFx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRjYXJyaWVyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2NhcnJpZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRiYXR0bGVzaGlwVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2JhdHRsZXNoaXAtaG9yaXpvbnRhbCcpO1xuXG5cdFx0Y3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKGBjcnVpc2VyQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdFx0Y3J1aXNlclR3by5jbGFzc0xpc3QudG9nZ2xlKCdjcnVpc2VyLWhvcml6b250YWwnKTtcblxuXHRcdHN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKGBzdWJtYXJpbmVDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRzdWJtYXJpbmVUd28uY2xhc3NMaXN0LnRvZ2dsZSgnc3VibWFyaW5lLWhvcml6b250YWwnKTtcblxuXHRcdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRkZXN0cm95ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnZGVzdHJveWVyLWhvcml6b250YWwnKTtcblxuXHRcdGhvcml6b250YWwgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgcmVuZGVyTW9kYWxCb2FyZCA9ICgpID0+IHtcblx0Ly8gQ3JlYXRpbmcgYm9hcmQgZm9yIHBsYWNpbmcgc2hpcHMgIFxuXHRjb25zdCBhcnIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1Cb2FyZCcpOyBcblx0XG5cdGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQuY2xhc3NOYW1lID0gJ2dyaWQxJzsgXG5cblx0YXJyLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHQvLyBkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkLmFwcGVuZChkaXYpO1xuXHRcdGJvYXJkLmFwcGVuZChncmlkKTtcblx0fSk7XG59OyBcblxuY29uc3QgaGlkZVN0YXJ0U2NyZWVuID0gKCkgPT4geyBcblx0c3RhcnRTY3JlZW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nOyAgXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpLmNsYXNzTGlzdC50b2dnbGUoJ21vZGFsLXBsYWNlLXNob3cnKTsgICBcbn0gICBcblxuY29uc3QgYXVkaW9QbGF5T24gPSAoKSA9PiB7IFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8nKS5zcmMgPSBcIi9zcmMvU291bmRzL3N1Ym1hcmluZS0zMzcwOS5tcDNcIjsgXG59IFxuXG5jb25zdCBhdWRpb1BsYXlPZmYgPSAoKSA9PiB7IFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8nKS5zcmMgPSBcIlwiOyBcbn1cblxuXG5jb25zdCBoaWRlTW9kYWxQbGFjZSA9ICgpID0+IHsgXG5cdG1vZGFsUGxhY2UuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpOyBcblx0YXVkaW9QbGF5T24oKTtcbn07IFxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByb3RhdGUsIHJlbmRlck1vZGFsQm9hcmQsIGhpZGVTdGFydFNjcmVlbiwgaGlkZU1vZGFsUGxhY2UgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyByZW5kZXJNb2RhbEJvYXJkLCByb3RhdGUgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuXG5yZW5kZXJNb2RhbEJvYXJkKCk7XG5cbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXBzJyk7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTsgXG5cblxuY2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5iYXR0bGVzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmNydWlzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuc3VibWFyaW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmRlc3Ryb3llci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKSk7XG5cbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBzaGlwSW5kZXg7XG5sZXQgZHJhZ2dlZFNoaXBMZW5ndGg7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+XG5cdHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0XHRzaGlwSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHR9KVxuKTtcblxuZnVuY3Rpb24gZHJhZ1N0YXJ0KCkge1xuXHRkcmFnZ2VkU2hpcCA9IHRoaXM7XG5cdGRyYWdnZWRTaGlwTGVuZ3RoID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwKTtcbn1cblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0xlYXZlKCkge1xuXHRjb25zb2xlLmxvZygnZHJhZyBsZWF2ZScpO1xufVxuXG5sZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gZHJhZ0Ryb3AoKSB7XG5cdGNvbnNvbGUubG9nKCdkcm9wJyk7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRjb25zdCBzaGlwTGFzdEluZGV4ID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAubGFzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LmluZGV4KTtcblx0Y29uc3Qgc2hpcE5hbWUgPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LnNoaXA7XG5cdGNvbnN0IHNoaXBDb29yZHMgPSB7XG5cdFx0bmFtZTogc2hpcE5hbWUsXG5cdFx0Y29vcmRpbmF0ZXM6IFtdXG5cdH07XG5cblx0aWYgKGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5jb250YWlucyhgJHtzaGlwTmFtZX1Db250YWluZXItaG9yaXpvbnRhbGApKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBjb29yZHMgPSBwbGF5ZXJCb2FyZFtwYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gcGFyc2VJbnQoc2hpcEluZGV4KSArIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fSBlbHNlIGlmICghZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICogMTAgKyAxMCAqIGldO1xuXHRcdFx0c2hpcENvb3Jkcy5jb29yZGluYXRlcy5wdXNoKHBhcnNlSW50KGNvb3Jkcy5kYXRhc2V0LmlkKSk7XG5cdFx0XHRjb29yZHMuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xuXHRcdFx0ZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdH1cblx0fVxuXHRjb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZHMpO1xufSBcblxuZnVuY3Rpb24gY2xlYXIgKCkgeyBcblx0Y29vcmRpbmF0ZXMgPSBbXTsgIFxuXHRwbGF5ZXJCb2FyZC5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJyk7XG59IFxuXG5leHBvcnQgIHtjb29yZGluYXRlcywgY2xlYXJ9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSc7XG4vLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiBib2FyZCwgYW5kIHJlY2VpdmVzIGF0dGFja3MsIGFuZCBrZWVwaW5nIHRyYWNrIG9mIG1pc3NlZCBzaG90c1xuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRjb25zdCBib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cblx0Y29uc3QgY2FycmllciA9IFNoaXAoKTtcblx0Y29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoKTtcblx0Y29uc3QgY3J1aXNlciA9IFNoaXAoKTtcblx0Y29uc3Qgc3VibWFyaW5lID0gU2hpcCgpO1xuXHRjb25zdCBkZXN0cm95ZXIgPSBTaGlwKCk7XG5cblx0Y29uc3QgY3JlYXRlU2hpcCA9IFtcblx0XHRjYXJyaWVyLnNoaXBDb29yZCxcblx0XHRiYXR0bGVzaGlwLnNoaXBDb29yZCxcblx0XHRjcnVpc2VyLnNoaXBDb29yZCxcblx0XHRzdWJtYXJpbmUuc2hpcENvb3JkLFxuXHRcdGRlc3Ryb3llci5zaGlwQ29vcmRcblx0XTsgXG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBtYXJrcyBwbGF5ZXIgYm9hcmQgc2hpcHMgXG5cdGNvbnN0IG1hcmtTaGlwcyA9IChjb29yZCkgPT4geyBcblx0XHRjb29yZC5mb3JFYWNoKHBvc2l0aW9uID0+IGJvYXJkW3Bvc2l0aW9uXSA9ICdzaGlwJylcblx0fVxuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIGF0dGFjayBoaXQgYSBzaGlwXG5cdC8vIEV4Y2x1ZGVkICdtaXNzZWQnXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkW2F0dGFja10gPT09ICdzaGlwJykge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdoaXQnO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG5cdFx0XHRyZWNlaXZlQXR0YWNrSGVscGVyKGF0dGFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnbWlzc2VkJztcblx0XHR9XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0Ly8gRmlsdGVyaW5nIGJvYXJkIGFycmF5LCBhbmQgY2hlY2tpbmcgd2hldGhlciAxNyBwb3NpdGlvbnMgaGF2ZSBiZWVuIGhpdFxuXHRjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuXHRcdGNvbnN0IGFyciA9IGJvYXJkLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXHRcdGlmIChhcnIubGVuZ3RoID49IDE3KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgaGVscHMgYWxsb2NhdGUgYXR0YWNrIHRvIGFwcHJvcHJpYXRlIHNoaXBcblx0Y29uc3QgcmVjZWl2ZUF0dGFja0hlbHBlciA9IChhdHRhY2spID0+IHtcblx0XHRjb25zdCBmaW5kQXJyID0gY3JlYXRlU2hpcC5maWx0ZXIoKGNvcikgPT4gY29yLmluY2x1ZGVzKGF0dGFjaykpLmZsYXQoKTtcblxuXHRcdGNvbnN0IGNoZWNrQXJyID0gZmluZEFyci5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NhcnJpZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDcnVpc2VyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja1N1Ym1hcmluZSA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tEZXN0cm95ZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXG5cdFx0aWYgKGNoZWNrQXJyID09PSBjaGVja0NhcnJpZXIpIGNhcnJpZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tCYXR0bGVzaGlwKSBiYXR0bGVzaGlwLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ3J1aXNlcikgY3J1aXNlci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja1N1Ym1hcmluZSkgc3VibWFyaW5lLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrRGVzdHJveWVyKSBkZXN0cm95ZXIuaXNIaXQoYXR0YWNrKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIHNpbmdsZSBzaGlwIG9uIGJvYXJkXG5cdGNvbnN0IGdlbmVyYXRlID0gKHNoaXAsIHNoaXAyKSA9PiB7XG5cdFx0Y29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcC5kaXJlY3Rpb25zLmxlbmd0aCk7XG5cdFx0Y29uc3QgY3VycmVudCA9IHNoaXAuZGlyZWN0aW9uc1tyYW5kb21dO1xuXHRcdGxldCBkaXJlY3Rpb24gPSAwO1xuXHRcdGlmIChyYW5kb20gPT09IDApIGRpcmVjdGlvbiA9IDE7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMSkgZGlyZWN0aW9uID0gMTA7XG5cdFx0Y29uc3QgcmFuZG9tU3RhcnQgPSBNYXRoLmFicyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGggLSBzaGlwLmRpcmVjdGlvbnNbMF0ubGVuZ3RoICogZGlyZWN0aW9uKSk7XG5cblx0XHRjb25zdCBsZWZ0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDApO1xuXHRcdGNvbnN0IHJpZ2h0ID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gKHJhbmRvbVN0YXJ0ICsgaW5kZXgpICUgMTAgPT09IDEwIC0gMSk7XG5cdFx0Y29uc3Qgbm90QXZhaWxhYmxlID0gY3VycmVudC5zb21lKChpbmRleCkgPT4gYm9hcmRbcmFuZG9tU3RhcnQgKyBpbmRleF0gPT09ICdzaGlwJyk7XG5cblx0XHRpZiAoKCFsZWZ0ICYmICFyaWdodCAmJiAhbm90QXZhaWxhYmxlKSB8fCAobGVmdCAmJiByaWdodCAmJiAhbm90QXZhaWxhYmxlICYmIHJhbmRvbSA9PT0gMSkpXG5cdFx0XHRjdXJyZW50LmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0Ym9hcmRbcmFuZG9tU3RhcnQgKyBlbGVtZW50XSA9ICdzaGlwJztcblx0XHRcdFx0c2hpcDIucGxhY2VDb29yZHMoWyByYW5kb21TdGFydCArIGVsZW1lbnQgXSk7XG5cdFx0XHR9KTtcblx0XHRlbHNlIGdlbmVyYXRlKHNoaXAsIHNoaXAyKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IHBsYWNlcyBhbGwgZml2ZSBjb21wdXRlciBzaGlwcyBhdCBvbmNlXG5cdGNvbnN0IHBsYWNlQ29tcHV0ZXIgPSAoKSA9PiB7XG5cdFx0Z2VuZXJhdGUoY2Fycmllci5zaGlwQXJyWzBdLCBjYXJyaWVyKTtcblx0XHRnZW5lcmF0ZShiYXR0bGVzaGlwLnNoaXBBcnJbMV0sIGJhdHRsZXNoaXApO1xuXHRcdGdlbmVyYXRlKGNydWlzZXIuc2hpcEFyclsyXSwgY3J1aXNlcik7XG5cdFx0Z2VuZXJhdGUoc3VibWFyaW5lLnNoaXBBcnJbM10sIHN1Ym1hcmluZSk7XG5cdFx0Z2VuZXJhdGUoZGVzdHJveWVyLnNoaXBBcnJbNF0sIGRlc3Ryb3llcik7XG5cdH07ICBcblxuXHRcblxuXHRmdW5jdGlvbiBwbGFjZVBsYXllciAoc2hpcCwgY29vcmQpIHsgXG5cdFx0aWYoc2hpcCA9PT0gJ2NhcnJpZXInKSB7IFxuXHRcdFx0Y2Fycmllci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnY3J1aXNlcicpIHsgXG5cdFx0XHRjcnVpc2VyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnYmF0dGxlc2hpcCcpIHsgXG5cdFx0XHRiYXR0bGVzaGlwLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdzdWJtYXJpbmUnKSB7IFxuXHRcdFx0c3VibWFyaW5lLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdkZXN0cm95ZXInKSB7IFxuXHRcdFx0ZGVzdHJveWVyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVjZWl2ZUF0dGFjayxcblx0XHRhbGxTdW5rLFxuXHRcdGJvYXJkLFxuXHRcdHBsYWNlQ29tcHV0ZXIsXG5cdFx0cGxhY2VQbGF5ZXIsIFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuICBcblx0Ly8gQXJyYXkgdGhhdCBjb250YWlucyBzaGlwcywgYW5kIHRoZWlyIGxlbmd0aHNcblx0Y29uc3Qgc2hpcEFyciA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMywgNCBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMywgd2lkdGggKiA0IF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2JhdHRsZXNoaXAnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnY3J1aXNlcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnc3VibWFyaW5lJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdkZXN0cm95ZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEgXSwgWyAwLCB3aWR0aCBdIF1cblx0XHR9XG5cdF07XG5cblx0Y29uc3Qgc2hpcENvb3JkID0gW107XG4gIC8vIE1hcHMgY29vcmRzIHRvIHNoaXBDb29yZCBhcnJheS4gVG8gYmUgdXNlZCBmb3IgY2hlY2tpbmcgaGl0cywgYW5kIHN1bmsuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQsIGhpZGVNb2RhbFBsYWNlLCBoaWRlU3RhcnRTY3JlZW4gfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuaW1wb3J0IHtjb29yZGluYXRlcyxjbGVhcn0gZnJvbSAnLi9kcmFnRHJvcCc7XG5cbmNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXlHYW1lJyk7XG5jb25zdCBwbGF5R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoY29vcmRzKSA9PiB7IFxuXHRoaWRlTW9kYWxQbGFjZSgpO1xuXHRsZXQgYWN0aXZlUGxheWVyID0gMDtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXIgZ2FtZWJvYXJkc1xuXHRjb25zdCBib2FyZDEgPSBHYW1lYm9hcmQoKTtcblx0Y29uc3QgYm9hcmQyID0gR2FtZWJvYXJkKCk7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyc1xuXHRjb25zdCBwbGF5ZXIxID0gUGxheWVyKGJvYXJkMik7XG5cdGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoYm9hcmQxKTtcblxuXHRib2FyZDIucGxhY2VDb21wdXRlcigpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzBdLm5hbWUsIGNvb3Jkc1swXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMV0ubmFtZSwgY29vcmRzWzFdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1syXS5uYW1lLCBjb29yZHNbMl0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzNdLm5hbWUsIGNvb3Jkc1szXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbNF0ubmFtZSwgY29vcmRzWzRdLmNvb3JkaW5hdGVzKTtcblxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBzdW5rIGVuZW15IGZsZWV0LiBZb3Ugd29uIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdUaGUgZW5lbXkgaGFzIHN1bmsgeW91ciBmbGVldC4gWW91IGxvc3QhJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHRwbGF5ZXIxLnBsYXllckF0dGFjayhpKTtcblx0XHRcdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRwbGF5ZXIyLmNvbXB1dGVyQXR0YWNrKCk7XG5cdFx0XHRtYXJrU3BvdHMoYm9hcmQyLmJvYXJkLCBib2FyZDEuYm9hcmQpO1xuXHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdH07XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0YWN0aXZlUGxheWVyID09PSAwID8gcGxheWVyVHVybigpIDogY29tcHV0ZXJUdXJuKCk7XG5cdH1cblx0Y2hlY2soKTtcbn07XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCByZXN0YXJ0cyBnYW1lIHdoZW4gcmVzdGFydCBidXR0b24gcHJlc3NlZFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG5cdGNsZWFyKCk7XG5cdHJlc3RhcnQoKTsgXG59KTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHN0YXJ0cyB0aGUgZ2FtZVxucGxheUdhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuXHRnYW1lTG9vcChjb29yZGluYXRlcyk7XG59KTtcbnN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcblx0aGlkZVN0YXJ0U2NyZWVuKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJjYXJyaWVyVHdvIiwiYmF0dGxlc2hpcFR3byIsImNydWlzZXJUd28iLCJzdWJtYXJpbmVUd28iLCJkZXN0cm95ZXJUd28iLCJzdGFydFNjcmVlbiIsIm1vZGFsUGxhY2UiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsIl9fYSIsImkiLCJkaXYiLCJ0ZXh0Q29udGVudCIsImRhdGFzZXQiLCJpZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsInNob3dNb2RhbCIsImlucHV0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiYXVkaW9QbGF5T2ZmIiwicmVzdGFydCIsImlubmVySFRNTCIsInZpc2liaWxpdHkiLCJyZW1vdmUiLCJob3Jpem9udGFsIiwicm90YXRlIiwicmVuZGVyTW9kYWxCb2FyZCIsImFyciIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJncmlkIiwiaGlkZVN0YXJ0U2NyZWVuIiwiYXVkaW9QbGF5T24iLCJzcmMiLCJoaWRlTW9kYWxQbGFjZSIsInNoaXBzIiwicGxheWVyQm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImUiLCJ0YXJnZXQiLCJpbmRleCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJzaGlwTGFzdEluZGV4IiwicGFyc2VJbnQiLCJsYXN0RWxlbWVudENoaWxkIiwic2hpcE5hbWUiLCJzaGlwQ29vcmRzIiwibmFtZSIsImNvbnRhaW5zIiwiY29vcmRzIiwicHVzaCIsImFkZCIsImNsZWFyIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJtYXJrU2hpcHMiLCJjb29yZCIsInBvc2l0aW9uIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsInBsYWNlUGxheWVyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJtYXAiLCJjb29yZGluYXRlIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJzdGFydCIsInBsYXlHYW1lIiwiZ2FtZUxvb3AiLCJhY3RpdmVQbGF5ZXIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJjb21wdXRlclR1cm4iXSwic291cmNlUm9vdCI6IiJ9