class Cell{
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.dead = true;
    this.nextDead = true;
    this.neighbors = [];
    this.positionType = '';
  }

  addNeighbor(coordinates){
    this.neighbors.push(coordinates);
  }
}