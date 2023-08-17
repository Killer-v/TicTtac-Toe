class TicTacToe {
  step = false;
  allCellsFull = 0;
  style = localStorage.getItem("style") ?? "light";
  cells = [];

  constructor(parent) {
    this.parent = parent;

    const tictactoeDiv = this.createDiv("tictactoeDiv");
    parent.appendChild(tictactoeDiv);

    this.setStyle(this.style);
    this.buttonTopic = this.createButton("buttonTopic", () =>
      this.setStyle(this.style === "light" ? "dark" : "light")
    );
    tictactoeDiv.appendChild(this.buttonTopic);

    const playerDiv = this.createDiv("playerDiv");
    tictactoeDiv.appendChild(playerDiv);

    this.player = this.createDiv("player");
    this.player.innerHTML = "X Turn";
    playerDiv.appendChild(this.player);

    this.comments = this.createDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = this.createDiv("cellDiv");
    tictactoeDiv.appendChild(cellDiv);

    this.createCells(cellDiv);

    this.fullCells = this.cells.filter((cell) =>
      cell.classList.contains("full")
    );

    this.buttonPlayAgain = this.createButton("button", () => this.clearCells());
    tictactoeDiv.appendChild(this.buttonPlayAgain);
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

      console.log({
        pos1,
        pos2,
        pos3,
        cells: this.cells,
      });
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

new TicTacToe(document.getElementById("parent"));
