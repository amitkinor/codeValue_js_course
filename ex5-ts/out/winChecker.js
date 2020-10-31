"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOneRowWin = exports.checkRowsWin = exports.checkOneColWin = exports.checkColsWin = exports.checkDiagWin = void 0;
function checkDiagWin(signToCheck, matrix) {
    // checks [0][0] to [matrix.length][matrix.length]
    let diagToCheck1 = true;
    for (let index = 0; index < matrix.length; index++) {
        if (matrix[index][index].sign !== signToCheck)
            diagToCheck1 = false;
    }
    // checks [0][matrix.length] to [matrix.length][0]
    let diagToCheck2 = true;
    for (let index = 0; index < matrix.length; index++) {
        if (matrix[index][matrix.length - index - 1].sign !== signToCheck)
            diagToCheck2 = false;
    }
    const answer = diagToCheck1 || diagToCheck2;
    return answer;
}
exports.checkDiagWin = checkDiagWin;
function checkColsWin(signToCheck, matrix) {
    let colWin = false;
    matrix.forEach((element) => {
        if (this.checkOneColWin(element, signToCheck)) {
            colWin = true;
        }
    });
    return colWin;
}
exports.checkColsWin = checkColsWin;
function checkOneColWin(col, signToCheck) {
    let colWin = true;
    col.forEach((element) => {
        if (element.sign !== signToCheck)
            colWin = false;
    });
    return colWin;
}
exports.checkOneColWin = checkOneColWin;
function checkRowsWin(signToCheck, matrix) {
    for (let ind = 0; ind < matrix.length; ind++) {
        if (this.checkOneRowWin(ind, signToCheck, matrix))
            return true;
    }
    return false;
}
exports.checkRowsWin = checkRowsWin;
function checkOneRowWin(rowNum, signToCheck, matrix) {
    let rowWin = true;
    for (let ind = 0; ind < matrix.length; ind++) {
        if (matrix[ind][rowNum].sign !== signToCheck)
            rowWin = false;
    }
    return rowWin;
}
exports.checkOneRowWin = checkOneRowWin;
//# sourceMappingURL=winChecker.js.map