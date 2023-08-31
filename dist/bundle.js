/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TicTacToe: () => (/* binding */ TicTacToe)
/* harmony export */ });
class TicTacToe {
  step = false;
  allCellsFull = 0;
  style = localStorage.getItem("style") ?? "light";
  cells = [];
  constructor() {
    this.parent = document.getElementById("parent");
    const ticTacToeDiv = this.createDiv("tictactoeDiv");
    this.parent.appendChild(ticTacToeDiv);
    this.setStyle(this.style);
    this.buttonTopic = this.createButton("buttonTopic", () => this.setStyle(this.style === "light" ? "dark" : "light"));
    ticTacToeDiv.appendChild(this.buttonTopic);
    const playerDiv = this.createDiv("playerDiv");
    ticTacToeDiv.appendChild(playerDiv);
    this.player = this.createDiv("player");
    this.player.innerHTML = "X Turn";
    playerDiv.appendChild(this.player);
    this.comments = this.createDiv("playerP");
    playerDiv.appendChild(this.comments);
    const cellDiv = this.createDiv("cellDiv");
    ticTacToeDiv.appendChild(cellDiv);
    this.createCells(cellDiv);
    this.fullCells = this.cells.filter(cell => cell.classList.contains("full"));
    this.buttonPlayAgain = this.createButton("button", () => this.clearCells());
    ticTacToeDiv.appendChild(this.buttonPlayAgain);
  }
  createDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  }
  createCells(cellsDiv) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = this.createButton("cell full", () => this.onCellPress(cell));
      cellsDiv.appendChild(cell);
      this.cells.push(cell);
    }
    console.log(this.cells);
  }
  createButton(className, onclick) {
    const button = document.createElement("button");
    button.className = className;
    button.onclick = onclick;
    return button;
  }
  setStyle(style) {
    this.style = style;
    localStorage.setItem("style", style);
    if (style === "dark") {
      this.parent.classList.add("dark");
    } else {
      this.parent.classList.remove("dark");
    }
  }
  blockCells(cells) {
    for (const cell of cells) {
      cell.classList.add("cellWait");
    }
  }
  onCellPress(cell) {
    if (!this.step && cell.classList.contains("full")) {
      cell.classList.add("x", "empty", "stepX");
      cell.classList.remove("full");
      this.player.innerHTML = "O Turn";
      console.log("x");
      this.step = true;
    } else if (this.step && cell.classList.contains("full")) {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");
      this.player.innerHTML = "X Turn";
      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait");
      }
      const index = this.cells.indexOf(cell);
      console.log("o");
      this.step = false;
    }
    this.checkDraw();
    this.checkWin();
  }
  checkWinningPositions(winningMark) {
    let winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < winningPositions.length; i++) {
      const [pos1, pos2, pos3] = winningPositions[i];
      if (this.cells[pos1].classList.contains(winningMark) && this.cells[pos2].classList.contains(winningMark) && this.cells[pos3].classList.contains(winningMark)) {
        return true;
      }
    }
    return false;
  }
  checkWin() {
    if (this.checkWinningPositions("x")) {
      this.player.innerHTML = `X Won!`;
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";
      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait", "full");
      }
      console.log("win!!X");
    } else if (this.checkWinningPositions("o")) {
      this.player.innerHTML = "O Won!";
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";
      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait", "full");
      }
      console.log("win!!O");
    }
  }
  checkDraw() {
    for (const cell of this.cells) {
      if (cell.classList.contains("x") || cell.classList.contains("o")) {
        this.allCellsFull++;
        console.log(this.allCellsFull);
        break;
      }
    }
    if (this.allCellsFull === 9) {
      this.player.innerHTML = "Draw!";
      this.comments.innerHTML = "It’s a draw";
      this.parent.classList.add("draw");
    }
  }
  clearCells() {
    for (const cell of this.cells) {
      cell.classList.add("full");
      cell.classList.remove("o", "x", "stepX", "stepO", "empty");
    }
    this.parent.classList.remove("win", "draw");
    this.player.innerHTML = "X Turn";
    this.comments.innerHTML = "";
    this.allCellsFull = 0;
    this.step = false;
    console.log("clear");
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/buttonTopic.svg */ "./img/buttonTopic.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/darkButtonTopic.svg */ "./img/darkButtonTopic.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/empty-block.svg */ "./img/empty-block.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/empty-darkBlock.svg */ "./img/empty-darkBlock.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/full-block-X.svg */ "./img/full-block-X.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/full-darkBlock-X.svg */ "./img/full-darkBlock-X.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/full-block-O.svg */ "./img/full-block-O.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/full-darkBlock-O.svg */ "./img/full-darkBlock-O.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/empty-block-wait.svg */ "./img/empty-block-wait.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/empty-darkBlock-wait.svg */ "./img/empty-darkBlock-wait.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/Button-play-Again.svg */ "./img/Button-play-Again.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../img/darkButton-play-Again.svg */ "./img/darkButton-play-Again.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
    width: 100%;
    height: 100vh;
    margin: 0;
    font-family: cursive;
}

