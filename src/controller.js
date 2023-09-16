import { server } from "./server";
import { view } from "./view";

class Controller {
  style = localStorage.getItem("style") ?? "light";
  step = "x"; // TODO1: this should be random (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
  // TODO1: create a folder named "utils" and create a file named "random.js" in it. Move the code of "getRandomInt" function from the example to it. Add "export" before that function
  // TODO1: Import this function here and use it to set the value of "step" variable like this: `getRandomInt(1) === 0 ? "x" : "o"`
  cellsData = [
    // TODO2: this can be just an empty array like this: `cellsData = []`, then you can just call "this.resetGame()"" in the constructor
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ];
  cells = view.cells; // TODO3: remove this line and use view.cells directly in the code

  constructor() {
    server.init(); // TODO4: this should be awaited, sho nothing happens until the server is ready, just add "await" before "server.init();"

    server.onServerMessage = (message) => this.onServerMessage(message);

    view.setStyle(this.style);

    view.buttonTopic.onclick = () => {
      // TODO5: move code of this function to a method named "toggleStyle" and call it from here like you do for onCellPress method
      // TODO6: this code can be more simple, look example below
      if (this.style === "light") {
        view.setStyle("dark");
        this.style = "dark";
      } else {
        view.setStyle("light");
        this.style = "light";
      }
      // view.setStyle(this.style === "light" ? "dark" : "light");
      localStorage.setItem("style", this.style);
    };

    // view.buttonPlayAgain.onclick = () => this.resetGame();

    view.onCellPress = (cell) => this.onCellPress(cell);
  }

  // TODO6: this code can be more simple, like this:
  //   toggleStyle() {
  //     this.style = this.style === "light" ? "dark" : "light";
  //     view.setStyle(this.style);
  //     localStorage.setItem("style", this.style);
  //   }

  resetGame() {
    this.cellsData.fill("empty");
    view.clearCells(this.step);
  }

  onServerMessage(message) {
    const data = JSON.parse(message.data);

    this.step = data.step;
    this.cell = this.cells[data.cell];

    // TODO: this whole block can be simplified to just 3 lines of code, look my comments inside it
    if (
      this.step === "x" &&
      this.cellsData[data.cell] === "empty" // TODO7: this check should be not here but before server will send a message, id cell is not empty, user should not be able to click on it
    ) {
      view.updateCell(this.cells[data.cell], this.step); // TODO9: this line is duplicated, so can be called only once, move it out of if/else block

      this.cellsData[data.cell] = "x";

      this.step = "o"; // TODO8: move this to additional method named "switchStep" (look my example below)
    } else if (
      this.step === "o" &&
      this.cellsData[data.cell] === "empty" //  TODO7: this check should be not here but before server will send a message, id cell is not empty, user should not be able to click on it
    ) {
      view.updateCell(this.cells[data.cell], this.step); // TODO9: this line is duplicated, so can be called only once, move it out of if/else block

      this.cellsData[data.cell] = "o"; // TODO10: this can be moved out of if/else block and used like: "this.cellsData[data.cell] = this.step;"

      this.step = "x";
    }

    this.checkDraw();
    this.checkWin();
  }

  // TODO8: this can be more simple, like this:
  // switchStep() {
  //   this.step = this.step === "x" ? "o" : "x";
  // }

  onCellPress(cell) {
    // TODO7: Here is where you should check if cell is empty, if not, do nothing like this: "if (this.cellsData[cell] !== "empty") { return; }"

    server.makeMove({
      cell: this.cells.indexOf(cell),
      step: this.step,
    });
  }

  checkWin() {
    if (this.checkWinningPositions("x")) {
      view.setWin("x");

      this.cellsData.fill("full");
      console.log(this.step); // What is this for?

      setTimeout(() => this.resetGame(), 5000);

      console.log("win!!X");
    } else if (this.checkWinningPositions("o")) {
      view.setWin("o");

      this.cellsData.fill("full");

      setTimeout(() => this.resetGame(), 5000);

      console.log("win!!O");
    }
    // TODO8: I would refactor this code to be like this:
    // const winner = getWinner();

    // if (!winner) {
    //   return;
    // }

    // view.setWin(winner);
    // this.cellsData.fill("full");
    // setTimeout(() => this.resetGame(), 5000);
    // console.log(`winner: ${winner}`);
  }

  // TODO8: this can be more simple, like this:
  // getWinner() {
  //   if (this.checkWinningPositions("x")) {
  //     return "x";
  //   }

  //   if (this.checkWinningPositions("o")) {
  //     return "o";
  //   }

  //   return null;
  // }

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
        this.cellsData[pos1] === winningMark &&
        this.cellsData[pos2] === winningMark &&
        this.cellsData[pos3] === winningMark
      ) {
        return true;
      }
    }

    return false;
  }

  checkDraw() {
    for (let i = 0; i < this.cellsData.length; i++) {
      if (this.cellsData[i] !== "x" && this.cellsData[i] !== "o") {
        return false;
      }
    }
    console.log("DRAW");

    view.setDraw(this.step);

    setTimeout(() => this.resetGame(), 5000);
  }
}

export const controller = new Controller();
