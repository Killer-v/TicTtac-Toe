import { server } from "./server";
import { view } from "./view";

class Controller {
    style = localStorage.getItem("style") ?? "light";
    step = "x";
    cellsData = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
    cells = view.cells;

    constructor() {
        server.init();

        server.onServerMessage = (message) => this.onServerMessage(message);

        view.setStyle(this.style);

        view.buttonTopic.onclick = () => {
            if (this.style === "light") {
                view.setStyle("dark");
                this.style = "dark";
            } else {
                view.setStyle("light");
                this.style = "light";
            }
            // view.setStyle(this.style === "light" ? "dark" : "light");
            localStorage.setItem("style", this.style);
        };

        // view.buttonPlayAgain.onclick = () => this.resetGame();

        view.onCellPress = (cell) => this.onCellPress(cell);
    }

    resetGame() {
        this.cellsData.fill("empty");
        view.clearCells(this.step);
    }

    onServerMessage(message) {
        const data = JSON.parse(message.data);

        this.step = data.step;
        this.cell = this.cells[data.cell];

        if (this.step === "x" && this.cellsData[data.cell] === "empty") {
            view.updateCell(this.cells[data.cell], this.step);

            this.cellsData[data.cell] = "x";

            this.step = "o";
        } else if (this.step === "o" && this.cellsData[data.cell] === "empty") {
            view.updateCell(this.cells[data.cell], this.step);

            this.cellsData[data.cell] = "o";

            this.step = "x";
        }

        this.checkDraw();
        this.checkWin();
    }

    onCellPress(cell) {
        server.makeMove({
            cell: this.cells.indexOf(cell),
            step: this.step,
        });
    }

    checkWin() {
        if (this.checkWinningPositions("x")) {
            view.setWin("x");

            this.cellsData.fill("full");
            console.log(this.step);
            
            setTimeout(() => this.resetGame(), 5000);

            console.log("win!!X");
        } else if (this.checkWinningPositions("o")) {
            view.setWin("o");

            this.cellsData.fill("full");

            setTimeout(() => this.resetGame(), 5000);

            console.log("win!!O");
        }
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
                this.cellsData[pos1] === winningMark &&
                this.cellsData[pos2] === winningMark &&
                this.cellsData[pos3] === winningMark
            ) {
                return true;
            }
        }

        return false;
    }

    checkDraw() {
        for (let i = 0; i < this.cellsData.length; i++) {
            if (this.cellsData[i] !== "x" && this.cellsData[i] !== "o") {
                return false;
            }
        }
        console.log("DRAW");

        view.setDraw(this.step);

        setTimeout(() => this.resetGame(), 5000);
    }
}

export const controller = new Controller();