#parent {
    width: 100%;
    height: 100%;
    text-align: -webkit-center;
    display: flex;
    align-items: center;
    justify-content: center;
} 

.dark {
    background-color: black;
}



.tictactoeDiv {
    padding: 30px;
    height: 82%;
}

@media (max-width: 216px) {
    .tictactoeDiv {
        padding: 15px;
    }
}

.buttonTopic {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 11%;
    height: 7%;
    outline: none;
    cursor: pointer;
    border: none;
    background-color: white;
    
}

.dark .buttonTopic {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
    background-color: black;
}

.playerDiv {
    width: 41vh;
    padding: 2% 0;
    text-align: center;
}

.player {
    font-size: 7vh;
}

.dark .player {
    color: rgba(227, 227, 227, 1);
}

.win .player {
    color: rgba(70, 163, 255, 1);
}

.playerP {
    color: rgba(173, 173, 173, 1);
    font-size: 4vh;
    height: 7vh;
}

.cellDiv {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
    max-height: 60vh;
}

@media (max-width: 328px) {
    .cellDiv {
        gap: 6px;
        width: 86vw;
    }
}
@media (max-height: 463px) {
    .cellDiv {
        gap: 6px;
    }
}

.cell {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    margin: 0;
    outline: none;
    cursor: pointer;
    border: none;
    background-color: white;
}

.dark .cell {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
    background-color: black;
}

.stepX {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}

.dark .stepX {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
}

.stepO {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
}

.dark .stepO {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_7___});
}

.cellWait {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_8___});
}

.dark .cellWait {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_9___});
}

.button {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_10___});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 8%;
    padding-top: 0px;
    margin-top: 5vh;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: white;
    display: none;
}

.dark .button {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_11___});
    background-color: black;
}

.win .button {
    display: block;
}

.draw .button {
    display: block;
}

