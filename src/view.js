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

    this.copyURL = createButton("COPY LINK", "buttonCopy");
    this.copyURL.classList.add("displayNone");
    this.parent.appendChild(this.copyURL);

    // TODO: replace url sting with add copy to clipboard button
    //
    // Copy the text inside the text field
    // navigator.clipboard.writeText(copyText.value);

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
    this.createURLmessage();

    this.createCells(cellDiv);

    this.hideField();
  }

  createURLmessage() {
    this.messageURL = createDiv("messageURL");
    this.messageURL.classList.add("displayNone");
    this.parent.appendChild(this.messageURL);
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

  oppenCells() {
    this.cells.forEach(cell => {
      if (!cell.classList.contains('empty')) {
        cell.classList.remove("block");
      }
    });
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
    console.log(step)
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
      cell.classList.remove("o", "x", "stepX", "stepO", "empty", "block");
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

  showMessageURL(message) {
    this.messageURL.innerHTML = message;
    this.messageURL.classList.remove("displayNone");
  }

  showButtonCopyURL(url) {
    this.copyURL.classList.remove("displayNone");
  }

  hideButtonCopyURL() {
    this.copyURL.classList.add("displayNone");
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

  // TODO: rename to user name input
  hideRoomNameInput() {
    this.userNameInputDiv.classList.add("displayNone");
    this.ticTacToeDiv.classList.remove("displayNone");
  }

  hideMessageURL() {
    this.messageURL.classList.add("displayNone");
  }
}

export const view = new View();
