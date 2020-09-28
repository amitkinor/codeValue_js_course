//export default class Grid {
class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.matrix = this.createMatrix(width, height);
		this.genNumber = 0;
	}

	//	creating 2D matrix
	createMatrix(columns, rows) {
		let matrix = new Array(columns);
		for (let col = 0; col < columns; col++) {
			matrix[col] = new Array(rows);
		}
		return matrix;
	}

	// initiating Cells all over the matrix
	fillWithCells() {
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				this.matrix[col][row] = new Cell({ x: col, y: row });
			}
		}
	}

	// making sure that every cell knows its neighbors
	updateCellsNeighbors() {
		let mat = this.matrix;
		for (let col = 0; col < mat.length; col++) {
			for (let row = 0; row < mat[col].length; row++) {
				let currentCell = mat[col][row];
				currentCell.positionType = this.calcCellType(col, row);
				currentCell.neighbors = this.getNeighbors(
					currentCell.positionType,
					col,
					row
				);
			}
		}
	}

	/*
		possible types:
		-	topLeftCorner
		- topRightCorner
		- buttomLeftCorner
		- buttomRightCorner
		- left , right
		- up , down
		- middle
	*/
	calcCellType(col, row) {
		let leftCol = col === 0;
		let topRow = row === 0;
		let rightCol = col === this.width - 1;
		let buttonRow = row === this.height - 1;

		if (leftCol && topRow) return "topLeftCorner";
		if (rightCol && topRow) return "topRightCorner";
		if (leftCol && buttonRow) return "buttomLeftCorner";
		if (rightCol && buttonRow) return "buttomRightCorner";
		if (leftCol) return "left";
		if (rightCol) return "right";
		if (topRow) return "up";
		if (buttonRow) return "down";
		if (!leftCol && !topRow && !rightCol && !buttonRow) return "middle";
	}

	// calculate actual neighbors according to the position type
	getNeighbors(positionType, col, row) {
		switch (positionType) {
			case "topLeftCorner":
				return Array(
					{ x: col + 1, y: row },
					{ x: col + 1, y: row + 1 },
					{ x: col, y: row + 1 }
				);
			case "topRightCorner":
				return Array(
					{ x: col - 1, y: row },
					{ x: col - 1, y: row + 1 },
					{ x: col, y: row + 1 }
				);
			case "buttomLeftCorner":
				return Array(
					{ x: col, y: row - 1 },
					{ x: col + 1, y: row - 1 },
					{ x: col + 1, y: row }
				);
			case "buttomRightCorner":
				return Array(
					{ x: col - 1, y: row },
					{ x: col - 1, y: row - 1 },
					{ x: col, y: row - 1 }
				);
			case "left":
				return Array(
					{ x: col, y: row - 1 },
					{ x: col + 1, y: row - 1 },
					{ x: col + 1, y: row },
					{ x: col + 1, y: row + 1 },
					{ x: col, y: row + 1 }
				);

			case "right":
				return Array(
					{ x: col, y: row - 1 },
					{ x: col - 1, y: row - 1 },
					{ x: col - 1, y: row },
					{ x: col - 1, y: row + 1 },
					{ x: col, y: row + 1 }
				);
			case "up":
				return Array(
					{ x: col - 1, y: row },
					{ x: col - 1, y: row + 1 },
					{ x: col, y: row + 1 },
					{ x: col + 1, y: row + 1 },
					{ x: col + 1, y: row }
				);
			case "down":
				return Array(
					{ x: col - 1, y: row },
					{ x: col - 1, y: row - 1 },
					{ x: col, y: row - 1 },
					{ x: col + 1, y: row - 1 },
					{ x: col + 1, y: row }
				);
			default: // middle
			return Array(
				{ x: col-1 , y: row-1 },
				{ x: col , y: row-1 },
				{ x: col+1, y: row -1 },
				{ x: col-1 , y: row },
				{ x: col+1 , y: row },
				{ x: col-1, y: row+1  },
				{ x: col , y: row+1 },
				{ x: col+1 , y: row+1 })
		}
	}

	//	set initial dead/alive state algorithm
	lifeSpark(type) {
		switch (type) {
			case "random":
				this.initRandomSpark();
				break;
			default:
				throw new Error("unKnown spark type");
		}
	}

	//setting initial dead/alive by random algorithm
	initRandomSpark() {
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				let currentCell = this.matrix[col][row]; 
				currentCell.dead = Math.random() >= 0.05;
				currentCell.nextDead = currentCell.dead;
			}
		}
	}

	// setting dead or alive for the next gen
	// according to the current matrix state
	calcNextGen() {
		this.genNumber ++;
		
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				let currentCell = this.matrix[col][row];
				currentCell.nextDead = this.nextLiveOrDie(currentCell);
			}
		}

		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				let currentCell = this.matrix[col][row];
				currentCell.dead = currentCell.nextDead;
			}
		}
		
		

	}

	// a cell lives or dies according to how many live neighbors it got
	nextLiveOrDie(cell) {
		let liveNeighbors = 0;
		cell.neighbors.forEach((nCell) => {
			!this.matrix[nCell.x][nCell.y].dead && liveNeighbors++; //the element is only the coordinates
		});

		if (liveNeighbors === 2 || liveNeighbors === 3) {
			return false;
		} else {
			return true;
		}
	}

	getHtml() {
		let resStr = "";
		for (let col = 0; col < this.matrix.length; col++) {
			for (let row = 0; row < this.matrix[col].length; row++) {
				let curCell = this.matrix[col][row];
				let classToset = "";
				curCell.dead ? (classToset = "dead") : (classToset = "alive");
				resStr += `<div class='grid-item ${classToset}'></div>`;
			}
		}
		return resStr;
	}
}