@media (max-width: 360px) and (min-height: 465px) {
    .tictactoeDiv {
        padding: 10px;
    }

    .playerDiv {
        width: 75vw;
    }

    .player {
        font-size: 11vw;
    }

    .playerP {
        font-size: 4vw;
    }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,aAAa;IACb,SAAS;IACT,oBAAoB;AACxB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,0BAA0B;IAC1B,aAAa;IACb,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,uBAAuB;AAC3B;;;;AAIA;IACI,aAAa;IACb,WAAW;AACf;;AAEA;IACI;QACI,aAAa;IACjB;AACJ;;AAEA;IACI,yDAA2C;IAC3C,0BAA0B;IAC1B,4BAA4B;IAC5B,UAAU;IACV,UAAU;IACV,aAAa;IACb,eAAe;IACf,YAAY;IACZ,uBAAuB;;AAE3B;;AAEA;IACI,yDAA+C;IAC/C,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,6BAA6B;IAC7B,cAAc;IACd,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,kCAAkC;IAClC,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI;QACI,QAAQ;QACR,WAAW;IACf;AACJ;AACA;IACI;QACI,QAAQ;IACZ;AACJ;;AAEA;IACI,yDAA2C;IAC3C,0BAA0B;IAC1B,4BAA4B;IAC5B,WAAW;IACX,SAAS;IACT,oBAAoB;IACpB,SAAS;IACT,aAAa;IACb,eAAe;IACf,YAAY;IACZ,uBAAuB;AAC3B;;AAEA;IACI,yDAA+C;IAC/C,uBAAuB;AAC3B;;AAEA;IACI,yDAA4C;AAChD;;AAEA;IACI,yDAAgD;AACpD;;AAEA;IACI,yDAA4C;AAChD;;AAEA;IACI,yDAAgD;AACpD;;AAEA;IACI,yDAAgD;AACpD;;AAEA;IACI,yDAAoD;AACxD;;AAEA;IACI,0DAAiD;IACjD,0BAA0B;IAC1B,4BAA4B;IAC5B,WAAW;IACX,UAAU;IACV,gBAAgB;IAChB,eAAe;IACf,eAAe;IACf,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,0DAAqD;IACrD,uBAAuB;AAC3B;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI;QACI,aAAa;IACjB;;IAEA;QACI,WAAW;IACf;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,cAAc;IAClB;AACJ","sourcesContent":["body {\r\n    width: 100%;\r\n    height: 100vh;\r\n    margin: 0;\r\n    font-family: cursive;\r\n}\r\n\r\n#parent {\r\n    width: 100%;\r\n    height: 100%;\r\n    text-align: -webkit-center;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n} \r\n\r\n.dark {\r\n    background-color: black;\r\n}\r\n\r\n\r\n\r\n.tictactoeDiv {\r\n    padding: 30px;\r\n    height: 82%;\r\n}\r\n\r\n@media (max-width: 216px) {\r\n    .tictactoeDiv {\r\n        padding: 15px;\r\n    }\r\n}\r\n\r\n.buttonTopic {\r\n    background-image: url(/img/buttonTopic.svg);\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    width: 11%;\r\n    height: 7%;\r\n    outline: none;\r\n    cursor: pointer;\r\n    border: none;\r\n    background-color: white;\r\n    \r\n}\r\n\r\n.dark .buttonTopic {\r\n    background-image: url(/img/darkButtonTopic.svg);\r\n    background-color: black;\r\n}\r\n\r\n.playerDiv {\r\n    width: 41vh;\r\n    padding: 2% 0;\r\n    text-align: center;\r\n}\r\n\r\n.player {\r\n    font-size: 7vh;\r\n}\r\n\r\n.dark .player {\r\n    color: rgba(227, 227, 227, 1);\r\n}\r\n\r\n.win .player {\r\n    color: rgba(70, 163, 255, 1);\r\n}\r\n\r\n.playerP {\r\n    color: rgba(173, 173, 173, 1);\r\n    font-size: 4vh;\r\n    height: 7vh;\r\n}\r\n\r\n.cellDiv {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    grid-template-rows: repeat(3, 1fr);\r\n    gap: 15px;\r\n    max-height: 60vh;\r\n}\r\n\r\n@media (max-width: 328px) {\r\n    .cellDiv {\r\n        gap: 6px;\r\n        width: 86vw;\r\n    }\r\n}\r\n@media (max-height: 463px) {\r\n    .cellDiv {\r\n        gap: 6px;\r\n    }\r\n}\r\n\r\n.cell {\r\n    background-image: url(/img/empty-block.svg);\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    width: 100%;\r\n    height: 0;\r\n    padding-bottom: 100%;\r\n    margin: 0;\r\n    outline: none;\r\n    cursor: pointer;\r\n    border: none;\r\n    background-color: white;\r\n}\r\n\r\n.dark .cell {\r\n    background-image: url(/img/empty-darkBlock.svg);\r\n    background-color: black;\r\n}\r\n\r\n.stepX {\r\n    background-image: url(/img/full-block-X.svg);\r\n}\r\n\r\n.dark .stepX {\r\n    background-image: url(/img/full-darkBlock-X.svg);\r\n}\r\n\r\n.stepO {\r\n    background-image: url(/img/full-block-O.svg);\r\n}\r\n\r\n.dark .stepO {\r\n    background-image: url(/img/full-darkBlock-O.svg);\r\n}\r\n\r\n.cellWait {\r\n    background-image: url(/img/empty-block-wait.svg);\r\n}\r\n\r\n.dark .cellWait {\r\n    background-image: url(/img/empty-darkBlock-wait.svg);\r\n}\r\n\r\n.button {\r\n    background-image: url(/img/Button-play-Again.svg);\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    width: 100%;\r\n    height: 8%;\r\n    padding-top: 0px;\r\n    margin-top: 5vh;\r\n    cursor: pointer;\r\n    outline: none;\r\n    border: none;\r\n    background-color: white;\r\n    display: none;\r\n}\r\n\r\n.dark .button {\r\n    background-image: url(/img/darkButton-play-Again.svg);\r\n    background-color: black;\r\n}\r\n\r\n.win .button {\r\n    display: block;\r\n}\r\n\r\n.draw .button {\r\n    display: block;\r\n}\r\n\r\n@media (max-width: 360px) and (min-height: 465px) {\r\n    .tictactoeDiv {\r\n        padding: 10px;\r\n    }\r\n\r\n    .playerDiv {\r\n        width: 75vw;\r\n    }\r\n\r\n    .player {\r\n        font-size: 11vw;\r\n    }\r\n\r\n    .playerP {\r\n        font-size: 4vw;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./img/Button-play-Again.svg":
/*!***********************************!*\
  !*** ./img/Button-play-Again.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "15d251d7d6acfcb24e32.svg";

/***/ }),

