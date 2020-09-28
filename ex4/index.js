let grid = null;
let numberOfGenerations = 50;
let currentGen = 0;

window.onload = () => {
	function init() {
    
    // 	initiate grid
		grid = new Grid(25, 25);

		//	filling grid with cells
		grid.fillWithCells();

		//	updating every cell with its neighbors list
		grid.updateCellsNeighbors();

    //	pick dead/alive initial state (random)
		setInitialLife();

		//	update visuals
		updateScreen();

	}
	init();
};

// setting generation Zero
function setInitialLife(type = "random") {
	grid.lifeSpark(type);
}

// rendering current generation
function updateScreen(){
	let gridElement = document.querySelector(".grid");
	gridElement.innerHTML = grid.getHtml();
}

function updateGenNum(){
	currentGen++;
	let genNum = document.querySelector(".myBtn");
	genNum.innerHTML = `Generation  Number  -  ${currentGen}`;

}

//	1. setting next iteration for every cell (according to its neighbors)
//  2. rendering the new gen
function startEvolution(){
	
		const intervalTimer = setInterval(() => {
			grid.calcNextGen();
			updateScreen();	
			updateGenNum();
		}, 1000);

		setTimeout(() => {
			clearTimeout(intervalTimer);
		}, (numberOfGenerations)*1000)

}


//	30 X 30 Grid
//	Starting point --> 5% of the cells are alive.
//	50 generations simulation






