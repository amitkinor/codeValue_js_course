import { ICell } from "./interfaces";

export function checkDiagWin(signToCheck: string,matrix:ICell[][]): boolean {
  // checks [0][0] to [matrix.length][matrix.length]
  let diagToCheck1 = true;
  for (let index = 0; index < matrix.length; index++) {
    if (matrix[index][index].sign !== signToCheck) diagToCheck1 = false;
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

export function checkColsWin(signToCheck: string,matrix:ICell[][]): boolean {
  let colWin = false;
  matrix.forEach((element:ICell[]) => {
    if (this.checkOneColWin(element, signToCheck)) {
      colWin = true;
    }
  });
  return colWin;
}

export function checkOneColWin(col: ICell[], signToCheck: string): boolean {
  let colWin = true;
  col.forEach((element:ICell) => {
    if (element.sign !== signToCheck) colWin = false;
  });
  return colWin;
}

export function checkRowsWin(signToCheck: string,matrix:ICell[][]) {
  for (let ind = 0; ind < matrix.length; ind++) {
    if (this.checkOneRowWin(ind, signToCheck,matrix)) return true;
  }
  return false;
}

export function checkOneRowWin(rowNum: number, signToCheck: string,matrix:ICell[][]): boolean {
  let rowWin = true;
  for (let ind = 0; ind < matrix.length; ind++) {
    if(matrix[ind][rowNum].sign !== signToCheck) rowWin = false			
  }
  return rowWin;
}
