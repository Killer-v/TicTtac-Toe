import { createButton, createDiv, createInput } from "./utils/htmlHelpers";

export class View {
  cells = [];

  constructor() {
    this.parent = document.getElementById("parent");

    this.createUserNameInput();
    this.createMessageDiv();
    this.createErrorDiv();

    // this.buttonPlayAgain = createButton("button");
    // ticTacToeDiv.appendChild(this.buttonPlayAgain);
  }

  createGameView() {
    this.buttonTopic = this.createButton("buttonTopic");
    ticTacToeDiv.appendChild(this.buttonTopic);

    const playerDiv = this.createDiv("playerDiv");
    ticTacToeDiv.appendChild(playerDiv);

    this.turnPointer = this.createDiv("player");
    playerDiv.appendChild(this.turnPointer);

    this.comments = this.createDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = this.createDiv("cellDiv");
    ticTacToeDiv.appendChild(cellDiv);

    this.createCells(cellDiv);
  }

  createUserNameInput() {
    this.userNameInputDiv = createDiv("roomNameInputDiv");
    this.parent.appendChild(this.userNameInputDiv);

    this.userNameInput = createInput("Enter your name", "nameInput");
    this.userNameInputDiv.appendChild(this.userNameInput);

    this.userNameInputEnter = createButton("Enter room", "nameInputEnter");
    this.userNameInputDiv.appendChild(this.userNameInputEnter);
  }

  createCells(cellsDiv) {
    for (let cellNum = 0; cellNum < 9; cellNum++) {
      const cell = createButton("cell full");

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

  showUserNameInput(userName) {
    return new Promise((resolve) => {
      if (userName) {
        view.userNameInput.value = userName;
      }

      this.userNameInputEnter.onclick = () => {
        if (view.userNameInput.value === "") {
          this.showError("Please enter your name");
        } else {
          resolve(view.userNameInput.value);
        }
      };
    });
  }

  createErrorDiv() {
    this.errorMessage = createDiv("errorMessage");
    this.errorMessage.style.display = "none";
    this.parent.appendChild(this.errorMessage);
  }

  showError(message) {
    this.hideMessage();
    this.errorMessage.innerHTML = message;
    this.errorMessage.style.display = "block";
    setTimeout(() => this.hideError(), 3000);
  }

  createMessageDiv() {
    this.message = createDiv("message");
    this.message.style.display = "none";
    this.parent.appendChild(this.message);
  }

  showMessage(message) {
    this.hideError();
    this.message.innerHTML = message;
    this.message.style.display = "block";
  }

  hideError() {
    this.errorMessage.style.display = "none";
  }

  hideMessage() {
    this.message.style.display = "none";
  }

  hideRoomNameInput() {
    this.userNameInputDiv.style.display = "none";
  }
}

export const view = new View();
