import {
	IGrid,
	statusE,
	IGame,
	IPlayer,
	IMove,
	ICoordinates,
} from "./interfaces";
import Grid from "./Grid";

const GameStatus: string[] = [];
GameStatus[0] = "InProgress";
GameStatus[1] = "Completed";

class Game implements IGame {
	status: number = statusE.InProgress;
	board: IGrid = null;
	players: IPlayer[] = [];
	moves: IMove[] = [];
	winner: IPlayer = null;
	currentPlayerIndex: number = 0;

	constructor(size: number) {
		this.board = new Grid(size);
	}

	addPlayer(player: IPlayer): void {
		this.players.push(player);
	}

	/**
	 * if possible
	 *	- sets the sign on the board
	 *	- updates moves history
	 *	-	toggle player
	 *  - check for winner - set winner if true.
	 */
	nextMove(x: number, y: number): boolean {
		if (this.winner) {
			return false;
		}
		if (!this.board.checkIfCellAvailable({ x, y })) {
			return false;
		}

		const player = this.players[this.currentPlayerIndex];
		this.board.updateBoard({ x, y }, player);
		this.updateMoves({ x, y }, player);
		this.board.checkIfWinner(player) && this.setWinner();
		this.togglePlayer();
		return true;
	}

	updateMoves(coor: ICoordinates, player: IPlayer): void {
		this.moves.push({ coordinate: coor, sign: player.sign });
	}

	setWinner(): void {
		this.winner = this.players[this.currentPlayerIndex];
		this.status = statusE.Completed;
	}

	togglePlayer(): void {
		this.currentPlayerIndex
			? (this.currentPlayerIndex = 0)
			: (this.currentPlayerIndex = 1);
	}

	/**
	 * Prints out the game status and moves history
	 */
	printSummary(): void {
		/**
		 * Updating status & winner
		 */
		let statusStr: string = "";
		this.status === statusE.InProgress
			? (statusStr = "Game is in progress \n")
			: (statusStr = `Game is Over. The winner is - ${this.winner.name}\n`);

		/**
		 * getting moves history
		 */
		const moves_history: string = this.printHistory();

		console.log(statusStr.concat(moves_history));
	}

	/**
	 * printSummary helper.
	 * returns the moves history as string
	 */
	printHistory(): string {
		let movesStr: string = "";
		this.moves.forEach((element) => {
			let x = element.coordinate.x;
			let y = element.coordinate.y;
			let sign = element.sign;
			movesStr += `[ ${x} , ${y} ]  :  ${sign}\n`;
		});
		return movesStr;
	}
}

// const game = new Game(3); // rows/cols count

// game.addPlayer({​​name: 'John', sign: 'x'}​​); //hint: 'addPlayer' gets an object of interface type

// game.addPlayer({​​name: 'Jane', sign: 'o'}​​);

// game.board.print(); // simple console.log is fine (prints empty board)

// console.log(GameStatus[game.status]) // game status - InProgress/Completed (enum)

// game.printSummary(); // InProgress - "Game is in progress" + moves history (console.log is fine)

// // nextMove - sets the next player's move. The next player is determined by the order they were added

// // Returns a boolean - false if the game is over or the cell is already occupied, otherwise true

// console.log(game.nextMove(0, 0)); // row, col - sets 'x' in the top left cell, prints true

// console.log(game.nextMove(0, 0)); // does nothing and prints false (cell is already occupied)

// console.log(game.nextMove(1, 1)); // sets 'o' in the center, prints true

// console.log(game.nextMove(0, 2)); // sets 'x' in the top right cell, prints true

// console.log(game.nextMove(2, 2)); // sets 'o' in the bottom right cell, prints true

// console.log(game.nextMove(0, 1)); // sets 'x' in the top center cell, prints true

// console.log(game.nextMove(2, 1)); // does nothing and prints false (Game over, John won)

// game.board.print(); // simple console.log is fine

// game.printSummary(); // Completed - "John Doe won!" + moves history


// all Test are successful 