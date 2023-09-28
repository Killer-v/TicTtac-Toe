import { create } from "./untils/create";
export class View {
  cells = [];

  constructor() {
    this.parent = document.getElementById("parent");

    const startPlayDiv = create.createDiv("startPlayDiv");
    this.parent.appendChild(startPlayDiv);

    this.inputNameField = create.createInput("inputName");
    startPlayDiv.appendChild(this.inputNameField);

    this.buttonCreateRoom = create.createButton("buttonCreateRoom");
    this.buttonCreateRoom.innerHTML = "Create Room";
    startPlayDiv.appendChild(this.buttonCreateRoom);

    this.buttonJoinRoom = create.createButton("buttonJoinRoom");
    this.buttonJoinRoom.innerHTML = "Join Room";
    startPlayDiv.appendChild(this.buttonJoinRoom);

    const ticTacToeDiv = create.createDiv("tictactoeDiv");
    this.parent.appendChild(ticTacToeDiv);
    ticTacToeDiv.classList.add("displayNone");

    this.buttonTopic = create.createButton("buttonTopic");
    this.parent.appendChild(this.buttonTopic);

    const playerDiv = create.createDiv("playerDiv");
    ticTacToeDiv.appendChild(playerDiv);

    this.turnPointer = create.createDiv("player");
    playerDiv.appendChild(this.turnPointer);

    this.comments = create.createDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = create.createDiv("cellDiv");
    ticTacToeDiv.appendChild(cellDiv);

    this.createCells(cellDiv);



    // this.buttonPlayAgain = this.createButton("button");
    // ticTacToeDiv.appendChild(this.buttonPlayAgain);
  }

  createCells(cellsDiv) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
        const cell = create.createButton("cell full");

        cell.onclick = () => this.onCellPress(cell);

        cellsDiv.appendChild(cell);

        this.cells.push(cell);
    }
}

  setTurn(turn) {
    if (turn === "x") {
      this.turnPointer.innerHTML = "X Turn";
    } else if (turn === "o") {
      this.turnPointer.innerHTML = "O Turn";
    }
  }

  setComment(turn) {
    if (turn === "x") {
      this.comments.innerHTML = "Next turn X";
    } else if (turn === "o") {
      this.comments.innerHTML = "Next turn O";
    }
  }

  setWinText(winSymbol) {
    if (winSymbol === "x") {
      this.turnPointer.innerHTML = "X Won!";
    } else if (winSymbol === "o") {
      this.turnPointer.innerHTML = "O Won!";
    }
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
    } else if (step === "o") {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");
    }
  }

  setWin() {
    this.parent.classList.add("win");
  }

  setDraw() {
    this.turnPointer.innerHTML = "Draw!";
    this.parent.classList.add("draw");
  }

  clearCells() {
    for (const cell of this.cells) {
      cell.classList.add("full");
      cell.classList.remove("o", "x", "stepX", "stepO", "empty");
    }

    this.parent.classList.remove("win", "draw");
    this.comments.innerHTML = "";

    console.log("clear");
  }
}

export const view = new View();
