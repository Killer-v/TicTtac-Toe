class TicTacToe {
  constructor(parent) {
    this.step = false;

    const tictactoeDiv = this.createMainDiv(parent, "tictactoeDiv");

    const playerDiv = this.createMainDiv(tictactoeDiv, "playerDiv");

    this.playerX = this.createPlayer(playerDiv, "playerX player", "X");
    this.playerO = this.createPlayer(playerDiv, "playerO player", "O");

    const cellDiv = this.createMainDiv(tictactoeDiv, "cellDiv");

    this.createCell(cellDiv);
    this.cells = document.getElementsByClassName("cell");
  }

  createMainDiv(parentDiv, className) {
    const div = document.createElement("div");
    div.classList.add(className);

    parentDiv.appendChild(div);
    return div;
  }

  createPlayer(parentDiv, className, index) {
    const player = document.createElement("div");
    player.className = className;
    player.innerHTML = index;

    player.onclick = () => this.choosePlayer(player);

    parentDiv.appendChild(player);
    return player;
  }

  createCell(tictactoe) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = document.createElement("div");
      cell.className = `cell cell${cellNum}`;

      cell.onclick = () => this.onCellPress(cell);

      tictactoe.appendChild(cell);
    }
    console.log(this.cells);
  }

  choosePlayer(player) {
    if (player === this.playerX) {
      this.step = false;
      this.playerX.style.background = "#b47023";

      this.playerO.style.background = "#8ae2fc";
    } else if (player === this.playerO) {
      this.step = true;
      this.playerO.style.background = "#b47023";

      this.playerX.style.background = "#8ae2fc";
    }
  }

  onCellPress(cell) {
    if (!this.step) {
      cell.innerHTML = "x";
      cell.classList.add("x");
      console.log("x");

      this.choosePlayer(this.playerO);

      this.step = true;
    } else {
      cell.innerHTML = "o";
      cell.classList.add("o");
      console.log("o");

      this.choosePlayer(this.playerX);

      this.step = false;
    }

    // это что-то странное тут...
    if (this.checkDraw()) {
      for (const cells of this.cells) {
        cells.onclick = () => this.clearCells(this.cells);
      }
    }

    this.win();
  }

  win() {
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
        (this.cells[pos1].classList.contains("x") &&
          this.cells[pos2].classList.contains("x") &&
          this.cells[pos3].classList.contains("x")) ||
        (this.cells[pos1].classList.contains("o") &&
          this.cells[pos2].classList.contains("o") &&
          this.cells[pos3].classList.contains("o"))
      ) {
        this.cells[pos1].style.color = "#ffd700";
        this.cells[pos2].style.color = "#ffd700";
        this.cells[pos3].style.color = "#ffd700";

        // это надо в отдельный метод и можно просто document.onclick
        // но в новом дизайне там помоему кнопка будет для этого
        for (const cell of this.cells) {
          cell.onclick = () => this.clearCells();
        }

        console.log("win!!");

        return true;
      }
    }

    return false;
  }

  checkDraw() {
    let filledCells = 0;

    for (const cell of this.cells) {
      if (cell.classList.contains("x") || cell.classList.contains("o")) {
        filledCells++;
      }
    }

    return filledCells === this.cells.length;
  }

  clearCells() {
    for (const cell of this.cells) {
      cell.innerHTML = "";
      cell.classList.remove("o", "x");
      cell.style.color = "white";

      cell.onclick = () => this.onCellPress(cell);
    }

    console.log("none");
  }
}

new TicTacToe(document.getElementById("parent"));
