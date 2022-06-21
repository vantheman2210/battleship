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
/* harmony export */   "hideModalPlace": () => (/* binding */ hideModalPlace),
/* harmony export */   "attackSound": () => (/* binding */ attackSound)
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
  text.textContent = input; // eslint-disable-next-line no-use-before-define

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

var attackSound = function attackSound() {
  document.querySelector('.audioAttack').src = "/src/Sounds/hq-explosion-6288.mp3";
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
          (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.attackSound)();
          (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.markSpots)(board2.board, board1.board);
          changeTurn();
          setTimeout(function () {
            check();
          }, 2200);
        });
      });
    };

    var computerTurn = function computerTurn() {
      player2.computerAttack();
      (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.attackSound)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsRUFBL0IsR0FBb0NFLFlBQVksRUFBaEQ7QUFDQTs7QUFDREwsRUFBQUEsS0FBSztBQUNMLENBaEVELEVBa0VBOzs7QUFDQS9KLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixFQUFtQ2dFLGdCQUFuQyxDQUFvRCxPQUFwRCxFQUE2RCxZQUFNO0FBQ2xFNkIsRUFBQUEsZ0RBQUs7QUFDTGpELEVBQUFBLG9EQUFPO0FBQ1AsQ0FIRCxHQUtBOztBQUNBNEcsUUFBUSxDQUFDeEYsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBTTtBQUN4Q3lGLEVBQUFBLFFBQVEsQ0FBQ3ZFLGtEQUFELENBQVI7QUFDQSxDQUZEO0FBR0FxRSxLQUFLLENBQUN2RixnQkFBTixDQUF1QixPQUF2QixFQUFnQyxZQUFNO0FBQ3JDUCxFQUFBQSw0REFBZTtBQUNmLENBRkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYWdEcm9wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbi8vIFNlbGVjdGluZyBlbGVtZW50c1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpO1xuY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lT3ZlcicpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbmNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FycmllckNvbnRhaW5lcicpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTsgXG5jb25zdCBjYXJyaWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXInKTtcbmNvbnN0IGJhdHRsZXNoaXBUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcCcpO1xuY29uc3QgY3J1aXNlclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyJyk7XG5jb25zdCBzdWJtYXJpbmVUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lJyk7XG5jb25zdCBkZXN0cm95ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyJyk7XG5jb25zdCBzdGFydFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1tb2RhbCcpOyBcbmNvbnN0IG1vZGFsUGxhY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtcGxhY2UnKTtcbmNvbnN0IHJlbmRlciA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHQvLyBDcmVhdGluZyB0d28gZ3JpZHMgZm9yIGRpc3BsYXlpbmcgYm9hcmRzXG5cdGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMS5jbGFzc05hbWUgPSAnZ3JpZDEnO1xuXHRjb25zdCBncmlkMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDIuY2xhc3NOYW1lID0gJ2dyaWQyJztcblxuXHRib2FyZDEuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczEnO1xuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0ZGl2LmRhdGFzZXQuaWQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQxLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDEpO1xuXHR9KTtcblxuXHRib2FyZDIuYm9hcmQuZm9yRWFjaCgoX19hLCBpKSA9PiB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICdjZWxsczInO1xuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7XG5cdFx0X19hID09PSAnc2hpcCcgPyAoZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnKSA6IG51bGw7XG5cdFx0Z3JpZDIuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMik7XG5cdH0pO1xufTtcblxuY29uc3QgbWFya1Nwb3RzID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdGNvbnN0IGNvbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyk7XG5cdGNvbnN0IHBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTtcblxuXHRib2FyZDEuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsO1xuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG5cblx0Ym9hcmQyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsO1xuXHRcdGVsZW1lbnQgPT09ICdoaXQnID8gKHBsYXllcltpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJykgOiBudWxsO1xuXHR9KTtcbn07IFxuXG5jb25zdCBzaG93TW9kYWwgPSAoaW5wdXQpID0+IHtcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xuXHR0ZXh0LnRleHRDb250ZW50ID0gaW5wdXQ7IFxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0YXVkaW9QbGF5T2ZmKCk7XG59O1xuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4ge1xuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IFxuXHRzdGFydFNjcmVlbi5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnOyBcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpOyBcblx0Y2Fycmllci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdGNydWlzZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRiYXR0bGVzaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0c3VibWFyaW5lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0ZGVzdHJveWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTsgICAgXG59O1xuXG5sZXQgaG9yaXpvbnRhbCA9IGZhbHNlO1xuY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuXHRcblx0aWYgKGhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGNhcnJpZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnY2Fycmllci1ob3Jpem9udGFsJyk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXHRcdGJhdHRsZXNoaXBUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYmF0dGxlc2hpcC1ob3Jpem9udGFsJyk7XG5cblx0XHRjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoYGNydWlzZXJDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRjcnVpc2VyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2NydWlzZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdHN1Ym1hcmluZVR3by5jbGFzc0xpc3QudG9nZ2xlKCdzdWJtYXJpbmUtaG9yaXpvbnRhbCcpO1xuXG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRcdGRlc3Ryb3llclR3by5jbGFzc0xpc3QudG9nZ2xlKCdkZXN0cm95ZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0aG9yaXpvbnRhbCA9IHRydWU7XG5cdH1cblx0aWYgKCFob3Jpem9udGFsKSB7XG5cdFx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRjYXJyaWVyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2NhcnJpZXItaG9yaXpvbnRhbCcpO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRiYXR0bGVzaGlwVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2JhdHRsZXNoaXAtaG9yaXpvbnRhbCcpO1xuXG5cdFx0Y3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKGBjcnVpc2VyQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdFx0Y3J1aXNlclR3by5jbGFzc0xpc3QudG9nZ2xlKCdjcnVpc2VyLWhvcml6b250YWwnKTtcblxuXHRcdHN1Ym1hcmluZS5jbGFzc0xpc3QudG9nZ2xlKGBzdWJtYXJpbmVDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRzdWJtYXJpbmVUd28uY2xhc3NMaXN0LnRvZ2dsZSgnc3VibWFyaW5lLWhvcml6b250YWwnKTtcblxuXHRcdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0XHRkZXN0cm95ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnZGVzdHJveWVyLWhvcml6b250YWwnKTtcblxuXHRcdGhvcml6b250YWwgPSBmYWxzZTtcblx0fVxufTtcblxuY29uc3QgcmVuZGVyTW9kYWxCb2FyZCA9ICgpID0+IHtcblx0Ly8gQ3JlYXRpbmcgYm9hcmQgZm9yIHBsYWNpbmcgc2hpcHMgIFxuXHRjb25zdCBhcnIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1Cb2FyZCcpOyBcblx0XG5cdGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQuY2xhc3NOYW1lID0gJ2dyaWQxJzsgXG5cblx0YXJyLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHQvLyBkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkLmFwcGVuZChkaXYpO1xuXHRcdGJvYXJkLmFwcGVuZChncmlkKTtcblx0fSk7XG59OyBcblxuY29uc3QgaGlkZVN0YXJ0U2NyZWVuID0gKCkgPT4geyBcblx0c3RhcnRTY3JlZW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nOyAgXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpLmNsYXNzTGlzdC50b2dnbGUoJ21vZGFsLXBsYWNlLXNob3cnKTsgICBcbn0gICBcblxuY29uc3QgYXVkaW9QbGF5T24gPSAoKSA9PiB7IFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8nKS5zcmMgPSBcIi9zcmMvU291bmRzL3N1Ym1hcmluZS0zMzcwOS5tcDNcIjsgXG59IFxuXG5jb25zdCBhdWRpb1BsYXlPZmYgPSAoKSA9PiB7IFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8nKS5zcmMgPSBcIlwiOyBcbn1cblxuXG5jb25zdCBoaWRlTW9kYWxQbGFjZSA9ICgpID0+IHsgXG5cdG1vZGFsUGxhY2UuY2xhc3NMaXN0LnRvZ2dsZSgnbW9kYWwtcGxhY2Utc2hvdycpOyBcblx0YXVkaW9QbGF5T24oKTtcbn07ICBcblxuY29uc3QgYXR0YWNrU291bmQgPSAoKSA9PiB7IFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW9BdHRhY2snKS5zcmMgPSBcIi9zcmMvU291bmRzL2hxLWV4cGxvc2lvbi02Mjg4Lm1wM1wiOyBcbn1cblxuZXhwb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgcm90YXRlLCByZW5kZXJNb2RhbEJvYXJkLCBoaWRlU3RhcnRTY3JlZW4sIGhpZGVNb2RhbFBsYWNlLCBhdHRhY2tTb3VuZCB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IHJlbmRlck1vZGFsQm9hcmQsIHJvdGF0ZSB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5cbnJlbmRlck1vZGFsQm9hcmQoKTtcblxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcHMnKTtcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpOyBcblxuXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmJhdHRsZXNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuY3J1aXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5zdWJtYXJpbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuZGVzdHJveWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApKTtcblxubGV0IGRyYWdnZWRTaGlwO1xubGV0IHNoaXBJbmRleDtcbmxldCBkcmFnZ2VkU2hpcExlbmd0aDtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cblx0c2hpcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuXHRcdHNoaXBJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cdH0pXG4pO1xuXG5mdW5jdGlvbiBkcmFnU3RhcnQoKSB7XG5cdGRyYWdnZWRTaGlwID0gdGhpcztcblx0ZHJhZ2dlZFNoaXBMZW5ndGggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcblx0Y29uc29sZS5sb2coZHJhZ2dlZFNoaXApO1xufVxuXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0VudGVyKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnTGVhdmUoKSB7XG5cdGNvbnNvbGUubG9nKCdkcmFnIGxlYXZlJyk7XG59XG5cbmxldCBjb29yZGluYXRlcyA9IFtdO1xuXG5mdW5jdGlvbiBkcmFnRHJvcCgpIHtcblx0Y29uc29sZS5sb2coJ2Ryb3AnKTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGNvbnN0IHNoaXBMYXN0SW5kZXggPSBwYXJzZUludChkcmFnZ2VkU2hpcC5sYXN0RWxlbWVudENoaWxkLmRhdGFzZXQuaW5kZXgpO1xuXHRjb25zdCBzaGlwTmFtZSA9IGRyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcDtcblx0Y29uc3Qgc2hpcENvb3JkcyA9IHtcblx0XHRuYW1lOiBzaGlwTmFtZSxcblx0XHRjb29yZGluYXRlczogW11cblx0fTtcblxuXHRpZiAoZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICsgaV07XG5cdFx0XHRzaGlwQ29vcmRzLmNvb3JkaW5hdGVzLnB1c2gocGFyc2VJbnQoY29vcmRzLmRhdGFzZXQuaWQpKTtcblx0XHRcdGNvb3Jkcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG5cdFx0XHRkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCFkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuY29udGFpbnMoYCR7c2hpcE5hbWV9Q29udGFpbmVyLWhvcml6b250YWxgKSkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0Y29uc3QgY29vcmRzID0gcGxheWVyQm9hcmRbcGFyc2VJbnQodGhpcy5kYXRhc2V0LmlkKSAtIHBhcnNlSW50KHNoaXBJbmRleCkgKiAxMCArIDEwICogaV07XG5cdFx0XHRzaGlwQ29vcmRzLmNvb3JkaW5hdGVzLnB1c2gocGFyc2VJbnQoY29vcmRzLmRhdGFzZXQuaWQpKTtcblx0XHRcdGNvb3Jkcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG5cdFx0XHRkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cdGNvb3JkaW5hdGVzLnB1c2goc2hpcENvb3Jkcyk7XG59IFxuXG5mdW5jdGlvbiBjbGVhciAoKSB7IFxuXHRjb29yZGluYXRlcyA9IFtdOyAgXG5cdHBsYXllckJvYXJkLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnKTtcbn0gXG5cbmV4cG9ydCAge2Nvb3JkaW5hdGVzLCBjbGVhcn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5Jztcbi8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIGJvYXJkLCBhbmQgcmVjZWl2ZXMgYXR0YWNrcywgYW5kIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkIHNob3RzXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGNvbnN0IGJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblxuXHRjb25zdCBjYXJyaWVyID0gU2hpcCgpO1xuXHRjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgpO1xuXHRjb25zdCBjcnVpc2VyID0gU2hpcCgpO1xuXHRjb25zdCBzdWJtYXJpbmUgPSBTaGlwKCk7XG5cdGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoKTtcblxuXHRjb25zdCBjcmVhdGVTaGlwID0gW1xuXHRcdGNhcnJpZXIuc2hpcENvb3JkLFxuXHRcdGJhdHRsZXNoaXAuc2hpcENvb3JkLFxuXHRcdGNydWlzZXIuc2hpcENvb3JkLFxuXHRcdHN1Ym1hcmluZS5zaGlwQ29vcmQsXG5cdFx0ZGVzdHJveWVyLnNoaXBDb29yZFxuXHRdOyBcblxuXHQvLyBGdW5jdGlvbiB0aGF0IG1hcmtzIHBsYXllciBib2FyZCBzaGlwcyBcblx0Y29uc3QgbWFya1NoaXBzID0gKGNvb3JkKSA9PiB7IFxuXHRcdGNvb3JkLmZvckVhY2gocG9zaXRpb24gPT4gYm9hcmRbcG9zaXRpb25dID0gJ3NoaXAnKVxuXHR9XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTsgIFxuXG5cdFxuXG5cdGZ1bmN0aW9uIHBsYWNlUGxheWVyIChzaGlwLCBjb29yZCkgeyBcblx0XHRpZihzaGlwID09PSAnY2FycmllcicpIHsgXG5cdFx0XHRjYXJyaWVyLnBsYWNlQ29vcmRzKGNvb3JkKSBcblx0XHRcdG1hcmtTaGlwcyhjb29yZCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmKHNoaXAgPT09ICdjcnVpc2VyJykgeyBcblx0XHRcdGNydWlzZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9XG5cblx0XHRlbHNlIGlmKHNoaXAgPT09ICdiYXR0bGVzaGlwJykgeyBcblx0XHRcdGJhdHRsZXNoaXAucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ3N1Ym1hcmluZScpIHsgXG5cdFx0XHRzdWJtYXJpbmUucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2Rlc3Ryb3llcicpIHsgXG5cdFx0XHRkZXN0cm95ZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFN1bmssXG5cdFx0Ym9hcmQsXG5cdFx0cGxhY2VDb21wdXRlcixcblx0XHRwbGFjZVBsYXllciwgXG5cdFx0Y3JlYXRlU2hpcFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cdGNvbnN0IGJvYXJkUGxheWVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgYm9hcmRDb21wdXRlciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IHBsYXllckF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRQbGF5ZXJbYXR0YWNrXSAhPT0gJ2F0dGFja2VkJykge1xuXHRcdFx0Ym9hcmRQbGF5ZXJbYXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0XHRyZXR1cm4gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKTtcblx0XHR9XG5cdFx0cmV0dXJuICdpbGxlZ2FsIG1vdmUnO1xuXHR9O1xuXG5cdGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xuXHRcdGNvbnN0IGJvYXJkID0gYm9hcmRDb21wdXRlci5maWx0ZXIoKHNsb3QpID0+IHNsb3QgIT09ICdhdHRhY2tlZCcpO1xuXHRcdGNvbnN0IHJhbmRvbUF0dGFjayA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCldO1xuXHRcdGJvYXJkQ29tcHV0ZXJbcmFuZG9tQXR0YWNrXSA9ICdhdHRhY2tlZCc7XG5cdFx0Z2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQXR0YWNrKTtcblx0XHRyZXR1cm4gcmFuZG9tQXR0YWNrO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cGxheWVyQXR0YWNrLFxuXHRcdGNvbXB1dGVyQXR0YWNrLFxuXHRcdGJvYXJkQ29tcHV0ZXIsXG5cdFx0Ym9hcmRQbGF5ZXJcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcblxuLypcbmNvbnN0IGMgPSAoc2hpcCkgPT4ge1xuXHRpZiAoc2hpcCA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDUgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnU3VibWFyaW5lJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnRGVzdHJveWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDIgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKCdTcGVjaWZ5IHNoaXAnKTtcbn07XG4qL1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBzaGlwIG9iamVjdHNcbmZ1bmN0aW9uIFNoaXAoKSB7XG5cdGNvbnN0IHdpZHRoID0gMTA7XG4gIFxuXHQvLyBBcnJheSB0aGF0IGNvbnRhaW5zIHNoaXBzLCBhbmQgdGhlaXIgbGVuZ3Roc1xuXHRjb25zdCBzaGlwQXJyID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdjYXJyaWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzLCA0IF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzLCB3aWR0aCAqIDQgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnYmF0dGxlc2hpcCcsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMyBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMyBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdjcnVpc2VyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdzdWJtYXJpbmUnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2Rlc3Ryb3llcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSBdLCBbIDAsIHdpZHRoIF0gXVxuXHRcdH1cblx0XTtcblxuXHRjb25zdCBzaGlwQ29vcmQgPSBbXTtcbiAgLy8gTWFwcyBjb29yZHMgdG8gc2hpcENvb3JkIGFycmF5LiBUbyBiZSB1c2VkIGZvciBjaGVja2luZyBoaXRzLCBhbmQgc3Vuay5cblx0Y29uc3QgcGxhY2VDb29yZHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcblx0XHRjb29yZGluYXRlcy5tYXAoKGNvb3JkaW5hdGUpID0+IHNoaXBDb29yZC5wdXNoKGNvb3JkaW5hdGUpKTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbnMgdGhhdCByZW1vdmVzIGRlc3Ryb3llZCBzaGlwXG5cdGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gJ2hpdCcpO1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZGFtYWdlcyBzaGlwIHBvc2l0aW9uc1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuXHRjb25zdCBpc0hpdCA9IChoaXQpID0+IChzaGlwQ29vcmRbaGl0XSA9ICdoaXQnKTtcblxuXHRyZXR1cm4geyBzaGlwQ29vcmQsIGlzU3VuaywgaXNIaXQsIHBsYWNlQ29vcmRzLCBzaGlwQXJyIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyLCBtYXJrU3BvdHMsIHNob3dNb2RhbCwgcmVzdGFydCwgaGlkZU1vZGFsUGxhY2UsIGhpZGVTdGFydFNjcmVlbiwgYXR0YWNrU291bmQgfSBmcm9tICcuL2RvbUNvbnRyb2wnO1xuaW1wb3J0IHtjb29yZGluYXRlcyxjbGVhcn0gZnJvbSAnLi9kcmFnRHJvcCc7XG5cbmNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXlHYW1lJyk7XG5jb25zdCBwbGF5R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpO1xuXG4vLyBGdW5jdGlvbiB0aGF0IGNvbnRyb2xzIGVudGlyZSBnYW1lTG9vcFxuY29uc3QgZ2FtZUxvb3AgPSAoY29vcmRzKSA9PiB7IFxuXHRoaWRlTW9kYWxQbGFjZSgpO1xuXHRsZXQgYWN0aXZlUGxheWVyID0gMDtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXIgZ2FtZWJvYXJkc1xuXHRjb25zdCBib2FyZDEgPSBHYW1lYm9hcmQoKTtcblx0Y29uc3QgYm9hcmQyID0gR2FtZWJvYXJkKCk7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyc1xuXHRjb25zdCBwbGF5ZXIxID0gUGxheWVyKGJvYXJkMik7XG5cdGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoYm9hcmQxKTtcblxuXHRib2FyZDIucGxhY2VDb21wdXRlcigpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzBdLm5hbWUsIGNvb3Jkc1swXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMV0ubmFtZSwgY29vcmRzWzFdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1syXS5uYW1lLCBjb29yZHNbMl0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzNdLm5hbWUsIGNvb3Jkc1szXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbNF0ubmFtZSwgY29vcmRzWzRdLmNvb3JkaW5hdGVzKTtcblxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBzdW5rIGVuZW15IGZsZWV0LiBZb3Ugd29uIScpO1xuXHRcdH0gZWxzZSBpZiAoYm9hcmQxLmFsbFN1bmsoKSkge1xuXHRcdFx0c2hvd01vZGFsKCdUaGUgZW5lbXkgaGFzIHN1bmsgeW91ciBmbGVldC4gWW91IGxvc3QhJyk7XG5cdFx0fSBlbHNlIHBsYXkoKTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIGxvb3AgdGhhdCBzd2l0Y2hlcyBwbGF5ZXIgdHVybnNcblx0ZnVuY3Rpb24gcGxheSgpIHtcblx0XHRjb25zdCBjb21wdXRlciA9IFsgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpIF07XG5cdFx0Y29uc3QgcGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdGNvbXB1dGVyLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG5cdFx0XHRcdFx0cGxheWVyMS5wbGF5ZXJBdHRhY2soaSk7IFxuXHRcdFx0XHRcdGF0dGFja1NvdW5kKCk7XG5cdFx0XHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdFx0XHRjaGFuZ2VUdXJuKClcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgXG5cdFx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHRcdH0sIDIyMDApXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcblx0XHRcdHBsYXllcjIuY29tcHV0ZXJBdHRhY2soKTsgXG5cdFx0XHRhdHRhY2tTb3VuZCgpO1xuXHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHR9O1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdGFjdGl2ZVBsYXllciA9PT0gMCA/IHBsYXllclR1cm4oKSA6IGNvbXB1dGVyVHVybigpO1xuXHR9XG5cdGNoZWNrKCk7XG59O1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgcmVzdGFydHMgZ2FtZSB3aGVuIHJlc3RhcnQgYnV0dG9uIHByZXNzZWRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuXHRjbGVhcigpO1xuXHRyZXN0YXJ0KCk7IFxufSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIgdGhhdCBzdGFydHMgdGhlIGdhbWVcbnBsYXlHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcblx0Z2FtZUxvb3AoY29vcmRpbmF0ZXMpO1xufSk7XG5zdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG5cdGhpZGVTdGFydFNjcmVlbigpO1xufSk7XG4iXSwibmFtZXMiOlsiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dCIsIm1vZGFsIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiY2FycmllclR3byIsImJhdHRsZXNoaXBUd28iLCJjcnVpc2VyVHdvIiwic3VibWFyaW5lVHdvIiwiZGVzdHJveWVyVHdvIiwic3RhcnRTY3JlZW4iLCJtb2RhbFBsYWNlIiwicmVuZGVyIiwiYm9hcmQxIiwiYm9hcmQyIiwiZ3JpZDEiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZ3JpZDIiLCJib2FyZCIsImZvckVhY2giLCJfX2EiLCJpIiwiZGl2IiwidGV4dENvbnRlbnQiLCJkYXRhc2V0IiwiaWQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFwcGVuZCIsIm1hcmtTcG90cyIsImNvbXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGxheWVyIiwiZWxlbWVudCIsImJhY2tncm91bmQiLCJzaG93TW9kYWwiLCJpbnB1dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImF1ZGlvUGxheU9mZiIsInJlc3RhcnQiLCJpbm5lckhUTUwiLCJ2aXNpYmlsaXR5IiwicmVtb3ZlIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsInJlbmRlck1vZGFsQm9hcmQiLCJhcnIiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiZ3JpZCIsImhpZGVTdGFydFNjcmVlbiIsImF1ZGlvUGxheU9uIiwic3JjIiwiaGlkZU1vZGFsUGxhY2UiLCJhdHRhY2tTb3VuZCIsInNoaXBzIiwicGxheWVyQm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImUiLCJ0YXJnZXQiLCJpbmRleCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJzaGlwTGFzdEluZGV4IiwicGFyc2VJbnQiLCJsYXN0RWxlbWVudENoaWxkIiwic2hpcE5hbWUiLCJzaGlwQ29vcmRzIiwibmFtZSIsImNvbnRhaW5zIiwiY29vcmRzIiwicHVzaCIsImFkZCIsImNsZWFyIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJtYXJrU2hpcHMiLCJjb29yZCIsInBvc2l0aW9uIiwicmVjZWl2ZUF0dGFjayIsImF0dGFjayIsInJlY2VpdmVBdHRhY2tIZWxwZXIiLCJhbGxTdW5rIiwiZmlsdGVyIiwiZmluZEFyciIsImNvciIsImluY2x1ZGVzIiwiZmxhdCIsImNoZWNrQXJyIiwic29ydCIsInRvU3RyaW5nIiwiY2hlY2tDYXJyaWVyIiwiY2hlY2tCYXR0bGVzaGlwIiwiY2hlY2tDcnVpc2VyIiwiY2hlY2tTdWJtYXJpbmUiLCJjaGVja0Rlc3Ryb3llciIsImlzSGl0IiwiZ2VuZXJhdGUiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsInJpZ2h0Iiwibm90QXZhaWxhYmxlIiwicGxhY2VDb29yZHMiLCJwbGFjZUNvbXB1dGVyIiwic2hpcEFyciIsInBsYWNlUGxheWVyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJtYXAiLCJjb29yZGluYXRlIiwiaXNTdW5rIiwiZXZlcnkiLCJoaXQiLCJzdGFydCIsInBsYXlHYW1lIiwiZ2FtZUxvb3AiLCJhY3RpdmVQbGF5ZXIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJUdXJuIl0sInNvdXJjZVJvb3QiOiIifQ==