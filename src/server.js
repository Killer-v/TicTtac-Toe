import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

export const messages = {
  userReady: "userReady",
};

class Server {
  on = {
    [messages.userReady]: () => {},
  };

  async connect() {
    // For the full code sample see here: https://github.com/ably/quickstart-js
    const server = new ably.Realtime.Promise(API_KEY);

    await server.connection.once("connected");

    window.addEventListener("beforeunload", () => ably.close());

    return server;
  }

  async initRoom(channelName) {
    const server = await this.connect();

    this.channel = server.channels.get(channelName);

    console.log("Connected to room " + channelName);

    this.subscribeToMessages();
  }

  subscribeToMessages() {
    for (const message in messages) {
      this.on[message] = () => {};

      this.channel.subscribe(message, (data) => {
        this.on[message](JSON.parse(data.data));
      });
    }
  }

  async message(messageType, data) {
    await this.channel.publish(messageType, JSON.stringify(data));
  }
}

export const server = new Server();
