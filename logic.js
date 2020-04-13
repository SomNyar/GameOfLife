
//Global Variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Creating an empty 2D array for animals to be placed on
function makeField(cols, rows) {
	let arr = new Array(cols);
	for (let i=0; i<arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}


function draw(grid, rowStep, colStep) {
	ctx.clearRect(0,0, canvas.width, canvas.height)
	for (let i=0; i<grid.length; i++) {
		for (let j=0; j<grid[i].length; j++) {
			if (grid[i][j] === 1) {
				ctx.fillRect(i*rowStep, j*colStep, rowStep, colStep);
			}
			ctx.stroke();
		}
	}
}

//NOTE: Much faster if "draw" & "nextGeneration" are 1 function

function nextGeneration(grid) {
	let next = makeField(grid.length, grid[0].length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      
      let state = grid[i][j];

      let sum = 0;
      let neighbours = liveNeighbours(grid, i, j);

      //Rule1-2: Animal lives if 2-3 neighbors, else dies
      //Rule3: New cell (re-)borns if exactly 3 neighbors
      if (state == 1 && (neighbours < 2 || neighbours > 3)) {
      	next[i][j] = 0;
      } else if (state == 0 && neighbours == 3) {
        next[i][j] = 1;
      } else {
        next[i][j] = state;
      }
    }
  }
  return next;
}

function liveNeighbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      //Mobius-szalag szerű szegélyek
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function randomPopulation(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = Math.floor(Math.random()*2);
    }
  }
  return grid;
}


//"MAIN"
var field = makeField(100,100);
field = randomPopulation(field);
var rowStep = Math.round(canvas.height/rows);
var colStep = Math.round(canvas.width/cols);

function simulate() {
	draw(field, rowStep, colStep);
	field = nextGeneration(field);
	window.requestAnimationFrame(simulate);
	//setTimeout(() => { raf = window.requestAnimationFrame(simulate); }, 100);
  
}

simulate();




