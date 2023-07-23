class TicTacToe {
    constructor(parent) {
        this.step = false;
        this.cells = [];

        const tictactoe = this.createMainDiv(parent);

        this.cell = this.createCell(tictactoe);

        this.cell.onclick = () => this.onCellPress(cell);
    }

    // setCellClickHandlers() {
    //     const cells = document.getElementsByClassName("cell");
    //     for (const cell of cells) {
    //         cell.onclick = () => this.onCellPress(cell);
    //     }
    // }

    createMainDiv(parent) {
        const div = document.createElement("div");
        div.classList.add('cellDiv');
        parent.appendChild(div);
        return div;
    }

    createCell(tictactoe) {
        for (let cellNum = 0; cellNum < 9; cellNum++) {
            const cell = document.createElement("div");
            cell.className = `${cellNum} cell cell${cellNum}`;
        
            // cell.onclick = () => this.onCellPress(cell);

            this.cells.push(cell);

            
            tictactoe.appendChild(cell);
        }
        console.log(this.cells)
    }

    onCellPress(cell) {
        console.log("tub");
        if (!this.step) {
            cell.innerHTML = "x";
            cell.classList.add("x");
            console.log("x");
        } else {
            cell.innerHTML = "o";
            cell.classList.add("o");
            console.log("o");
        }
        this.step = !this.step;

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

        for (let i = 0; i < winningPositions.length; i++ ) {

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
                cells[pos1].style.color='#ffd700';
                cells[pos2].style.color='#ffd700';
                cells[pos3].style.color='#ffd700';
                
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
            cell.onclick = () => this.clearCells(cells);
        }

        this.setCellClickHandlers()
        
        console.log("none");
    }
}

new TicTacToe(document.getElementById("parent"))