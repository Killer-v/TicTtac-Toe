class TicTacToe {
  constructor(parent) {
    this.step = false;
    this.allCellsFull = 0;
    this.style = "light";
    this.parent = parent;

    const tictactoeDiv = this.createMainDiv("tictactoeDiv");
    parent.appendChild(tictactoeDiv);

    this.buttonTopic = this.createButton("buttonTopic", () =>
      this.buttonChangeStyle()
    );
    tictactoeDiv.appendChild(this.buttonTopic);

    const playerDiv = this.createMainDiv("playerDiv");
    tictactoeDiv.appendChild(playerDiv);

    this.player = this.createMainDiv("player");
    this.player.innerHTML = "X Turn";
    playerDiv.appendChild(this.player);

    this.comments = this.createMainDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = this.createMainDiv("cellDiv");
    tictactoeDiv.appendChild(cellDiv);

    this.createCell(cellDiv);
    this.cells = document.getElementsByClassName("cell");
    this.fullCells = document.getElementsByClassName("full");
    this.emptyCells = document.getElementsByClassName("empty");

    this.buttonPlayAgain = this.createButton("button", () => this.clearCells());
    tictactoeDiv.appendChild(this.buttonPlayAgain);
  }

  // TODO: rename to 'createDiv'
  createMainDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);

    return div;
  }

  // TODO: rename to 'createTicTacToe' variable to cellDiv
  // TODO: rename to 'createCell' method to 'createCell' as it creates not only one cell but 9
  createCell(tictactoe) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = document.createElement("div"); // TODO: use 'createButton' method instead
      cell.className = `cell full`;

      cell.onclick = () => this.onCellPress(cell);

      tictactoe.appendChild(cell);
    }
    console.log(this.cells);
  }

  createButton(className, onclick) {
    const button = document.createElement("div"); // TODO: use document.createElement("button")
    button.className = className;

    button.onclick = onclick;

    return button;
  }

  // TODO: rename to 'changeStyle'
  buttonChangeStyle() {
    if (this.style === "light") {
      this.parent.classList.add("dark");

      this.style = "black";
      console.log(this.style);
    } else {
      this.parent.classList.remove("dark");

      this.style = "light";
      console.log(this.style);
    }
  }

  onCellPress(cell) {
    if (!this.step && cell.classList.contains("full")) {
      cell.classList.add("x", "empty", "stepX");
      cell.classList.remove("full");
      this.player.innerHTML = "O Turn";

      for (const cell of this.fullCells) {
        cell.classList.add("cellWait");
      }

      console.log("x");
      this.step = true;
    } else if (this.step && cell.classList.contains("full")) {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");

      this.player.innerHTML = "X Turn";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait");
      }

      console.log("o");
      this.step = false;
    }

    this.checkDraw();
    this.win();
  }

  // TODO: rename to 'checkWinningPositions'
  winningPositions(winningMark) {
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

  // TODO: rename to 'checkWin'
  win() {
    if (this.winningPositions("x")) {
      this.player.innerHTML = `X Won!`;
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait");
      }

      console.log("win!!X");
      return true; // TODO: remove 'return true' as it is not used
    } else if (this.winningPositions("o")) {
      this.player.innerHTML = "O Won!";
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait");
      }

      console.log("win!!O");
      return true; // TODO: remove 'return true' as it is not used
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
