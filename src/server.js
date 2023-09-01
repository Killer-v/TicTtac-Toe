import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

const messages = {
  move: "move",
  message: "message",
};

class Server {
  async init() {
    this.server = await this.connect();
    await this.createChannel("game");
  }

  async connect() {
    // For the full code sample see here: https://github.com/ably/quickstart-js
    const server = new ably.Realtime.Promise(API_KEY);

    await server.connection.once("connected");
    console.log("Connected to Ably!");

    window.addEventListener("beforeunload", () => ably.close());

    return server;
  }

  async createChannel(channelName) {
    this.channel = this.server.channels.get(channelName);

    await this.channel.subscribe(messages.move, (message) => {
      this.onServerMessage(message);
      this.checkDraw();
      this.checkWin();
    });
  }

  checkWin() {
    if (this.checkWinningPositions("x")) {
      this.player.innerHTML = `X Won!`;
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait", "full");
      }
    } else if (this.checkWinningPositions("o")) {
      this.player.innerHTML = "O Won!";
      this.parent.classList.add("win");
      this.comments.innerHTML = "Congartulations";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait", "full");
      }
    }
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
      this.parent.classList.add("draw");
    }
  }

  async makeMove(data) {
    await this.channel.publish(messages.move, JSON.stringify(data));
  }
}

export const server = new Server();
