import { messages, server } from "./server";
import { view } from "./view";
import { getRandomInt } from "./utils/random";

export class Controller {
  localState = {
    userID: "",
    userName: "",
    theme: localStorage.getItem("style") ?? "light",
  };

  gameState = {
    roles: {
      player1: "",
      player2: "",
    },
    cellsData: [],
    currentMove: getRandomInt(1) === 0 ? "x" : "o",
  };

  restoreLocalState() {
    const storedState = localStorage.getItem("localState");

    if (!storedState) {
      return;
    }

    this.localState = JSON.parse(storedState);
  }

  saveLocalState() {
    localStorage.setItem("localState", JSON.stringify(this.localState));
  }

  updateLocalState(state) {
    this.localState = {
      ...this.localState,
      ...state,
    };

    this.saveLocalState();
  }

  get roomID() {
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get("roomID");
  }

  set roomID(roomID) {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("roomID") === roomID) {
      return;
    }

    urlParams.set("roomID", roomID);
    window.location.search = urlParams;
  }

  generateRoomID() {
    if (!this.roomID) {
      this.roomID = this.localState.userID;
    }
  }

  sendUserReady(roomID) {
    server.message(messages.userReady, {
      userID: this.localState.userID,
      userName: this.localState.userName,
    });
  }

  async init() {
    this.restoreLocalState();

    view.setStyle(this.localState.theme);

    view.onCellPress = (cell) => this.onCellPress(cell);

    view.themeSwitcher.onclick = () => this.toggleStyle();

    if (!this.localState.userName) {
      const userName = await view.showUserNameInput();
      const userID = btoa(userName + Date.now() + Math.random());
      this.updateLocalState({ userName, userID });
    }

    view.showMessage("Waiting for opponent...");
    view.hideRoomNameInput();

    this.generateRoomID();
    await server.initRoom(this.roomID);

    this.sendUserReady(this.roomID);

    server.on[messages.userReady] = (data) => {
      if (data.userID === this.localState.userID) return;
      console.log(messages.userReady, data);

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);

      view.showField();

      this.startGame();
    };

    server.on[messages.startGame] = (data) => {
      if (data.userID === this.localState.userID) return;
      console.log(messages.userReady, data);

      view.showField();

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);
    };

    server.on[messages.move] = (data) => this.onMove(data);

    // window.addEventListener("beforeunload", async (event) => {
    //   event.returnValue = `Are you sure you want to leave?`;

    //   server.closeConnection();
    // });
  }

  startGame() {
    server.message(messages.startGame, {
      userID: this.localState.userID,
      userName: this.localState.userName,
    });

    this.resetGame();

    view.setTurn(this.step);
  }

  toggleStyle() {
    const theme = this.localState.theme === "light" ? "dark" : "light";
    view.setStyle(theme);
    this.updateLocalState({ theme });
  }

  resetGame() {
    this.gameState.cellsData = new Array(9).fill("empty");
    view.clearCells();
    view.setTurn(this.step);
  }

  onMove(data) {
    console.log("onMove", data);
    this.step = data.step;
    this.cell = view.cells[data.cell];
    this.gameState.cellsData[data.cell] = this.step;

    view.updateCell(view.cells[data.cell], this.step);
    view.setTurn(this.step);

    this.switchStep();
    view.setTurn(this.step);

    this.checkDraw();
    this.checkWin();
  }

  onUserConnected(message) {
    const data = JSON.parse(message.data);

    // TODO: show user message: "${friendNam} joined game"
    console.log(data.name);

    this.gameState.opponentName = data.name;

    // veiw.showMessage(`${data.name} joined game`);

    // this.assignUserRoles();
  }

  // TODO: call this method when user enter name and press OK
  changeName(name) {
    this.gameState.currentUserName = name;

    server.changeName({
      name: name,
    });
  }

  switchStep() {
    this.step = this.step === "x" ? "o" : "x";
    console.log("switchStep", this.step);
  }

  onCellPress(cell) {
    console.log("onCellPress", this.step);

    if (this.gameState.cellsData[view.cells.indexOf(cell)] !== "empty") {
      return;
    }

    server.message(messages.move, {
      cell: view.cells.indexOf(cell),
      step: this.step,
    });
  }

  checkWin() {
    const winner = this.getWinner();

    if (!winner) {
      return;
    }

    view.setWin();
    view.setComment(this.step);
    view.setWinText(winner);
    this.gameState.cellsData.fill("full");

    server.setWin(winner);

    setTimeout(() => this.resetGame(), 5000);
    console.log(`winner: ${winner}`);
  }

  getWinner() {
    if (this.checkWinningPositions("x")) {
      return "x";
    }

    if (this.checkWinningPositions("o")) {
      return "o";
    }

    return null;
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

      if (
        this.gameState.cellsData[pos1] === winningMark &&
        this.gameState.cellsData[pos2] === winningMark &&
        this.gameState.cellsData[pos3] === winningMark
      ) {
        return true;
      }
    }

    return false;
  }

  checkDraw() {
    for (let i = 0; i < this.gameState.cellsData.length; i++) {
      if (
        this.gameState.cellsData[i] !== "x" &&
        this.gameState.cellsData[i] !== "o"
      ) {
        return false;
      }
    }
    console.log("DRAW");

    view.setDraw();
    view.setComment(this.step);

    setTimeout(() => this.resetGame(), 5000);
  }
}
