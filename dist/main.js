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
/* harmony export */   "rotate": () => (/* binding */ rotate)
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

var rotate = function rotate(e) {
  if (e.target.className === 'carrier') carrier.classList.toggle("carrierContainer-horizontal");
  if (e.target.className === 'battleship') battleship.classList.toggle("battleshipContainer-horizontal");
  if (e.target.className === 'cruiser') cruiser.classList.toggle("cruiserContainer-horizontal");
  if (e.target.className === 'submarine') submarine.classList.toggle("submarineContainer-horizontal");
  if (e.target.className === 'destroyer') destroyer.classList.toggle("destroyerContainer-horizontal");
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
};

gameLoop(); // addEventListener that restarts game when restart button pressed

document.querySelector('#restart').addEventListener('click', function () {
  (0,_domControl__WEBPACK_IMPORTED_MODULE_2__.restart)();
  gameLoop();
});
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
    console.log(shipIndex);
  });
});

function dragStart() {
  console.log(this);
  console.log('drag');
  draggedShip = this;
  draggedShipLength = this.childNodes.length;
  console.log(draggedShip, draggedShipLength);
}

;

function dragOver(e) {
  e.preventDefault();
}

;

function dragEnter(e) {
  e.preventDefault();
}

;

function dragDrop() {
  console.log('drop');
}

;

function dragLeave() {
  console.log('drag leave');
}

