export interface ICoordinates {
	x: number;
	y: number;
}

export interface ICell {
	coordinates: ICoordinates;
	sign: string;
	setMark(mark: string):void
}

export interface IGrid {
	width: number;
	height: number;
	matrix: ICell[][];
	print(): void;
	checkIfCellAvailable(coor: ICoordinates): boolean;
	updateBoard(coor: ICoordinates, player: IPlayer): void;
	checkIfWinner(player: IPlayer): boolean;
}

export interface IMove {
	coordinate: ICoordinates;
	sign: string;
}

export interface IPlayer {
	name: string;
	sign: string;
}

export interface IGame {
	board: IGrid;
	status: number;
	players: IPlayer[];
	addPlayer(player: IPlayer): void;
	moves: IMove[];
	winner: IPlayer;
	currentPlayerIndex: number;
	nextMove(x: number, y: number): boolean;
	updateMoves(coor: ICoordinates, player: IPlayer): void;
}

export enum statusE {
	InProgress = 0,
	Completed = 1,
}
