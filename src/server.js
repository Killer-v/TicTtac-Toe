import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

export const messages = {
  userReady: "userReady",
  startGame: "startGame",
  move: "move",
  stateUpdate: "stateUpdate",
};

class Server {
  roomState = {
    users: new Map(),
  };

  on = {
    [messages.userReady]: () => {},
  };

  async connect() {
    // For the full code sample see here: https://github.com/ably/quickstart-js
    const server = new ably.Realtime.Promise(API_KEY);

    await server.connection.once("connected");

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
        const parsedData = JSON.parse(data.data);
        this.on[message](parsedData);

        const { users } = this.roomState;

        switch (message) {
          case messages.userReady:
          case messages.startGame:
            users.set(parsedData.userID, parsedData.userName);
            break;
        }
      });
    }
  }

  async message(messageType, data) {
    await this.channel.publish(messageType, JSON.stringify(data));
  }

  closeConnection() {
    ably.close();
  }
}

export const server = new Server();
