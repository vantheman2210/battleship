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
/* harmony export */   "markShipPlacement": () => (/* binding */ markShipPlacement)
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

var markShipPlacement = function markShipPlacement() {
  var placement = document.querySelectorAll('.cells1');
  placement === 'ship' ? placement.style.backgroundColor = 'red' : null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQXVCLFVBQXZCLEVBQW1Dd0QsZ0JBQW5DLENBQW9ELE9BQXBELEVBQTZELFlBQU07QUFDbEVoQixFQUFBQSxvREFBTztBQUNQd0csRUFBQUEsUUFBUTtBQUNSLENBSEQsR0FLQTs7QUFDQUQsUUFBUSxDQUFDdkYsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUN3RixRQUFRLENBQUNVLElBQVQsQ0FBYyxTQUFkLEVBQW9CaEYsaURBQXBCLENBQW5DO0FBQ0FvRSxLQUFLLENBQUN0RixnQkFBTixDQUF1QixPQUF2QixFQUFnQ0wsd0RBQWhDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG4vLyBTZWxlY3RpbmcgZWxlbWVudHNcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtbW9kYWwnKTsgXG5jb25zdCBtb2RhbFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXBsYWNlJyk7XG5jb25zdCByZW5kZXIgPSAoYm9hcmQxLCBib2FyZDIpID0+IHtcblx0Ly8gQ3JlYXRpbmcgdHdvIGdyaWRzIGZvciBkaXNwbGF5aW5nIGJvYXJkc1xuXHRjb25zdCBncmlkMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dyaWQnKTtcblx0Z3JpZDEuY2xhc3NOYW1lID0gJ2dyaWQxJztcblx0Y29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQyLmNsYXNzTmFtZSA9ICdncmlkMic7XG5cblx0Ym9hcmQxLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkMS5hcHBlbmQoZGl2KTtcblx0XHRjb250YWluZXIuYXBwZW5kKGdyaWQxKTtcblx0fSk7XG5cblx0Ym9hcmQyLmJvYXJkLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMyJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gKGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xuXHRcdGdyaWQyLmFwcGVuZChkaXYpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmQoZ3JpZDIpO1xuXHR9KTtcbn07XG5cbmNvbnN0IG1hcmtTcG90cyA9IChib2FyZDEsIGJvYXJkMikgPT4ge1xuXHRjb25zdCBjb21wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMicpO1xuXHRjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cblx0Ym9hcmQxLmZvckVhY2goKGVsZW1lbnQsIGkpID0+IHtcblx0XHRlbGVtZW50ID09PSAnbWlzc2VkJyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDtcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChwbGF5ZXJbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaycpIDogbnVsbDtcblx0fSk7XG59OyBcblxuY29uc3QgbWFya1NoaXBQbGFjZW1lbnQgPSAoKSA9PiB7IFxuXHRjb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cdHBsYWNlbWVudCA9PT0gJ3NoaXAnID8gKHBsYWNlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJykgOiBudWxsO1xufVxuXG5jb25zdCBzaG93TW9kYWwgPSAoaW5wdXQpID0+IHtcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpO1xuXHRjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYmx1cnJlZCcpO1xuXHR0ZXh0LnRleHRDb250ZW50ID0gaW5wdXQ7XG59O1xuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4ge1xuXHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKTtcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcbn07XG5cbmxldCBob3Jpem9udGFsID0gZmFsc2U7XG5jb25zdCByb3RhdGUgPSAoKSA9PiB7XG5cdFxuXHRpZiAoaG9yaXpvbnRhbCkge1xuXHRcdGNhcnJpZXIuY2xhc3NMaXN0LnRvZ2dsZShgY2FycmllckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cblx0XHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0Y3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKGBjcnVpc2VyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRkZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZShgZGVzdHJveWVyQ29udGFpbmVyLWhvcml6b250YWxgKTtcblx0XHRob3Jpem9udGFsID0gdHJ1ZTtcblx0fVxuXHRpZiAoIWhvcml6b250YWwpIHtcblx0XHRjYXJyaWVyLmNsYXNzTGlzdC50b2dnbGUoYGNhcnJpZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xuXG5cdFx0YmF0dGxlc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGBiYXR0bGVzaGlwQ29udGFpbmVyLWhvcml6b250YWxgKTtcblxuXHRcdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0c3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoYHN1Ym1hcmluZUNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0ZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoYGRlc3Ryb3llckNvbnRhaW5lci1ob3Jpem9udGFsYCk7XG5cdFx0aG9yaXpvbnRhbCA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCByZW5kZXJNb2RhbEJvYXJkID0gKCkgPT4ge1xuXHQvLyBDcmVhdGluZyBib2FyZCBmb3IgcGxhY2luZyBzaGlwcyAgXG5cdFxuXHRjb25zdCBhcnIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1Cb2FyZCcpO1xuXHRjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cblx0YXJyLmZvckVhY2goKF9fYSwgaSkgPT4ge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAnY2VsbHMxJztcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdGRpdi5kYXRhc2V0LmlkID0gaTtcblx0XHRfX2EgPT09ICdzaGlwJyA/IChkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCcpIDogbnVsbDtcblx0XHRncmlkLmFwcGVuZChkaXYpO1xuXHRcdGJvYXJkLmFwcGVuZChncmlkKTtcblx0fSk7XG59OyBcblxuY29uc3QgaGlkZVN0YXJ0U2NyZWVuID0gKCkgPT4geyBcblx0c3RhcnRTY3JlZW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nOyAgXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wbGFjZScpLmNsYXNzTGlzdC50b2dnbGUoJ21vZGFsLXBsYWNlLXNob3cnKTsgXG59ICBcbmNvbnN0IGhpZGVNb2RhbFBsYWNlID0gKCkgPT4geyBcblx0bW9kYWxQbGFjZS5jbGFzc0xpc3QudG9nZ2xlKCdtb2RhbC1wbGFjZS1zaG93Jyk7XG59XG5cbmV4cG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQsIHJvdGF0ZSwgcmVuZGVyTW9kYWxCb2FyZCwgaGlkZVN0YXJ0U2NyZWVuLCBoaWRlTW9kYWxQbGFjZSwgbWFya1NoaXBQbGFjZW1lbnQgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyByZW5kZXJNb2RhbEJvYXJkLCByb3RhdGUsIG1hcmtTaGlwUGxhY2VtZW50IH0gZnJvbSAnLi9kb21Db250cm9sJztcblxucmVuZGVyTW9kYWxCb2FyZCgpO1xuXG5jb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXJDb250YWluZXInKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlc2hpcENvbnRhaW5lcicpO1xuY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcnVpc2VyQ29udGFpbmVyJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWFyaW5lQ29udGFpbmVyJyk7XG5jb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzdHJveWVyQ29udGFpbmVyJyk7XG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcycpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMxJyk7XG5cbmNhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuYmF0dGxlc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5jcnVpc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbnN1Ym1hcmluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5kZXN0cm95ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCkpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3ZlcikpO1xucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKSk7XG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcmFnRHJvcCkpO1xuXG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgc2hpcEluZGV4O1xubGV0IGRyYWdnZWRTaGlwTGVuZ3RoO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxuXHRzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0c2hpcEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcblx0fSlcbik7XG5cbmZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcblx0ZHJhZ2dlZFNoaXAgPSB0aGlzO1xuXHRkcmFnZ2VkU2hpcExlbmd0aCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuXHRjb25zb2xlLmxvZyhkcmFnZ2VkU2hpcCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdMZWF2ZSgpIHtcblx0Y29uc29sZS5sb2coJ2RyYWcgbGVhdmUnKTtcbn1cblxuY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gZHJhZ0Ryb3AoKSB7XG5cdGNvbnNvbGUubG9nKCdkcm9wJyk7XG5cdGNvbnN0IHNoaXBMYXN0SW5kZXggPSBwYXJzZUludChkcmFnZ2VkU2hpcC5sYXN0RWxlbWVudENoaWxkLmRhdGFzZXQuaW5kZXgpO1xuXHRjb25zdCBzaGlwTmFtZSA9IGRyYWdnZWRTaGlwLmRhdGFzZXQuc2hpcDtcblx0Y29uc3Qgc2hpcENvb3JkcyA9IHtcblx0XHRuYW1lOiBzaGlwTmFtZSxcblx0XHRjb29yZGluYXRlczogW11cblx0fTtcblxuXHRpZiAoZHJhZ2dlZFNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3NoaXBOYW1lfUNvbnRhaW5lci1ob3Jpem9udGFsYCkpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IGNvb3JkcyA9IHBsYXllckJvYXJkW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSBwYXJzZUludChzaGlwSW5kZXgpICsgaV07XG5cdFx0XHRzaGlwQ29vcmRzLmNvb3JkaW5hdGVzLnB1c2gocGFyc2VJbnQoY29vcmRzLmRhdGFzZXQuaWQpKTtcblx0XHRcdGNvb3Jkcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG5cdFx0XHRkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCFkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuY29udGFpbnMoYCR7c2hpcE5hbWV9Q29udGFpbmVyLWhvcml6b250YWxgKSkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0Y29uc3QgY29vcmRzID0gcGxheWVyQm9hcmRbcGFyc2VJbnQodGhpcy5kYXRhc2V0LmlkKSAtIHBhcnNlSW50KHNoaXBJbmRleCkgKiAxMCArIDEwICogaV07XG5cdFx0XHRzaGlwQ29vcmRzLmNvb3JkaW5hdGVzLnB1c2gocGFyc2VJbnQoY29vcmRzLmRhdGFzZXQuaWQpKTtcblx0XHRcdGNvb3Jkcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG5cdFx0XHRkcmFnZ2VkU2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cdGNvb3JkaW5hdGVzLnB1c2goc2hpcENvb3Jkcyk7XG59XG5jb25zb2xlLmxvZyhjb29yZGluYXRlcyk7XG5leHBvcnQgZGVmYXVsdCBjb29yZGluYXRlcztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuLy8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gYm9hcmQsIGFuZCByZWNlaXZlcyBhdHRhY2tzLCBhbmQga2VlcGluZyB0cmFjayBvZiBtaXNzZWQgc2hvdHNcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0Y29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXG5cdGNvbnN0IGNhcnJpZXIgPSBTaGlwKCk7XG5cdGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCk7XG5cdGNvbnN0IGNydWlzZXIgPSBTaGlwKCk7XG5cdGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoKTtcblx0Y29uc3QgZGVzdHJveWVyID0gU2hpcCgpO1xuXG5cdGNvbnN0IGNyZWF0ZVNoaXAgPSBbXG5cdFx0Y2Fycmllci5zaGlwQ29vcmQsXG5cdFx0YmF0dGxlc2hpcC5zaGlwQ29vcmQsXG5cdFx0Y3J1aXNlci5zaGlwQ29vcmQsXG5cdFx0c3VibWFyaW5lLnNoaXBDb29yZCxcblx0XHRkZXN0cm95ZXIuc2hpcENvb3JkXG5cdF07IFxuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgbWFya3MgcGxheWVyIGJvYXJkIHNoaXBzIFxuXHRjb25zdCBtYXJrU2hpcHMgPSAoY29vcmQpID0+IHsgXG5cdFx0Y29vcmQuZm9yRWFjaChwb3NpdGlvbiA9PiBib2FyZFtwb3NpdGlvbl0gPSAnc2hpcCcpXG5cdH1cblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciBhdHRhY2sgaGl0IGEgc2hpcFxuXHQvLyBFeGNsdWRlZCAnbWlzc2VkJ1xuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFthdHRhY2tdID09PSAnc2hpcCcpIHtcblx0XHRcdGJvYXJkW2F0dGFja10gPSAnaGl0Jztcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0cmVjZWl2ZUF0dGFja0hlbHBlcihhdHRhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ21pc3NlZCc7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgY2hlY2tzIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdC8vIEZpbHRlcmluZyBib2FyZCBhcnJheSwgYW5kIGNoZWNraW5nIHdoZXRoZXIgMTcgcG9zaXRpb25zIGhhdmUgYmVlbiBoaXRcblx0Y29uc3QgYWxsU3VuayA9ICgpID0+IHtcblx0XHRjb25zdCBhcnIgPSBib2FyZC5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblx0XHRpZiAoYXJyLmxlbmd0aCA+PSAxNykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGhlbHBzIGFsbG9jYXRlIGF0dGFjayB0byBhcHByb3ByaWF0ZSBzaGlwXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2tIZWxwZXIgPSAoYXR0YWNrKSA9PiB7XG5cdFx0Y29uc3QgZmluZEFyciA9IGNyZWF0ZVNoaXAuZmlsdGVyKChjb3IpID0+IGNvci5pbmNsdWRlcyhhdHRhY2spKS5mbGF0KCk7XG5cblx0XHRjb25zdCBjaGVja0FyciA9IGZpbmRBcnIuc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tDYXJyaWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0JhdHRsZXNoaXAgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ3J1aXNlciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tTdWJtYXJpbmUgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrRGVzdHJveWVyID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjaGVja0FyciA9PT0gY2hlY2tDYXJyaWVyKSBjYXJyaWVyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrQmF0dGxlc2hpcCkgYmF0dGxlc2hpcC5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0NydWlzZXIpIGNydWlzZXIuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tTdWJtYXJpbmUpIHN1Ym1hcmluZS5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0Rlc3Ryb3llcikgZGVzdHJveWVyLmlzSGl0KGF0dGFjayk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBzaW5nbGUgc2hpcCBvbiBib2FyZFxuXHRjb25zdCBnZW5lcmF0ZSA9IChzaGlwLCBzaGlwMikgPT4ge1xuXHRcdGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXAuZGlyZWN0aW9ucy5sZW5ndGgpO1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBzaGlwLmRpcmVjdGlvbnNbcmFuZG9tXTtcblx0XHRsZXQgZGlyZWN0aW9uID0gMDtcblx0XHRpZiAocmFuZG9tID09PSAwKSBkaXJlY3Rpb24gPSAxO1xuXHRcdGlmIChyYW5kb20gPT09IDEpIGRpcmVjdGlvbiA9IDEwO1xuXHRcdGNvbnN0IHJhbmRvbVN0YXJ0ID0gTWF0aC5hYnMoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoIC0gc2hpcC5kaXJlY3Rpb25zWzBdLmxlbmd0aCAqIGRpcmVjdGlvbikpO1xuXG5cdFx0Y29uc3QgbGVmdCA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAwKTtcblx0XHRjb25zdCByaWdodCA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAxMCAtIDEpO1xuXHRcdGNvbnN0IG5vdEF2YWlsYWJsZSA9IGN1cnJlbnQuc29tZSgoaW5kZXgpID0+IGJvYXJkW3JhbmRvbVN0YXJ0ICsgaW5kZXhdID09PSAnc2hpcCcpO1xuXG5cdFx0aWYgKCghbGVmdCAmJiAhcmlnaHQgJiYgIW5vdEF2YWlsYWJsZSkgfHwgKGxlZnQgJiYgcmlnaHQgJiYgIW5vdEF2YWlsYWJsZSAmJiByYW5kb20gPT09IDEpKVxuXHRcdFx0Y3VycmVudC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdGJvYXJkW3JhbmRvbVN0YXJ0ICsgZWxlbWVudF0gPSAnc2hpcCc7XG5cdFx0XHRcdHNoaXAyLnBsYWNlQ29vcmRzKFsgcmFuZG9tU3RhcnQgKyBlbGVtZW50IF0pO1xuXHRcdFx0fSk7XG5cdFx0ZWxzZSBnZW5lcmF0ZShzaGlwLCBzaGlwMik7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgYWxsIGZpdmUgY29tcHV0ZXIgc2hpcHMgYXQgb25jZVxuXHRjb25zdCBwbGFjZUNvbXB1dGVyID0gKCkgPT4ge1xuXHRcdGdlbmVyYXRlKGNhcnJpZXIuc2hpcEFyclswXSwgY2Fycmllcik7XG5cdFx0Z2VuZXJhdGUoYmF0dGxlc2hpcC5zaGlwQXJyWzFdLCBiYXR0bGVzaGlwKTtcblx0XHRnZW5lcmF0ZShjcnVpc2VyLnNoaXBBcnJbMl0sIGNydWlzZXIpO1xuXHRcdGdlbmVyYXRlKHN1Ym1hcmluZS5zaGlwQXJyWzNdLCBzdWJtYXJpbmUpO1xuXHRcdGdlbmVyYXRlKGRlc3Ryb3llci5zaGlwQXJyWzRdLCBkZXN0cm95ZXIpO1xuXHR9OyAgXG5cblx0XG5cblx0ZnVuY3Rpb24gcGxhY2VQbGF5ZXIgKHNoaXAsIGNvb3JkKSB7IFxuXHRcdGlmKHNoaXAgPT09ICdjYXJyaWVyJykgeyBcblx0XHRcdGNhcnJpZXIucGxhY2VDb29yZHMoY29vcmQpIFxuXHRcdFx0bWFya1NoaXBzKGNvb3JkKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2NydWlzZXInKSB7IFxuXHRcdFx0Y3J1aXNlci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYoc2hpcCA9PT0gJ2JhdHRsZXNoaXAnKSB7IFxuXHRcdFx0YmF0dGxlc2hpcC5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnc3VibWFyaW5lJykgeyBcblx0XHRcdHN1Ym1hcmluZS5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZihzaGlwID09PSAnZGVzdHJveWVyJykgeyBcblx0XHRcdGRlc3Ryb3llci5wbGFjZUNvb3Jkcyhjb29yZCkgXG5cdFx0XHRtYXJrU2hpcHMoY29vcmQpO1xuXHRcdH0gXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdHBsYWNlUGxheWVyLCBcblx0XHRjcmVhdGVTaGlwXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChnYW1lYm9hcmQpID0+IHtcblx0Y29uc3QgYm9hcmRQbGF5ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBib2FyZENvbXB1dGVyID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwIH0sIChfLCBpKSA9PiBpKTtcblx0Y29uc3QgcGxheWVyQXR0YWNrID0gKGF0dGFjaykgPT4ge1xuXHRcdGlmIChib2FyZFBsYXllclthdHRhY2tdICE9PSAnYXR0YWNrZWQnKSB7XG5cdFx0XHRib2FyZFBsYXllclthdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRcdHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuXHRcdH1cblx0XHRyZXR1cm4gJ2lsbGVnYWwgbW92ZSc7XG5cdH07XG5cblx0Y29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYm9hcmQgPSBib2FyZENvbXB1dGVyLmZpbHRlcigoc2xvdCkgPT4gc2xvdCAhPT0gJ2F0dGFja2VkJyk7XG5cdFx0Y29uc3QgcmFuZG9tQXR0YWNrID0gYm9hcmRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQubGVuZ3RoKV07XG5cdFx0Ym9hcmRDb21wdXRlcltyYW5kb21BdHRhY2tdID0gJ2F0dGFja2VkJztcblx0XHRnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuXHRcdHJldHVybiByYW5kb21BdHRhY2s7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRwbGF5ZXJBdHRhY2ssXG5cdFx0Y29tcHV0ZXJBdHRhY2ssXG5cdFx0Ym9hcmRDb21wdXRlcixcblx0XHRib2FyZFBsYXllclxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuXG4vKlxuY29uc3QgYyA9IChzaGlwKSA9PiB7XG5cdGlmIChzaGlwID09PSAnQ2FycmllcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNSB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDMgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSk7XG5cdH1cblx0aWYgKHNoaXAgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMiB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZnkgc2hpcCcpO1xufTtcbiovXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbi8vIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHNoaXAgb2JqZWN0c1xuZnVuY3Rpb24gU2hpcCgpIHtcblx0Y29uc3Qgd2lkdGggPSAxMDtcbiAgXG5cdC8vIEFycmF5IHRoYXQgY29udGFpbnMgc2hpcHMsIGFuZCB0aGVpciBsZW5ndGhzXG5cdGNvbnN0IHNoaXBBcnIgPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NhcnJpZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMsIDQgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMsIHdpZHRoICogNCBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdiYXR0bGVzaGlwJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyLCAzIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiwgd2lkdGggKiAzIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NydWlzZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyIF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3N1Ym1hcmluZScsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnZGVzdHJveWVyJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxIF0sIFsgMCwgd2lkdGggXSBdXG5cdFx0fVxuXHRdO1xuXG5cdGNvbnN0IHNoaXBDb29yZCA9IFtdO1xuICAvLyBNYXBzIGNvb3JkcyB0byBzaGlwQ29vcmQgYXJyYXkuIFRvIGJlIHVzZWQgZm9yIGNoZWNraW5nIGhpdHMsIGFuZCBzdW5rLlxuXHRjb25zdCBwbGFjZUNvb3JkcyA9IChjb29yZGluYXRlcykgPT4ge1xuXHRcdGNvb3JkaW5hdGVzLm1hcCgoY29vcmRpbmF0ZSkgPT4gc2hpcENvb3JkLnB1c2goY29vcmRpbmF0ZSkpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9ucyB0aGF0IHJlbW92ZXMgZGVzdHJveWVkIHNoaXBcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3JkLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkYW1hZ2VzIHNoaXAgcG9zaXRpb25zXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdGNvbnN0IGlzSGl0ID0gKGhpdCkgPT4gKHNoaXBDb29yZFtoaXRdID0gJ2hpdCcpO1xuXG5cdHJldHVybiB7IHNoaXBDb29yZCwgaXNTdW5rLCBpc0hpdCwgcGxhY2VDb29yZHMsIHNoaXBBcnIgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCBoaWRlTW9kYWxQbGFjZSwgaGlkZVN0YXJ0U2NyZWVuIH0gZnJvbSAnLi9kb21Db250cm9sJztcbmltcG9ydCBjb29yZGluYXRlcyBmcm9tICcuL2RyYWdEcm9wJztcblxuY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheUdhbWUnKTtcbmNvbnN0IHBsYXlHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Jyk7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9IChjb29yZHMpID0+IHsgXG5cdGNvbnNvbGUubG9nKGNvb3Jkcy5mbGF0KCkpXG5cdGNvbnNvbGUubG9nKGNvb3Jkc1swXS5uYW1lLCBjb29yZHNbMF0uY29vcmRpbmF0ZXMpOyBcblx0Y29uc29sZS5sb2coY29vcmRzWzFdLm5hbWUsIGNvb3Jkc1sxXS5jb29yZGluYXRlcyk7IFxuXHRjb25zb2xlLmxvZyhjb29yZHNbMl0ubmFtZSwgY29vcmRzWzJdLmNvb3JkaW5hdGVzKTsgXG5cdGNvbnNvbGUubG9nKGNvb3Jkc1szXS5uYW1lLCBjb29yZHNbM10uY29vcmRpbmF0ZXMpOyBcblx0Y29uc29sZS5sb2coY29vcmRzWzRdLm5hbWUsIGNvb3Jkc1s0XS5jb29yZGluYXRlcyk7XG5cdGhpZGVNb2RhbFBsYWNlKCk7XG5cdGxldCBhY3RpdmVQbGF5ZXIgPSAwO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllciBnYW1lYm9hcmRzXG5cdGNvbnN0IGJvYXJkMSA9IEdhbWVib2FyZCgpO1xuXHRjb25zdCBib2FyZDIgPSBHYW1lYm9hcmQoKTtcblxuXHQvLyBDcmVhdGluZyBwbGF5ZXJzXG5cdGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoYm9hcmQyKTtcblx0Y29uc3QgcGxheWVyMiA9IFBsYXllcihib2FyZDEpO1xuXG5cdGJvYXJkMi5wbGFjZUNvbXB1dGVyKCk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbMF0ubmFtZSwgY29vcmRzWzBdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1sxXS5uYW1lLCBjb29yZHNbMV0uY29vcmRpbmF0ZXMpO1xuXHRib2FyZDEucGxhY2VQbGF5ZXIoY29vcmRzWzJdLm5hbWUsIGNvb3Jkc1syXS5jb29yZGluYXRlcyk7XG5cdGJvYXJkMS5wbGFjZVBsYXllcihjb29yZHNbM10ubmFtZSwgY29vcmRzWzNdLmNvb3JkaW5hdGVzKTtcblx0Ym9hcmQxLnBsYWNlUGxheWVyKGNvb3Jkc1s0XS5uYW1lLCBjb29yZHNbNF0uY29vcmRpbmF0ZXMpO1xuXG5cdC8vIFJlbmRlcmluZyBib2FyZHNcblx0cmVuZGVyKGJvYXJkMSwgYm9hcmQyKTtcblxuXHQvLyBGdW5jdGlvbiBmb3IgcGxheWVyIHR1cm5zXG5cdGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG5cdFx0YWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSAwID8gMSA6IDA7XG5cdH07XG5cblx0Ly8gQ2hlY2tpbmcgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcblx0ZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0aWYgKGJvYXJkMi5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnQ29tcHV0ZXIgbG9zdC4gWW91IHdpbiEnKTtcblx0XHR9IGVsc2UgaWYgKGJvYXJkMS5hbGxTdW5rKCkpIHtcblx0XHRcdHNob3dNb2RhbCgnWW91IGxvc3QhIFRoZSBlbmVteSBoYXMgZGVmZWF0ZWQgeW91LicpO1xuXHRcdH0gZWxzZSBwbGF5KCk7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiBsb29wIHRoYXQgc3dpdGNoZXMgcGxheWVyIHR1cm5zXG5cdGZ1bmN0aW9uIHBsYXkoKSB7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBbIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczInKSBdO1xuXHRcdGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG5cdFx0XHRjb21wdXRlci5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0cGxheWVyMS5wbGF5ZXJBdHRhY2soaSk7XG5cdFx0XHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0cGxheWVyMi5jb21wdXRlckF0dGFjaygpO1xuXHRcdFx0bWFya1Nwb3RzKGJvYXJkMi5ib2FyZCwgYm9hcmQxLmJvYXJkKTtcblx0XHRcdGNoYW5nZVR1cm4oKTtcblx0XHR9O1xuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdGFjdGl2ZVBsYXllciA9PT0gMCA/IHBsYXllclR1cm4oKSA6IGNvbXB1dGVyVHVybigpO1xuXHR9XG5cdGNoZWNrKCk7XG59O1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgcmVzdGFydHMgZ2FtZSB3aGVuIHJlc3RhcnQgYnV0dG9uIHByZXNzZWRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHJlc3RhcnQoKTtcblx0Z2FtZUxvb3AoKTtcbn0pO1xuXG4vLyBhZGRFdmVudExpc3RlbmVyIHRoYXQgc3RhcnRzIHRoZSBnYW1lXG5wbGF5R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVMb29wLmJpbmQodGhpcywgY29vcmRpbmF0ZXMpKTtcbnN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVN0YXJ0U2NyZWVuKTtcbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzdGFydFNjcmVlbiIsIm1vZGFsUGxhY2UiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsIl9fYSIsImkiLCJkaXYiLCJ0ZXh0Q29udGVudCIsImRhdGFzZXQiLCJpZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsIm1hcmtTaGlwUGxhY2VtZW50IiwicGxhY2VtZW50Iiwic2hvd01vZGFsIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZXN0YXJ0IiwiaW5uZXJIVE1MIiwiaG9yaXpvbnRhbCIsInJvdGF0ZSIsInJlbmRlck1vZGFsQm9hcmQiLCJhcnIiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiZ3JpZCIsImhpZGVTdGFydFNjcmVlbiIsInZpc2liaWxpdHkiLCJoaWRlTW9kYWxQbGFjZSIsInNoaXBzIiwicGxheWVyQm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImUiLCJ0YXJnZXQiLCJpbmRleCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJzaGlwTGFzdEluZGV4IiwicGFyc2VJbnQiLCJsYXN0RWxlbWVudENoaWxkIiwic2hpcE5hbWUiLCJzaGlwQ29vcmRzIiwibmFtZSIsImNvbnRhaW5zIiwiY29vcmRzIiwicHVzaCIsImFkZCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjcmVhdGVTaGlwIiwic2hpcENvb3JkIiwibWFya1NoaXBzIiwiY29vcmQiLCJwb3NpdGlvbiIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2siLCJyZWNlaXZlQXR0YWNrSGVscGVyIiwiYWxsU3VuayIsImZpbHRlciIsImZpbmRBcnIiLCJjb3IiLCJpbmNsdWRlcyIsImZsYXQiLCJjaGVja0FyciIsInNvcnQiLCJ0b1N0cmluZyIsImNoZWNrQ2FycmllciIsImNoZWNrQmF0dGxlc2hpcCIsImNoZWNrQ3J1aXNlciIsImNoZWNrU3VibWFyaW5lIiwiY2hlY2tEZXN0cm95ZXIiLCJpc0hpdCIsImdlbmVyYXRlIiwic2hpcDIiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJkaXJlY3Rpb25zIiwiY3VycmVudCIsImRpcmVjdGlvbiIsInJhbmRvbVN0YXJ0IiwiYWJzIiwibGVmdCIsInNvbWUiLCJyaWdodCIsIm5vdEF2YWlsYWJsZSIsInBsYWNlQ29vcmRzIiwicGxhY2VDb21wdXRlciIsInNoaXBBcnIiLCJwbGFjZVBsYXllciIsIlBsYXllciIsImdhbWVib2FyZCIsImJvYXJkUGxheWVyIiwiYm9hcmRDb21wdXRlciIsInBsYXllckF0dGFjayIsImNvbXB1dGVyQXR0YWNrIiwic2xvdCIsInJhbmRvbUF0dGFjayIsIndpZHRoIiwibWFwIiwiY29vcmRpbmF0ZSIsImlzU3VuayIsImV2ZXJ5IiwiaGl0Iiwic3RhcnQiLCJwbGF5R2FtZSIsImdhbWVMb29wIiwiYWN0aXZlUGxheWVyIiwicGxheWVyMSIsInBsYXllcjIiLCJjaGFuZ2VUdXJuIiwiY2hlY2siLCJwbGF5IiwiY29tcHV0ZXIiLCJwbGF5ZXJUdXJuIiwiY29tcHV0ZXJUdXJuIiwiYmluZCJdLCJzb3VyY2VSb290IjoiIn0=