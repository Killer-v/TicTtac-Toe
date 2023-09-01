import { server } from "./server";
import { view } from "./view";

class Controller {
  style = localStorage.getItem("style") ?? "light";
  cellsData = ["X", "", "X", "", "", "X", "", "", "0"];

  constructor() {
    server.init();

    server.onServerMessage = (message) => this.onServerMessage(message);

    view.setStyle(this.style);

    view.buttonTopic.onclick = () => {
      view.setStyle(this.style === "light" ? "dark" : "light");
    };

    view.buttonPlayAgain.onclick = () => view.clearCells();

    this.fullCells = this.cells.filter((cell) =>
      cell.classList.contains("full")
    );

    view.onCellPress = (cell) => this.onCellPress(cell);
  }

  onServerMessage(message) {
    const data = JSON.parse(message.data);

    this.step = data.step;

    this.cells[data.cell] = this.step ? "o" : "x";

    view.updateCells(this.cells);

    if (!this.step && cell.classList.contains("full")) {
      cell.classList.add("x", "empty", "stepX");
      cell.classList.remove("full");
      this.player.innerHTML = "O Turn";

      this.step = true;
    } else if (this.step && cell.classList.contains("full")) {
      cell.classList.add("o", "empty", "stepO");
      cell.classList.remove("cellWait", "full");

      this.player.innerHTML = "X Turn";

      for (const cell of this.fullCells) {
        cell.classList.remove("cellWait");
      }

      this.step = false;
    }

    this.checkDraw();
    this.checkWin();
  }
}

export const controller = new Controller();