;
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBTUEsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbEI7QUFDQSxJQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFiO0FBQ0EsSUFBTUUsS0FBSyxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZDtBQUNBLElBQU1HLE9BQU8sR0FBR0osUUFBUSxDQUFDQyxhQUFULENBQXVCLG1CQUF2QixDQUFoQjtBQUNBLElBQU1JLFVBQVUsR0FBR0wsUUFBUSxDQUFDQyxhQUFULENBQXVCLHNCQUF2QixDQUFuQjtBQUNBLElBQU1LLE9BQU8sR0FBR04sUUFBUSxDQUFDQyxhQUFULENBQXVCLG1CQUF2QixDQUFoQjtBQUNBLElBQU1NLFNBQVMsR0FBR1AsUUFBUSxDQUFDQyxhQUFULENBQXVCLHFCQUF2QixDQUFsQjtBQUNBLElBQU1PLFNBQVMsR0FBR1IsUUFBUSxDQUFDQyxhQUFULENBQXVCLHFCQUF2QixDQUFsQjs7QUFFQSxJQUFNUSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDQyxNQUFELEVBQVNDLE1BQVQsRUFBb0I7QUFDbEM7QUFDQSxNQUFNQyxLQUFLLEdBQUdaLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixNQUF2QixDQUFkO0FBQ0FELEVBQUFBLEtBQUssQ0FBQ0UsU0FBTixHQUFrQixPQUFsQjtBQUNBLE1BQU1DLEtBQUssR0FBR2YsUUFBUSxDQUFDYSxhQUFULENBQXVCLE1BQXZCLENBQWQ7QUFDQUUsRUFBQUEsS0FBSyxDQUFDRCxTQUFOLEdBQWtCLE9BQWxCO0FBRUFKLEVBQUFBLE1BQU0sQ0FBQ00sS0FBUCxDQUFhQyxPQUFiLENBQXFCLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQ2hDLFFBQU1DLEdBQUcsR0FBR3BCLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FPLElBQUFBLEdBQUcsQ0FBQ04sU0FBSixHQUFnQixRQUFoQjtBQUNBTSxJQUFBQSxHQUFHLENBQUNDLFdBQUosR0FBa0JGLENBQWxCO0FBQ0FELElBQUFBLEdBQUcsS0FBSyxNQUFSLEdBQWlCRSxHQUFHLENBQUNFLEtBQUosQ0FBVUMsZUFBVixHQUE0QixLQUE3QyxHQUFxRCxJQUFyRDtBQUNBWCxJQUFBQSxLQUFLLENBQUNZLE1BQU4sQ0FBYUosR0FBYjtBQUNBckIsSUFBQUEsU0FBUyxDQUFDeUIsTUFBVixDQUFpQlosS0FBakI7QUFDQSxHQVBEO0FBU0FELEVBQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhQyxPQUFiLENBQXFCLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQ2hDLFFBQU1DLEdBQUcsR0FBR3BCLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FPLElBQUFBLEdBQUcsQ0FBQ04sU0FBSixHQUFnQixRQUFoQjtBQUNBTSxJQUFBQSxHQUFHLENBQUNDLFdBQUosR0FBa0JGLENBQWxCO0FBQ0FELElBQUFBLEdBQUcsS0FBSyxNQUFSLEdBQWlCRSxHQUFHLENBQUNFLEtBQUosQ0FBVUMsZUFBVixHQUE0QixLQUE3QyxHQUFxRCxJQUFyRDtBQUNBUixJQUFBQSxLQUFLLENBQUNTLE1BQU4sQ0FBYUosR0FBYjtBQUNBckIsSUFBQUEsU0FBUyxDQUFDeUIsTUFBVixDQUFpQlQsS0FBakI7QUFDQSxHQVBEO0FBUUEsQ0F4QkQ7O0FBMEJBLElBQU1VLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNmLE1BQUQsRUFBU0MsTUFBVCxFQUFvQjtBQUNyQyxNQUFNZSxJQUFJLEdBQUcxQixRQUFRLENBQUMyQixnQkFBVCxDQUEwQixTQUExQixDQUFiO0FBQ0EsTUFBTUMsTUFBTSxHQUFHNUIsUUFBUSxDQUFDMkIsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBZjtBQUVBakIsRUFBQUEsTUFBTSxDQUFDTyxPQUFQLENBQWUsVUFBQ1ksT0FBRCxFQUFVVixDQUFWLEVBQWdCO0FBRTlCVSxJQUFBQSxPQUFPLEtBQUssUUFBWixHQUF3QkgsSUFBSSxDQUFDUCxDQUFELENBQUosQ0FBUUcsS0FBUixDQUFjUSxVQUFkLEdBQTJCLE1BQW5ELEdBQTZELElBQTdEO0FBQ0FELElBQUFBLE9BQU8sS0FBSyxLQUFaLEdBQXFCSCxJQUFJLENBQUNQLENBQUQsQ0FBSixDQUFRRyxLQUFSLENBQWNRLFVBQWQsR0FBMkIsT0FBaEQsR0FBMkQsSUFBM0Q7QUFDQSxHQUpEO0FBTUFuQixFQUFBQSxNQUFNLENBQUNNLE9BQVAsQ0FBZSxVQUFDWSxPQUFELEVBQVVWLENBQVYsRUFBZ0I7QUFFOUJVLElBQUFBLE9BQU8sS0FBSyxRQUFaLEdBQXdCRCxNQUFNLENBQUNULENBQUQsQ0FBTixDQUFVRyxLQUFWLENBQWdCUSxVQUFoQixHQUE2QixNQUFyRCxHQUErRCxJQUEvRDtBQUNBRCxJQUFBQSxPQUFPLEtBQUssS0FBWixHQUFxQkQsTUFBTSxDQUFDVCxDQUFELENBQU4sQ0FBVUcsS0FBVixDQUFnQlEsVUFBaEIsR0FBNkIsT0FBbEQsR0FBNkQsSUFBN0Q7QUFDQSxHQUpEO0FBS0EsQ0FmRDs7QUFpQkEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRCxFQUFXO0FBQzVCN0IsRUFBQUEsS0FBSyxDQUFDOEIsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUIsWUFBdkI7QUFDQW5DLEVBQUFBLFNBQVMsQ0FBQ2tDLFNBQVYsQ0FBb0JDLE1BQXBCLENBQTJCLFlBQTNCO0FBQ0FoQyxFQUFBQSxJQUFJLENBQUNtQixXQUFMLEdBQW1CVyxLQUFuQjtBQUNBLENBSkQ7O0FBTUEsSUFBTUcsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUNyQnBDLEVBQUFBLFNBQVMsQ0FBQ3FDLFNBQVYsR0FBc0IsRUFBdEI7QUFDQ2pDLEVBQUFBLEtBQUssQ0FBQzhCLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCLFlBQXZCO0FBQ0RuQyxFQUFBQSxTQUFTLENBQUNrQyxTQUFWLENBQW9CQyxNQUFwQixDQUEyQixZQUEzQjtBQUNBLENBSkQ7O0FBTUEsSUFBTUcsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ3JCLE1BQUdBLENBQUMsQ0FBQ0MsTUFBRixDQUFTekIsU0FBVCxLQUF1QixTQUExQixFQUNBVixPQUFPLENBQUM2QixTQUFSLENBQWtCQyxNQUFsQjtBQUNBLE1BQUdJLENBQUMsQ0FBQ0MsTUFBRixDQUFTekIsU0FBVCxLQUF1QixZQUExQixFQUNBVCxVQUFVLENBQUM0QixTQUFYLENBQXFCQyxNQUFyQjtBQUNBLE1BQUdJLENBQUMsQ0FBQ0MsTUFBRixDQUFTekIsU0FBVCxLQUF1QixTQUExQixFQUNBUixPQUFPLENBQUMyQixTQUFSLENBQWtCQyxNQUFsQjtBQUNBLE1BQUdJLENBQUMsQ0FBQ0MsTUFBRixDQUFTekIsU0FBVCxLQUF1QixXQUExQixFQUNBUCxTQUFTLENBQUMwQixTQUFWLENBQW9CQyxNQUFwQjtBQUNBLE1BQUdJLENBQUMsQ0FBQ0MsTUFBRixDQUFTekIsU0FBVCxLQUF1QixXQUExQixFQUNBTixTQUFTLENBQUN5QixTQUFWLENBQW9CQyxNQUFwQjtBQUNBLENBWEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0NDakVBOztBQUNBLFNBQVNPLFNBQVQsR0FBcUI7QUFDcEIsTUFBTXpCLEtBQUssR0FBRzBCLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVDLElBQUFBLE1BQU0sRUFBRTtBQUFWLEdBQVgsRUFBNEIsVUFBQ0MsQ0FBRCxFQUFJMUIsQ0FBSjtBQUFBLFdBQVVBLENBQVY7QUFBQSxHQUE1QixDQUFkO0FBRUEsTUFBTWYsT0FBTyxHQUFHb0Msd0RBQUksRUFBcEI7QUFDQSxNQUFNbkMsVUFBVSxHQUFHbUMsd0RBQUksRUFBdkI7QUFDQSxNQUFNbEMsT0FBTyxHQUFHa0Msd0RBQUksRUFBcEI7QUFDQSxNQUFNakMsU0FBUyxHQUFHaUMsd0RBQUksRUFBdEI7QUFDQSxNQUFNaEMsU0FBUyxHQUFHZ0Msd0RBQUksRUFBdEI7QUFFQSxNQUFNTSxVQUFVLEdBQUcsQ0FDbEIxQyxPQUFPLENBQUMyQyxTQURVLEVBRWxCMUMsVUFBVSxDQUFDMEMsU0FGTyxFQUdsQnpDLE9BQU8sQ0FBQ3lDLFNBSFUsRUFJbEJ4QyxTQUFTLENBQUN3QyxTQUpRLEVBS2xCdkMsU0FBUyxDQUFDdUMsU0FMUSxDQUFuQixDQVRvQixDQWlCcEI7QUFDQTs7QUFDQSxNQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLE1BQUQsRUFBWTtBQUNqQyxRQUFJakMsS0FBSyxDQUFDaUMsTUFBRCxDQUFMLEtBQWtCLE1BQXRCLEVBQThCO0FBQzdCakMsTUFBQUEsS0FBSyxDQUFDaUMsTUFBRCxDQUFMLEdBQWdCLEtBQWhCLENBRDZCLENBRTdCOztBQUNBQyxNQUFBQSxtQkFBbUIsQ0FBQ0QsTUFBRCxDQUFuQjtBQUNBLEtBSkQsTUFJTztBQUNOakMsTUFBQUEsS0FBSyxDQUFDaUMsTUFBRCxDQUFMLEdBQWdCLFFBQWhCO0FBQ0E7QUFDRCxHQVJELENBbkJvQixDQTZCcEI7QUFDQTs7O0FBQ0EsTUFBTUUsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUNyQixRQUFNQyxHQUFHLEdBQUdwQyxLQUFLLENBQUNxQyxNQUFOLENBQWEsVUFBQ3hCLE9BQUQ7QUFBQSxhQUFhQSxPQUFPLEtBQUssS0FBekI7QUFBQSxLQUFiLENBQVo7O0FBQ0EsUUFBSXVCLEdBQUcsQ0FBQ1IsTUFBSixJQUFjLEVBQWxCLEVBQXNCO0FBQ3JCLGFBQU8sSUFBUDtBQUNBOztBQUNELFdBQU8sS0FBUDtBQUNBLEdBTkQsQ0EvQm9CLENBdUNwQjs7O0FBQ0EsTUFBTU0sbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDRCxNQUFELEVBQVk7QUFDdkMsUUFBTUssT0FBTyxHQUFHUixVQUFVLENBQUNPLE1BQVgsQ0FBa0IsVUFBQ0UsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsUUFBSixDQUFhUCxNQUFiLENBQVQ7QUFBQSxLQUFsQixFQUFpRFEsSUFBakQsRUFBaEI7QUFFQSxRQUFNQyxRQUFRLEdBQUdKLE9BQU8sQ0FBQ0ssSUFBUixHQUFlQyxRQUFmLEVBQWpCO0FBQ0EsUUFBTUMsWUFBWSxHQUFHZixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNhLElBQWQsR0FBcUJDLFFBQXJCLEVBQXJCO0FBQ0EsUUFBTUUsZUFBZSxHQUFHaEIsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjYSxJQUFkLEdBQXFCQyxRQUFyQixFQUF4QjtBQUNBLFFBQU1HLFlBQVksR0FBR2pCLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY2EsSUFBZCxHQUFxQkMsUUFBckIsRUFBckI7QUFDQSxRQUFNSSxjQUFjLEdBQUdsQixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNhLElBQWQsR0FBcUJDLFFBQXJCLEVBQXZCO0FBQ0EsUUFBTUssY0FBYyxHQUFHbkIsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjYSxJQUFkLEdBQXFCQyxRQUFyQixFQUF2QjtBQUVBLFFBQUlGLFFBQVEsS0FBS0csWUFBakIsRUFBK0J6RCxPQUFPLENBQUM4RCxLQUFSLENBQWNqQixNQUFkLEVBQS9CLEtBQ0ssSUFBSVMsUUFBUSxLQUFLSSxlQUFqQixFQUFrQ3pELFVBQVUsQ0FBQzZELEtBQVgsQ0FBaUJqQixNQUFqQixFQUFsQyxLQUNBLElBQUlTLFFBQVEsS0FBS0ssWUFBakIsRUFBK0J6RCxPQUFPLENBQUM0RCxLQUFSLENBQWNqQixNQUFkLEVBQS9CLEtBQ0EsSUFBSVMsUUFBUSxLQUFLTSxjQUFqQixFQUFpQ3pELFNBQVMsQ0FBQzJELEtBQVYsQ0FBZ0JqQixNQUFoQixFQUFqQyxLQUNBLElBQUlTLFFBQVEsS0FBS08sY0FBakIsRUFBaUN6RCxTQUFTLENBQUMwRCxLQUFWLENBQWdCakIsTUFBaEI7QUFDdEMsR0FmRCxDQXhDb0IsQ0F5RHBCOzs7QUFDQSxNQUFNa0IsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ2pDLFFBQU1DLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0QsTUFBTCxLQUFnQkYsSUFBSSxDQUFDSyxVQUFMLENBQWdCN0IsTUFBM0MsQ0FBZjtBQUNBLFFBQU04QixPQUFPLEdBQUdOLElBQUksQ0FBQ0ssVUFBTCxDQUFnQkgsTUFBaEIsQ0FBaEI7QUFDQSxRQUFJSyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxRQUFJTCxNQUFNLEtBQUssQ0FBZixFQUFrQkssU0FBUyxHQUFHLENBQVo7QUFDbEIsUUFBSUwsTUFBTSxLQUFLLENBQWYsRUFBa0JLLFNBQVMsR0FBRyxFQUFaO0FBQ2xCLFFBQU1DLFdBQVcsR0FBR0wsSUFBSSxDQUFDTSxHQUFMLENBQVNOLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNELE1BQUwsS0FBZ0J0RCxLQUFLLENBQUM0QixNQUF0QixHQUErQndCLElBQUksQ0FBQ0ssVUFBTCxDQUFnQixDQUFoQixFQUFtQjdCLE1BQW5CLEdBQTRCK0IsU0FBdEUsQ0FBVCxDQUFwQjtBQUVBLFFBQU1HLElBQUksR0FBR0osT0FBTyxDQUFDSyxJQUFSLENBQWEsVUFBQ0MsS0FBRDtBQUFBLGFBQVcsQ0FBQ0osV0FBVyxHQUFHSSxLQUFmLElBQXdCLEVBQXhCLEtBQStCLENBQTFDO0FBQUEsS0FBYixDQUFiO0FBQ0EsUUFBTUMsS0FBSyxHQUFHUCxPQUFPLENBQUNLLElBQVIsQ0FBYSxVQUFDQyxLQUFEO0FBQUEsYUFBVyxDQUFDSixXQUFXLEdBQUdJLEtBQWYsSUFBd0IsRUFBeEIsS0FBK0IsS0FBSyxDQUEvQztBQUFBLEtBQWIsQ0FBZDtBQUNBLFFBQU1FLFlBQVksR0FBR1IsT0FBTyxDQUFDSyxJQUFSLENBQWEsVUFBQ0MsS0FBRDtBQUFBLGFBQVdoRSxLQUFLLENBQUM0RCxXQUFXLEdBQUdJLEtBQWYsQ0FBTCxLQUErQixNQUExQztBQUFBLEtBQWIsQ0FBckI7QUFFQSxRQUFLLENBQUNGLElBQUQsSUFBUyxDQUFDRyxLQUFWLElBQW1CLENBQUNDLFlBQXJCLElBQXVDSixJQUFJLElBQUlHLEtBQVIsSUFBaUIsQ0FBQ0MsWUFBbEIsSUFBa0NaLE1BQU0sS0FBSyxDQUF4RixFQUNDSSxPQUFPLENBQUN6RCxPQUFSLENBQWdCLFVBQUNZLE9BQUQsRUFBYTtBQUM1QmIsTUFBQUEsS0FBSyxDQUFDNEQsV0FBVyxHQUFHL0MsT0FBZixDQUFMLEdBQStCLE1BQS9CO0FBQ0F3QyxNQUFBQSxLQUFLLENBQUNjLFdBQU4sQ0FBa0IsQ0FBRVAsV0FBVyxHQUFHL0MsT0FBaEIsQ0FBbEI7QUFDQSxLQUhELEVBREQsS0FLS3NDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLENBQVI7QUFDTCxHQWxCRCxDQTFEb0IsQ0E4RXBCOzs7QUFDQSxNQUFNZSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDM0JqQixJQUFBQSxRQUFRLENBQUMvRCxPQUFPLENBQUNpRixPQUFSLENBQWdCLENBQWhCLENBQUQsRUFBcUJqRixPQUFyQixDQUFSO0FBQ0ErRCxJQUFBQSxRQUFRLENBQUM5RCxVQUFVLENBQUNnRixPQUFYLENBQW1CLENBQW5CLENBQUQsRUFBd0JoRixVQUF4QixDQUFSO0FBQ0E4RCxJQUFBQSxRQUFRLENBQUM3RCxPQUFPLENBQUMrRSxPQUFSLENBQWdCLENBQWhCLENBQUQsRUFBcUIvRSxPQUFyQixDQUFSO0FBQ0E2RCxJQUFBQSxRQUFRLENBQUM1RCxTQUFTLENBQUM4RSxPQUFWLENBQWtCLENBQWxCLENBQUQsRUFBdUI5RSxTQUF2QixDQUFSO0FBQ0E0RCxJQUFBQSxRQUFRLENBQUMzRCxTQUFTLENBQUM2RSxPQUFWLENBQWtCLENBQWxCLENBQUQsRUFBdUI3RSxTQUF2QixDQUFSO0FBQ0EsR0FORDs7QUFRQSxTQUFPO0FBQ053QyxJQUFBQSxhQUFhLEVBQWJBLGFBRE07QUFFTkcsSUFBQUEsT0FBTyxFQUFQQSxPQUZNO0FBR05uQyxJQUFBQSxLQUFLLEVBQUxBLEtBSE07QUFJTm9FLElBQUFBLGFBQWEsRUFBYkEsYUFKTTtBQUtOdEMsSUFBQUEsVUFBVSxFQUFWQTtBQUxNLEdBQVA7QUFPQTs7QUFFRCxpRUFBZUwsU0FBZjs7Ozs7Ozs7Ozs7Ozs7O0FDbEdBOztBQUVBLElBQU02QyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDQyxTQUFELEVBQWU7QUFDN0IsTUFBTUMsV0FBVyxHQUFHOUMsS0FBSyxDQUFDQyxJQUFOLENBQVc7QUFBRUMsSUFBQUEsTUFBTSxFQUFFO0FBQVYsR0FBWCxFQUE0QixVQUFDQyxDQUFELEVBQUkxQixDQUFKO0FBQUEsV0FBVUEsQ0FBVjtBQUFBLEdBQTVCLENBQXBCO0FBQ0EsTUFBTXNFLGFBQWEsR0FBRy9DLEtBQUssQ0FBQ0MsSUFBTixDQUFXO0FBQUVDLElBQUFBLE1BQU0sRUFBRTtBQUFWLEdBQVgsRUFBNEIsVUFBQ0MsQ0FBRCxFQUFJMUIsQ0FBSjtBQUFBLFdBQVVBLENBQVY7QUFBQSxHQUE1QixDQUF0Qjs7QUFDQSxNQUFNdUUsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ3pDLE1BQUQsRUFBWTtBQUNoQyxRQUFJdUMsV0FBVyxDQUFDdkMsTUFBRCxDQUFYLEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3ZDdUMsTUFBQUEsV0FBVyxDQUFDdkMsTUFBRCxDQUFYLEdBQXNCLFVBQXRCO0FBQ0EsYUFBT3NDLFNBQVMsQ0FBQ3ZDLGFBQVYsQ0FBd0JDLE1BQXhCLENBQVA7QUFDQTs7QUFDRCxXQUFPLGNBQVA7QUFDQSxHQU5EOztBQVFBLE1BQU0wQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDNUIsUUFBTTNFLEtBQUssR0FBR3lFLGFBQWEsQ0FBQ3BDLE1BQWQsQ0FBcUIsVUFBQ3VDLElBQUQ7QUFBQSxhQUFVQSxJQUFJLEtBQUssVUFBbkI7QUFBQSxLQUFyQixDQUFkO0FBQ0EsUUFBTUMsWUFBWSxHQUFHN0UsS0FBSyxDQUFDdUQsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0QsTUFBTCxLQUFnQnRELEtBQUssQ0FBQzRCLE1BQWpDLENBQUQsQ0FBMUI7QUFDQTZDLElBQUFBLGFBQWEsQ0FBQ0ksWUFBRCxDQUFiLEdBQThCLFVBQTlCO0FBQ0FOLElBQUFBLFNBQVMsQ0FBQ3ZDLGFBQVYsQ0FBd0I2QyxZQUF4QjtBQUNBLFdBQU9BLFlBQVA7QUFDQSxHQU5EOztBQVFBLFNBQU87QUFDTkgsSUFBQUEsWUFBWSxFQUFaQSxZQURNO0FBRU5DLElBQUFBLGNBQWMsRUFBZEEsY0FGTTtBQUdORixJQUFBQSxhQUFhLEVBQWJBLGFBSE07QUFJTkQsSUFBQUEsV0FBVyxFQUFYQTtBQUpNLEdBQVA7QUFNQSxDQXpCRDs7QUEyQkEsaUVBQWVGLE1BQWY7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUVBO0FBQ0EsU0FBUzlDLElBQVQsR0FBZ0I7QUFDZixNQUFNc0QsS0FBSyxHQUFHLEVBQWQsQ0FEZSxDQUdmOztBQUNBLE1BQU1ULE9BQU8sR0FBRyxDQUNmO0FBQ0NVLElBQUFBLElBQUksRUFBRSxTQURQO0FBRUN0QixJQUFBQSxVQUFVLEVBQUUsQ0FBRSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVgsRUFBYyxDQUFkLENBQUYsRUFBcUIsQ0FBRSxDQUFGLEVBQUtxQixLQUFMLEVBQVlBLEtBQUssR0FBRyxDQUFwQixFQUF1QkEsS0FBSyxHQUFHLENBQS9CLEVBQWtDQSxLQUFLLEdBQUcsQ0FBMUMsQ0FBckI7QUFGYixHQURlLEVBS2Y7QUFDQ0MsSUFBQUEsSUFBSSxFQUFFLFlBRFA7QUFFQ3RCLElBQUFBLFVBQVUsRUFBRSxDQUFFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxDQUFGLEVBQWtCLENBQUUsQ0FBRixFQUFLcUIsS0FBTCxFQUFZQSxLQUFLLEdBQUcsQ0FBcEIsRUFBdUJBLEtBQUssR0FBRyxDQUEvQixDQUFsQjtBQUZiLEdBTGUsRUFTZjtBQUNDQyxJQUFBQSxJQUFJLEVBQUUsU0FEUDtBQUVDdEIsSUFBQUEsVUFBVSxFQUFFLENBQUUsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBRixFQUFlLENBQUUsQ0FBRixFQUFLcUIsS0FBTCxFQUFZQSxLQUFLLEdBQUcsQ0FBcEIsQ0FBZjtBQUZiLEdBVGUsRUFhZjtBQUNDQyxJQUFBQSxJQUFJLEVBQUUsV0FEUDtBQUVDdEIsSUFBQUEsVUFBVSxFQUFFLENBQUUsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBRixFQUFlLENBQUUsQ0FBRixFQUFLcUIsS0FBTCxFQUFZQSxLQUFLLEdBQUcsQ0FBcEIsQ0FBZjtBQUZiLEdBYmUsRUFpQmY7QUFDQ0MsSUFBQUEsSUFBSSxFQUFFLFdBRFA7QUFFQ3RCLElBQUFBLFVBQVUsRUFBRSxDQUFFLENBQUUsQ0FBRixFQUFLLENBQUwsQ0FBRixFQUFZLENBQUUsQ0FBRixFQUFLcUIsS0FBTCxDQUFaO0FBRmIsR0FqQmUsQ0FBaEI7QUF1QkEsTUFBTS9DLFNBQVMsR0FBRyxFQUFsQixDQTNCZSxDQTRCZDs7QUFDRCxNQUFNb0MsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ2EsV0FBRCxFQUFpQjtBQUNwQ0EsSUFBQUEsV0FBVyxDQUFDQyxHQUFaLENBQWdCLFVBQUNDLFVBQUQ7QUFBQSxhQUFnQm5ELFNBQVMsQ0FBQ29ELElBQVYsQ0FBZUQsVUFBZixDQUFoQjtBQUFBLEtBQWhCO0FBQ0EsR0FGRCxDQTdCZSxDQWlDZjs7O0FBQ0EsTUFBTUUsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSxXQUFNckQsU0FBUyxDQUFDc0QsS0FBVixDQUFnQixVQUFDeEUsT0FBRDtBQUFBLGFBQWFBLE9BQU8sS0FBSyxLQUF6QjtBQUFBLEtBQWhCLENBQU47QUFBQSxHQUFmLENBbENlLENBb0NmO0FBQ0E7OztBQUNBLE1BQU1xQyxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDb0MsR0FBRDtBQUFBLFdBQVV2RCxTQUFTLENBQUN1RCxHQUFELENBQVQsR0FBaUIsS0FBM0I7QUFBQSxHQUFkOztBQUVBLFNBQU87QUFBRXZELElBQUFBLFNBQVMsRUFBVEEsU0FBRjtBQUFhcUQsSUFBQUEsTUFBTSxFQUFOQSxNQUFiO0FBQXFCbEMsSUFBQUEsS0FBSyxFQUFMQSxLQUFyQjtBQUE0QmlCLElBQUFBLFdBQVcsRUFBWEEsV0FBNUI7QUFBeUNFLElBQUFBLE9BQU8sRUFBUEE7QUFBekMsR0FBUDtBQUNBOztBQUVELGlFQUFlN0MsSUFBZjs7Ozs7O1VDOUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQU0rRCxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQ3RCLE1BQUlDLFlBQVksR0FBRyxDQUFuQixDQURzQixDQUd0Qjs7QUFDQSxNQUFNOUYsTUFBTSxHQUFHK0Isc0RBQVMsRUFBeEI7QUFDQSxNQUFNOUIsTUFBTSxHQUFHOEIsc0RBQVMsRUFBeEIsQ0FMc0IsQ0FPdEI7O0FBQ0EsTUFBTWdFLE9BQU8sR0FBR25CLG1EQUFNLENBQUMzRSxNQUFELENBQXRCO0FBQ0EsTUFBTStGLE9BQU8sR0FBR3BCLG1EQUFNLENBQUM1RSxNQUFELENBQXRCO0FBRUFDLEVBQUFBLE1BQU0sQ0FBQ3lFLGFBQVAsR0FYc0IsQ0FhdEI7O0FBQ0EzRSxFQUFBQSxtREFBTSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsQ0FBTixDQWRzQixDQWdCdEI7O0FBQ0EsTUFBTWdHLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07QUFDeEJILElBQUFBLFlBQVksR0FBR0EsWUFBWSxLQUFLLENBQWpCLEdBQXFCLENBQXJCLEdBQXlCLENBQXhDO0FBQ0EsR0FGRCxDQWpCc0IsQ0FxQnRCOzs7QUFDQSxXQUFTSSxLQUFULEdBQWlCO0FBQ2hCLFFBQUlqRyxNQUFNLENBQUN3QyxPQUFQLEVBQUosRUFBc0I7QUFDckJwQixNQUFBQSxzREFBUyxDQUFDLHlCQUFELENBQVQ7QUFDQSxLQUZELE1BRU8sSUFBSXJCLE1BQU0sQ0FBQ3lDLE9BQVAsRUFBSixFQUFzQjtBQUM1QnBCLE1BQUFBLHNEQUFTLENBQUMsdUNBQUQsQ0FBVDtBQUNBLEtBRk0sTUFFQThFLElBQUk7QUFDWCxHQTVCcUIsQ0E4QnRCOzs7QUFDQSxXQUFTQSxJQUFULEdBQWdCO0FBQ2YsUUFBTUMsUUFBUSxzQkFBUTlHLFFBQVEsQ0FBQzJCLGdCQUFULENBQTBCLFNBQTFCLENBQVIsQ0FBZDs7QUFDQSxRQUFNb0YsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUN4QkQsTUFBQUEsUUFBUSxDQUFDN0YsT0FBVCxDQUFpQixVQUFDWSxPQUFELEVBQVVWLENBQVYsRUFBZ0I7QUFDaENVLFFBQUFBLE9BQU8sQ0FBQ21GLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQU07QUFDdkNQLFVBQUFBLE9BQU8sQ0FBQ2YsWUFBUixDQUFxQnZFLENBQXJCO0FBQ0FNLFVBQUFBLHNEQUFTLENBQUNkLE1BQU0sQ0FBQ0ssS0FBUixFQUFlTixNQUFNLENBQUNNLEtBQXRCLENBQVQ7QUFDQTJGLFVBQUFBLFVBQVU7QUFDVkMsVUFBQUEsS0FBSztBQUNMLFNBTEQ7QUFNQSxPQVBEO0FBUUEsS0FURDs7QUFXQSxRQUFNSyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQzFCUCxNQUFBQSxPQUFPLENBQUNmLGNBQVI7QUFDQWxFLE1BQUFBLHNEQUFTLENBQUNkLE1BQU0sQ0FBQ0ssS0FBUixFQUFlTixNQUFNLENBQUNNLEtBQXRCLENBQVQ7QUFDQTJGLE1BQUFBLFVBQVU7QUFDVixLQUpELENBYmUsQ0FtQmY7OztBQUNBSCxJQUFBQSxZQUFZLEtBQUssQ0FBakIsR0FBcUJPLFVBQVUsRUFBL0IsR0FBb0NFLFlBQVksRUFBaEQ7QUFDQTs7QUFDREwsRUFBQUEsS0FBSztBQUNMLENBdEREOztBQXdEQUwsUUFBUSxJQUVSOztBQUNBdkcsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DK0csZ0JBQW5DLENBQW9ELE9BQXBELEVBQTZELFlBQU07QUFDbEU3RSxFQUFBQSxvREFBTztBQUNQb0UsRUFBQUEsUUFBUTtBQUNSLENBSEQ7QUFLQSxJQUFNbkcsT0FBTyxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWhCO0FBQ0EsSUFBTUksVUFBVSxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsc0JBQXZCLENBQW5CO0FBQ0EsSUFBTUssT0FBTyxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWhCO0FBQ0EsSUFBTU0sU0FBUyxHQUFHUCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQWxCO0FBQ0EsSUFBTU8sU0FBUyxHQUFHUixRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQWxCO0FBQ0EsSUFBTWlILEtBQUssR0FBR2xILFFBQVEsQ0FBQzJCLGdCQUFULENBQTBCLFFBQTFCLENBQWQ7QUFDQSxJQUFNd0YsV0FBVyxHQUFHbkgsUUFBUSxDQUFDMkIsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBcEI7QUFFQXZCLE9BQU8sQ0FBQzRHLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDM0UsK0NBQWxDO0FBQ0FoQyxVQUFVLENBQUMyRyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQzNFLCtDQUFyQztBQUNBL0IsT0FBTyxDQUFDMEcsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MzRSwrQ0FBbEM7QUFDQTlCLFNBQVMsQ0FBQ3lHLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DM0UsK0NBQXBDO0FBQ0E3QixTQUFTLENBQUN3RyxnQkFBVixDQUEyQixPQUEzQixFQUFvQzNFLCtDQUFwQztBQUdBNkUsS0FBSyxDQUFDakcsT0FBTixDQUFjLFVBQUNtRCxJQUFEO0FBQUEsU0FBVUEsSUFBSSxDQUFDNEMsZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBbUNJLFNBQW5DLENBQVY7QUFBQSxDQUFkO0FBQ0FELFdBQVcsQ0FBQ2xHLE9BQVosQ0FBb0IsVUFBQ29HLElBQUQ7QUFBQSxTQUFVQSxJQUFJLENBQUNMLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DSSxTQUFuQyxDQUFWO0FBQUEsQ0FBcEI7QUFDQUQsV0FBVyxDQUFDbEcsT0FBWixDQUFvQixVQUFDb0csSUFBRDtBQUFBLFNBQVVBLElBQUksQ0FBQ0wsZ0JBQUwsQ0FBc0IsVUFBdEIsRUFBa0NNLFFBQWxDLENBQVY7QUFBQSxDQUFwQjtBQUNBSCxXQUFXLENBQUNsRyxPQUFaLENBQW9CLFVBQUNvRyxJQUFEO0FBQUEsU0FBVUEsSUFBSSxDQUFDTCxnQkFBTCxDQUFzQixXQUF0QixFQUFtQ08sU0FBbkMsQ0FBVjtBQUFBLENBQXBCO0FBQ0FKLFdBQVcsQ0FBQ2xHLE9BQVosQ0FBb0IsVUFBQ29HLElBQUQ7QUFBQSxTQUFVQSxJQUFJLENBQUNMLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DUSxTQUFuQyxDQUFWO0FBQUEsQ0FBcEI7QUFDQUwsV0FBVyxDQUFDbEcsT0FBWixDQUFvQixVQUFDb0csSUFBRDtBQUFBLFNBQVVBLElBQUksQ0FBQ0wsZ0JBQUwsQ0FBc0IsTUFBdEIsRUFBOEJTLFFBQTlCLENBQVY7QUFBQSxDQUFwQjtBQUVBLElBQUlDLFdBQUo7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsSUFBSUMsaUJBQUo7QUFFQVYsS0FBSyxDQUFDakcsT0FBTixDQUFjLFVBQUNtRCxJQUFEO0FBQUEsU0FDYkEsSUFBSSxDQUFDNEMsZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBbUMsVUFBQzFFLENBQUQsRUFBTztBQUN6Q3FGLElBQUFBLFNBQVMsR0FBR3JGLENBQUMsQ0FBQ0MsTUFBRixDQUFTc0YsT0FBVCxDQUFpQjdDLEtBQTdCO0FBQ0E4QyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUosU0FBWjtBQUNBLEdBSEQsQ0FEYTtBQUFBLENBQWQ7O0FBT0EsU0FBU1AsU0FBVCxHQUFzQjtBQUNwQlUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUNERCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FMLEVBQUFBLFdBQVcsR0FBRyxJQUFkO0FBQ0FFLEVBQUFBLGlCQUFpQixHQUFHLEtBQUtJLFVBQUwsQ0FBZ0JwRixNQUFwQztBQUNBa0YsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlMLFdBQVosRUFBeUJFLGlCQUF6QjtBQUNBOztBQUFBOztBQUVELFNBQVNOLFFBQVQsQ0FBbUJoRixDQUFuQixFQUFzQjtBQUNyQkEsRUFBQUEsQ0FBQyxDQUFDMkYsY0FBRjtBQUNBOztBQUFBOztBQUVELFNBQVNWLFNBQVQsQ0FBb0JqRixDQUFwQixFQUF1QjtBQUN0QkEsRUFBQUEsQ0FBQyxDQUFDMkYsY0FBRjtBQUNBOztBQUFBOztBQUVELFNBQVNSLFFBQVQsR0FBcUI7QUFDbkJLLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDRDs7QUFBQTs7QUFFRCxTQUFTUCxTQUFULEdBQXNCO0FBQ3JCTSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaO0FBQ0E7O0FBQUEsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqLyBcbi8vIFNlbGVjdGluZyBlbGVtZW50c1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpOyBcbmNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7IFxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTsgIFxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7IFxuY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGVzaGlwQ29udGFpbmVyJyk7XG5jb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXJDb250YWluZXInKTtcbmNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmVDb250YWluZXInKTtcbmNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXN0cm95ZXJDb250YWluZXInKTtcblxuY29uc3QgcmVuZGVyID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdC8vIENyZWF0aW5nIHR3byBncmlkcyBmb3IgZGlzcGxheWluZyBib2FyZHNcblx0Y29uc3QgZ3JpZDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdncmlkJyk7XG5cdGdyaWQxLmNsYXNzTmFtZSA9ICdncmlkMSc7XG5cdGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ3JpZCcpO1xuXHRncmlkMi5jbGFzc05hbWUgPSAnZ3JpZDInO1xuXG5cdGJvYXJkMS5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMSc7IFxuXHRcdGRpdi50ZXh0Q29udGVudCA9IGk7IFxuXHRcdF9fYSA9PT0gJ3NoaXAnID8gZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnIDogbnVsbDsgXG5cdFx0Z3JpZDEuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMSk7XG5cdH0pO1xuXG5cdGJvYXJkMi5ib2FyZC5mb3JFYWNoKChfX2EsIGkpID0+IHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NOYW1lID0gJ2NlbGxzMic7ICBcblx0XHRkaXYudGV4dENvbnRlbnQgPSBpO1xuXHRcdF9fYSA9PT0gJ3NoaXAnID8gZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnIDogbnVsbDsgXG5cdFx0Z3JpZDIuYXBwZW5kKGRpdik7XG5cdFx0Y29udGFpbmVyLmFwcGVuZChncmlkMik7XG5cdH0pO1xufTtcblxuY29uc3QgbWFya1Nwb3RzID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG5cdGNvbnN0IGNvbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJyk7XG5cdGNvbnN0IHBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsczEnKTtcblxuXHRib2FyZDEuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFxuXHRcdGVsZW1lbnQgPT09ICdtaXNzZWQnID8gKGNvbXBbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmF5JykgOiBudWxsOyBcblx0XHRlbGVtZW50ID09PSAnaGl0JyA/IChjb21wW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xuXG5cdGJvYXJkMi5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG5cdFx0XG5cdFx0ZWxlbWVudCA9PT0gJ21pc3NlZCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JheScpIDogbnVsbDsgXG5cdFx0ZWxlbWVudCA9PT0gJ2hpdCcgPyAocGxheWVyW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snKSA6IG51bGw7XG5cdH0pO1xufTsgXG5cbmNvbnN0IHNob3dNb2RhbCA9IChpbnB1dCkgPT4geyBcblx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpOyBcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTsgXG5cdHRleHQudGV4dENvbnRlbnQgPSBpbnB1dDtcbn07IFxuXG5jb25zdCByZXN0YXJ0ID0gKCkgPT4geyBcblx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnOyBcbiAgbW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpOyBcblx0Y29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWJsdXJyZWQnKTtcbn0gXG5cbmNvbnN0IHJvdGF0ZSA9IChlKSA9PiB7IFxuXHRpZihlLnRhcmdldC5jbGFzc05hbWUgPT09ICdjYXJyaWVyJylcblx0Y2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKGBjYXJyaWVyQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2JhdHRsZXNoaXAnKVxuXHRiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoYGJhdHRsZXNoaXBDb250YWluZXItaG9yaXpvbnRhbGApOyBcblx0aWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSAnY3J1aXNlcicpXG5cdGNydWlzZXIuY2xhc3NMaXN0LnRvZ2dsZShgY3J1aXNlckNvbnRhaW5lci1ob3Jpem9udGFsYCk7IFxuXHRpZihlLnRhcmdldC5jbGFzc05hbWUgPT09ICdzdWJtYXJpbmUnKVxuXHRzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZShgc3VibWFyaW5lQ29udGFpbmVyLWhvcml6b250YWxgKTsgXG5cdGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2Rlc3Ryb3llcicpXG5cdGRlc3Ryb3llci5jbGFzc0xpc3QudG9nZ2xlKGBkZXN0cm95ZXJDb250YWluZXItaG9yaXpvbnRhbGApO1xufVxuXG5leHBvcnQgeyByZW5kZXIsIG1hcmtTcG90cywgc2hvd01vZGFsLCByZXN0YXJ0LCByb3RhdGUgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuLy8gRnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gYm9hcmQsIGFuZCByZWNlaXZlcyBhdHRhY2tzLCBhbmQga2VlcGluZyB0cmFjayBvZiBtaXNzZWQgc2hvdHNcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0Y29uc3QgYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXG5cdGNvbnN0IGNhcnJpZXIgPSBTaGlwKCk7XG5cdGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCk7XG5cdGNvbnN0IGNydWlzZXIgPSBTaGlwKCk7XG5cdGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoKTtcblx0Y29uc3QgZGVzdHJveWVyID0gU2hpcCgpO1xuXG5cdGNvbnN0IGNyZWF0ZVNoaXAgPSBbXG5cdFx0Y2Fycmllci5zaGlwQ29vcmQsXG5cdFx0YmF0dGxlc2hpcC5zaGlwQ29vcmQsXG5cdFx0Y3J1aXNlci5zaGlwQ29vcmQsXG5cdFx0c3VibWFyaW5lLnNoaXBDb29yZCxcblx0XHRkZXN0cm95ZXIuc2hpcENvb3JkXG5cdF07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgYXR0YWNrIGhpdCBhIHNoaXBcblx0Ly8gRXhjbHVkZWQgJ21pc3NlZCdcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2spID0+IHtcblx0XHRpZiAoYm9hcmRbYXR0YWNrXSA9PT0gJ3NoaXAnKSB7XG5cdFx0XHRib2FyZFthdHRhY2tdID0gJ2hpdCc7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblx0XHRcdHJlY2VpdmVBdHRhY2tIZWxwZXIoYXR0YWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym9hcmRbYXR0YWNrXSA9ICdtaXNzZWQnO1xuXHRcdH1cblx0fTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuXHQvLyBGaWx0ZXJpbmcgYm9hcmQgYXJyYXksIGFuZCBjaGVja2luZyB3aGV0aGVyIDE3IHBvc2l0aW9ucyBoYXZlIGJlZW4gaGl0XG5cdGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYXJyID0gYm9hcmQuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAnaGl0Jyk7XG5cdFx0aWYgKGFyci5sZW5ndGggPj0gMTcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb24gdGhhdCBoZWxwcyBhbGxvY2F0ZSBhdHRhY2sgdG8gYXBwcm9wcmlhdGUgc2hpcFxuXHRjb25zdCByZWNlaXZlQXR0YWNrSGVscGVyID0gKGF0dGFjaykgPT4ge1xuXHRcdGNvbnN0IGZpbmRBcnIgPSBjcmVhdGVTaGlwLmZpbHRlcigoY29yKSA9PiBjb3IuaW5jbHVkZXMoYXR0YWNrKSkuZmxhdCgpO1xuXG5cdFx0Y29uc3QgY2hlY2tBcnIgPSBmaW5kQXJyLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrQ2FycmllciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cdFx0Y29uc3QgY2hlY2tCYXR0bGVzaGlwID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0NydWlzZXIgPSBjcmVhdGVTaGlwWzBdLnNvcnQoKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGNoZWNrU3VibWFyaW5lID0gY3JlYXRlU2hpcFswXS5zb3J0KCkudG9TdHJpbmcoKTtcblx0XHRjb25zdCBjaGVja0Rlc3Ryb3llciA9IGNyZWF0ZVNoaXBbMF0uc29ydCgpLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY2hlY2tBcnIgPT09IGNoZWNrQ2FycmllcikgY2Fycmllci5pc0hpdChhdHRhY2spO1xuXHRcdGVsc2UgaWYgKGNoZWNrQXJyID09PSBjaGVja0JhdHRsZXNoaXApIGJhdHRsZXNoaXAuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tDcnVpc2VyKSBjcnVpc2VyLmlzSGl0KGF0dGFjayk7XG5cdFx0ZWxzZSBpZiAoY2hlY2tBcnIgPT09IGNoZWNrU3VibWFyaW5lKSBzdWJtYXJpbmUuaXNIaXQoYXR0YWNrKTtcblx0XHRlbHNlIGlmIChjaGVja0FyciA9PT0gY2hlY2tEZXN0cm95ZXIpIGRlc3Ryb3llci5pc0hpdChhdHRhY2spO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgc2luZ2xlIHNoaXAgb24gYm9hcmRcblx0Y29uc3QgZ2VuZXJhdGUgPSAoc2hpcCwgc2hpcDIpID0+IHtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKTtcblx0XHRjb25zdCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbV07XG5cdFx0bGV0IGRpcmVjdGlvbiA9IDA7XG5cdFx0aWYgKHJhbmRvbSA9PT0gMCkgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAocmFuZG9tID09PSAxKSBkaXJlY3Rpb24gPSAxMDtcblx0XHRjb25zdCByYW5kb21TdGFydCA9IE1hdGguYWJzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLmxlbmd0aCAtIHNoaXAuZGlyZWN0aW9uc1swXS5sZW5ndGggKiBkaXJlY3Rpb24pKTtcblxuXHRcdGNvbnN0IGxlZnQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMCk7XG5cdFx0Y29uc3QgcmlnaHQgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiAocmFuZG9tU3RhcnQgKyBpbmRleCkgJSAxMCA9PT0gMTAgLSAxKTtcblx0XHRjb25zdCBub3RBdmFpbGFibGUgPSBjdXJyZW50LnNvbWUoKGluZGV4KSA9PiBib2FyZFtyYW5kb21TdGFydCArIGluZGV4XSA9PT0gJ3NoaXAnKTtcblxuXHRcdGlmICgoIWxlZnQgJiYgIXJpZ2h0ICYmICFub3RBdmFpbGFibGUpIHx8IChsZWZ0ICYmIHJpZ2h0ICYmICFub3RBdmFpbGFibGUgJiYgcmFuZG9tID09PSAxKSlcblx0XHRcdGN1cnJlbnQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRib2FyZFtyYW5kb21TdGFydCArIGVsZW1lbnRdID0gJ3NoaXAnO1xuXHRcdFx0XHRzaGlwMi5wbGFjZUNvb3JkcyhbIHJhbmRvbVN0YXJ0ICsgZWxlbWVudCBdKTtcblx0XHRcdH0pO1xuXHRcdGVsc2UgZ2VuZXJhdGUoc2hpcCwgc2hpcDIpO1xuXHR9O1xuXG5cdC8vIEZ1bmN0aW9uIHRoYXQgcGxhY2VzIGFsbCBmaXZlIGNvbXB1dGVyIHNoaXBzIGF0IG9uY2Vcblx0Y29uc3QgcGxhY2VDb21wdXRlciA9ICgpID0+IHtcblx0XHRnZW5lcmF0ZShjYXJyaWVyLnNoaXBBcnJbMF0sIGNhcnJpZXIpO1xuXHRcdGdlbmVyYXRlKGJhdHRsZXNoaXAuc2hpcEFyclsxXSwgYmF0dGxlc2hpcCk7XG5cdFx0Z2VuZXJhdGUoY3J1aXNlci5zaGlwQXJyWzJdLCBjcnVpc2VyKTtcblx0XHRnZW5lcmF0ZShzdWJtYXJpbmUuc2hpcEFyclszXSwgc3VibWFyaW5lKTtcblx0XHRnZW5lcmF0ZShkZXN0cm95ZXIuc2hpcEFycls0XSwgZGVzdHJveWVyKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU3Vuayxcblx0XHRib2FyZCxcblx0XHRwbGFjZUNvbXB1dGVyLFxuXHRcdGNyZWF0ZVNoaXBcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgUGxheWVyID0gKGdhbWVib2FyZCkgPT4ge1xuXHRjb25zdCBib2FyZFBsYXllciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cdGNvbnN0IGJvYXJkQ29tcHV0ZXIgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMDAgfSwgKF8sIGkpID0+IGkpO1xuXHRjb25zdCBwbGF5ZXJBdHRhY2sgPSAoYXR0YWNrKSA9PiB7XG5cdFx0aWYgKGJvYXJkUGxheWVyW2F0dGFja10gIT09ICdhdHRhY2tlZCcpIHtcblx0XHRcdGJvYXJkUGxheWVyW2F0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdFx0cmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFjayk7XG5cdFx0fVxuXHRcdHJldHVybiAnaWxsZWdhbCBtb3ZlJztcblx0fTtcblxuXHRjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcblx0XHRjb25zdCBib2FyZCA9IGJvYXJkQ29tcHV0ZXIuZmlsdGVyKChzbG90KSA9PiBzbG90ICE9PSAnYXR0YWNrZWQnKTtcblx0XHRjb25zdCByYW5kb21BdHRhY2sgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5sZW5ndGgpXTtcblx0XHRib2FyZENvbXB1dGVyW3JhbmRvbUF0dGFja10gPSAnYXR0YWNrZWQnO1xuXHRcdGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbUF0dGFjayk7XG5cdFx0cmV0dXJuIHJhbmRvbUF0dGFjaztcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXllckF0dGFjayxcblx0XHRjb21wdXRlckF0dGFjayxcblx0XHRib2FyZENvbXB1dGVyLFxuXHRcdGJvYXJkUGxheWVyXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cbi8qXG5jb25zdCBjID0gKHNoaXApID0+IHtcblx0aWYgKHNoaXAgPT09ICdDYXJyaWVyJykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdGlmIChzaGlwID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMyB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcblx0fVxuXHRpZiAoc2hpcCA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyIH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignU3BlY2lmeSBzaGlwJyk7XG59O1xuKi9cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgc2hpcCBvYmplY3RzXG5mdW5jdGlvbiBTaGlwKCkge1xuXHRjb25zdCB3aWR0aCA9IDEwO1xuICBcblx0Ly8gQXJyYXkgdGhhdCBjb250YWlucyBzaGlwcywgYW5kIHRoZWlyIGxlbmd0aHNcblx0Y29uc3Qgc2hpcEFyciA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnY2FycmllcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiwgMywgNCBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIsIHdpZHRoICogMywgd2lkdGggKiA0IF0gXVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2JhdHRsZXNoaXAnLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEsIDIsIDMgXSwgWyAwLCB3aWR0aCwgd2lkdGggKiAyLCB3aWR0aCAqIDMgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnY3J1aXNlcicsXG5cdFx0XHRkaXJlY3Rpb25zOiBbIFsgMCwgMSwgMiBdLCBbIDAsIHdpZHRoLCB3aWR0aCAqIDIgXSBdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnc3VibWFyaW5lJyxcblx0XHRcdGRpcmVjdGlvbnM6IFsgWyAwLCAxLCAyIF0sIFsgMCwgd2lkdGgsIHdpZHRoICogMiBdIF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdkZXN0cm95ZXInLFxuXHRcdFx0ZGlyZWN0aW9uczogWyBbIDAsIDEgXSwgWyAwLCB3aWR0aCBdIF1cblx0XHR9XG5cdF07XG5cblx0Y29uc3Qgc2hpcENvb3JkID0gW107XG4gIC8vIE1hcHMgY29vcmRzIHRvIHNoaXBDb29yZCBhcnJheS4gVG8gYmUgdXNlZCBmb3IgY2hlY2tpbmcgaGl0cywgYW5kIHN1bmsuXG5cdGNvbnN0IHBsYWNlQ29vcmRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG5cdFx0Y29vcmRpbmF0ZXMubWFwKChjb29yZGluYXRlKSA9PiBzaGlwQ29vcmQucHVzaChjb29yZGluYXRlKSk7XG5cdH07XG5cblx0Ly8gRnVuY3Rpb25zIHRoYXQgcmVtb3ZlcyBkZXN0cm95ZWQgc2hpcFxuXHRjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmQuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09ICdoaXQnKTtcblxuXHQvLyBGdW5jdGlvbiB0aGF0IGRhbWFnZXMgc2hpcCBwb3NpdGlvbnNcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cblx0Y29uc3QgaXNIaXQgPSAoaGl0KSA9PiAoc2hpcENvb3JkW2hpdF0gPSAnaGl0Jyk7XG5cblx0cmV0dXJuIHsgc2hpcENvb3JkLCBpc1N1bmssIGlzSGl0LCBwbGFjZUNvb3Jkcywgc2hpcEFyciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlciwgbWFya1Nwb3RzLCBzaG93TW9kYWwsIHJlc3RhcnQsIHJvdGF0ZSB9IGZyb20gJy4vZG9tQ29udHJvbCc7XG5cbi8vIEZ1bmN0aW9uIHRoYXQgY29udHJvbHMgZW50aXJlIGdhbWVMb29wXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcblx0bGV0IGFjdGl2ZVBsYXllciA9IDA7XG5cblx0Ly8gQ3JlYXRpbmcgcGxheWVyIGdhbWVib2FyZHNcblx0Y29uc3QgYm9hcmQxID0gR2FtZWJvYXJkKCk7XG5cdGNvbnN0IGJvYXJkMiA9IEdhbWVib2FyZCgpO1xuXG5cdC8vIENyZWF0aW5nIHBsYXllcnNcblx0Y29uc3QgcGxheWVyMSA9IFBsYXllcihib2FyZDIpO1xuXHRjb25zdCBwbGF5ZXIyID0gUGxheWVyKGJvYXJkMSk7XG5cblx0Ym9hcmQyLnBsYWNlQ29tcHV0ZXIoKTtcblxuXHQvLyBSZW5kZXJpbmcgYm9hcmRzXG5cdHJlbmRlcihib2FyZDEsIGJvYXJkMik7XG5cblx0Ly8gRnVuY3Rpb24gZm9yIHBsYXllciB0dXJuc1xuXHRjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuXHRcdGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xuXHR9O1xuXG5cdC8vIENoZWNraW5nIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXG5cdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdGlmIChib2FyZDIuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ0NvbXB1dGVyIGxvc3QuIFlvdSB3aW4hJyk7XG5cdFx0fSBlbHNlIGlmIChib2FyZDEuYWxsU3VuaygpKSB7XG5cdFx0XHRzaG93TW9kYWwoJ1lvdSBsb3N0ISBUaGUgZW5lbXkgaGFzIGRlZmVhdGVkIHlvdS4nKTtcblx0XHR9IGVsc2UgcGxheSgpO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gbG9vcCB0aGF0IHN3aXRjaGVzIHBsYXllciB0dXJuc1xuXHRmdW5jdGlvbiBwbGF5KCkge1xuXHRcdGNvbnN0IGNvbXB1dGVyID0gWyAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbHMyJykgXTtcblx0XHRjb25zdCBwbGF5ZXJUdXJuID0gKCkgPT4ge1xuXHRcdFx0Y29tcHV0ZXIuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHBsYXllcjEucGxheWVyQXR0YWNrKGkpO1xuXHRcdFx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRcdFx0Y2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcblx0XHRcdHBsYXllcjIuY29tcHV0ZXJBdHRhY2soKTtcblx0XHRcdG1hcmtTcG90cyhib2FyZDIuYm9hcmQsIGJvYXJkMS5ib2FyZCk7XG5cdFx0XHRjaGFuZ2VUdXJuKCk7XG5cdFx0fTtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRhY3RpdmVQbGF5ZXIgPT09IDAgPyBwbGF5ZXJUdXJuKCkgOiBjb21wdXRlclR1cm4oKTtcblx0fVxuXHRjaGVjaygpO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lciB0aGF0IHJlc3RhcnRzIGdhbWUgd2hlbiByZXN0YXJ0IGJ1dHRvbiBwcmVzc2VkXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRyZXN0YXJ0KCk7XG5cdGdhbWVMb29wKCk7XG59KTtcblxuY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJyaWVyQ29udGFpbmVyJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXBDb250YWluZXInKTtcbmNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3J1aXNlckNvbnRhaW5lcicpO1xuY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1hcmluZUNvbnRhaW5lcicpO1xuY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llckNvbnRhaW5lcicpO1xuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcHMnKTtcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGxzMScpO1xuXG5jYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbmJhdHRsZXNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuY3J1aXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG5zdWJtYXJpbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGUpO1xuZGVzdHJveWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTsgXG5cblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpKTtcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KSk7IFxucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKSk7IFxucGxheWVyQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpKTsgXG5wbGF5ZXJCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSkpOyBcbnBsYXllckJvYXJkLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKSk7IFxuXG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgc2hpcEluZGV4OyBcbmxldCBkcmFnZ2VkU2hpcExlbmd0aDtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cblx0c2hpcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuXHRcdHNoaXBJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cdFx0Y29uc29sZS5sb2coc2hpcEluZGV4KTtcblx0fSlcbik7IFxuXG5mdW5jdGlvbiBkcmFnU3RhcnQgKCkgeyAgXG4gIGNvbnNvbGUubG9nKHRoaXMpXG5cdGNvbnNvbGUubG9nKCdkcmFnJyk7XG5cdGRyYWdnZWRTaGlwID0gdGhpczsgXG5cdGRyYWdnZWRTaGlwTGVuZ3RoID0gdGhpcy5jaGlsZE5vZGVzLmxlbmd0aDsgXG5cdGNvbnNvbGUubG9nKGRyYWdnZWRTaGlwLCBkcmFnZ2VkU2hpcExlbmd0aClcbn07XG5cbmZ1bmN0aW9uIGRyYWdPdmVyIChlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn07XG5cbmZ1bmN0aW9uIGRyYWdFbnRlciAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59OyBcblxuZnVuY3Rpb24gZHJhZ0Ryb3AgKCkgeyBcbiAgY29uc29sZS5sb2coJ2Ryb3AnKVxufTsgXG5cbmZ1bmN0aW9uIGRyYWdMZWF2ZSAoKSB7IFxuXHRjb25zb2xlLmxvZygnZHJhZyBsZWF2ZScpO1xufTtcbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0IiwibW9kYWwiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJyZW5kZXIiLCJib2FyZDEiLCJib2FyZDIiLCJncmlkMSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJncmlkMiIsImJvYXJkIiwiZm9yRWFjaCIsIl9fYSIsImkiLCJkaXYiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kIiwibWFya1Nwb3RzIiwiY29tcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIiLCJlbGVtZW50IiwiYmFja2dyb3VuZCIsInNob3dNb2RhbCIsImlucHV0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVzdGFydCIsImlubmVySFRNTCIsInJvdGF0ZSIsImUiLCJ0YXJnZXQiLCJTaGlwIiwiR2FtZWJvYXJkIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImNyZWF0ZVNoaXAiLCJzaGlwQ29vcmQiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrIiwicmVjZWl2ZUF0dGFja0hlbHBlciIsImFsbFN1bmsiLCJhcnIiLCJmaWx0ZXIiLCJmaW5kQXJyIiwiY29yIiwiaW5jbHVkZXMiLCJmbGF0IiwiY2hlY2tBcnIiLCJzb3J0IiwidG9TdHJpbmciLCJjaGVja0NhcnJpZXIiLCJjaGVja0JhdHRsZXNoaXAiLCJjaGVja0NydWlzZXIiLCJjaGVja1N1Ym1hcmluZSIsImNoZWNrRGVzdHJveWVyIiwiaXNIaXQiLCJnZW5lcmF0ZSIsInNoaXAiLCJzaGlwMiIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRpcmVjdGlvbnMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwicmFuZG9tU3RhcnQiLCJhYnMiLCJsZWZ0Iiwic29tZSIsImluZGV4IiwicmlnaHQiLCJub3RBdmFpbGFibGUiLCJwbGFjZUNvb3JkcyIsInBsYWNlQ29tcHV0ZXIiLCJzaGlwQXJyIiwiUGxheWVyIiwiZ2FtZWJvYXJkIiwiYm9hcmRQbGF5ZXIiLCJib2FyZENvbXB1dGVyIiwicGxheWVyQXR0YWNrIiwiY29tcHV0ZXJBdHRhY2siLCJzbG90IiwicmFuZG9tQXR0YWNrIiwid2lkdGgiLCJuYW1lIiwiY29vcmRpbmF0ZXMiLCJtYXAiLCJjb29yZGluYXRlIiwicHVzaCIsImlzU3VuayIsImV2ZXJ5IiwiaGl0IiwiZ2FtZUxvb3AiLCJhY3RpdmVQbGF5ZXIiLCJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm4iLCJjaGVjayIsInBsYXkiLCJjb21wdXRlciIsInBsYXllclR1cm4iLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJUdXJuIiwic2hpcHMiLCJwbGF5ZXJCb2FyZCIsImRyYWdTdGFydCIsImNlbGwiLCJkcmFnT3ZlciIsImRyYWdFbnRlciIsImRyYWdMZWF2ZSIsImRyYWdEcm9wIiwiZHJhZ2dlZFNoaXAiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcExlbmd0aCIsImRhdGFzZXQiLCJjb25zb2xlIiwibG9nIiwiY2hpbGROb2RlcyIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==