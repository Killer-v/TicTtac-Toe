import { messages, server } from "./server";
import { view } from "./view";
import { getRandomInt } from "./untils/random";

export class Controller {
  state = {
    userID: "",
    userName: "",
    theme: localStorage.getItem("style") ?? "light",
    playerWalks: '',
    game: {
      currentMove: "",
      cellsData: [],
    },
    opponent: {
      userID: "",
      userName: "",
    },
  };

  async init() {
    this.restoreLocalState();
    view.setStyle(this.state.theme);

    view.onCellPress = (cell) => this.onCellPress(cell);
    view.themeSwitcher.onclick = () => this.toggleStyle();
    view.nullifyUser.onclick = () => this.nullifyUser();
    view.messageURL.onclick = () => this.copperURL();

    console.log(this.roomID);

    if (!this.state.userName) {
      const userName = await view.showUserNameInput();
      const userID = btoa(encodeURIComponent(userName + Date.now()));

      this.updateLocalState({ userName, userID });
    }

    view.showMessage("Waiting for opponent...");
    view.showMessageURL();
    view.hideRoomNameInput();
    view.showNullifyUser();

    this.generateRoomID();
    await server.initRoom(this.roomID);

    server.on[messages.userReady] = (data) => {
      console.log(messages.userReady, { data });

      if (data.userID !== this.state.userID) {
        this.state.playerWalks = data.userName;
      }

      if (data.userID.toString() === this.state.userID.toString()) {
        console.log(`this is me`, {
          state: this.state,
        });
        return;
      }

      view.hideMessageURL();

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);

      this.state.opponent = data;

      view.showField();
      this.startGame();
    };

    server.on[messages.startGame] = (data) => {
      console.log(messages.startGame, data);
      this.resetGame();

      console.log(messages.startGame, data);
      this.state.currentMove = data.currentMove;

      view.setTurn(data.currentMove, data.userName);

      if (data.userID === this.state.userID) {
        view.unblockCells();
      } else if (data.userID !== this.state.userID) {
        view.blockCells();
        this.state.playerWalks = data.userName;
      }

      if (data.userID === this.state.userID) return;

      view.hideMessageURL();

      view.showMessage(`${data.userName} joined game`);
      setTimeout(() => view.hideMessage(), 3000);


      view.showField();

    };

    server.on[messages.stateUpdate] = (data) => this.onStateUpdated(data);

    console.log(`Initial state`, this.state);

    this.sendUserReady();
  }

  onStateUpdated(data) {
   

    console.log("onStateUpdated", data);

    this.state.game = data.state.game;

    data.cell = this.state.game.field.cell;
    data.step = this.state.game.currentMove;

    this.state.game.cellsData[data.cell] = data.step;

    view.updateCell(view.cells[data.cell], this.state.game.currentMove);

    this.switchStep();

    if (this.state.userName === data.state.userName) {
      console.log(`User on clicked`);
      this.blockCells();
      view.blockCells();

      view.setTurn(this.state.game.currentMove, this.state.playerWalks);

    } else if (this.state.userName !== data.state.userName) {
      console.log("change");
      this.unblockCells();
      view.unblockCells();

      view.setTurn(this.state.game.currentMove, this.state.userName);
    }

    console.log('jj', this.state.userID, this.state.userName);

    this.checkDraw(data);
    this.checkWin(data);

    this.saveGameState();
  }

  blockCells() {
    this.state.game.cellsData.forEach((cell, index) => {
      if (
        this.state.game.cellsData[index] !== "x" &&
        this.state.game.cellsData[index] !== "o"
      ) {
        this.state.game.cellsData[index] = "blocked";
        console.log(this.state.game.cellsData);
      }
    });
  }

  unblockCells() {
    this.state.game.cellsData.forEach((cell, index) => {
      if (
        this.state.game.cellsData[index] !== "x" &&
        this.state.game.cellsData[index] !== "o"
      ) {
        this.state.game.cellsData[index] = "empty";
      }
    });
  }

  startGame() {
    this.state.currentMove =
      getRandomInt(1) === 0 ? this.state.userID : this.state.opponent.userID;

    server.message(messages.startGame, {
      userID: this.state.userID,
      userName: this.state.userName,
      currentMove: this.state.currentMove,
    });

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

  copperURL() {
    const textarea = document.createElement("textarea");

    textarea.value = window.location.href;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

    view.showMessageURLcopied();
    setTimeout(() => view.hideMessageURLcopied(), 2000);

  }

  switchStep() {
    this.state.game.currentMove =
      this.state.game.currentMove === this.userID
        ? this.opponent.userID
        : this.userID;
    console.log("switchStep", this.state.game.currentMove);
  }

  onCellPress(cell) {
    if (view.isBlocked) return;

    console.log("onCellPress", this.state.game.currentMove);

    if (
      this.state.game.cellsData[view.cells.indexOf(cell)] !== "empty" ||
      this.state.game.cellsData[view.cells.indexOf(cell)] === "blocked"
    ) {
      return;
    }

    this.state.game.field = {
      cell: view.cells.indexOf(cell),
      step: this.state.game.currentMove,
    };

    server.message(messages.stateUpdate, {
      state: this.state,
    });
  }

  checkWin(data) {
    const winner = this.getWinner();

    if (!winner) {
      return;
    }

    console.log(data);

    view.setWin();
    view.setWinText(data.state.userName);
    this.state.game.cellsData.fill("full");

    setTimeout(() => this.resetWinningGame(data), 5000);
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

  checkDraw(data) {
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

    setTimeout(() => this.resetWinningGame(data), 5000);
  }

  resetWinningGame(data) {
    this.state.game.cellsData = new Array(9).fill("empty");

    this.saveGameState();
    view.clearCells();
    

    if (this.state.userName === data.state.userName) {
      this.unblockCells();
      view.unblockCells();

      view.setTurn(this.state.game.currentMove, this.state.userName);

    } else if (this.state.userName !== data.state.userName) {
      this.blockCells();
      view.blockCells();

      view.setTurn(this.state.game.currentMove, this.state.playerWalks);
    }

    console.log("resetGame");
  }

  resetGame() {
    this.state.game.cellsData = new Array(9).fill("empty");

    this.saveGameState();
    view.clearCells();
    console.log("resetGame");
  }
}