/***/ "./img/buttonTopic.svg":
/*!*****************************!*\
  !*** ./img/buttonTopic.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "315d7fca3ebba70968a0.svg";

/***/ }),

/***/ "./img/darkButton-play-Again.svg":
/*!***************************************!*\
  !*** ./img/darkButton-play-Again.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bd02c3bca46f30772bd9.svg";

/***/ }),

/***/ "./img/darkButtonTopic.svg":
/*!*********************************!*\
  !*** ./img/darkButtonTopic.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6ac868e2f77dffeebe67.svg";

/***/ }),

/***/ "./img/empty-block-wait.svg":
/*!**********************************!*\
  !*** ./img/empty-block-wait.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bb1320e72ee510a5f94e.svg";

/***/ }),

/***/ "./img/empty-block.svg":
/*!*****************************!*\
  !*** ./img/empty-block.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9d95b864346417bd61fc.svg";

/***/ }),

/***/ "./img/empty-darkBlock-wait.svg":
/*!**************************************!*\
  !*** ./img/empty-darkBlock-wait.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d6cea2bf482d33a7b19b.svg";

/***/ }),

/***/ "./img/empty-darkBlock.svg":
/*!*********************************!*\
  !*** ./img/empty-darkBlock.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "51b1aa8469a4fe00bd17.svg";

/***/ }),

/***/ "./img/full-block-O.svg":
/*!******************************!*\
  !*** ./img/full-block-O.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "27ed9b3e753559527238.svg";

/***/ }),

/***/ "./img/full-block-X.svg":
/*!******************************!*\
  !*** ./img/full-block-X.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "83b52b66e97ed5124cbe.svg";

/***/ }),

/***/ "./img/full-darkBlock-O.svg":
/*!**********************************!*\
  !*** ./img/full-darkBlock-O.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "519cd245148c5d666717.svg";

/***/ }),

/***/ "./img/full-darkBlock-X.svg":
/*!**********************************!*\
  !*** ./img/full-darkBlock-X.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a7809a4dc45b323adb40.svg";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


new _game__WEBPACK_IMPORTED_MODULE_0__.TicTacToe();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map