
// VARIABLES //
var ssBtn, stepBtn, genCount, newBtn, canvas, ctx;

ssBtn = document.getElementById('start-stop-button');
stepBtn = document.getElementById('step-button');
genCount = document.getElementById('generation-counter');
newBtn = document.getElementById('new-button');
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var isPlaying = false;


// USER INTERACTIONS //
ssBtn.addEventListener('click',function(){
	if(ssBtn.textContent === "START"){
		ssBtn.textContent = "STOP";
		isPlaying = true;
		simulation();
	} else {
		ssBtn.textContent = "START";
		isPlaying = false;
	}
})

stepBtn.addEventListener('click',function(){
	genCount.textContent++; //Update counter
	game.next(); //New generation
	game.draw();
})

newBtn.addEventListener('click',function(){	
	genCount.textContent = "0"; //Reset counter
	game.init(); //Initialising table
	game.rand(); //Draw random pattern
	game.draw();
})


// OBJECT //
var game = {
	rows: 100, 
	cols: 100,
	table: [],
	steps: [], // row, column
	
	sets: function(){
		set: this.steps = [Math.round(canvas.width/this.rows), Math.round(canvas.width/this.cols)];
	},

	init: function(table = this.table){
		this.sets();

		table = new Array(this.cols);
		for (let i=0; i<table.length; i++){
			table[i] = new Array(this.rows);
			for(let j=0; j<table[i].length; j++){
				table[i][j] = 0;
			}
		}

		set: this.table = table;
		console.log(table);
		return table;
	},

	rand: function(table = this.table){
		for(let i=0; i<table.length; i++){
			for(let j=0; j<table[i].length; j++){
				table[i][j] = Math.floor(Math.random()*2);
			}
		}

		set: this.table = table;
	},

	draw: function(table = this.table){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for(let i=0; i<table.length; i++){
			for(let j=0; j<table[i].length; j++){
				if(table[i][j] === 1){
					ctx.fillRect(i*this.steps[0], j*this.steps[1], this.steps[0], this.steps[1]);
				}
				ctx.stroke();
			}
		}
	},

	next: function(table = this.table){
		let newTbl = this.init();

		for(let i=0; i<table.length; i++){
			for(let j=0; j<table[i].length; j++){
				let state = table[i][j];
				let sum = 0;
				let neighboursV = this.neighboursF(table,i,j);

				//Rule1-2: Animal lives if 2-3 neighbours, else dies
				//Rule3: New cell (re-)borns if exactly 3 neighbours
				if(state===1 && (neighboursV<2 || neighboursV>3)){
					newTbl[i][j] = 0;
				} else if (state===0 && neighboursV===3){
					newTbl[i][j] = 1;
				} else {
					newTbl[i][j] = state;
				}
			}
		}

		set: this.table = newTbl;
	},

	neighboursF: function(table, x, y){
		let sum = 0;
		for (let i=-1; i<2; i++){
		  for (let j=-1; j<2; j++){
		    //"Mobius strip"-like borders
		    let col = (x + i + this.cols) % this.cols;
		    let row = (y + j + this.rows) % this.rows;
		    sum += table[col][row];
		  }
		}
		sum -= table[x][y];
		return sum;	
	}
};


// FUNCTIONS //
function simulation(){
	if(isPlaying === true){
		game.next();
		game.draw();
		genCount.textContent++;
		window.requestAnimationFrame(simulation);
	} else {
		return
	}
}

game.init();