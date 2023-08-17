import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

const messages = {
  move: "move",
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

    await this.channel.subscribe(messages.move, (message) =>
      this.onServerMessage(message)
    );
  }

  onServerMessage(message) {
    console.log("server message: ", {
      data: JSON.parse(message.data),
    });
  }

  async makeMove(data) {
    await this.channel.publish(messages.move, JSON.stringify(data));
  }
}

export const server = new Server();
