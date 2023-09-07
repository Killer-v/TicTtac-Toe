export class View {
  allCellsFull = 0;
  cells = [];


  constructor() {
    this.parent = document.getElementById("parent");

    const ticTacToeDiv = this.createDiv("tictactoeDiv");
    this.parent.appendChild(ticTacToeDiv);

    this.buttonTopic = this.createButton("buttonTopic");
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

    this.buttonPlayAgain = this.createButton("button");
    ticTacToeDiv.appendChild(this.buttonPlayAgain);


    console.log("CELLS", this.cells);

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
      this.player.innerHTML = "O Turn";
    } else if (step === "o") {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");

      this.player.innerHTML = "X Turn";
    }
  }

  setWin(winSymbol) {
    if (winSymbol === "x") {
      this.player.innerHTML = `X Won!`;
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";
    }

    if (winSymbol === "o") {
      this.player.innerHTML = "O Won!";
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";
    }
  }

  setDraw() {
    this.player.innerHTML = "Draw!";
    this.comments.innerHTML = "It’s a draw";
    this.parent.classList.add("draw");
  }

  clearCells() {
    for (const cell of this.cells) {
      cell.classList.add("full");
      cell.classList.remove("o", "x", "stepX", "stepO", "empty");
    }

    this.parent.classList.remove("win", "draw");
    this.player.innerHTML = "X Turn";
    this.comments.innerHTML = "";

    console.log("clear");
  }
}

export const view = new View();