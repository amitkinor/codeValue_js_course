"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
const winChecker_1 = require("./winChecker");
class Grid {
    constructor(size) {
        this.width = size;
        this.height = size;
        this.matrix = this.createMatrix(this.width, this.height);
        this.fillWithCells();
    }
    //	creating 2D matrix
    createMatrix(columns, rows) {
        let mat = new Array(columns);
        for (let col = 0; col < columns; col++) {
            mat[col] = new Array(rows);
        }
        return mat;
    }
    // initiating Cells all over the matrix
    fillWithCells() {
        for (let col = 0; col < this.matrix.length; col++) {
            for (let row = 0; row < this.matrix[col].length; row++) {
                this.matrix[col][row] = new Cell_1.default({ x: col, y: row });
            }
        }
    }
    checkIfCellAvailable(coor) {
        let ans = true;
        const cell = this.matrix[coor.x][coor.y];
        cell.sign === "" ? (ans = true) : (ans = false);
        return ans;
    }
    // setting there mark at the right place on the board
    updateBoard(coor, player) {
        const cell = this.matrix[coor.x][coor.y];
        cell.setMark(player.sign);
    }
    checkIfWinner(player) {
        const signToCheck = player.sign;
        let rowWin = winChecker_1.checkRowsWin(signToCheck, this.matrix);
        let colWin = winChecker_1.checkColsWin(signToCheck, this.matrix);
        let diagWin = winChecker_1.checkDiagWin(signToCheck, this.matrix);
        return rowWin || colWin || diagWin;
    }
    print() {
        for (let col = 0; col < this.matrix.length; col++) {
            for (let row = 0; row < this.matrix[col].length; row++) {
                const curCell = this.matrix[col][row];
                console.log(`Position: [${curCell.coordinates.x} , ${curCell.coordinates.y}] Sign is: ${curCell.sign}`);
            }
        }
    }
}
exports.default = Grid;
//# sourceMappingURL=Grid.js.map