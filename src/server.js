import ably from "ably/promises";

const API_KEY = "Z9oq-w.SeC0sA:RWchQVoe5OW6HCx_ogk-pRt_g2qoBkzE3huhxdsSI_A";

const messages = {
  stateUpdate: "stateUpdate",
};

class Server {
  /**
   * Method to connect to Ably server
   * @returns {Promise<ably.Realtime>}
   */
  async connect() {
    // For the full code sample see here: https://github.com/ably/quickstart-js
    const server = new ably.Realtime.Promise(API_KEY);

    await server.connection.once("connected");

    window.addEventListener("beforeunload", () => ably.close());

    return server;
  }

  /**
   * Method to create a channel
   * @param {string} channelName - unique channel ID
   * @returns {Promise<void>}
   * @example
   * await server.initRoom("roomName");
   */
  async initRoom(channelName) {
    const server = await this.connect();

    this.channel = server.channels.get(channelName);

    console.log("Connected to room " + channelName);

    this.channel.subscribe(messages.stateUpdate, (stateData) =>
      this.onStateChange(stateData)
    );
  }

  /**
   * Method to send a message to a channel
   */
  async updateState(stateData) {
    await this.channel.publish(messages.stateUpdate, JSON.stringify(stateData));
  }

  onStateChange(stateData) {
    // this is to be implemented in controller.js
  }
}

export const server = new Server();
