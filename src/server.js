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

<<<<<<< HEAD
    await this.channel.subscribe(messages.move, (message) => {
      this.onServerMessage(message);
    });
=======
    await this.channel.subscribe(messages.move, (message) =>
      this.onServerMessage(message)
    );
>>>>>>> 8a0b3ff6d9b3c4df41fccbc169ad17cdbd2a6d2b
  }

  async makeMove(data) {
    await this.channel.publish(messages.move, JSON.stringify(data));
  }
}

export const server = new Server();
