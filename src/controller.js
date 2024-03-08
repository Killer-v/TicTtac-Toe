import { messages, server } from "./server";
import { view } from "./view";
import { getRandomInt } from "./untils/random";

export class Controller {
  state = {
    userID: "",
    userName: "",
    theme: localStorage.getItem("style") ?? "light",
    game: {
      currentMove: "",
      cellsData: [],
    },
  };

  async init() {
    this.restoreLocalState();
    view.setStyle(this.state.theme);

    view.onCellPress = (cell) => this.onCellPress(cell);
    view.themeSwitcher.onclick = () => this.toggleStyle();
    view.nullifyUser.onclick = () => this.nullifyUser();
    // view.messageURL.onclick = () => this.copperURL();

    console.log(this.roomID);

    if (!this.state.userName) {
      const userName = await view.showUserNameInput();
      const userID = btoa(encodeURIComponent(userName + Date.now()));

      this.updateLocalState({ userName, userID });
    }

    view.showMessage("Waiting for opponent...");
    view.showMessageURL(window.location.href);
    view.hideRoomNameInput();
    view.showNullifyUser();

    this.generateRoomID();
    await server.initRoom(this.roomID);

    server.on[messages.userReady] = (data) => {
      console.log(messages.userReady, { data });
      console.log(data);

      if (data.userID.toString() === this.state.userID.toString()) {

        console.log(`this is me`, {
          state: this.state,
        });
        return;
      }

      view.hideMessageURL();

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);

      view.showField();
      this.startGame();
    };

    server.on[messages.startGame] = (data) => {
      if (data.userID === this.state.userID) return;
      console.log(messages.startGame, data);
      view.hideMessageURL();

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);

      view.setTurn(data.currentMove);
      view.showField();
    };

    server.on[messages.stateUpdate] = (data) => this.onStateUpdated(data);

    console.log(`Initial state`, this.state);

    this.sendUserReady();
  }

  onStateUpdated(data) {
    console.log("onStateUpdated", data);
    this.state = data.state;

    console.log("onMove", data);

    data.cell = this.state.field.cell;
    data.step = this.state.game.currentMove;
    
    this.state.game.cellsData[data.cell] = data.step;

    view.updateCell(view.cells[data.cell], this.state.game.currentMove);

    this.switchStep();
    

    view.setTurn(this.state.game.currentMove);

    

    this.checkDraw();
    this.checkWin();

    this.saveGameState();
  }

  startGame() {
    server.message(messages.startGame, {
      userID: this.state.userID,
      userName: this.state.userName,
    });

    this.resetGame();

    view.setTurn();
  }

  restoreLocalState() {
    const storedState = localStorage.getItem("localState");

    if (!storedState) {
      return;
    }

    this.state = JSON.parse(storedState);
  }

  saveLocalState() {
    localStorage.setItem("localState", JSON.stringify(this.state));
  }

  saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(this.state.game));
  }

  updateLocalState(state) {
    this.state = {
      ...this.state,
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
      console.log("Setting room");
      return;
    }

    urlParams.set("roomID", roomID);
    window.location.search = urlParams;
  }

  generateRoomID() {
    if (!this.roomID) {
      this.roomID = this.state.userID;
    }
  }

  sendUserReady() {
    server.message(messages.userReady, {
      userID: this.state.userID,
      userName: this.state.userName,
    });
  }

  onUserConnected(message) {
    const data = JSON.parse(message.data);

    console.log(data.name);

    this.state.game.opponentName = data.name;
  }

  toggleStyle() {
    const theme = this.state.theme === "light" ? "dark" : "light";
    view.setStyle(theme);
    this.updateLocalState({ theme });
  }

  nullifyUser() {
    this.state.userID = "";
    this.state.userName = "";

    this.saveLocalState();
    view.hideNullifyUser();
    location.reload();
  }

  copperURL() { }

  switchStep() {
    this.state.game.currentMove =
      this.state.game.currentMove === "x" ? "o" : "x";
    console.log("switchStep", this.state.game.currentMove);

  }

  onCellPress(cell) {
    console.log("onCellPress", this.state.game.currentMove);

    if (this.state.game.cellsData[view.cells.indexOf(cell)] !== "empty") {
      return;
    }
    
    this.state.field = {
      cell: view.cells.indexOf(cell),
      step: this.state.game.currentMove,
    };
    
    server.message(messages.stateUpdate, {
      state: this.state,
    });
  }

  checkWin() {
    const winner = this.getWinner();

    if (!winner) {
      return;
    }

    view.setWin();
    view.setComment(this.state.game.cellsData);
    view.setWinText(winner);
    this.state.game.cellsData.fill("full");

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
        this.state.game.cellsData[pos1] === winningMark &&
        this.state.game.cellsData[pos2] === winningMark &&
        this.state.game.cellsData[pos3] === winningMark
      ) {
        return true;
      }
    }

    return false;
  }

  checkDraw() {
    for (let i = 0; i < this.state.game.cellsData.length; i++) {
      if (
        this.state.game.cellsData[i] !== "x" &&
        this.state.game.cellsData[i] !== "o"
      ) {
        return false;
      }
    }
    console.log("DRAW");

    view.setDraw();
    view.setComment(this.state.game.currentMove);

    setTimeout(() => this.resetGame(), 5000);
  }

  resetGame() {
    this.state.game.cellsData = new Array(9).fill("empty");

    this.saveGameState();
    view.clearCells();
    view.setTurn(this.state.game.currentMove);
  }
}
