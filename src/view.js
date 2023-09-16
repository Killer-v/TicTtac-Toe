export class View {
  allCellsFull = 0; // TODO1: remove as not used
  cells = [];

  constructor() {
    this.parent = document.getElementById("parent");

    const ticTacToeDiv = this.createDiv("tictactoeDiv");
    this.parent.appendChild(ticTacToeDiv);

    this.buttonTopic = this.createButton("buttonTopic");
    ticTacToeDiv.appendChild(this.buttonTopic);

    const playerDiv = this.createDiv("playerDiv");
    ticTacToeDiv.appendChild(playerDiv);

    this.player = this.createDiv("player"); // TODO2: rename this variable to "turnPointer"
    this.player.innerHTML = "X Turn"; // TODO3: move code of this line to a separated method named "setTurn" with parameter x or o, and call it from controller.js whn turn in changing like this: view.setTurn("x"); Remove all other lines like this from this class
    playerDiv.appendChild(this.player);

    this.comments = this.createDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = this.createDiv("cellDiv");
    ticTacToeDiv.appendChild(cellDiv);

    this.createCells(cellDiv);

    // this.buttonPlayAgain = this.createButton("button");
    // ticTacToeDiv.appendChild(this.buttonPlayAgain);
  }

  createDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);

    return div;
  }

  createCells(cellsDiv) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = this.createButton("cell full");

      cell.onclick = () => this.onCellPress(cell);

      cellsDiv.appendChild(cell);

      this.cells.push(cell);
    }
  }

  createButton(className, onclick) {
    // TODO5: remove onclick as not used
    const button = document.createElement("button");
    button.className = className;

    return button;
  }

  setStyle(style) {
    if (style === "dark") {
      this.parent.classList.add("dark");
    } else if (style === "light") {
      this.parent.classList.remove("dark");
    }
  }

  updateCell(cell, step) {
    if (step === "x") {
      cell.classList.add("x", "empty", "stepX");
      cell.classList.remove("full");
      this.player.innerHTML = "O Turn"; // TODO3: this should be called from controller.js like this: view.setTurn("o");
    } else if (step === "o") {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");

      this.player.innerHTML = "X Turn"; // TODO3: this should be called from controller.js like this: view.setTurn("x");
    }
  }

  setWin(winSymbol) {
    // this code can be simplified to just 3 lines of code, look my comments below
    if (winSymbol === "x") {
      this.player.innerHTML = `X Won!`; // TODO6: move code of this line to a separated method named "setWinText" and call it like this: view.setWinText(winSymbol);
      this.parent.classList.add("win"); // TODO7: this is duplicated for both ifs, can be called just once and the beginning of this method
      this.comments.innerHTML = "Next turn O"; // TODO4: move code of this line to a separated method named "showNextGameStartPlayer" and call from controller.js like this: view.showNextGameStartPlayer("X of 0");
    }

    if (winSymbol === "o") {
      this.player.innerHTML = "O Won!"; // TODO6: move code of this line to a separated method named "setWinText" and call it like this: view.setWinText(winSymbol);
      this.parent.classList.add("win"); // TODO7: this is duplicated for both ifs, can be called just once and the beginning of this method
      this.comments.innerHTML = "Next turn X"; // TODO4: move code of this line to a separated method named "showNextGameStartPlayer" and call from controller.js like this: view.showNextGameStartPlayer("X of 0");
    }
  }

  setDraw(nextTurn) {
    this.player.innerHTML = "Draw!"; // this is OK to set from here as it is only set from one place in a code
    this.parent.classList.add("draw");

    if (nextTurn === "x") {
      this.comments.innerHTML = "Next turn X"; // TODO4: this should be called from controller.js like this: view.setComment("Next turn X");
    } else if (nextTurn === "o") {
      this.comments.innerHTML = "Next turn O"; // TODO4: this should be called from controller.js like this: view.setComment("Next turn X");
    }
  }

  clearCells(nextTurn) {
    for (const cell of this.cells) {
      cell.classList.add("full");
      cell.classList.remove("o", "x", "stepX", "stepO", "empty");
    }

    if (nextTurn === "x") {
      this.player.innerHTML = "X Turn"; // TODO3: this should be called from controller.js like this: view.setTurn("x");
    } else if (nextTurn === "o") {
      this.player.innerHTML = "O Turn"; // TODO3: this should be called from controller.js like this: view.setTurn("o");
    }

    this.parent.classList.remove("win", "draw");
    this.comments.innerHTML = "";

    console.log("clear");
  }
}

export const view = new View();
