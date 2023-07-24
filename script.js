class TicTacToe {
    constructor(parent) {
        this.step = false;

        const playerDiv = this.createPlayerDiv(parent);
        this.playerX = this.createPlayerX(playerDiv);
        this.playerO = this.createPlayerO(playerDiv);

        const tictactoe = this.createMainDiv(parent);

        this.cell = this.createCell(tictactoe);
    }

    createMainDiv(parent) {
        const div = document.createElement("div");
        div.classList.add('cellDiv');
        parent.appendChild(div);
        return div;
    }

    createPlayerDiv(parent) {
        const div = document.createElement("div");
        div.classList.add('playerDiv');
        parent.appendChild(div);
        return div;
    }

    createPlayerX(playerDiv) {
        const playerX = document.createElement("div");
        playerX.className = 'playerX player';
        playerX.innerHTML = "x";

        playerX.onclick = () => this.choosePlayer(playerX);

        playerDiv.appendChild(playerX);
        return playerX;
    }

    createPlayerO(playerDiv) {
        const playerO = document.createElement("div");
        playerO.className = 'playerO player';
        playerO.innerHTML = "o";

        playerO.onclick = () => this.choosePlayer(playerO);

        playerDiv.appendChild(playerO);
        return playerO;
    }

    createCell(tictactoe) {
        for (let cellNum = 0; cellNum < 9; cellNum++) {
            const cell = document.createElement("div");
            cell.className = `cell cell${cellNum}`;

            cell.onclick = () => this.onCellPress(cell);

            tictactoe.appendChild(cell);
        }
        console.log(this.cells)
    }

    choosePlayer(player) {
        if (player === this.playerX) {
            this.step = false;
            player.style.background = "#b47023";

            this.playerO.style.background = "#8ae2fc";
        } else
            if (player === this.playerO) {
                this.step = true;
                player.style.background = "#b47023";

                this.playerX.style.background = "#8ae2fc";
            }
    }

    setCellClickHandlers() {
        const cells = document.getElementsByClassName("cell");
        for (const cell of cells) {
            cell.onclick = () => this.onCellPress(cell);
        }
    }

    onCellPress(cell) {
        if (!this.step) {
            cell.innerHTML = "x";
            cell.classList.add("x");
            console.log("x");

            this.choosePlayer(this.playerX);

            this.step = true;
        } else {
            cell.innerHTML = "o";
            cell.classList.add("o");
            console.log("o");

            this.choosePlayer(this.playerO);

            this.step = false;
        }

        this.win();
    }

    win() {
        let winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < winningPositions.length; i++) {
            const [pos1, pos2, pos3] = winningPositions[i];
            const cells = document.getElementsByClassName("cell");

            if (
                cells[pos1].classList.contains("x") &&
                cells[pos2].classList.contains("x") &&
                cells[pos3].classList.contains("x") ||
                cells[pos1].classList.contains("o") &&
                cells[pos2].classList.contains("o") &&
                cells[pos3].classList.contains("o")
            ) {
                cells[pos1].style.color = '#ffd700';
                cells[pos2].style.color = '#ffd700';
                cells[pos3].style.color = '#ffd700';

                for (const cell of cells) {
                    cell.onclick = () => this.clearCells(cells);
                }

                console.log("win!!");

                return true;
            }
        }

        return false;
    }

    clearCells(cells) {
        for (const cell of cells) {
            cell.innerHTML = "";
            cell.classList.remove("o", "x");
            cell.style.color = "white";
        }

        this.setCellClickHandlers()

        console.log("none");
    }
}

new TicTacToe(document.getElementById("parent"))