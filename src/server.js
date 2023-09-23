import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

const messages = {
  move: "move",
  changeName: "changeName",
};

class Server {
  async init(userName) {
    this.server = await this.connect();
    await this.createChannel(userName);
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
      this.onMove(message)
    );

    await this.channel.subscribe(messages.changeName, (message) =>
      this.onUserConnected(message)
    );
  }

  async makeMove(data) {
    await this.channel.publish(messages.move, JSON.stringify(data));
  }

  async changeName(data) {
    await this.channel.publish(messages.changeName, JSON.stringify(data));
  }
}

export const server = new Server();
