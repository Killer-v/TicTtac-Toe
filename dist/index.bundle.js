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
    this.buttonTopic = this.createButton("buttonTopic", () =>
      this.setStyle(this.style === "light" ? "dark" : "light")
    );
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

    this.fullCells = this.cells.filter((cell) =>
      cell.classList.contains("full")
    );

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
    let winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [pos1, pos2, pos3] = winningPositions[i];

      if (
        this.cells[pos1].classList.contains(winningMark) &&
        this.cells[pos2].classList.contains(winningMark) &&
        this.cells[pos3].classList.contains(winningMark)
      ) {
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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


new _game__WEBPACK_IMPORTED_MODULE_0__.TicTacToe();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDZCQUE2QjtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xNQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1DOztBQUVuQyxJQUFJLDRDQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGljdHRhYy10b2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly90aWN0dGFjLXRvZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aWN0dGFjLXRvZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGljdHRhYy10b2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aWN0dGFjLXRvZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpY3R0YWMtdG9lLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRpY1RhY1RvZSB7XG4gIHN0ZXAgPSBmYWxzZTtcbiAgYWxsQ2VsbHNGdWxsID0gMDtcbiAgc3R5bGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0eWxlXCIpID8/IFwibGlnaHRcIjtcbiAgY2VsbHMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFyZW50XCIpO1xuXG4gICAgY29uc3QgdGljVGFjVG9lRGl2ID0gdGhpcy5jcmVhdGVEaXYoXCJ0aWN0YWN0b2VEaXZcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGljVGFjVG9lRGl2KTtcblxuICAgIHRoaXMuc2V0U3R5bGUodGhpcy5zdHlsZSk7XG4gICAgdGhpcy5idXR0b25Ub3BpYyA9IHRoaXMuY3JlYXRlQnV0dG9uKFwiYnV0dG9uVG9waWNcIiwgKCkgPT5cbiAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5zdHlsZSA9PT0gXCJsaWdodFwiID8gXCJkYXJrXCIgOiBcImxpZ2h0XCIpXG4gICAgKTtcbiAgICB0aWNUYWNUb2VEaXYuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25Ub3BpYyk7XG5cbiAgICBjb25zdCBwbGF5ZXJEaXYgPSB0aGlzLmNyZWF0ZURpdihcInBsYXllckRpdlwiKTtcbiAgICB0aWNUYWNUb2VEaXYuYXBwZW5kQ2hpbGQocGxheWVyRGl2KTtcblxuICAgIHRoaXMucGxheWVyID0gdGhpcy5jcmVhdGVEaXYoXCJwbGF5ZXJcIik7XG4gICAgdGhpcy5wbGF5ZXIuaW5uZXJIVE1MID0gXCJYIFR1cm5cIjtcbiAgICBwbGF5ZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5wbGF5ZXIpO1xuXG4gICAgdGhpcy5jb21tZW50cyA9IHRoaXMuY3JlYXRlRGl2KFwicGxheWVyUFwiKTtcbiAgICBwbGF5ZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5jb21tZW50cyk7XG5cbiAgICBjb25zdCBjZWxsRGl2ID0gdGhpcy5jcmVhdGVEaXYoXCJjZWxsRGl2XCIpO1xuICAgIHRpY1RhY1RvZURpdi5hcHBlbmRDaGlsZChjZWxsRGl2KTtcblxuICAgIHRoaXMuY3JlYXRlQ2VsbHMoY2VsbERpdik7XG5cbiAgICB0aGlzLmZ1bGxDZWxscyA9IHRoaXMuY2VsbHMuZmlsdGVyKChjZWxsKSA9PlxuICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmdWxsXCIpXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uUGxheUFnYWluID0gdGhpcy5jcmVhdGVCdXR0b24oXCJidXR0b25cIiwgKCkgPT4gdGhpcy5jbGVhckNlbGxzKCkpO1xuICAgIHRpY1RhY1RvZURpdi5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvblBsYXlBZ2Fpbik7XG4gIH1cblxuICBjcmVhdGVEaXYoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIGNyZWF0ZUNlbGxzKGNlbGxzRGl2KSB7XG4gICAgZm9yIChsZXQgY2VsbE51bSA9IDA7IGNlbGxOdW0gPCA5OyBjZWxsTnVtKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcImNlbGwgZnVsbFwiLCAoKSA9PiB0aGlzLm9uQ2VsbFByZXNzKGNlbGwpKTtcblxuICAgICAgY2VsbHNEaXYuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5jZWxscyk7XG4gIH1cblxuICBjcmVhdGVCdXR0b24oY2xhc3NOYW1lLCBvbmNsaWNrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBvbmNsaWNrO1xuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIHNldFN0eWxlKHN0eWxlKSB7XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3R5bGVcIiwgc3R5bGUpO1xuXG4gICAgaWYgKHN0eWxlID09PSBcImRhcmtcIikge1xuICAgICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZChcImRhcmtcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgIH1cbiAgfVxuXG4gIGJsb2NrQ2VsbHMoY2VsbHMpIHtcbiAgICBmb3IgKGNvbnN0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxXYWl0XCIpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbFByZXNzKGNlbGwpIHtcbiAgICBpZiAoIXRoaXMuc3RlcCAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImZ1bGxcIikpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInhcIiwgXCJlbXB0eVwiLCBcInN0ZXBYXCIpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZnVsbFwiKTtcbiAgICAgIHRoaXMucGxheWVyLmlubmVySFRNTCA9IFwiTyBUdXJuXCI7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwieFwiKTtcbiAgICAgIHRoaXMuc3RlcCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0ZXAgJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmdWxsXCIpKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJvXCIsIFwiZW1wdHlcIiwgXCJzdGVwT1wiKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImNlbGxXYWl0XCIsIFwiZnVsbFwiKTtcblxuICAgICAgdGhpcy5wbGF5ZXIuaW5uZXJIVE1MID0gXCJYIFR1cm5cIjtcblxuICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuZnVsbENlbGxzKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImNlbGxXYWl0XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZihjZWxsKTtcblxuICAgICAgY29uc29sZS5sb2coXCJvXCIpO1xuICAgICAgdGhpcy5zdGVwID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja0RyYXcoKTtcbiAgICB0aGlzLmNoZWNrV2luKCk7XG4gIH1cblxuICBjaGVja1dpbm5pbmdQb3NpdGlvbnMod2lubmluZ01hcmspIHtcbiAgICBsZXQgd2lubmluZ1Bvc2l0aW9ucyA9IFtcbiAgICAgIFswLCAxLCAyXSxcbiAgICAgIFszLCA0LCA1XSxcbiAgICAgIFs2LCA3LCA4XSxcbiAgICAgIFswLCAzLCA2XSxcbiAgICAgIFsxLCA0LCA3XSxcbiAgICAgIFsyLCA1LCA4XSxcbiAgICAgIFswLCA0LCA4XSxcbiAgICAgIFsyLCA0LCA2XSxcbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5uaW5nUG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBbcG9zMSwgcG9zMiwgcG9zM10gPSB3aW5uaW5nUG9zaXRpb25zW2ldO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbcG9zMV0uY2xhc3NMaXN0LmNvbnRhaW5zKHdpbm5pbmdNYXJrKSAmJlxuICAgICAgICB0aGlzLmNlbGxzW3BvczJdLmNsYXNzTGlzdC5jb250YWlucyh3aW5uaW5nTWFyaykgJiZcbiAgICAgICAgdGhpcy5jZWxsc1twb3MzXS5jbGFzc0xpc3QuY29udGFpbnMod2lubmluZ01hcmspXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2hlY2tXaW4oKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tXaW5uaW5nUG9zaXRpb25zKFwieFwiKSkge1xuICAgICAgdGhpcy5wbGF5ZXIuaW5uZXJIVE1MID0gYFggV29uIWA7XG4gICAgICB0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKFwid2luXCIpO1xuICAgICAgdGhpcy5jb21tZW50cy5pbm5lckhUTUwgPSBcIkNvbmdhcnR1bGF0aW9uc1wiO1xuXG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdGhpcy5mdWxsQ2VsbHMpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiY2VsbFdhaXRcIiwgXCJmdWxsXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhcIndpbiEhWFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXaW5uaW5nUG9zaXRpb25zKFwib1wiKSkge1xuICAgICAgdGhpcy5wbGF5ZXIuaW5uZXJIVE1MID0gXCJPIFdvbiFcIjtcbiAgICAgIHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQoXCJ3aW5cIik7XG4gICAgICB0aGlzLmNvbW1lbnRzLmlubmVySFRNTCA9IFwiQ29uZ2FydHVsYXRpb25zXCI7XG5cbiAgICAgIGZvciAoY29uc3QgY2VsbCBvZiB0aGlzLmZ1bGxDZWxscykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJjZWxsV2FpdFwiLCBcImZ1bGxcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKFwid2luISFPXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRHJhdygpIHtcbiAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdGhpcy5jZWxscykge1xuICAgICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwieFwiKSB8fCBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm9cIikpIHtcbiAgICAgICAgdGhpcy5hbGxDZWxsc0Z1bGwrKztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxDZWxsc0Z1bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbGxDZWxsc0Z1bGwgPT09IDkpIHtcbiAgICAgIHRoaXMucGxheWVyLmlubmVySFRNTCA9IFwiRHJhdyFcIjtcbiAgICAgIHRoaXMuY29tbWVudHMuaW5uZXJIVE1MID0gXCJJdOKAmXMgYSBkcmF3XCI7XG4gICAgICB0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKFwiZHJhd1wiKTtcbiAgICB9XG4gIH1cblxuICBjbGVhckNlbGxzKCkge1xuICAgIGZvciAoY29uc3QgY2VsbCBvZiB0aGlzLmNlbGxzKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJmdWxsXCIpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwib1wiLCBcInhcIiwgXCJzdGVwWFwiLCBcInN0ZXBPXCIsIFwiZW1wdHlcIik7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShcIndpblwiLCBcImRyYXdcIik7XG4gICAgdGhpcy5wbGF5ZXIuaW5uZXJIVE1MID0gXCJYIFR1cm5cIjtcbiAgICB0aGlzLmNvbW1lbnRzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5hbGxDZWxsc0Z1bGwgPSAwO1xuICAgIHRoaXMuc3RlcCA9IGZhbHNlO1xuXG4gICAgY29uc29sZS5sb2coXCJjbGVhclwiKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUaWNUYWNUb2UgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbm5ldyBUaWNUYWNUb2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==