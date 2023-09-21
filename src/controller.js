import { server } from "./server";
import { view } from "./view";
import { getRandomInt } from "./untils/random";

class Controller {
    style = localStorage.getItem("style") ?? "light";
    step = getRandomInt(1) === 0 ? "x" : "o";

    cellsData = [];

    constructor() {
        // server.init(); // TODO4: this should be awaited, sho nothing happens until the server is ready, just add "await" before "server.init();"
        (async () => {
            await server.init();
        })();

        this.resetGame();
        console.log(this.cellsData);

        server.onServerMessage = (message) => this.onServerMessage(message);

        view.setStyle(this.style);

        view.setTurn(this.step);

        view.buttonTopic.onclick = () => this.toggleStyle();

        view.onCellPress = (cell) => this.onCellPress(cell);
    }

    toggleStyle() {
        this.style = this.style === "light" ? "dark" : "light";
        view.setStyle(this.style);
        localStorage.setItem("style", this.style);
    }

    resetGame() {
        this.cellsData = new Array(9).fill("empty");
        view.clearCells();
        view.setTurn(this.step);
    }

    onServerMessage(message) {
        const data = JSON.parse(message.data);

        this.step = data.step;
        this.cell = view.cells[data.cell];
        this.cellsData[data.cell] = this.step;

        view.updateCell(view.cells[data.cell], this.step);
        view.setTurn(this.step);
        
        this.switchStep();
        view.setTurn(this.step);

        this.checkDraw();
        this.checkWin();
    }

    switchStep() {
        this.step = this.step === "x" ? "o" : "x";
        console.log("switchStep", this.step);
    }

    onCellPress(cell) {
        console.log("onCellPress", this.step);

        if (this.cellsData[view.cells.indexOf(cell)] !== "empty") {
            return;
        };

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
        this.cellsData.fill("full");
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

        view.setDraw();
        view.setComment(this.step);

        setTimeout(() => this.resetGame(), 5000);
    }
}

export const controller = new Controller();
