class TicTacToe {
  constructor(parent) {
    this.step = false;
    this.allCellsFull = 0;
    this.topic = true;

    const tictactoeDiv = this.createMainDiv(parent, "tictactoeDiv");

    this.buttonTopic = this.createMainDiv(tictactoeDiv, "buttonTopic");
    this.buttonTopic.onclick = () => this.buttonTopicOnclick();

    const playerDiv = this.createMainDiv(tictactoeDiv, "playerDiv");
    this.player = this.createPlayer(playerDiv, "player", "Your Turn");
    this.comments = this.createPlayer(playerDiv, "playerP", "");

    const cellDiv = this.createMainDiv(tictactoeDiv, "cellDiv");

    this.createCell(cellDiv);
    this.cells = document.getElementsByClassName("cell");
    this.fullCells = document.getElementsByClassName("full");
    this.emptyCells = document.getElementsByClassName("empty");

    this.buttonPlayAgain = this.createButton(tictactoeDiv);

  }

  createMainDiv(parentDiv, className) {
    const div = document.createElement("div");
    div.classList.add(className);

    parentDiv.appendChild(div);
    return div;
  }

  createPlayer(parentDiv, className, innerHTML) {
    const player = document.createElement("div");
    player.className = className;
    player.innerHTML = innerHTML;

    parentDiv.appendChild(player);
    return player;
  }

  createCell(tictactoe) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = document.createElement("img");
      cell.src = 'img/empty-block.svg';
      cell.className = `cell full`;

      cell.onclick = () => this.onCellPress(cell);

      tictactoe.appendChild(cell);
    }
    console.log(this.cells);
  }

  createButton(tictactoeDiv) {
    const button = document.createElement("img");
    button.src = 'img/Button-play-Again.svg';
    button.className = "button";

    button.onclick = () => this.clearCells();

    tictactoeDiv.appendChild(button);
    return button;
  }

  buttonTopicOnclick() {
    let style = document.getElementById("style");

    if (style.getAttribute("href") == "style/style.css") {
      style.href = "style/styleDark.css";
      this.topic = false;
      console.log(this.topic);
    } else {
      style.href = "style/style.css";
      this.topic = true;
      console.log(this.topic);
    }
  }

  onCellPress(cell) {
    if (!this.step && cell.classList.contains("full")) {
      cell.src = 'img/full-block-X.svg';
      cell.classList.add("x", "empty");
      cell.classList.remove("full");
      this.player.innerHTML = "Please Wait";

      for (const cell of this.fullCells) {
        cell.src = 'img/empty-block-wait.svg';
      };

      console.log("x");
      this.step = true;
    } else if (this.step && cell.classList.contains("full")) {
      cell.src = 'img/full-block-O.svg';
      cell.classList.add("o", "empty");
      cell.classList.remove("full");

      this.player.innerHTML = "Your Turn";

      for (const cell of this.fullCells) {
        cell.src = 'img/empty-block.svg';
      };

      console.log("o");
      this.step = false;
    }

    this.checkDraw();
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
        this.cells[pos1].classList.contains("x") &&
        this.cells[pos2].classList.contains("x") &&
        this.cells[pos3].classList.contains("x")
      ) {
        this.player.innerHTML = "You Won!";
        this.player.style.color = "rgba(70, 163, 255, 1)";
        this.comments.innerHTML = "Congartulations";
        this.buttonPlayAgain.style.width = "100%";

        for (const cell of this.fullCells) {
          cell.classList.remove("full");
        };

        console.log("win!!X");
        return true;
      } else if (
        this.cells[pos1].classList.contains("o") &&
        this.cells[pos2].classList.contains("o") &&
        this.cells[pos3].classList.contains("o")
      ) {
        this.player.innerHTML = "You Lost!";
        this.player.style.color = "rgba(255, 130, 126, 1)";
        this.comments.innerHTML = "Good luck next time";
        this.buttonPlayAgain.style.width = "100%";

        for (const cell of this.fullCells) {
          cell.src = 'img/empty-block-wait.svg';
        };

        for (const cell of this.cells) {
          cell.classList.remove("full");
        };

        console.log("win!!O");
        return true;
      }
    }

    return false;
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
      this.buttonPlayAgain.style.width = "100%";
    }
  }

  clearCells() {
    for (const cell of this.cells) {
      cell.src = 'img/empty-block.svg';
      cell.classList.add("full");
      cell.classList.remove("o", "x");
    }

    this.player.innerHTML = "Your Turn";
    this.player.style.color = "black";
    this.comments.innerHTML = "";
    this.buttonPlayAgain.style.width = "0";
    this.allCellsFull = 0;
    this.step = false;

    console.log("clear");
  }

  checkTopic() {

  }
}

new TicTacToe(document.getElementById("parent"));
