import { server } from "./server";
import { view } from "./view";
import { getRandomInt } from "./utils/random";

export class Controller {
  localState = {
    roomName: "",
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

  async init() {
    const roomName = await view.showRoomNameInput(this.localState.roomName);

    view.showMessage("Waiting for opponent...");
    view.hideRoomNameInput();

    server.initRoom(roomName);

    // server.onStateChange = (stateData) => this.onStateChange(stateData);

    // this.resetGame();

    // view.setStyle(this.style);

    // view.setTurn(this.step);

    // view.buttonTopic.onclick = () => this.toggleStyle();

    // view.onCellPress = (cell) => this.onCellPress(cell);
  }

  startGame() {
    view.hideMessage();
    view.createGameView();
  }

  toggleStyle() {
    this.style = this.style === "light" ? "dark" : "light";
    view.setStyle(this.style);
    localStorage.setItem("style", this.style);
  }

  resetGame() {
    this.gameState.cellsData = new Array(9).fill("empty");
    view.clearCells();
    view.setTurn(this.step);
  }

  onMove(message) {
    const data = JSON.parse(message.data);

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

    server.makeMove({
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
