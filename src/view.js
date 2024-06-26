import { createButton, createDiv, createInput } from "./untils/htmlHelpers";
export class View {
  cells = [];

  constructor() {
    this.parent = document.getElementById("parent");

    this.ticTacToeDiv = createDiv("tictactoeDiv");
    this.parent.appendChild(this.ticTacToeDiv);

    this.themeSwitcher = createButton("", "buttonTopic");
    this.parent.appendChild(this.themeSwitcher);

    this.nullifyUser = createButton("", "buttonNullifyUser displayNone");
    this.parent.appendChild(this.nullifyUser);

    const playerDiv = createDiv("playerDiv");
    this.ticTacToeDiv.appendChild(playerDiv);

    this.turnPointer = createDiv("player");
    playerDiv.appendChild(this.turnPointer);

    this.comments = createDiv("playerP");
    playerDiv.appendChild(this.comments);

    const cellDiv = createDiv("cellDiv");
    this.ticTacToeDiv.appendChild(cellDiv);

    this.createUserNameInput();
    this.createMessageDiv();
    this.createErrorDiv();

    this.createURLdiv();
    this.createURLmessage();
    this.createMessageURLcopied();

    this.createCells(cellDiv);

    this.hideField();
  }

  createMessageURLcopied() {
    this.messageURLcopied = createDiv("messageURLcopied");
    this.messageURLcopied.innerHTML = "URL Copied ! ";
    this.messageURLcopied.classList.add("displayNone");
    this.parent.appendChild(this.messageURLcopied);
  }

  createURLmessage() {
    this.messageURL = createDiv("messageURL");
    this.messageURL.classList.add("displayNone");
    this.messageURLdiv.appendChild(this.messageURL);
  }

  createURLdiv() {
    this.messageURLdiv = createDiv("messageURLdiv");
    this.messageDiv.appendChild(this.messageURLdiv);
  }

  createErrorDiv() {
    this.errorMessage = createDiv("errorMessage");
    this.errorMessage.classList.add("displayNone");
    this.parent.appendChild(this.errorMessage);
  }

  createMessageDiv() {
    this.messageDiv = createDiv("messageDiv");
    this.messageDiv.classList.add("displayNone");

    this.message = createDiv("message");

    this.messageDiv.appendChild(this.message);
    this.parent.appendChild(this.messageDiv);
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
      const cell = createButton("", "cell full");

      cell.onclick = () => this.onCellPress(cell);

      cellsDiv.appendChild(cell);

      this.cells.push(cell);
    }
  }

  blockCells() {
   
    this.cells.forEach(cell => {
      if (!cell.classList.contains('empty')) {
        cell.classList.add("block");
      }
    });
  }

  unblockCells() {
   
    this.cells.forEach(cell => {
      if (!cell.classList.contains('empty')) {
        cell.classList.remove("block");
      }
    });
  }

  setWinText(winName) {
    this.turnPointer.innerHTML = `Win ${winName}`;
    this.comments.innerHTML = "";
    console.log("setWinText");
  }

  setTurn(turn, player) {
    if (turn === "x") {
      this.turnPointer.innerHTML = `Walks ${player}`;
      this.comments.innerHTML = `X Turn`
    } else if (turn === "o") {
      this.turnPointer.innerHTML = `Walks ${player}`;
      this.comments.innerHTML = `O Turn`
    }
  }

  setWin() {
    this.parent.classList.add("win");
  }

  setStyle(style) {
    if (style === "dark") {
      this.parent.classList.add("dark");
    } else if (style === "light") {
      this.parent.classList.remove("dark");
    }
  }

  updateCell(cell, step) {
    console.log(step)
    if (step === "x") {
      cell.classList.add("x", "empty", "stepX");
      cell.classList.remove("full");
    } else if (step === "o") {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");
    }
  }

  setDraw() {
    this.turnPointer.innerHTML = "Draw!";
    this.comments.innerHTML = "";
    this.parent.classList.add("draw");
  }

  clearCells() {
    for (const cell of this.cells) {
      cell.classList.add("full");
      cell.classList.remove("o", "x", "stepX", "stepO", "empty", "block");
    }

    this.parent.classList.remove("win", "draw");

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

  showError(message) {
    this.hideMessage();
    this.errorMessage.innerHTML = message;
    this.errorMessage.classList.remove("displayNone");
    setTimeout(() => this.hideError(), 3000);
  }

  showMessage(message) {
    console.log(message);
  }

  showMessage(message) {
    this.hideError();
    this.message.innerHTML = message;
    this.messageDiv.classList.remove("displayNone");
  }

  showNullifyUser() {
    this.nullifyUser.classList.remove("displayNone");
  }

  showField() {
    this.ticTacToeDiv.classList.remove("displayNone");
  }

  showMessageURL() {
    this.messageURL.innerHTML = "Coppy URL";
    this.messageURL.classList.remove("displayNone");
  }

  showMessageURLcopied() {
    this.messageURLcopied.classList.remove("displayNone");
  }

  hideMessageURLcopied() {
    this.messageURLcopied.classList.add("displayNone");
  }

  hideNullifyUser() {
    this.nullifyUser.classList.add("displayNone");
  }

  hideError() {
    this.errorMessage.classList.add("displayNone");
  }

  hideMessage() {
    this.messageDiv.classList.add("displayNone");
  }

  hideField() {
    this.ticTacToeDiv.classList.add("displayNone");
  }

  hideRoomNameInput() {
    this.userNameInputDiv.classList.add("displayNone");
    this.ticTacToeDiv.classList.remove("displayNone");
  }

  hideMessageURL() {
    this.messageURL.classList.add("displayNone");
  }
}

export const view = new View();
