import Cell from "./Cell";
import { ICell, ICoordinates, IGrid, IPlayer } from "./interfaces";
import { checkColsWin, checkDiagWin, checkRowsWin } from "./winChecker";
export default class Grid implements IGrid {
	width: number;
	height: number;
	matrix: ICell[][];

	constructor(size: number) {
		this.width = size;
		this.height = size;
		this.matrix = this.createMatrix(this.width, this.height);
		this.fillWithCells();
	}

	//	creating 2D matrix
	private createMatrix(columns: number, rows: number): ICell[][] {
		let mat = new Array(columns);
		for (let col = 0; col < columns; col++) {
			mat[col] = new Array(rows);
		}
		return mat;
	}

	// initiating Cells all over the matrix
	private fillWithCells(): void {
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				this.matrix[col][row] = new Cell({ x: col, y: row });
			}
		}
	}

	checkIfCellAvailable(coor: ICoordinates): boolean {
		let ans = true;
		const cell: ICell = this.matrix[coor.x][coor.y];
		cell.sign === "" ? (ans = true) : (ans = false);
		return ans;
	}

	// setting there mark at the right place on the board
	updateBoard(coor: ICoordinates, player: IPlayer): void {
		const cell: ICell = this.matrix[coor.x][coor.y];
		cell.setMark(player.sign);
	}


	checkIfWinner(player: IPlayer): boolean {
		const signToCheck: string = player.sign;
		let rowWin = checkRowsWin(signToCheck,this.matrix);
		let colWin = checkColsWin(signToCheck,this.matrix);
		let diagWin = checkDiagWin(signToCheck,this.matrix);
		return rowWin || colWin || diagWin;
	}

	
	print(): void {
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				const curCell = this.matrix[col][row];
				console.log(
					`Position: [${curCell.coordinates.x} , ${curCell.coordinates.y}] Sign is: ${curCell.sign}`
				);
			}
		}
	}
}
