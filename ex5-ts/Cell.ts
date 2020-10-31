import { ICell, ICoordinates } from "./interfaces";

export default class Cell implements ICell {
	coordinates: ICoordinates;
	sign: string ="";

	constructor(coordinates: ICoordinates) {
		this.coordinates = coordinates;
	}

	setMark(mark: string) {
		this.sign = mark;
	}
}
